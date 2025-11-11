"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Users, 
  Car, 
  Navigation, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Star,
  Clock,
  MapPin,
  Phone,
  Settings,
  BarChart3,
  Activity,
  AlertTriangle,
  CheckCircle
} from "lucide-react"
import Link from "next/link"

interface AdminStats {
  totalUsers: number
  totalDrivers: number
  totalRides: number
  totalRevenue: number
  activeRides: number
  onlineDrivers: number
  averageRating: number
  todayRevenue: number
}

interface RecentActivity {
  id: string
  type: 'ride' | 'user' | 'driver' | 'payment'
  action: string
  description: string
  timestamp: string
  status: 'success' | 'pending' | 'failed'
}

interface SystemAlert {
  id: string
  type: 'info' | 'warning' | 'error'
  title: string
  message: string
  timestamp: string
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 1247,
    totalDrivers: 342,
    totalRides: 5689,
    totalRevenue: 485600,
    activeRides: 23,
    onlineDrivers: 89,
    averageRating: 4.7,
    todayRevenue: 12500
  })

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'ride',
      action: 'Ride Completed',
      description: 'Ride #RIDE1234 completed - ₹125',
      timestamp: '2 minutes ago',
      status: 'success'
    },
    {
      id: '2',
      type: 'user',
      action: 'New Registration',
      description: 'New rider registered from Ranchi',
      timestamp: '5 minutes ago',
      status: 'success'
    },
    {
      id: '3',
      type: 'driver',
      action: 'Driver Online',
      description: 'Driver Rajesh Kumar went online',
      timestamp: '8 minutes ago',
      status: 'success'
    },
    {
      id: '4',
      type: 'payment',
      action: 'Payment Failed',
      description: 'Payment failed for ride #RIDE1235',
      timestamp: '12 minutes ago',
      status: 'failed'
    },
    {
      id: '5',
      type: 'ride',
      action: 'Ride Cancelled',
      description: 'Ride #RIDE1236 cancelled by rider',
      timestamp: '15 minutes ago',
      status: 'pending'
    }
  ])

  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([
    {
      id: '1',
      type: 'info',
      title: 'Server Performance',
      message: 'All systems running normally',
      timestamp: '1 minute ago'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Low Driver Availability',
      message: 'Only 15 drivers online in Dhanbad',
      timestamp: '10 minutes ago'
    },
    {
      id: '3',
      type: 'error',
      title: 'Payment Gateway Issue',
      message: 'Razorpay experiencing delays',
      timestamp: '25 minutes ago'
    }
  ])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'ride': return Navigation
      case 'user': return Users
      case 'driver': return Car
      case 'payment': return DollarSign
      default: return Activity
    }
  }

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'failed': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'error': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'info': return CheckCircle
      case 'warning': return AlertTriangle
      case 'error': return AlertTriangle
      default: return Activity
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TT</span>
                </div>
                <span className="text-xl font-bold text-gray-900">TribeTaxi Admin</span>
              </Link>
              
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/admin/dashboard" className="text-purple-600 font-medium">Dashboard</Link>
                <Link href="/admin/users" className="text-gray-600 hover:text-gray-900">Users</Link>
                <Link href="/admin/rides" className="text-gray-600 hover:text-gray-900">Rides</Link>
                <Link href="/admin/analytics" className="text-gray-600 hover:text-gray-900">Analytics</Link>
                <Link href="/admin/settings" className="text-gray-600 hover:text-gray-900">Settings</Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-purple-600 border-purple-600">
                <Settings className="w-3 h-3 mr-1" />
                Admin
              </Badge>
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-admin.jpg" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <span className="font-medium">Admin User</span>
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
                  <AvatarImage src="/placeholder-admin.jpg" />
                  <AvatarFallback className="text-lg">AD</AvatarFallback>
                </Avatar>
                <CardTitle>Admin Panel</CardTitle>
                <CardDescription>TribeTaxi Management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/admin/dashboard">
                  <Button variant="default" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/admin/users">
                  <Button variant="ghost" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Users
                  </Button>
                </Link>
                <Link href="/admin/rides">
                  <Button variant="ghost" className="w-full justify-start">
                    <Navigation className="w-4 h-4 mr-2" />
                    Rides
                  </Button>
                </Link>
                <Link href="/admin/analytics">
                  <Button variant="ghost" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Analytics
                  </Button>
                </Link>
                <Link href="/admin/settings">
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Welcome Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
                <CardDescription>
                  Welcome back! Here's what's happening with TribeTaxi today.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.totalUsers.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">+12% from last week</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Drivers</p>
                      <p className="text-2xl font-bold text-green-600">{stats.onlineDrivers}</p>
                      <p className="text-xs text-gray-500">of {stats.totalDrivers} total</p>
                    </div>
                    <Car className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Today's Rides</p>
                      <p className="text-2xl font-bold text-purple-600">{stats.activeRides}</p>
                      <p className="text-xs text-gray-500">currently active</p>
                    </div>
                    <Navigation className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Today's Revenue</p>
                      <p className="text-2xl font-bold text-orange-600">₹{stats.todayRevenue.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">+8% from yesterday</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <span>System Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemAlerts.map((alert) => {
                    const AlertIcon = getAlertIcon(alert.type)
                    return (
                      <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                        <div className="flex items-start space-x-3">
                          <AlertIcon className="w-5 h-5 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{alert.title}</h4>
                            <p className="text-xs opacity-90">{alert.message}</p>
                            <p className="text-xs opacity-75 mt-1">{alert.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    <span>Recent Activity</span>
                  </span>
                  <Button variant="outline" size="sm">View All</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity) => {
                    const Icon = getActivityIcon(activity.type)
                    return (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.status)}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{activity.action}</h4>
                          <p className="text-xs text-gray-600">{activity.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{activity.timestamp}</p>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${activity.status === 'success' ? 'border-green-600 text-green-600' : activity.status === 'failed' ? 'border-red-600 text-red-600' : 'border-yellow-600 text-yellow-600'}`}
                          >
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/admin/users">
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-6 text-center">
                        <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-sm">Manage Users</h3>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link href="/admin/rides">
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-6 text-center">
                        <Navigation className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-sm">Monitor Rides</h3>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link href="/admin/analytics">
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-6 text-center">
                        <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-sm">View Analytics</h3>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link href="/admin/settings">
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-6 text-center">
                        <Settings className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                        <h3 className="font-semibold text-sm">System Settings</h3>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Performance Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-sm mb-2">User Growth</h4>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">+12% this week</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">1,247 total users</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2">Revenue Growth</h4>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">+8% today</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">₹12,500 today</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2">Driver Rating</h4>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-yellow-600">4.7 average</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">342 active drivers</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2">Ride Completion</h4>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">94% success rate</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">5,689 total rides</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}