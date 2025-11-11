"use client"

import { useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Car, 
  MapPin, 
  Navigation, 
  Clock, 
  Star, 
  DollarSign,
  Phone,
  Users,
  TrendingUp,
  Play,
  Pause,
  CheckCircle,
  XCircle
} from "lucide-react"
import Link from "next/link"

interface RideRequest {
  rideId: string
  pickup: { lat: number; lng: number; address: string }
  drop: { lat: number; lng: number; address: string }
  vehicleType: string
  distance: string
  estimatedFare: number
  requestedAt: Date
}

interface DriverStats {
  totalRides: number
  totalEarnings: number
  averageRating: number
  onlineHours: number
}

export default function DriverDashboardPage() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isOnline, setIsOnline] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [rideRequests, setRideRequests] = useState<RideRequest[]>([])
  const [currentRide, setCurrentRide] = useState<any>(null)
  const [stats, setStats] = useState<DriverStats>({
    totalRides: 156,
    totalEarnings: 12450,
    averageRating: 4.8,
    onlineHours: 245
  })

  // Mock driver data
  const driverData = {
    name: "Rajesh Kumar",
    vehicle: "Auto Rickshaw",
    plateNo: "JH01AB1234",
    rating: 4.8,
    phone: "+919876543210",
    licenseNo: "DL-1234567890123"
  }

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000", {
      transports: ["websocket", "polling"]
    })

    socketInstance.on("connect", () => {
      console.log("✅ Driver connected to real-time server")
      setIsConnected(true)
    })

    socketInstance.on("disconnect", () => {
      console.log("❌ Driver disconnected from real-time server")
      setIsConnected(false)
    })

    // Listen for ride requests
    socketInstance.on("ride:requested", (data: RideRequest) => {
      console.log("🚗 New ride request:", data)
      setRideRequests(prev => [...prev, { ...data, requestedAt: new Date() }])
    })

    // Listen for ride acceptance confirmation
    socketInstance.on("ride:accept-confirmed", (data: any) => {
      console.log("✅ Ride acceptance confirmed:", data)
      // Remove from requests and add to current ride
      setRideRequests(prev => prev.filter(req => req.rideId !== data.rideId))
      setCurrentRide({
        rideId: data.rideId,
        status: "ACCEPTED",
        pickup: data.pickup,
        drop: data.drop,
        estimatedFare: data.estimatedFare
      })
    })

    // Listen for ride cancellations
    socketInstance.on("ride:cancelled", (data: any) => {
      console.log("❌ Ride cancelled:", data)
      if (currentRide && currentRide.rideId === data.rideId) {
        setCurrentRide(null)
      }
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [currentRide])

  const handleGoOnline = () => {
    if (socket) {
      socket.emit("driver:go-online", {
        driverId: "driver_123", // Mock driver ID
        initialLocation: { lat: 23.3441, lng: 85.3096 } // Ranchi coordinates
      })
      setIsOnline(true)
    }
  }

  const handleGoOffline = () => {
    if (socket) {
      socket.emit("driver:go-offline", { driverId: "driver_123" })
      setIsOnline(false)
      setRideRequests([])
    }
  }

  const handleAcceptRide = (rideRequest: RideRequest) => {
    if (socket) {
      socket.emit("driver:accept-ride", {
        rideId: rideRequest.rideId,
        driverId: "driver_123"
      })
    }
  }

  const handleStartRide = () => {
    if (socket && currentRide) {
      socket.emit("driver:start-ride", { rideId: currentRide.rideId })
      setCurrentRide(prev => prev ? { ...prev, status: "IN_PROGRESS" } : null)
    }
  }

  const handleCompleteRide = () => {
    if (socket && currentRide) {
      const actualFare = currentRide.estimatedFare + Math.floor(Math.random() * 20) - 10 // Random variation
      socket.emit("driver:complete-ride", { 
        rideId: currentRide.rideId, 
        actualFare 
      })
      setCurrentRide(null)
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalRides: prev.totalRides + 1,
        totalEarnings: prev.totalEarnings + actualFare
      }))
    }
  }

  const simulateLocationUpdate = () => {
    if (socket && isOnline) {
      // Simulate location updates
      const lat = 23.3441 + (Math.random() - 0.5) * 0.01
      const lng = 85.3096 + (Math.random() - 0.5) * 0.01
      socket.emit("driver:update-location", {
        driverId: "driver_123",
        lat,
        lng
      })
    }
  }

  // Simulate location updates every 5 seconds when online
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isOnline) {
      interval = setInterval(simulateLocationUpdate, 5000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isOnline])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TT</span>
              </div>
              <span className="text-xl font-bold text-gray-900">TribeTaxi</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Badge variant={isOnline ? "default" : "secondary"} className={isOnline ? "bg-green-600" : "bg-gray-600"}>
                <Car className="w-3 h-3 mr-1" />
                Driver {isOnline ? "Online" : "Offline"}
              </Badge>
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-driver.jpg" />
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>
                <span className="font-medium">{driverData.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src="/placeholder-driver.jpg" />
                  <AvatarFallback className="text-lg">RK</AvatarFallback>
                </Avatar>
                <CardTitle>{driverData.name}</CardTitle>
                <CardDescription>{driverData.vehicle} • {driverData.plateNo}</CardDescription>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{driverData.rating}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <Badge className={isOnline ? "bg-green-600" : "bg-gray-600"}>
                    {isOnline ? "Online" : "Offline"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">License:</span>
                  <span className="text-xs">{driverData.licenseNo}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Phone:</span>
                  <span className="text-xs">{driverData.phone}</span>
                </div>
              </CardContent>
            </Card>

            {/* Online/Offline Toggle */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={isOnline ? handleGoOffline : handleGoOnline}
                  className={`w-full ${isOnline ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                  disabled={!isConnected}
                >
                  {isOnline ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Go Offline
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Go Online
                    </>
                  )}
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  {isConnected ? "✅ Connected to server" : "🔄 Connecting..."}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{stats.totalRides}</div>
                  <p className="text-sm text-gray-600">Total Rides</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">₹{stats.totalEarnings}</div>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">{stats.averageRating}</div>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-2">{stats.onlineHours}h</div>
                  <p className="text-sm text-gray-600">Online Hours</p>
                </CardContent>
              </Card>
            </div>

            {/* Current Ride */}
            {currentRide && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Navigation className="w-5 h-5 text-blue-600" />
                    <span>Current Ride</span>
                    <Badge className={currentRide.status === "ACCEPTED" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}>
                      {currentRide.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-green-600 rounded-full mt-1"></div>
                      <div>
                        <p className="font-medium">Pickup</p>
                        <p className="text-sm text-gray-600">{currentRide.pickup.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-red-600 rounded-full mt-1"></div>
                      <div>
                        <p className="font-medium">Drop</p>
                        <p className="text-sm text-gray-600">{currentRide.drop.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t">
                      <div>
                        <p className="text-sm text-gray-600">Estimated Fare</p>
                        <p className="font-semibold text-green-600">₹{currentRide.estimatedFare}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        {currentRide.status === "ACCEPTED" && (
                          <Button onClick={handleStartRide}>
                            Start Ride
                          </Button>
                        )}
                        {currentRide.status === "IN_PROGRESS" && (
                          <Button onClick={handleCompleteRide} className="bg-green-600 hover:bg-green-700">
                            Complete Ride
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Ride Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Car className="w-5 h-5 text-green-600" />
                    <span>Ride Requests</span>
                  </span>
                  <Badge variant="outline">
                    {rideRequests.length} Active
                  </Badge>
                </CardTitle>
                <CardDescription>
                  {isOnline ? "Accept ride requests to start earning" : "Go online to receive ride requests"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {rideRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No ride requests available</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {isOnline ? "Waiting for requests..." : "Go online to receive requests"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {rideRequests.map((request, index) => (
                      <Card key={request.rideId} className="border-l-4 border-l-green-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <MapPin className="w-4 h-4 text-green-600" />
                                <span className="font-medium text-sm">{request.pickup.address}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-red-600" />
                                <span className="font-medium text-sm">{request.drop.address}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-green-600">₹{request.estimatedFare}</div>
                              <div className="text-xs text-gray-500">{request.distance}</div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>{request.vehicleType}</span>
                              <span>•</span>
                              <span>{Math.floor((new Date().getTime() - request.requestedAt.getTime()) / 1000)}s ago</span>
                            </div>
                            <Button 
                              size="sm" 
                              onClick={() => handleAcceptRide(request)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Accept
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/driver/earnings">
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-6 text-center">
                        <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-sm">Earnings</h3>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link href="/driver/rides">
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-6 text-center">
                        <Navigation className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-sm">Ride History</h3>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link href="/driver/profile">
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-6 text-center">
                        <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-sm">Profile</h3>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link href="/support">
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-6 text-center">
                        <Phone className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-sm">Support</h3>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}