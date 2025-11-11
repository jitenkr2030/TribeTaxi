"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Shield, 
  Phone, 
  Users, 
  Heart, 
  MapPin, 
  Star,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Eye,
  Navigation
} from "lucide-react"
import SafetyFeatures from "@/components/safety/SafetyFeatures"
import Link from "next/link"

export default function SafetyPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const safetyStats = {
    totalFeatures: 12,
    emergencyContacts: 5,
    womenSafetyFeatures: 6,
    tribalSafetyFeatures: 4,
    avgResponseTime: "3 min",
    safetyRating: 4.8
  }

  const safetyInitiatives = [
    {
      title: "Women Safety Program",
      description: "Comprehensive safety program designed specifically for women passengers",
      icon: <Heart className="w-8 h-8 text-pink-600" />,
      stats: "6 Features",
      color: "pink"
    },
    {
      title: "Tribal Area Safety",
      description: "Enhanced safety measures for remote tribal regions",
      icon: <Users className="w-8 h-8 text-green-600" />,
      stats: "4 Features",
      color: "green"
    },
    {
      title: "Emergency Response",
      description: "Quick emergency response system with 24/7 support",
      icon: <AlertTriangle className="w-8 h-8 text-red-600" />,
      stats: "3 min Response",
      color: "red"
    },
    {
      title: "Driver Training",
      description: "Regular safety training and verification for all drivers",
      icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
      stats: "100% Verified",
      color: "blue"
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
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Shield className="w-3 h-3 mr-1" />
                Safety Center
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
            🛡️ Safety First
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Safety is Our Priority
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive safety measures designed to protect every passenger across Jharkhand. 
            From verified drivers to emergency response, we've got you covered.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">{safetyStats.totalFeatures}</div>
              <p className="text-sm text-gray-600">Safety Features</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{safetyStats.emergencyContacts}</div>
              <p className="text-sm text-gray-600">Emergency Contacts</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-pink-600 mb-2">{safetyStats.womenSafetyFeatures}</div>
              <p className="text-sm text-gray-600">Women Safety</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">{safetyStats.tribalSafetyFeatures}</div>
              <p className="text-sm text-gray-600">Tribal Safety</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">{safetyStats.avgResponseTime}</div>
              <p className="text-sm text-gray-600">Avg Response</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">{safetyStats.safetyRating}</div>
              <p className="text-sm text-gray-600">Safety Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Safety Initiatives */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Safety Initiatives</CardTitle>
            <CardDescription>
              Our comprehensive safety programs designed for different needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {safetyInitiatives.map((initiative, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      {initiative.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{initiative.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{initiative.description}</p>
                    <Badge variant="outline" className={`text-${initiative.color}-600 border-${initiative.color}-600`}>
                      {initiative.stats}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Safety Features</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Safety Commitment */}
            <Card>
              <CardHeader>
                <CardTitle>Our Safety Commitment</CardTitle>
                <CardDescription>
                  How we ensure your safety across every ride
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Prevention</h3>
                    <p className="text-sm text-gray-600">
                      Verified drivers, background checks, and safety training to prevent incidents
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Monitoring</h3>
                    <p className="text-sm text-gray-600">
                      Real-time tracking, ride monitoring, and automated safety checks
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Response</h3>
                    <p className="text-sm text-gray-600">
                      Quick emergency response, SOS button, and 24/7 support team
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety by Numbers */}
            <Card>
              <CardHeader>
                <CardTitle>Safety by Numbers</CardTitle>
                <CardDescription>
                  Our safety performance and impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                    <p className="text-sm text-gray-600">Driver Verification</p>
                    <p className="text-xs text-gray-500">Background & License</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                    <p className="text-sm text-gray-600">Support Available</p>
                    <p className="text-xs text-gray-500">Emergency Response</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
                    <p className="text-sm text-gray-600">Safe Rides Daily</p>
                    <p className="text-xs text-gray-500">Across Jharkhand</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">4.9/5</div>
                    <p className="text-sm text-gray-600">Safety Rating</p>
                    <p className="text-xs text-gray-500">Customer Satisfaction</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <SafetyFeatures />
          </TabsContent>

          <TabsContent value="emergency" className="space-y-6">
            {/* Emergency Response */}
            <Card>
              <CardHeader>
                <CardTitle>Emergency Response System</CardTitle>
                <CardDescription>
                  Quick and effective emergency response when you need it most
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-red-600">Emergency Features:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>One-touch SOS button in the app</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Automatic location sharing with emergency contacts</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Direct connection to emergency services</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Real-time tracking of emergency response</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-blue-600">Response Time:</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Urban Areas:</span>
                        <Badge className="bg-green-600 text-white">3-5 minutes</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Semi-Urban:</span>
                        <Badge className="bg-yellow-600 text-white">5-8 minutes</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Rural Areas:</span>
                        <Badge className="bg-orange-600 text-white">8-12 minutes</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Tribal Areas:</span>
                        <Badge className="bg-red-600 text-white">12-15 minutes</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
                <CardDescription>
                  Save these numbers for quick access during emergencies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold">Police</h3>
                      </div>
                      <div className="text-2xl font-bold text-red-600">100</div>
                      <Button size="sm" className="w-full mt-2 bg-red-600 hover:bg-red-700">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-pink-500">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Heart className="w-5 h-5 text-pink-600" />
                        <h3 className="font-semibold">Women Helpline</h3>
                      </div>
                      <div className="text-2xl font-bold text-red-600">1091</div>
                      <Button size="sm" className="w-full mt-2 bg-red-600 hover:bg-red-700">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Heart className="w-5 h-5 text-red-600" />
                        <h3 className="font-semibold">Ambulance</h3>
                      </div>
                      <div className="text-2xl font-bold text-red-600">108</div>
                      <Button size="sm" className="w-full mt-2 bg-red-600 hover:bg-red-700">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            {/* Driver Training */}
            <Card>
              <CardHeader>
                <CardTitle>Driver Safety Training</CardTitle>
                <CardDescription>
                  Comprehensive training program for all TribeTaxi drivers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-600">Training Modules:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Defensive driving techniques</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Passenger safety protocols</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Emergency response procedures</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Women safety sensitization</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Tribal area navigation</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>First aid and medical response</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-blue-600">Certification Process:</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">1</span>
                        </div>
                        <span className="text-sm">Background verification</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">2</span>
                        </div>
                        <span className="text-sm">License validation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">3</span>
                        </div>
                        <span className="text-sm">Safety training completion</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">4</span>
                        </div>
                        <span className="text-sm">Practical assessment</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">5</span>
                        </div>
                        <span className="text-sm">Final certification</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Training Impact */}
            <Card>
              <CardHeader>
                <CardTitle>Training Impact</CardTitle>
                <CardDescription>
                  How our training program improves safety
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                    <p className="text-sm text-gray-600">Incident Reduction</p>
                    <p className="text-xs text-gray-500">After training</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                    <p className="text-sm text-gray-600">Driver Compliance</p>
                    <p className="text-xs text-gray-500">With safety protocols</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5</div>
                    <p className="text-sm text-gray-600">Passenger Confidence</p>
                    <p className="text-xs text-gray-500">In driver safety</p>
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