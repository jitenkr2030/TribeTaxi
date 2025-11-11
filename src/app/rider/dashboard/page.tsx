"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User, 
  MapPin, 
  Clock, 
  Star, 
  Car, 
  Navigation,
  History,
  CreditCard,
  Settings,
  Bell,
  HelpCircle
} from "lucide-react"
import Link from "next/link"

export default function RiderDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const recentRides = [
    {
      id: 1,
      date: "2024-01-15",
      pickup: "Ranchi Station",
      drop: "Harmu Housing Colony",
      fare: 125,
      driver: "Rajesh Kumar",
      rating: 5,
      status: "completed"
    },
    {
      id: 2,
      date: "2024-01-14",
      pickup: "Morabadi",
      drop: "Kanke Road",
      fare: 85,
      driver: "Suresh Singh",
      rating: 4,
      status: "completed"
    },
    {
      id: 3,
      date: "2024-01-13",
      pickup: "Dhurwa",
      drop: "Ratu Road",
      fare: 95,
      driver: "Mukesh Yadav",
      rating: 5,
      status: "completed"
    }
  ]

  const stats = {
    totalRides: 47,
    totalSpent: 3850,
    favoriteDriver: "Rajesh Kumar",
    avgRating: 4.8
  }

  const quickActions = [
    { title: "Book Ride", icon: Navigation, href: "/rider/book-ride", color: "bg-green-600" },
    { title: "Ride History", icon: History, href: "/rider/ride-history", color: "bg-blue-600" },
    { title: "Payment", icon: CreditCard, href: "/rider/payment", color: "bg-purple-600" },
    { title: "Support", icon: HelpCircle, href: "/support", color: "bg-orange-600" }
  ]

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
                <User className="w-3 h-3 mr-1" />
                Rider Dashboard
              </Badge>
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <span className="font-medium">Amit Kumar</span>
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
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="text-lg">AK</AvatarFallback>
                </Avatar>
                <CardTitle>Amit Kumar</CardTitle>
                <CardDescription>amit.kumar@email.com</CardDescription>
                <Badge className="mt-2">Rider</Badge>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant={activeTab === "overview" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab("overview")}
                >
                  <User className="w-4 h-4 mr-2" />
                  Overview
                </Button>
                <Button 
                  variant={activeTab === "rides" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab("rides")}
                >
                  <Car className="w-4 h-4 mr-2" />
                  My Rides
                </Button>
                <Button 
                  variant={activeTab === "payment" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab("payment")}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payment
                </Button>
                <Button 
                  variant={activeTab === "settings" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Welcome Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Welcome back, Amit! 👋</CardTitle>
                <CardDescription>
                  Ready for your next ride across Jharkhand?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/rider/book-ride">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    <Navigation className="w-4 h-4 mr-2" />
                    Book Your Next Ride
                  </Button>
                </Link>
              </CardContent>
            </Card>

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
                  <div className="text-2xl font-bold text-green-600 mb-2">₹{stats.totalSpent}</div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">{stats.avgRating}</div>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-lg font-bold text-orange-600 mb-2 truncate">{stats.favoriteDriver}</div>
                  <p className="text-sm text-gray-600">Favorite Driver</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions.map((action) => (
                    <Link key={action.title} href={action.href}>
                      <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-6 text-center">
                          <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                            <action.icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-semibold text-sm">{action.title}</h3>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Rides */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Rides</span>
                  <Link href="/rider/ride-history" className="text-green-600 hover:underline text-sm">
                    View All
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRides.map((ride) => (
                    <div key={ride.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-sm">{ride.pickup}</span>
                          <span className="text-gray-400">→</span>
                          <span className="font-medium text-sm">{ride.drop}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{ride.date}</span>
                          <span>Driver: {ride.driver}</span>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-500 mr-1" />
                            <span>{ride.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">₹{ride.fare}</div>
                        <Badge variant="outline" className="text-xs">
                          {ride.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Jharkhand Cities */}
            <Card>
              <CardHeader>
                <CardTitle>Available in Jharkhand Cities</CardTitle>
                <CardDescription>
                  TribeTaxi is available in these cities across Jharkhand
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {["Ranchi", "Dhanbad", "Bokaro", "Deoghar", "Jamshedpur", "Hazaribagh", "Giridih", "Ramgarh", "Palamu", "Chatra"].map((city) => (
                    <div key={city} className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-sm">{city}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}