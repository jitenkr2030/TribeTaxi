import { Server } from 'socket.io'

// Driver location interface
interface DriverLocation {
  driverId: string
  lat: number
  lng: number
  timestamp: Date
}

// Ride status interface
interface RideStatusUpdate {
  rideId: string
  status: 'REQUESTED' | 'ACCEPTED' | 'ARRIVED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  driverId?: string
  driverLocation?: { lat: number; lng: number }
}

// Active drivers storage
const activeDrivers = new Map<string, DriverLocation>()
const activeRides = new Map<string, any>()

export const setupSocket = (io: Server) => {
  console.log('🚖 TribeTaxi Socket.io server initialized')

  io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id)

    // Driver goes online
    socket.on('driver:go-online', (data: { driverId: string; initialLocation?: { lat: number; lng: number } }) => {
      console.log('🟢 Driver went online:', data.driverId)
      socket.join(`driver_${data.driverId}`)
      socket.join('active_drivers')
      
      if (data.initialLocation) {
        const driverLocation: DriverLocation = {
          driverId: data.driverId,
          lat: data.initialLocation.lat,
          lng: data.initialLocation.lng,
          timestamp: new Date()
        }
        activeDrivers.set(data.driverId, driverLocation)
        
        // Notify all clients that a new driver is online
        io.emit('driver:online', {
          driverId: data.driverId,
          location: driverLocation
        })
      }
      
      socket.emit('driver:online-confirmed', { success: true })
    })

    // Driver goes offline
    socket.on('driver:go-offline', (data: { driverId: string }) => {
      console.log('🔴 Driver went offline:', data.driverId)
      socket.leave(`driver_${data.driverId}`)
      socket.leave('active_drivers')
      activeDrivers.delete(data.driverId)
      
      // Notify all clients that driver is offline
      io.emit('driver:offline', { driverId: data.driverId })
    })

    // Driver location update
    socket.on('driver:update-location', (data: { driverId: string; lat: number; lng: number }) => {
      const driverLocation: DriverLocation = {
        driverId: data.driverId,
        lat: data.lat,
        lng: data.lng,
        timestamp: new Date()
      }
      activeDrivers.set(data.driverId, driverLocation)
      
      // Broadcast location update to all interested clients
      io.to('active_riders').emit('driver:location-update', driverLocation)
    })

    // Rider requests a ride
    socket.on('rider:request-ride', (data: { 
      rideId: string; 
      riderId: string; 
      pickup: { lat: number; lng: number; address: string }
      drop: { lat: number; lng: number; address: string }
      vehicleType: string
    }) => {
      console.log('🚗 Ride requested:', data.rideId)
      
      // Store ride data
      activeRides.set(data.rideId, {
        ...data,
        status: 'REQUESTED',
        requestedAt: new Date()
      })
      
      // Join rider to ride room
      socket.join(`ride_${data.rideId}`)
      socket.join('active_riders')
      
      // Find nearby drivers (simplified - in real app would use distance calculation)
      const nearbyDrivers = Array.from(activeDrivers.values())
      
      // Send ride request to nearby drivers
      nearbyDrivers.forEach(driver => {
        io.to(`driver_${driver.driverId}`).emit('ride:requested', {
          rideId: data.rideId,
          pickup: data.pickup,
          drop: data.drop,
          vehicleType: data.vehicleType,
          distance: '1.2 km', // Mock distance
          estimatedFare: 125 // Mock fare
        })
      })
      
      // Confirm to rider that request is sent
      socket.emit('ride:request-sent', { 
        rideId: data.rideId, 
        nearbyDriversCount: nearbyDrivers.length 
      })
    })

    // Driver accepts ride
    socket.on('driver:accept-ride', (data: { rideId: string; driverId: string }) => {
      console.log('✅ Ride accepted:', data.rideId, 'by driver:', data.driverId)
      
      const ride = activeRides.get(data.rideId)
      if (ride) {
        ride.status = 'ACCEPTED'
        ride.driverId = data.driverId
        ride.acceptedAt = new Date()
        
        // Get driver location
        const driverLocation = activeDrivers.get(data.driverId)
        
        // Notify rider that ride is accepted
        io.to(`ride_${data.rideId}`).emit('ride:accepted', {
          rideId: data.rideId,
          driverId: data.driverId,
          driverLocation: driverLocation,
          estimatedArrival: '3 min' // Mock ETA
        })
        
        // Notify driver that acceptance is confirmed
        socket.emit('ride:accept-confirmed', { rideId: data.rideId })
      }
    })

    // Driver starts ride
    socket.on('driver:start-ride', (data: { rideId: string }) => {
      console.log('🚀 Ride started:', data.rideId)
      
      const ride = activeRides.get(data.rideId)
      if (ride) {
        ride.status = 'IN_PROGRESS'
        ride.startedAt = new Date()
        
        // Notify rider that ride has started
        io.to(`ride_${data.rideId}`).emit('ride:started', {
          rideId: data.rideId,
          startedAt: ride.startedAt
        })
      }
    })

    // Driver completes ride
    socket.on('driver:complete-ride', (data: { rideId: string; actualFare: number }) => {
      console.log('✅ Ride completed:', data.rideId)
      
      const ride = activeRides.get(data.rideId)
      if (ride) {
        ride.status = 'COMPLETED'
        ride.completedAt = new Date()
        ride.actualFare = data.actualFare
        
        // Notify rider that ride is completed
        io.to(`ride_${data.rideId}`).emit('ride:completed', {
          rideId: data.rideId,
          actualFare: data.actualFare,
          completedAt: ride.completedAt
        })
        
        // Clean up
        activeRides.delete(data.rideId)
      }
    })

    // Rider cancels ride
    socket.on('rider:cancel-ride', (data: { rideId: string; reason?: string }) => {
      console.log('❌ Ride cancelled:', data.rideId)
      
      const ride = activeRides.get(data.rideId)
      if (ride) {
        ride.status = 'CANCELLED'
        ride.cancelledAt = new Date()
        ride.cancellationReason = data.reason
        
        // Notify driver that ride is cancelled
        if (ride.driverId) {
          io.to(`driver_${ride.driverId}`).emit('ride:cancelled', {
            rideId: data.rideId,
            reason: data.reason
          })
        }
        
        // Confirm to rider
        socket.emit('ride:cancel-confirmed', { rideId: data.rideId })
        
        // Clean up
        activeRides.delete(data.rideId)
      }
    })

    // Get nearby drivers
    socket.on('get:nearby-drivers', (data: { lat: number; lng: number; radius?: number }) => {
      const nearbyDrivers = Array.from(activeDrivers.values())
        .filter(driver => {
          // Simplified distance check - in real app would use proper distance calculation
          return Math.abs(driver.lat - data.lat) < 0.05 && Math.abs(driver.lng - data.lng) < 0.05
        })
      
      socket.emit('nearby-drivers', nearbyDrivers)
    })

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('🔌 Client disconnected:', socket.id)
    })

    // Send welcome message
    socket.emit('connection:established', {
      message: 'Welcome to TribeTaxi Real-time Server!',
      timestamp: new Date().toISOString(),
      features: [
        'Real-time driver tracking',
        'Live ride updates',
        'Instant ride requests',
        'Driver availability'
      ]
    })
  })

  // Clean up expired connections periodically
  setInterval(() => {
    const now = new Date()
    activeDrivers.forEach((location, driverId) => {
      // Remove drivers who haven't updated location in 5 minutes
      if (now.getTime() - location.timestamp.getTime() > 5 * 60 * 1000) {
        activeDrivers.delete(driverId)
        io.emit('driver:offline', { driverId })
      }
    })
  }, 60000) // Check every minute
}

// Helper functions for external use
export const getActiveDrivers = () => {
  return Array.from(activeDrivers.values())
}

export const getActiveRides = () => {
  return Array.from(activeRides.values())
}