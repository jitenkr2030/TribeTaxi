"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Building, 
  Users, 
  TrendingUp, 
  Shield, 
  Phone, 
  Star,
  MapPin,
  Clock,
  Navigation,
  Calendar
} from "lucide-react"
import IndustrialZonePartnerships from "@/components/industrial/IndustrialZonePartnerships"
import Link from "next/link"

export default function IndustrialPage() {
  const [activeTab, setActiveTab] = useState("partnerships")

  const industrialStats = {
    partnerIndustries: 6,
    employeesCovered: 140000,
    industrialDrivers: 160,
    dailyRides: 9000,
    avgSatisfaction: 4.7
  }

  const successStories = [
    {
      company: "Tata Steel",
      location: "Jamshedpur",
      employees: 35000,
      savings: "32%",
      satisfaction: 4.8,
      quote: "TribeTaxi has transformed our employee transportation with reliable and cost-effective solutions."
    },
    {
      company: "SAIL Bokaro",
      location: "Bokaro",
      employees: 45000,
      savings: "28%",
      satisfaction: 4.7,
      quote: "The shift-wise scheduling and real-time tracking have improved our operational efficiency significantly."
    },
    {
      company: "BCCL",
      location: "Dhanbad",
      employees: 25000,
      savings: "25%",
      satisfaction: 4.6,
      quote: "Excellent service for our mining operations with enhanced safety measures."
    }
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
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                <Building className="w-3 h-3 mr-1" />
                Industrial Solutions
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
          <Badge className="mb-4 bg-blue-600 text-white">
            🏭 Industrial Transportation
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Corporate Transportation Solutions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Reliable, safe, and cost-effective transportation solutions for industries across Jharkhand. 
            Partner with us to streamline your workforce mobility.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{industrialStats.partnerIndustries}</div>
              <p className="text-sm text-gray-600">Partner Industries</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">{(industrialStats.employeesCovered/1000).toFixed(0)}K</div>
              <p className="text-sm text-gray-600">Employees Covered</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">{industrialStats.industrialDrivers}</div>
              <p className="text-sm text-gray-600">Industrial Drivers</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">{(industrialStats.dailyRides/1000).toFixed(0)}K</div>
              <p className="text-sm text-gray-600">Daily Rides</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">{industrialStats.avgSatisfaction}</div>
              <p className="text-sm text-gray-600">Avg Satisfaction</p>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Industrial Transportation Features</CardTitle>
            <CardDescription>
              Comprehensive solutions designed for industrial requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Shift Scheduling</h3>
                <p className="text-sm text-gray-600">24/7 shift-wise transportation</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Enhanced Safety</h3>
                <p className="text-sm text-gray-600">Comprehensive safety measures</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Cost Effective</h3>
                <p className="text-sm text-gray-600">Save up to 30% on costs</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Dedicated Support</h3>
                <p className="text-sm text-gray-600">24/7 account management</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Stories */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Success Stories</CardTitle>
            <CardDescription>
              Hear from our industrial partners
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {successStories.map((story, index) => (
                <Card key={index} className="bg-gray-50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{story.company}</h3>
                        <p className="text-sm text-gray-600">{story.location}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center">
                        <div className="font-semibold text-green-600">{story.employees.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Employees</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-blue-600">{story.savings}</div>
                        <div className="text-xs text-gray-600">Savings</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-purple-600">{story.satisfaction}</div>
                        <div className="text-xs text-gray-600">Rating</div>
                      </div>
                    </div>
                    
                    <blockquote className="text-sm text-gray-600 italic">
                      "{story.quote}"
                    </blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="partnerships">Partnerships</TabsTrigger>
            <TabsTrigger value="process">Onboarding Process</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
          </TabsList>

          <TabsContent value="partnerships" className="space-y-6">
            <IndustrialZonePartnerships />
          </TabsContent>

          <TabsContent value="process" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Corporate Onboarding Process</CardTitle>
                <CardDescription>
                  Simple 4-step process to get started with TribeTaxi corporate solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-600">1</span>
                    </div>
                    <h3 className="font-semibold mb-2">Consultation</h3>
                    <p className="text-sm text-gray-600">Discuss your requirements with our experts</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-green-600">2</span>
                    </div>
                    <h3 className="font-semibold mb-2">Customization</h3>
                    <p className="text-sm text-gray-600">Tailored solution for your specific needs</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-purple-600">3</span>
                    </div>
                    <h3 className="font-semibold mb-2">Implementation</h3>
                    <p className="text-sm text-gray-600">Quick setup and driver deployment</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-orange-600">4</span>
                    </div>
                    <h3 className="font-semibold mb-2">Go Live</h3>
                    <p className="text-sm text-gray-600">Start using our services with ongoing support</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Contact our corporate team for customized solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Call Us</h3>
                    <p className="text-sm text-gray-600">1800-CORPORATE</p>
                    <p className="text-xs text-gray-500">Mon-Fri, 9AM-6PM</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Visit Office</h3>
                    <p className="text-sm text-gray-600">Ranchi, Jharkhand</p>
                    <p className="text-xs text-gray-500">By appointment only</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Schedule Demo</h3>
                    <p className="text-sm text-gray-600">corporate@tribetaxi.in</p>
                    <p className="text-xs text-gray-500">Response within 24hrs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}