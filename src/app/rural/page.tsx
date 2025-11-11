"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, WifiOff, Users, Navigation, Phone, Star, Shield } from "lucide-react"
import RuralHubSystem from "@/components/rural/RuralHubSystem"
import OfflineBooking from "@/components/rural/OfflineBooking"
import Link from "next/link"

export default function RuralPage() {
  const [activeTab, setActiveTab] = useState("hubs")

  const ruralStats = {
    totalHubs: 6,
    villagesConnected: 32,
    ruralDrivers: 60,
    offlineBookings: 1245,
    avgResponseTime: "15 min"
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
                Rural Services
              </Badge>
              <Link href="/rider/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-600 text-white">
            🌾 Rural Connectivity Initiative
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            TribeTaxi Rural Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting villages to cities with our rural hub system and offline booking capabilities. 
            Bringing reliable transportation to every corner of Jharkhand.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">{ruralStats.totalHubs}</div>
              <p className="text-sm text-gray-600">Rural Hubs</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{ruralStats.villagesConnected}</div>
              <p className="text-sm text-gray-600">Villages</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">{ruralStats.ruralDrivers}</div>
              <p className="text-sm text-gray-600">Rural Drivers</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">{ruralStats.offlineBookings}</div>
              <p className="text-sm text-gray-600">Offline Bookings</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">{ruralStats.avgResponseTime}</div>
              <p className="text-sm text-gray-600">Avg Response</p>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Rural Connectivity Features</CardTitle>
            <CardDescription>
              Special features designed for rural and remote areas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <WifiOff className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Offline Booking</h3>
                <p className="text-sm text-gray-600">Book rides without internet connection</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Village Hubs</h3>
                <p className="text-sm text-gray-600">Designated pickup points in villages</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Voice Support</h3>
                <p className="text-sm text-gray-600">Book via call in local languages</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Safety First</h3>
                <p className="text-sm text-gray-600">Enhanced safety for rural areas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hubs" className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Rural Hubs</span>
            </TabsTrigger>
            <TabsTrigger value="booking" className="flex items-center space-x-2">
              <WifiOff className="w-4 h-4" />
              <span>Offline Booking</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hubs" className="space-y-6">
            <RuralHubSystem />
          </TabsContent>

          <TabsContent value="booking" className="space-y-6">
            <OfflineBooking />
          </TabsContent>
        </Tabs>

        {/* Contact Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              Contact our rural support team for assistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-sm text-gray-600">1800-TRIBETAXI</p>
                <p className="text-xs text-gray-500">24/7 Support Available</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Visit Hub</h3>
                <p className="text-sm text-gray-600">Nearest Rural Hub</p>
                <p className="text-xs text-gray-500">Find your nearest hub</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Feedback</h3>
                <p className="text-sm text-gray-600">Share Your Experience</p>
                <p className="text-xs text-gray-500">Help us improve</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}