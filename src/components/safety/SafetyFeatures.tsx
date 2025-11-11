"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Shield, 
  Phone, 
  MapPin, 
  Users, 
  Star, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Navigation,
  UserCheck,
  Eye,
  Lock,
  Heart,
  Zap
} from "lucide-react"

interface SafetyFeature {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category: 'general' | 'women' | 'tribal' | 'emergency'
  isActive: boolean
}

interface EmergencyContact {
  id: string
  name: string
  number: string
  type: 'police' | 'hospital' | 'support' | 'women'
  available24x7: boolean
}

interface SafetyTip {
  id: string
  title: string
  description: string
  category: 'general' | 'women' | 'tribal'
  icon: React.ReactNode
}

export default function SafetyFeatures() {
  const [activeTab, setActiveTab] = useState("features")

  const safetyFeatures: SafetyFeature[] = [
    {
      id: "verified_drivers",
      title: "Verified Drivers",
      description: "All drivers undergo background verification and license checks",
      icon: <UserCheck className="w-6 h-6" />,
      category: "general",
      isActive: true
    },
    {
      id: "real_time_tracking",
      title: "Real-time Tracking",
      description: "Live GPS tracking of all rides with location sharing",
      icon: <MapPin className="w-6 h-6" />,
      category: "general",
      isActive: true
    },
    {
      id: "sos_button",
      title: "SOS Emergency Button",
      description: "One-touch emergency button for immediate assistance",
      icon: <AlertTriangle className="w-6 h-6" />,
      category: "general",
      isActive: true
    },
    {
      id: "ride_sharing",
      title: "Ride Details Sharing",
      description: "Automatically share ride details with emergency contacts",
      icon: <Navigation className="w-6 h-6" />,
      category: "general",
      isActive: true
    },
    {
      id: "women_only_option",
      title: "Women-Only Driver Option",
      description: "Option to request women drivers for enhanced safety",
      icon: <Users className="w-6 h-6" />,
      category: "women",
      isActive: true
    },
    {
      id: "safety_rating",
      title: "Women Safety Rating",
      description: "Special safety rating system for women passengers",
      icon: <Star className="w-6 h-6" />,
      category: "women",
      isActive: true
    },
    {
      id: "tribal_area_safety",
      title: "Tribal Area Safety",
      description: "Enhanced safety features for remote tribal areas",
      icon: <Shield className="w-6 h-6" />,
      category: "tribal",
      isActive: true
    },
    {
      id: "local_language_support",
      title: "Local Language Support",
      description: "Emergency support in tribal languages",
      icon: <Phone className="w-6 h-6" />,
      category: "tribal",
      isActive: true
    },
    {
      id: "emergency_response",
      title: "Quick Emergency Response",
      description: "Integrated emergency services for immediate assistance",
      icon: <Zap className="w-6 h-6" />,
      category: "emergency",
      isActive: true
    },
    {
      id: "safety_training",
      title: "Driver Safety Training",
      description: "Regular safety training for all drivers",
      icon: <CheckCircle className="w-6 h-6" />,
      category: "emergency",
      isActive: true
    }
  ]

  const emergencyContacts: EmergencyContact[] = [
    {
      id: "police_100",
      name: "Police Emergency",
      number: "100",
      type: "police",
      available24x7: true
    },
    {
      id: "women_helpline",
      name: "Women Helpline",
      number: "1091",
      type: "women",
      available24x7: true
    },
    {
      id: "ambulance_108",
      name: "Ambulance",
      number: "108",
      type: "hospital",
      available24x7: true
    },
    {
      id: "tribes_support",
      name: "Tribal Support",
      number: "1800-TRIBES",
      type: "support",
      available24x7: true
    },
    {
      id: "tribetaxi_support",
      name: "TribeTaxi Support",
      number: "1800-TRIBETAXI",
      type: "support",
      available24x7: true
    }
  ]

  const safetyTips: SafetyTip[] = [
    {
      id: "verify_driver",
      title: "Verify Your Driver",
      description: "Always check driver's photo, name, and vehicle details before starting the ride",
      category: "general",
      icon: <Eye className="w-5 h-5" />
    },
    {
      id: "share_ride_details",
      title: "Share Ride Details",
      description: "Share your ride details with family or friends for added safety",
      category: "general",
      icon: <Navigation className="w-5 h-5" />
    },
    {
      id: "use_sos",
      title: "Use SOS Button",
      description: "Don't hesitate to use the SOS button in case of emergency",
      category: "general",
      icon: <AlertTriangle className="w-5 h-5" />
    },
    {
      id: "women_safety",
      title: "Women Safety Tips",
      description: "Choose women-only drivers when available and share live location",
      category: "women",
      icon: <Heart className="w-5 h-5" />
    },
    {
      id: "trust_instincts",
      title: "Trust Your Instincts",
      description: "If something feels wrong, don't hesitate to cancel the ride",
      category: "women",
      icon: <Lock className="w-5 h-5" />
    },
    {
      id: "tribal_areas",
      title: "Tribal Area Safety",
      description: "In remote areas, keep emergency contacts handy and inform locals",
      category: "tribal",
      icon: <MapPin className="w-5 h-5" />
    }
  ]

  const getFeatureIcon = (category: string) => {
    switch (category) {
      case 'general':
        return <Shield className="w-5 h-5 text-blue-600" />
      case 'women':
        return <Heart className="w-5 h-5 text-pink-600" />
      case 'tribal':
        return <Users className="w-5 h-5 text-green-600" />
      case 'emergency':
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      default:
        return <Shield className="w-5 h-5 text-gray-600" />
    }
  }

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'police':
        return <Shield className="w-5 h-5 text-blue-600" />
      case 'hospital':
        return <Heart className="w-5 h-5 text-red-600" />
      case 'women':
        return <Users className="w-5 h-5 text-pink-600" />
      case 'support':
        return <Phone className="w-5 h-5 text-green-600" />
      default:
        return <Phone className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span>Safety Features</span>
          </CardTitle>
          <CardDescription>
            Comprehensive safety measures to ensure secure travel across Jharkhand
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">10+</div>
              <div className="text-sm text-gray-600">Safety Features</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">24/7</div>
              <div className="text-sm text-gray-600">Support Available</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">100%</div>
              <div className="text-sm text-gray-600">Verified Drivers</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600 mb-1">5</div>
              <div className="text-sm text-gray-600">Emergency Contacts</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="features">Safety Features</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
          <TabsTrigger value="tips">Safety Tips</TabsTrigger>
          <TabsTrigger value="women">Women Safety</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-6">
          {/* Safety Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyFeatures.map((feature) => (
              <Card key={feature.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        {getFeatureIcon(feature.category)}
                        <Badge variant="outline" className="text-xs">
                          {feature.category}
                        </Badge>
                        {feature.isActive && (
                          <Badge className="bg-green-600 text-white text-xs">
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-6">
          {/* Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
              <CardDescription>
                Quick access to emergency services across Jharkhand
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {emergencyContacts.map((contact) => (
                  <Card key={contact.id} className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {getContactIcon(contact.type)}
                          <h3 className="font-semibold">{contact.name}</h3>
                        </div>
                        {contact.available24x7 && (
                          <Badge className="bg-green-600 text-white text-xs">24/7</Badge>
                        )}
                      </div>
                      <div className="text-2xl font-bold text-red-600 mb-2">{contact.number}</div>
                      <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Instructions</CardTitle>
              <CardDescription>
                What to do in case of emergency during your ride
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-red-600">During Emergency:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Press SOS button in the app immediately</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Call emergency contacts from the list above</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Share your location with emergency contacts</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Stay calm and follow operator instructions</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-blue-600">After Emergency:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Report the incident to TribeTaxi support</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Provide feedback about the emergency response</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Follow up with medical attention if needed</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Help us improve our safety measures</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          {/* Safety Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {safetyTips.map((tip) => (
              <Card key={tip.id}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      {tip.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {tip.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* General Safety Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle>General Safety Guidelines</CardTitle>
              <CardDescription>
                Important safety practices for all riders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-600">Before Booking:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Check driver ratings and reviews</li>
                    <li>• Verify vehicle details and license plate</li>
                    <li>• Share your trip details with family</li>
                    <li>• Choose well-lit pickup locations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-blue-600">During the Ride:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Sit in the back seat when possible</li>
                    <li>• Keep your phone charged and accessible</li>
                    <li>• Follow the route on your own GPS</li>
                    <li>• Don't share personal information</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="women" className="space-y-6">
          {/* Women Safety Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-pink-600" />
                <span>Women Safety Features</span>
              </CardTitle>
              <CardDescription>
                Special safety features designed for women passengers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-pink-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Women-Only Drivers</h4>
                      <p className="text-sm text-gray-600">Request women drivers for enhanced comfort and safety</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Star className="w-4 h-4 text-pink-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Women Safety Rating</h4>
                      <p className="text-sm text-gray-600">Special rating system focused on women's safety</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-pink-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Women Helpline</h4>
                      <p className="text-sm text-gray-600">Direct access to women's helpline services</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-pink-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Live Location Sharing</h4>
                      <p className="text-sm text-gray-600">Real-time location sharing with emergency contacts</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-4 h-4 text-pink-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Enhanced SOS</h4>
                      <p className="text-sm text-gray-600">Priority emergency response for women passengers</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Lock className="w-4 h-4 text-pink-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Privacy Protection</h4>
                      <p className="text-sm text-gray-600">Enhanced privacy features for women riders</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Women Safety Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Women Safety Tips</CardTitle>
              <CardDescription>
                Important safety tips specifically for women passengers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-pink-600">Before the Ride:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Book rides from well-known locations</li>
                    <li>• Share your ride details with family/friends</li>
                    <li>• Check driver's rating and reviews</li>
                    <li>• Prefer women-only drivers when available</li>
                    <li>• Keep emergency numbers handy</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-pink-600">During the Ride:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Sit in the back seat</li>
                    <li>• Keep doors locked during the ride</li>
                    <li>• Follow the route on your GPS</li>
                    <li>• Avoid sharing personal information</li>
                    <li>• Trust your instincts - if uncomfortable, ask to stop</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}