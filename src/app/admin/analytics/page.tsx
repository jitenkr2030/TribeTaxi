"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Car, 
  Navigation, 
  DollarSign,
  Star,
  Clock,
  MapPin,
  Calendar,
  Download
} from "lucide-react"
import Link from "next/link"

interface AnalyticsData {
  totalRevenue: number
  totalRides: number
  totalUsers: number
  totalDrivers: number
  averageRating: number
  completionRate: number
  revenueGrowth: number
  userGrowth: number
}

interface CityData {
  name: string
  rides: number
  revenue: number
  users: number
  drivers: number
}

interface TimeSeriesData {
  date: string
  rides: number
  revenue: number
  users: number
}

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalRevenue: 485600,
    totalRides: 5689,
    totalUsers: 1247,
    totalDrivers: 342,
    averageRating: 4.7,
    completionRate: 94,
    revenueGrowth: 12,
    userGrowth: 15
  })

  const [cityData, setCityData] = useState<CityData[]>([
    { name: "Ranchi", rides: 2156, revenue: 189200, users: 523, drivers: 145 },
    { name: "Dhanbad", rides: 1234, revenue: 108500, users: 312, drivers: 78 },
    { name: "Bokaro", rides: 987, revenue: 86700, users: 234, drivers: 65 },
    { name: "Deoghar", rides: 756, revenue: 66400, users: 145, drivers: 42 },
    { name: "Jamshedpur", rides: 556, revenue: 34800, users: 33, drivers: 12 }
  ])

  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([
    { date: "2024-01-01", rides: 45, revenue: 3825, users: 12 },
    { date: "2024-01-02", rides: 52, revenue: 4420, users: 15 },
    { date: "2024-01-03", rides: 48, revenue: 4080, users: 18 },
    { date: "2024-01-04", rides: 61, revenue: 5185, users: 21 },
    { date: "2024-01-05", rides: 58, revenue: 4930, users: 24 },
    { date: "2024-01-06", rides: 67, revenue: 5695, users: 28 },
    { date: "2024-01-07", rides: 72, revenue: 6120, users: 32 }
  ])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num)
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
                <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
                <Link href="/admin/users" className="text-gray-600 hover:text-gray-900">Users</Link>
                <Link href="/admin/rides" className="text-gray-600 hover:text-gray-900">Rides</Link>
                <Link href="/admin/analytics" className="text-purple-600 font-medium">Analytics</Link>
                <Link href="/admin/settings" className="text-gray-600 hover:text-gray-900">Settings</Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-purple-600 border-purple-600">
                <BarChart3 className="w-3 h-3 mr-1" />
                Analytics
              </Badge>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-bold text-sm">AD</span>
                </div>
                <span className="font-medium">Admin User</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Comprehensive insights into TribeTaxi's performance</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+{analytics.revenueGrowth}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics.totalRevenue)}</p>
                <p className="text-xs text-gray-500">All time</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Navigation className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+8%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Rides</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.totalRides)}</p>
                <p className="text-xs text-gray-500">+{Math.floor(analytics.totalRides * 0.08)} this month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+{analytics.userGrowth}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.totalUsers)}</p>
                <p className="text-xs text-gray-500">+{Math.floor(analytics.totalUsers * 0.15)} this month</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+2%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.averageRating}/5.0</p>
                <p className="text-xs text-gray-500">{analytics.completionRate}% completion rate</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <span>Revenue Trend</span>
              </CardTitle>
              <CardDescription>Daily revenue for the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Revenue Chart</p>
                  <p className="text-sm text-gray-500">Interactive chart showing daily revenue trends</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rides Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Navigation className="w-5 h-5 text-green-600" />
                <span>Rides Trend</span>
              </CardTitle>
              <CardDescription>Daily ride completions for the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Rides Chart</p>
                  <p className="text-sm text-gray-500">Interactive chart showing daily ride trends</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* City Performance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              <span>City Performance</span>
            </CardTitle>
            <CardDescription>Performance metrics across all Jharkhand cities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">City</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Rides</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Users</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Drivers</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Avg. Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {cityData.map((city, index) => (
                    <tr key={city.name} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-3 px-4 font-medium">{city.name}</td>
                      <td className="py-3 px-4">{formatNumber(city.rides)}</td>
                      <td className="py-3 px-4">{formatCurrency(city.revenue)}</td>
                      <td className="py-3 px-4">{formatNumber(city.users)}</td>
                      <td className="py-3 px-4">{formatNumber(city.drivers)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>4.{Math.floor(Math.random() * 3) + 5}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Time Series Data */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <span>Daily Breakdown</span>
            </CardTitle>
            <CardDescription>Detailed metrics for each day in the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Rides</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">New Users</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {timeSeriesData.map((day, index) => (
                    <tr key={day.date} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-3 px-4 font-medium">{new Date(day.date).toLocaleDateString()}</td>
                      <td className="py-3 px-4">{formatNumber(day.rides)}</td>
                      <td className="py-3 px-4">{formatCurrency(day.revenue)}</td>
                      <td className="py-3 px-4">{formatNumber(day.users)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">+{Math.floor(Math.random() * 20) + 5}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}