"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Clock, Star, Phone, Navigation, Wifi, WifiOff } from "lucide-react"

interface RuralHub {
  id: string
  name: string
  district: string
  coordinates: { lat: number; lng: number }
  villages: string[]
  activeDrivers: number
  totalRides: number
  averageRating: number
  facilities: string[]
  isOnline: boolean
  nextPickupTime?: string
}

interface RuralHubSystemProps {
  onHubSelect?: (hub: RuralHub) => void
  selectedHub?: string
}

export default function RuralHubSystem({ onHubSelect, selectedHub }: RuralHubSystemProps) {
  const [selectedHubState, setSelectedHubState] = useState<string | null>(selectedHub)

  const ruralHubs: RuralHub[] = [
    {
      id: "khunti_hub",
      name: "Khunti Rural Hub",
      district: "Khunti",
      coordinates: { lat: 23.05, lng: 85.28 },
      villages: ["Khunti", "Murhu", "Rania", "Torpa", "Karde"],
      activeDrivers: 12,
      totalRides: 342,
      averageRating: 4.7,
      facilities: ["Waiting Area", "Water", "First Aid", "Mobile Charging"],
      isOnline: true,
      nextPickupTime: "15 min"
    },
    {
      id: "simdega_hub",
      name: "Simdega Rural Hub",
      district: "Simdega",
      coordinates: { lat: 22.62, lng: 84.52 },
      villages: ["Simdega", "Bano", "Thethaitangar", "Kolebira", "Jaldega"],
      activeDrivers: 8,
      totalRides: 198,
      averageRating: 4.8,
      facilities: ["Waiting Area", "Water", "Shelter", "Emergency Contact"],
      isOnline: true,
      nextPickupTime: "25 min"
    },
    {
      id: "latehar_hub",
      name: "Latehar Rural Hub",
      district: "Latehar",
      coordinates: { lat: 23.75, lng: 84.50 },
      villages: ["Latehar", "Chandwa", "Garhwa", "Manika", "Balumath"],
      activeDrivers: 15,
      totalRides: 456,
      averageRating: 4.6,
      facilities: ["Waiting Area", "Water", "Food Stall", "Medical Help"],
      isOnline: true,
      nextPickupTime: "10 min"
    },
    {
      id: "pakur_hub",
      name: "Pakur Rural Hub",
      district: "Pakur",
      coordinates: { lat: 24.63, lng: 87.85 },
      villages: ["Pakur", "Hiranpur", "Littipara", "Amrapara", "Maheshpur"],
      activeDrivers: 6,
      totalRides: 134,
      averageRating: 4.9,
      facilities: ["Waiting Area", "Water", "Shelter", "First Aid"],
      isOnline: false,
      nextPickupTime: "45 min"
    },
    {
      id: "sahebganj_hub",
      name: "Sahibganj Rural Hub",
      district: "Sahibganj",
      coordinates: { lat: 25.25, lng: 87.62 },
      villages: ["Sahibganj", "Rajmahal", "Barhait", "Borio", "Taljhari"],
      activeDrivers: 10,
      totalRides: 267,
      averageRating: 4.5,
      facilities: ["Waiting Area", "Water", "Food", "Emergency Services"],
      isOnline: true,
      nextPickupTime: "20 min"
    },
    {
      id: "godda_hub",
      name: "Godda Rural Hub",
      district: "Godda",
      coordinates: { lat: 24.83, lng: 87.22 },
      villages: ["Godda", "Mahagama", "Pathargama", "Meharma", "Thakurgangti"],
      activeDrivers: 9,
      totalRides: 189,
      averageRating: 4.7,
      facilities: ["Waiting Area", "Water", "Shelter", "Mobile Charging"],
      isOnline: true,
      nextPickupTime: "30 min"
    }
  ]

  const handleHubClick = (hub: RuralHub) => {
    setSelectedHubState(hub.id)
    if (onHubSelect) {
      onHubSelect(hub)
    }
  }

  const getConnectivityStatus = (isOnline: boolean) => {
    return isOnline ? (
      <div className="flex items-center space-x-1 text-green-600">
        <Wifi className="w-4 h-4" />
        <span className="text-sm">Online</span>
      </div>
    ) : (
      <div className="flex items-center space-x-1 text-orange-600">
        <WifiOff className="w-4 h-4" />
        <span className="text-sm">Limited</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-green-600" />
            <span>Rural Hub System</span>
          </CardTitle>
          <CardDescription>
            Village pickup points and rural connectivity across Jharkhand
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">6</div>
              <div className="text-sm text-gray-600">Active Hubs</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">30+</div>
              <div className="text-sm text-gray-600">Villages Connected</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">60</div>
              <div className="text-sm text-gray-600">Rural Drivers</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rural Hubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ruralHubs.map((hub) => (
          <Card 
            key={hub.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedHubState === hub.id ? 'ring-2 ring-green-500' : ''
            }`}
            onClick={() => handleHubClick(hub)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{hub.name}</CardTitle>
                  <CardDescription>{hub.district} District</CardDescription>
                </div>
                {getConnectivityStatus(hub.isOnline)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Hub Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="font-semibold text-green-600">{hub.activeDrivers}</div>
                  <div className="text-xs text-gray-600">Drivers</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="font-semibold text-blue-600">{hub.totalRides}</div>
                  <div className="text-xs text-gray-600">Total Rides</div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{hub.averageRating}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Next: {hub.nextPickupTime}</span>
                </div>
              </div>

              {/* Villages */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Connected Villages:</div>
                <div className="flex flex-wrap gap-1">
                  {hub.villages.slice(0, 3).map((village) => (
                    <Badge key={village} variant="outline" className="text-xs">
                      {village}
                    </Badge>
                  ))}
                  {hub.villages.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{hub.villages.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Facilities */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">Facilities:</div>
                <div className="flex flex-wrap gap-1">
                  {hub.facilities.slice(0, 3).map((facility) => (
                    <Badge key={facility} variant="secondary" className="text-xs">
                      {facility}
                    </Badge>
                  ))}
                  {hub.facilities.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{hub.facilities.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                  <Navigation className="w-3 h-3 mr-1" />
                  Book Ride
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Section */}
      <Card>
        <CardHeader>
          <CardTitle>Rural Hub Features</CardTitle>
          <CardDescription>
            Special features designed for rural connectivity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <WifiOff className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Offline Booking</h3>
              <p className="text-sm text-gray-600">Book rides without internet connection</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Shared Rides</h3>
              <p className="text-sm text-gray-600">Cost-effective shared transportation</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Voice Booking</h3>
              <p className="text-sm text-gray-600">Book rides via phone call in local language</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Scheduled Rides</h3>
              <p className="text-sm text-gray-600">Book rides in advance for important trips</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}