"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Building, 
  Users, 
  Clock, 
  Star, 
  Phone, 
  Navigation, 
  Calendar,
  TrendingUp,
  Shield,
  MapPin
} from "lucide-react"

interface IndustrialZone {
  id: string
  name: string
  company: string
  location: string
  coordinates: { lat: number; lng: number }
  employees: number
  activeDrivers: number
  totalRides: number
  averageRating: number
  shiftTimings: string[]
  facilities: string[]
  contactPerson: string
  contactPhone: string
  partnershipStatus: 'active' | 'pending' | 'proposed'
}

interface CorporatePackage {
  id: string
  name: string
  description: string
  features: string[]
  pricePerEmployee: number
  minEmployees: number
  popular: boolean
}

export default function IndustrialZonePartnerships() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null)

  const industrialZones: IndustrialZone[] = [
    {
      id: "tata_steel",
      name: "Tata Steel Jamshedpur",
      company: "Tata Steel",
      location: "Jamshedpur",
      coordinates: { lat: 22.8046, lng: 86.2029 },
      employees: 35000,
      activeDrivers: 45,
      totalRides: 2850,
      averageRating: 4.8,
      shiftTimings: ["06:00-14:00", "14:00-22:00", "22:00-06:00"],
      facilities: ["Dedicated Pickup Points", "Employee ID Verification", "Emergency Services", "Real-time Tracking"],
      contactPerson: "Rajiv Kumar",
      contactPhone: "+919876543210",
      partnershipStatus: 'active'
    },
    {
      id: "sail_bokaro",
      name: "SAIL Bokaro Steel Plant",
      company: "Steel Authority of India",
      location: "Bokaro",
      coordinates: { lat: 23.2912, lng: 86.1599 },
      employees: 45000,
      activeDrivers: 38,
      totalRides: 3200,
      averageRating: 4.7,
      shiftTimings: ["07:00-15:00", "15:00-23:00", "23:00-07:00"],
      facilities: ["Shift-wise Transportation", "Safety Measures", "GPS Tracking", "24/7 Support"],
      contactPerson: "Anita Singh",
      contactPhone: "+919876543211",
      partnershipStatus: 'active'
    },
    {
      id: "bccl_dhanbad",
      name: "BCCL Mining Operations",
      company: "Bharat Coking Coal Limited",
      location: "Dhanbad",
      coordinates: { lat: 23.7957, lng: 86.4304 },
      employees: 25000,
      activeDrivers: 32,
      totalRides: 1950,
      averageRating: 4.6,
      shiftTimings: ["06:00-14:00", "14:00-22:00", "22:00-06:00"],
      facilities: ["Mining Area Transport", "Safety Equipment", "Emergency Response", "First Aid"],
      contactPerson: "Mukesh Yadav",
      contactPhone: "+919876543212",
      partnershipStatus: 'active'
    },
    {
      id: "ncl_hazaribagh",
      name: "NCL Hazaribagh",
      company: "Northern Coalfields",
      location: "Hazaribagh",
      coordinates: { lat: 23.9895, lng: 85.3578 },
      employees: 15000,
      activeDrivers: 18,
      totalRides: 890,
      averageRating: 4.5,
      shiftTimings: ["07:00-15:00", "15:00-23:00"],
      facilities: ["Coal Field Transport", "Worker Safety", "Scheduled Rides", "Voice Support"],
      contactPerson: "Sunita Devi",
      contactPhone: "+919876543213",
      partnershipStatus: 'pending'
    },
    {
      id: "hcl_giridih",
      name: "HCL Giridih",
      company: "Hindustan Copper Limited",
      location: "Giridih",
      coordinates: { lat: 24.1833, lng: 86.3089 },
      employees: 8000,
      activeDrivers: 12,
      totalRides: 450,
      averageRating: 4.7,
      shiftTimings: ["08:00-16:00", "16:00-00:00"],
      facilities: ["Copper Mine Transport", "Safety Gear", "Medical Support", "Real-time Monitoring"],
      contactPerson: "Prakash Kumar",
      contactPhone: "+919876543214",
      partnershipStatus: 'proposed'
    },
    {
      id: "upcl_ramgarh",
      name: "UPCL Ramgarh",
      company: "Uttam Galva Steel",
      location: "Ramgarh",
      coordinates: { lat: 23.6319, lng: 85.5191 },
      employees: 12000,
      activeDrivers: 15,
      totalRides: 680,
      averageRating: 4.6,
      shiftTimings: ["07:00-15:00", "15:00-23:00"],
      facilities: ["Steel Plant Transport", "Employee Safety", "Scheduled Pickups", "Emergency Services"],
      contactPerson: "Ramesh Prasad",
      contactPhone: "+919876543215",
      partnershipStatus: 'pending'
    }
  ]

  const corporatePackages: CorporatePackage[] = [
    {
      id: "basic",
      name: "Basic Corporate",
      description: "Essential transportation for your workforce",
      features: [
        "Standard vehicles (Auto/Car)",
        "Shift-wise scheduling",
        "Basic safety measures",
        "Email support",
        "Monthly billing"
      ],
      pricePerEmployee: 299,
      minEmployees: 50,
      popular: false
    },
    {
      id: "standard",
      name: "Standard Corporate",
      description: "Enhanced transportation with additional features",
      features: [
        "Premium vehicles",
        "Dedicated drivers",
        "Real-time tracking",
        "24/7 support",
        "Emergency services",
        "Weekly billing"
      ],
      pricePerEmployee: 499,
      minEmployees: 100,
      popular: true
    },
    {
      id: "premium",
      name: "Premium Corporate",
      description: "Complete transportation solution for large enterprises",
      features: [
        "Luxury vehicles",
        "Dedicated fleet",
        "Advanced safety features",
        "Priority support",
        "Custom scheduling",
        "Analytics dashboard",
        "Daily billing"
      ],
      pricePerEmployee: 799,
      minEmployees: 500,
      popular: false
    }
  ]

  const getPartnershipBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-600">Active</Badge>
      case 'pending':
        return <Badge className="bg-yellow-600">Pending</Badge>
      case 'proposed':
        return <Badge className="bg-blue-600">Proposed</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="w-5 h-5 text-blue-600" />
            <span>Industrial Zone Partnerships</span>
          </CardTitle>
          <CardDescription>
            Corporate transportation solutions for industries across Jharkhand
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">6</div>
              <div className="text-sm text-gray-600">Partner Industries</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">140K+</div>
              <div className="text-sm text-gray-600">Employees Covered</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">160</div>
              <div className="text-sm text-gray-600">Industrial Drivers</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">9K+</div>
              <div className="text-sm text-gray-600">Daily Rides</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="zones" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="zones">Industrial Zones</TabsTrigger>
          <TabsTrigger value="packages">Corporate Packages</TabsTrigger>
        </TabsList>

        <TabsContent value="zones" className="space-y-6">
          {/* Industrial Zones Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {industrialZones.map((zone) => (
              <Card 
                key={zone.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedZone === zone.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedZone(zone.id === selectedZone ? null : zone.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{zone.name}</CardTitle>
                      <CardDescription>{zone.company} • {zone.location}</CardDescription>
                    </div>
                    {getPartnershipBadge(zone.partnershipStatus)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Zone Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-semibold text-blue-600">{zone.employees.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Employees</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-semibold text-green-600">{zone.activeDrivers}</div>
                      <div className="text-xs text-gray-600">Drivers</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-semibold text-purple-600">{zone.totalRides}</div>
                      <div className="text-xs text-gray-600">Rides</div>
                    </div>
                  </div>

                  {/* Rating and Contact */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{zone.averageRating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{zone.contactPerson}</span>
                    </div>
                  </div>

                  {/* Shift Timings */}
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Shift Timings:</div>
                    <div className="flex flex-wrap gap-1">
                      {zone.shiftTimings.map((shift) => (
                        <Badge key={shift} variant="outline" className="text-xs">
                          {shift}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Facilities */}
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Facilities:</div>
                    <div className="flex flex-wrap gap-1">
                      {zone.facilities.slice(0, 3).map((facility) => (
                        <Badge key={facility} variant="secondary" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                      {zone.facilities.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{zone.facilities.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Navigation className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="packages" className="space-y-6">
          {/* Corporate Packages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {corporatePackages.map((pkg) => (
              <Card key={pkg.id} className={`relative ${pkg.popular ? 'ring-2 ring-blue-500' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-blue-600">₹{pkg.pricePerEmployee}</span>
                    <span className="text-gray-600">/employee/month</span>
                  </div>
                  <p className="text-sm text-gray-500">Minimum {pkg.minEmployees} employees</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Features */}
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Features:</div>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className={`w-full ${pkg.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <Card>
            <CardHeader>
              <CardTitle>Why Choose TribeTaxi for Your Business?</CardTitle>
              <CardDescription>
                Benefits of partnering with TribeTaxi for corporate transportation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Cost Effective</h3>
                  <p className="text-sm text-gray-600">Save up to 30% on transportation costs</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Enhanced Safety</h3>
                  <p className="text-sm text-gray-600">Comprehensive safety measures and tracking</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Flexible Scheduling</h3>
                  <p className="text-sm text-gray-600">Customized shift timings and schedules</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Dedicated Support</h3>
                  <p className="text-sm text-gray-600">24/7 dedicated account management</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}