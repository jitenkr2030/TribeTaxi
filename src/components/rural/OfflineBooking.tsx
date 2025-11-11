"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Clock, Users, WifiOff, Wifi, CheckCircle, AlertCircle, Navigation } from "lucide-react"

interface OfflineBooking {
  id: string
  passengerName: string
  phone: string
  pickupLocation: string
  dropLocation: string
  vehicleType: string
  preferredTime: string
  numberOfPassengers: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: Date
  syncStatus: 'local' | 'synced' | 'failed'
}

interface OfflineBookingProps {
  onBookingComplete?: (booking: OfflineBooking) => void
}

export default function OfflineBookingComponent({ onBookingComplete }: OfflineBookingProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [bookingData, setBookingData] = useState({
    passengerName: "",
    phone: "",
    pickupLocation: "",
    dropLocation: "",
    vehicleType: "",
    preferredTime: "",
    numberOfPassengers: 1
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [offlineBookings, setOfflineBookings] = useState<OfflineBooking[]>([])
  const [showForm, setShowForm] = useState(true)

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Load offline bookings from localStorage
    const savedBookings = localStorage.getItem('offlineBookings')
    if (savedBookings) {
      setOfflineBookings(JSON.parse(savedBookings))
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Sync offline bookings when online
  useEffect(() => {
    if (isOnline) {
      syncOfflineBookings()
    }
  }, [isOnline])

  const syncOfflineBookings = async () => {
    const unsyncedBookings = offlineBookings.filter(booking => booking.syncStatus === 'local')
    
    if (unsyncedBookings.length === 0) return

    for (const booking of unsyncedBookings) {
      try {
        // Simulate API call to sync booking
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Update booking status to synced
        setOfflineBookings(prev => 
          prev.map(b => 
            b.id === booking.id 
              ? { ...b, syncStatus: 'synced' as const }
              : b
          )
        )
      } catch (error) {
        console.error('Failed to sync booking:', error)
        setOfflineBookings(prev => 
          prev.map(b => 
            b.id === booking.id 
              ? { ...b, syncStatus: 'failed' as const }
              : b
          )
        )
      }
    }

    // Save to localStorage
    localStorage.setItem('offlineBookings', JSON.stringify(offlineBookings))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const newBooking: OfflineBooking = {
      id: `offline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...bookingData,
      status: 'pending',
      createdAt: new Date(),
      syncStatus: isOnline ? 'synced' : 'local'
    }

    // Add to offline bookings
    const updatedBookings = [...offlineBookings, newBooking]
    setOfflineBookings(updatedBookings)
    
    // Save to localStorage
    localStorage.setItem('offlineBookings', JSON.stringify(updatedBookings))

    // If online, try to sync immediately
    if (isOnline) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setOfflineBookings(prev => 
          prev.map(b => 
            b.id === newBooking.id 
              ? { ...b, syncStatus: 'synced' as const }
              : b
          )
        )
      } catch (error) {
        console.error('Failed to sync booking:', error)
      }
    }

    setIsSubmitting(false)
    setShowForm(false)
    onBookingComplete?.(newBooking)
  }

  const handleNewBooking = () => {
    setBookingData({
      passengerName: "",
      phone: "",
      pickupLocation: "",
      dropLocation: "",
      vehicleType: "",
      preferredTime: "",
      numberOfPassengers: 1
    })
    setShowForm(true)
  }

  const getSyncStatusIcon = (syncStatus: string) => {
    switch (syncStatus) {
      case 'synced':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <WifiOff className="w-4 h-4 text-orange-600" />
    }
  }

  const vehicleTypes = [
    { value: "AUTO_RICKSHAW", label: "Auto Rickshaw" },
    { value: "CAR_ECONOMY", label: "Car Economy" },
    { value: "BIKE", label: "Bike" }
  ]

  if (!showForm) {
    return (
      <div className="space-y-6">
        {/* Success Message */}
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              {isOnline ? "Booking Confirmed!" : "Booking Saved Offline!"}
            </h3>
            <p className="text-gray-600 mb-4">
              {isOnline 
                ? "Your ride has been booked successfully." 
                : "Your booking has been saved and will sync when you're online."
              }
            </p>
            <Button onClick={handleNewBooking} className="bg-green-600 hover:bg-green-700">
              Book Another Ride
            </Button>
          </CardContent>
        </Card>

        {/* Offline Bookings List */}
        {offlineBookings.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <WifiOff className="w-5 h-5 text-orange-600" />
                <span>Your Bookings</span>
              </CardTitle>
              <CardDescription>
                {isOnline ? "All bookings synced" : "Bookings will sync when online"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {offlineBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">{booking.passengerName}</span>
                        <Badge variant="outline" className="text-xs">
                          {booking.vehicleType.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        {booking.pickupLocation} → {booking.dropLocation}
                      </div>
                      <div className="text-xs text-gray-500">
                        {booking.createdAt.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getSyncStatusIcon(booking.syncStatus)}
                      <Badge variant={booking.status === 'pending' ? 'secondary' : 'default'}>
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {isOnline ? <Wifi className="w-5 h-5 text-green-600" /> : <WifiOff className="w-5 h-5 text-orange-600" />}
          <span>Offline Booking</span>
        </CardTitle>
        <CardDescription>
          {isOnline 
            ? "You're online. Bookings will sync immediately."
            : "You're offline. Bookings will be saved and synced when you're online."
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Passenger Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Passenger Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={bookingData.passengerName}
                  onChange={(e) => setBookingData(prev => ({ ...prev, passengerName: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
            </div>
          </div>

          {/* Trip Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Trip Details</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pickup">Pickup Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-green-600" />
                  <Input
                    id="pickup"
                    type="text"
                    placeholder="Enter pickup location or village name"
                    className="pl-10"
                    value={bookingData.pickupLocation}
                    onChange={(e) => setBookingData(prev => ({ ...prev, pickupLocation: e.target.value }))}
                    required
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
                    placeholder="Enter drop location or village name"
                    className="pl-10"
                    value={bookingData.dropLocation}
                    onChange={(e) => setBookingData(prev => ({ ...prev, dropLocation: e.target.value }))}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle and Time Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle">Vehicle Type *</Label>
                <Select value={bookingData.vehicleType} onValueChange={(value) => setBookingData(prev => ({ ...prev, vehicleType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleTypes.map((vehicle) => (
                      <SelectItem key={vehicle.value} value={vehicle.value}>
                        {vehicle.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Preferred Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={bookingData.preferredTime}
                  onChange={(e) => setBookingData(prev => ({ ...prev, preferredTime: e.target.value }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="passengers">Number of Passengers *</Label>
                <Select value={bookingData.numberOfPassengers.toString()} onValueChange={(value) => setBookingData(prev => ({ ...prev, numberOfPassengers: parseInt(value) }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isSubmitting || !bookingData.passengerName || !bookingData.phone || !bookingData.pickupLocation || !bookingData.dropLocation || !bookingData.vehicleType || !bookingData.preferredTime}
          >
            {isSubmitting ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                {isOnline ? "Booking..." : "Saving Offline..."}
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4 mr-2" />
                {isOnline ? "Book Ride" : "Save Booking Offline"}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}