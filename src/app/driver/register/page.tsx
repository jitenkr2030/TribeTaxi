"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, User, MapPin, Shield, FileText, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function DriverRegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Info
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    city: "",
    
    // Driver Info
    licenseNo: "",
    licenseExpiry: "",
    
    // Vehicle Info
    vehicleType: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleColor: "",
    plateNo: "",
    capacity: "",
    hasAC: false
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement driver registration logic
    console.log("Driver registration:", formData)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const jharkhandCities = [
    "Ranchi",
    "Dhanbad", 
    "Bokaro",
    "Deoghar",
    "Jamshedpur",
    "Hazaribagh",
    "Giridih",
    "Ramgarh"
  ]

  const vehicleTypes = [
    { value: "AUTO_RICKSHAW", label: "Auto Rickshaw" },
    { value: "CAR_ECONOMY", label: "Car (Economy)" },
    { value: "CAR_PREMIUM", label: "Car (Premium)" },
    { value: "BIKE", label: "Bike" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TT</span>
              </div>
              <span className="text-xl font-bold text-gray-900">TribeTaxi</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                <Car className="w-3 h-3 mr-1" />
                Driver Registration
              </Badge>
              <Link href="/auth" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-blue-600 text-white">
              🚗 Join as Driver
            </Badge>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Become a TribeTaxi Driver
            </h1>
            <p className="text-lg text-gray-600">
              Join Jharkhand's zero-commission ride platform and keep 100% of your earnings
            </p>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-center space-x-4 mt-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step <= currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                  </div>
                  <span className={`ml-2 text-sm ${
                    step <= currentStep ? 'text-blue-600 font-semibold' : 'text-gray-500'
                  }`}>
                    {step === 1 ? 'Personal Info' : step === 2 ? 'Driver Details' : 'Vehicle Info'}
                  </span>
                  {step < 3 && <div className={`w-16 h-1 mx-4 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />}
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Registration Form */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-blue-600" />
                    <span>
                      {currentStep === 1 && 'Personal Information'}
                      {currentStep === 2 && 'Driver Details'}
                      {currentStep === 3 && 'Vehicle Information'}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    {currentStep === 1 && 'Please provide your personal details'}
                    {currentStep === 2 && 'Enter your driving license and professional details'}
                    {currentStep === 3 && 'Add your vehicle information'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              type="text"
                              placeholder="Enter your full name"
                              value={formData.name}
                              onChange={(e) => handleChange("name", e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="Enter your email"
                              value={formData.email}
                              onChange={(e) => handleChange("email", e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+91 98765 43210"
                              value={formData.phone}
                              onChange={(e) => handleChange("phone", e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="city">Operating City *</Label>
                            <Select value={formData.city} onValueChange={(value) => handleChange("city", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your city" />
                              </SelectTrigger>
                              <SelectContent>
                                {jharkhandCities.map((city) => (
                                  <SelectItem key={city} value={city}>
                                    <div className="flex items-center space-x-2">
                                      <MapPin className="w-4 h-4" />
                                      <span>{city}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="password">Password *</Label>
                            <Input
                              id="password"
                              type="password"
                              placeholder="Create a strong password"
                              value={formData.password}
                              onChange={(e) => handleChange("password", e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password *</Label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              placeholder="Re-enter your password"
                              value={formData.confirmPassword}
                              onChange={(e) => handleChange("confirmPassword", e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Driver Details */}
                    {currentStep === 2 && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="licenseNo">Driving License Number *</Label>
                            <Input
                              id="licenseNo"
                              type="text"
                              placeholder="DL-1234567890123"
                              value={formData.licenseNo}
                              onChange={(e) => handleChange("licenseNo", e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="licenseExpiry">License Expiry Date *</Label>
                            <Input
                              id="licenseExpiry"
                              type="date"
                              value={formData.licenseExpiry}
                              onChange={(e) => handleChange("licenseExpiry", e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div className="text-sm text-blue-800">
                              <strong>Document Verification:</strong> Your driving license will be verified automatically. 
                              Please ensure the details are accurate and your license is valid.
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Vehicle Information */}
                    {currentStep === 3 && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="vehicleType">Vehicle Type *</Label>
                            <Select value={formData.vehicleType} onValueChange={(value) => handleChange("vehicleType", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select vehicle type" />
                              </SelectTrigger>
                              <SelectContent>
                                {vehicleTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="plateNo">License Plate Number *</Label>
                            <Input
                              id="plateNo"
                              type="text"
                              placeholder="JH01AB1234"
                              value={formData.plateNo}
                              onChange={(e) => handleChange("plateNo", e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="vehicleMake">Make *</Label>
                            <Input
                              id="vehicleMake"
                              type="text"
                              placeholder="Maruti, Tata, etc."
                              value={formData.vehicleMake}
                              onChange={(e) => handleChange("vehicleMake", e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="vehicleModel">Model *</Label>
                            <Input
                              id="vehicleModel"
                              type="text"
                              placeholder="Swift, Nexon, etc."
                              value={formData.vehicleModel}
                              onChange={(e) => handleChange("vehicleModel", e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="vehicleYear">Year *</Label>
                            <Input
                              id="vehicleYear"
                              type="number"
                              placeholder="2020"
                              value={formData.vehicleYear}
                              onChange={(e) => handleChange("vehicleYear", e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="vehicleColor">Color *</Label>
                            <Input
                              id="vehicleColor"
                              type="text"
                              placeholder="White, Red, etc."
                              value={formData.vehicleColor}
                              onChange={(e) => handleChange("vehicleColor", e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="capacity">Seating Capacity *</Label>
                            <Input
                              id="capacity"
                              type="number"
                              placeholder="4"
                              value={formData.capacity}
                              onChange={(e) => handleChange("capacity", e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>AC Available</Label>
                            <Select value={formData.hasAC ? "yes" : "no"} onValueChange={(value) => handleChange("hasAC", value === "yes")}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select AC option" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6 border-t">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={prevStep}
                        disabled={currentStep === 1}
                      >
                        Previous
                      </Button>
                      
                      <div className="flex space-x-2">
                        {currentStep < 3 ? (
                          <Button type="button" onClick={nextStep}>
                            Continue
                          </Button>
                        ) : (
                          <Button 
                            type="submit" 
                            className="bg-blue-600 hover:bg-blue-700"
                            disabled={isLoading}
                          >
                            {isLoading ? "Creating Account..." : "Complete Registration"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Benefits Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Driver Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">0%</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Zero Commission</h4>
                      <p className="text-sm text-gray-600">Keep 100% of your earnings</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">24/7</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Flexible Hours</h4>
                      <p className="text-sm text-gray-600">Work when you want</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Insurance Covered</h4>
                      <p className="text-sm text-gray-600">Comprehensive insurance</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-orange-600 font-bold text-sm">₹</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Weekly Payments</h4>
                      <p className="text-sm text-gray-600">Fast & reliable payouts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Valid driving license</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Own vehicle (or access to one)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Smartphone with internet</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Good knowledge of local area</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}