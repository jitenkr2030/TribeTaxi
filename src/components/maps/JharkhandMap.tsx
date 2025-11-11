"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Star, Users } from "lucide-react"

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

interface JharkhandCity {
  id: string
  name: string
  lat: number
  lng: number
  activeDrivers: number
  totalRides: number
  averageRating: number
  description: string
  landmarks: string[]
}

interface JharkhandMapProps {
  onCitySelect?: (city: JharkhandCity) => void
  selectedCity?: string
  height?: string
}

export default function JharkhandMap({ onCitySelect, selectedCity, height = "400px" }: JharkhandMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false)

  const jharkhandCities: JharkhandCity[] = [
    {
      id: "ranchi",
      name: "Ranchi",
      lat: 23.3441,
      lng: 85.3096,
      activeDrivers: 145,
      totalRides: 2156,
      averageRating: 4.7,
      description: "Capital city with highest ride volume",
      landmarks: ["Ranchi Station", "Harmu Housing Colony", "Morabadi", "Kanke Road"]
    },
    {
      id: "dhanbad",
      name: "Dhanbad",
      lat: 23.7957,
      lng: 86.4304,
      activeDrivers: 78,
      totalRides: 1234,
      averageRating: 4.6,
      description: "Coal city with growing demand",
      landmarks: ["Dhanbad Station", "Bank More", "Hirapur", "Jharia"]
    },
    {
      id: "bokaro",
      name: "Bokaro",
      lat: 23.2912,
      lng: 86.1599,
      activeDrivers: 65,
      totalRides: 987,
      averageRating: 4.8,
      description: "Steel city with industrial growth",
      landmarks: ["Bokaro Station", "Sector 4", "City Park", "Chas"]
    },
    {
      id: "deoghar",
      name: "Deoghar",
      lat: 24.4907,
      lng: 86.7000,
      activeDrivers: 42,
      totalRides: 756,
      averageRating: 4.9,
      description: "Religious city with temple tourism",
      landmarks: ["Baidyanath Temple", "Deoghar Station", "Tower Chowk", "Ravan Hill"]
    },
    {
      id: "jamshedpur",
      name: "Jamshedpur",
      lat: 22.8046,
      lng: 86.2029,
      activeDrivers: 12,
      totalRides: 556,
      averageRating: 4.5,
      description: "Industrial hub with corporate demand",
      landmarks: ["Jamshedpur Station", "Sakchi", "Bistupur", "Telco"]
    },
    // Phase 1 Expansion Cities
    {
      id: "hazaribagh",
      name: "Hazaribagh",
      lat: 23.9895,
      lng: 85.3578,
      activeDrivers: 35,
      totalRides: 432,
      averageRating: 4.6,
      description: "Educational hub with growing transportation needs",
      landmarks: ["Hazaribagh Station", "Vinoba Bhave University", "Barhi", "Charhi"]
    },
    {
      id: "giridih",
      name: "Giridih",
      lat: 24.1833,
      lng: 86.3089,
      activeDrivers: 28,
      totalRides: 298,
      averageRating: 4.7,
      description: "Industrial area with worker transportation demand",
      landmarks: ["Giridih Station", "Parasnath Hills", "Jamua", "Gawan"]
    },
    {
      id: "ramgarh",
      name: "Ramgarh",
      lat: 23.6319,
      lng: 85.5191,
      activeDrivers: 32,
      totalRides: 367,
      averageRating: 4.5,
      description: "Mining region with daily commuter needs",
      landmarks: ["Ramgarh Station", "Patratu", "Barkakana", "Ghato"]
    },
    {
      id: "palamu",
      name: "Palamu",
      lat: 24.0208,
      lng: 84.0748,
      activeDrivers: 18,
      totalRides: 156,
      averageRating: 4.8,
      description: "Rural connectivity improvement hub",
      landmarks: ["Daltonganj", "Medininagar", "Betla National Park", "Latehar"]
    },
    {
      id: "chatra",
      name: "Chatra",
      lat: 24.2088,
      lng: 84.8717,
      activeDrivers: 15,
      totalRides: 134,
      averageRating: 4.6,
      description: "Religious tourism transportation center",
      landmarks: ["Chatra Station", "Kunda Cave", "Bhadrauli", "Itkhori"]
    }
  ]

  useEffect(() => {
    // Dynamically load Leaflet CSS
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    document.head.appendChild(link)

    setMapLoaded(true)
  }, [])

  const handleCityClick = (city: JharkhandCity) => {
    if (onCitySelect) {
      onCitySelect(city)
    }
  }

  if (!mapLoaded) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center" style={{ height }}>
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading Jharkhand Map...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-green-600" />
          <span>TribeTaxi in Jharkhand</span>
        </CardTitle>
        <CardDescription>
          Available cities across Jharkhand with real-time driver availability
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Map Container */}
          <div style={{ height, borderRadius: "8px", overflow: "hidden" }}>
            <MapContainer
              center={[23.3441, 85.3096]} // Center of Jharkhand (Ranchi)
              zoom={8}
              style={{ height: "100%", width: "100%" }}
              className="rounded-lg"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {jharkhandCities.map((city) => (
                <Marker
                  key={city.id}
                  position={[city.lat, city.lng]}
                  eventHandlers={{
                    click: () => handleCityClick(city),
                  }}
                >
                  <Popup>
                    <div className="p-2 min-w-[200px]">
                      <h3 className="font-semibold text-lg mb-2">{city.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{city.description}</p>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span>Active Drivers:</span>
                          <Badge variant="outline" className="text-green-600">
                            {city.activeDrivers}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Total Rides:</span>
                          <span className="font-medium">{city.totalRides}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Rating:</span>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                            <span>{city.averageRating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleCityClick(city)}
                      >
                        Book Ride in {city.name}
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* City Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jharkhandCities.map((city) => (
              <Card 
                key={city.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedCity === city.id ? 'ring-2 ring-green-500' : ''
                }`}
                onClick={() => handleCityClick(city)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{city.name}</h3>
                      <p className="text-sm text-gray-600">{city.description}</p>
                    </div>
                    <Badge variant={city.activeDrivers > 50 ? "default" : "secondary"}>
                      {city.activeDrivers > 50 ? "High" : "Medium"} Demand
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Active Drivers:</span>
                      <span className="font-medium text-green-600">{city.activeDrivers}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Rides:</span>
                      <span className="font-medium">{city.totalRides.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                        <span>{city.averageRating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    <strong>Popular Areas:</strong> {city.landmarks.slice(0, 2).join(", ")}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Jharkhand Info */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-1">Jharkhand Coverage</h4>
                <p className="text-sm text-green-700">
                  TribeTaxi is available across 10 major cities in Jharkhand, serving both urban and rural areas. 
                  Our zero-commission model ensures drivers keep 100% of their earnings while providing 
                  affordable, reliable transportation to millions of Jharkhand residents.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    10 Cities
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    500+ Drivers
                  </Badge>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    50K+ Rides
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}