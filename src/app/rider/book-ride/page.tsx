"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Car, Clock, DollarSign, Search, Navigation, CheckCircle, CreditCard } from "lucide-react"
import Link from "next/link"
import RealTimeRideTracker from "@/components/booking/RealTimeRideTracker"
import PaymentComponent from "@/components/payment/PaymentComponent"

export default function BookRidePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [bookingData, setBookingData] = useState({
    pickup: "",
    drop: "",
    vehicleType: "",
    paymentMethod: ""
  })

  const [estimatedFare, setEstimatedFare] = useState<number | null>(null)
  const [showDrivers, setShowDrivers] = useState(false)
  const [activeRideId, setActiveRideId] = useState<string | null>(null)
  const [rideCompleted, setRideCompleted] = useState(false)
  const [showPayment, setShowPayment] = useState(false)

  const vehicleTypes = [
    { value: "AUTO_RICKSHAW", label: "Auto Rickshaw", icon: "🛺", baseFare: 30, perKm: 11 },
    { value: "CAR_ECONOMY", label: "Car Economy", icon: "🚗", baseFare: 50, perKm: 15 },
    { value: "CAR_PREMIUM", label: "Car Premium", icon: "🚙", baseFare: 80, perKm: 20 },
    { value: "BIKE", label: "Bike", icon: "🏍️", baseFare: 20, perKm: 8 }
  ]

  const paymentMethods = [
    { value: "CASH", label: "Cash", icon: "💵" },
    { value: "UPI", label: "UPI", icon: "📱" },
    { value: "CARD", label: "Card", icon: "💳" },
    { value: "WALLET", label: "Wallet", icon: "👛" }
  ]

  const handleLocationSearch = () => {
    // Simulate location search
    setTimeout(() => {
      setEstimatedFare(125)
    }, 1000)
  }

  const handleBookRide = async () => {
    setIsLoading(true)
    
    // Generate a unique ride ID
    const rideId = `ride_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Simulate API call to book ride
    setTimeout(() => {
      setIsLoading(false)
      setActiveRideId(rideId)
      setShowDrivers(true)
    }, 2000)
  }

  const handleRideComplete = (fare: number) => {
    setRideCompleted(true)
    setActiveRideId(null)
    setShowPayment(true) // Show payment component after ride completion
  }

  const handlePaymentSuccess = (paymentData: any) => {
    console.log("Payment successful:", paymentData)
    setShowPayment(false)
    setRideCompleted(true)
  }

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error)
    // Show error message to user
  }

  const handleRideCancel = () => {
    setActiveRideId(null)
    setShowDrivers(false)
  }

  const nearbyDrivers = [
    { id: 1, name: "Rajesh Kumar", vehicle: "Auto Rickshaw", distance: "0.8 km", rating: 4.8, eta: "3 min" },
    { id: 2, name: "Suresh Singh", vehicle: "Car Economy", distance: "1.2 km", rating: 4.9, eta: "5 min" },
    { id: 3, name: "Mukesh Yadav", vehicle: "Auto Rickshaw", distance: "1.5 km", rating: 4.7, eta: "6 min" }
  ]

  // If ride is completed, show success message
  if (rideCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Ride Completed!</CardTitle>
            <CardDescription>
              Thank you for using TribeTaxi. Your ride has been completed successfully.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Rate your driver and experience</p>
            </div>
            <div className="flex space-x-2">
              <Link href="/rider/book-ride" className="flex-1">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Book Another Ride
                </Button>
              </Link>
              <Link href="/rider/dashboard" className="flex-1">
                <Button variant="outline" className="w-full">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // If there's an active ride, show the real-time tracker
  if (activeRideId) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TT</span>
                </div>
                <span className="text-xl font-bold text-gray-900">TribeTaxi</span>
              </Link>
              
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <Navigation className="w-3 h-3 mr-1" />
                  Active Ride
                </Badge>
                <Link href="/rider/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <RealTimeRideTracker 
              rideId={activeRideId}
              onRideComplete={handleRideComplete}
              onRideCancel={handleRideCancel}
            />
          </div>
        </div>
      </div>
    )
  }

  // If payment is required, show payment component
  if (showPayment && estimatedFare) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TT</span>
                </div>
                <span className="text-xl font-bold text-gray-900">TribeTaxi</span>
              </Link>
              
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <CreditCard className="w-3 h-3 mr-1" />
                  Payment
                </Badge>
                <Link href="/rider/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <PaymentComponent
              amount={estimatedFare}
              rideId={activeRideId || `ride_${Date.now()}`}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TT</span>
              </div>
              <span className="text-xl font-bold text-gray-900">TribeTaxi</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <MapPin className="w-3 h-3 mr-1" />
                Book Ride
              </Badge>
              <Link href="/rider/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Booking Form */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Navigation className="w-5 h-5 text-green-600" />
                    <span>Book Your Ride</span>
                  </CardTitle>
                  <CardDescription>
                    Enter your pickup and drop locations to find available drivers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Location Inputs */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickup">Pickup Location *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-green-600" />
                        <Input
                          id="pickup"
                          type="text"
                          placeholder="Enter pickup location"
                          className="pl-10"
                          value={bookingData.pickup}
                          onChange={(e) => setBookingData(prev => ({ ...prev, pickup: e.target.value }))}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="drop">Drop Location *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-red-600" />
                        <Input
                          id="drop"
                          type="text"
                          placeholder="Enter drop location"
                          className="pl-10"
                          value={bookingData.drop}
                          onChange={(e) => setBookingData(prev => ({ ...prev, drop: e.target.value }))}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleLocationSearch}
                      className="w-full"
                      disabled={!bookingData.pickup || !bookingData.drop}
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Search Location
                    </Button>
                  </div>

                  {/* Vehicle Selection */}
                  {estimatedFare !== null && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Select Vehicle Type</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {vehicleTypes.map((vehicle) => (
                          <Card 
                            key={vehicle.value}
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              bookingData.vehicleType === vehicle.value ? 'ring-2 ring-green-500' : ''
                            }`}
                            onClick={() => setBookingData(prev => ({ ...prev, vehicleType: vehicle.value }))}
                          >
                            <CardContent className="p-4 text-center">
                              <div className="text-2xl mb-2">{vehicle.icon}</div>
                              <h4 className="font-semibold text-sm">{vehicle.label}</h4>
                              <p className="text-xs text-gray-500">₹{vehicle.baseFare} base fare</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Payment Method */}
                  {bookingData.vehicleType && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Payment Method</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {paymentMethods.map((payment) => (
                          <Card 
                            key={payment.value}
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              bookingData.paymentMethod === payment.value ? 'ring-2 ring-green-500' : ''
                            }`}
                            onClick={() => setBookingData(prev => ({ ...prev, paymentMethod: payment.value }))}
                          >
                            <CardContent className="p-4 text-center">
                              <div className="text-2xl mb-2">{payment.icon}</div>
                              <h4 className="font-semibold text-sm">{payment.label}</h4>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Fare Summary */}
                  {bookingData.vehicleType && bookingData.paymentMethod && (
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold">Estimated Fare:</span>
                          <span className="text-2xl font-bold text-green-600">₹{estimatedFare}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Distance: ~8.5 km</span>
                          <span>Duration: ~25 min</span>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Book Button */}
                  {bookingData.vehicleType && bookingData.paymentMethod && (
                    <Button 
                      onClick={handleBookRide}
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Finding Drivers..." : "Book Ride"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Fare Estimate */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span>Fare Estimate</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {estimatedFare ? (
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        ₹{estimatedFare}
                      </div>
                      <p className="text-sm text-gray-600">Estimated total fare</p>
                      <div className="mt-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Base Fare:</span>
                          <span>₹30</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Distance (~8.5 km):</span>
                          <span>₹85</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration (~25 min):</span>
                          <span>₹10</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>₹{estimatedFare}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center">
                      Enter locations to see fare estimate
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Available Drivers */}
              {showDrivers && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Car className="w-5 h-5 text-blue-600" />
                      <span>Nearby Drivers</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {nearbyDrivers.map((driver) => (
                      <div key={driver.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">
                            {driver.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{driver.name}</h4>
                          <p className="text-xs text-gray-500">{driver.vehicle}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-xs text-yellow-600">
                            <span>⭐ {driver.rating}</span>
                          </div>
                          <div className="text-xs text-gray-500">{driver.eta}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Trip Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span>Trip Info</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-sm">Zero commission for drivers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm">Transparent pricing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-sm">24/7 support available</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}