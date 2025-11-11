"use client"

import { useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  MapPin, 
  Car, 
  Navigation, 
  Clock, 
  Star, 
  Phone,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react"

interface Driver {
  id: string
  name: string
  vehicle: string
  plateNo: string
  rating: number
  phone: string
}

interface RideStatus {
  rideId: string
  status: 'REQUESTED' | 'ACCEPTED' | 'ARRIVED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  driver?: Driver
  driverLocation?: { lat: number; lng: number }
  estimatedArrival?: string
  actualFare?: number
}

interface RealTimeRideTrackerProps {
  rideId: string
  onRideComplete?: (fare: number) => void
  onRideCancel?: () => void
}

export default function RealTimeRideTracker({ rideId, onRideComplete, onRideCancel }: RealTimeRideTrackerProps) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [rideStatus, setRideStatus] = useState<RideStatus | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [nearbyDrivers, setNearbyDrivers] = useState<any[]>([])

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000", {
      transports: ["websocket", "polling"]
    })

    socketInstance.on("connect", () => {
      console.log("✅ Connected to real-time server")
      setIsConnected(true)
    })

    socketInstance.on("disconnect", () => {
      console.log("❌ Disconnected from real-time server")
      setIsConnected(false)
    })

    // Listen for ride status updates
    socketInstance.on("ride:accepted", (data: any) => {
      console.log("🚗 Ride accepted:", data)
      setRideStatus({
        rideId: data.rideId,
        status: "ACCEPTED",
        driver: {
          id: data.driverId,
          name: "Rajesh Kumar", // Mock data
          vehicle: "Auto Rickshaw",
          plateNo: "JH01AB1234",
          rating: 4.8,
          phone: "+919876543210"
        },
        driverLocation: data.driverLocation,
        estimatedArrival: data.estimatedArrival
      })
    })

    socketInstance.on("ride:started", (data: any) => {
      console.log("🚀 Ride started:", data)
      setRideStatus(prev => prev ? { ...prev, status: "IN_PROGRESS" } : null)
    })

    socketInstance.on("ride:completed", (data: any) => {
      console.log("✅ Ride completed:", data)
      setRideStatus(prev => prev ? { ...prev, status: "COMPLETED", actualFare: data.actualFare } : null)
      onRideComplete?.(data.actualFare)
    })

    socketInstance.on("ride:cancelled", (data: any) => {
      console.log("❌ Ride cancelled:", data)
      setRideStatus(prev => prev ? { ...prev, status: "CANCELLED" } : null)
      onRideCancel?.()
    })

    // Listen for driver location updates
    socketInstance.on("driver:location-update", (data: any) => {
      console.log("📍 Driver location update:", data)
      setRideStatus(prev => {
        if (prev && prev.driver?.id === data.driverId) {
          return {
            ...prev,
            driverLocation: { lat: data.lat, lng: data.lng }
          }
        }
        return prev
      })
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [rideId, onRideComplete, onRideCancel])

  const handleCancelRide = () => {
    if (socket) {
      socket.emit("rider:cancel-ride", { 
        rideId, 
        reason: "Cancelled by rider" 
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "REQUESTED": return "bg-yellow-100 text-yellow-800"
      case "ACCEPTED": return "bg-blue-100 text-blue-800"
      case "ARRIVED": return "bg-purple-100 text-purple-800"
      case "IN_PROGRESS": return "bg-green-100 text-green-800"
      case "COMPLETED": return "bg-gray-100 text-gray-800"
      case "CANCELLED": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "REQUESTED": return <Clock className="w-4 h-4" />
      case "ACCEPTED": return <CheckCircle className="w-4 h-4" />
      case "ARRIVED": return <Car className="w-4 h-4" />
      case "IN_PROGRESS": return <Navigation className="w-4 h-4" />
      case "COMPLETED": return <CheckCircle className="w-4 h-4" />
      case "CANCELLED": return <XCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  if (!rideStatus) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Navigation className="w-5 h-5 text-green-600" />
            <span>Waiting for Driver</span>
          </CardTitle>
          <CardDescription>
            {isConnected ? "Connected to real-time server" : "Connecting..."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Finding nearby drivers...</p>
            <p className="text-sm text-gray-500 mt-2">
              {isConnected ? "✅ Connected" : "🔄 Connecting to server"}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              {getStatusIcon(rideStatus.status)}
              <span>Ride Status</span>
            </CardTitle>
            <Badge className={getStatusColor(rideStatus.status)}>
              {rideStatus.status.replace("_", " ")}
            </Badge>
          </div>
          <CardDescription>
            {rideStatus.status === "REQUESTED" && "Waiting for drivers to accept your ride..."}
            {rideStatus.status === "ACCEPTED" && `Driver arriving in ${rideStatus.estimatedArrival}`}
            {rideStatus.status === "ARRIVED" && "Driver has arrived at pickup location"}
            {rideStatus.status === "IN_PROGRESS" && "Ride in progress"}
            {rideStatus.status === "COMPLETED" && "Ride completed successfully"}
            {rideStatus.status === "CANCELLED" && "Ride was cancelled"}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Driver Info */}
      {rideStatus.driver && rideStatus.status !== "COMPLETED" && rideStatus.status !== "CANCELLED" && (
        <Card>
          <CardHeader>
            <CardTitle>Your Driver</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder-driver.jpg" />
                <AvatarFallback className="text-lg">
                  {rideStatus.driver.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{rideStatus.driver.name}</h3>
                <p className="text-gray-600">{rideStatus.driver.vehicle} • {rideStatus.driver.plateNo}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center text-yellow-600">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{rideStatus.driver.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">• Verified Driver</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Live Tracking */}
      {rideStatus.driverLocation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-green-600" />
              <span>Live Tracking</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <p className="text-gray-600">Live Map</p>
                <p className="text-sm text-gray-500">
                  Driver at: {rideStatus.driverLocation.lat.toFixed(4)}, {rideStatus.driverLocation.lng.toFixed(4)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ride Details */}
      <Card>
        <CardHeader>
          <CardTitle>Ride Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Ride ID:</span>
            <span className="font-medium">{rideId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <Badge className={getStatusColor(rideStatus.status)}>
              {rideStatus.status.replace("_", " ")}
            </Badge>
          </div>
          {rideStatus.estimatedArrival && (
            <div className="flex justify-between">
              <span className="text-gray-600">ETA:</span>
              <span className="font-medium">{rideStatus.estimatedArrival}</span>
            </div>
          )}
          {rideStatus.actualFare && (
            <div className="flex justify-between">
              <span className="text-gray-600">Final Fare:</span>
              <span className="font-semibold text-green-600">₹{rideStatus.actualFare}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        {rideStatus.status === "REQUESTED" && (
          <Button 
            variant="destructive" 
            className="flex-1"
            onClick={handleCancelRide}
          >
            Cancel Ride
          </Button>
        )}
        
        {rideStatus.status === "COMPLETED" && (
          <Button className="flex-1 bg-green-600 hover:bg-green-700">
            Rate Driver
          </Button>
        )}
        
        {rideStatus.status === "CANCELLED" && (
          <Button className="flex-1 bg-green-600 hover:bg-green-700">
            Book New Ride
          </Button>
        )}
      </div>
    </div>
  )
}