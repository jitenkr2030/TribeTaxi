"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, MapPin, Star, Shield, Users, Zap, TrendingUp, Building, WifiOff, Phone, Calendar, Clock, Heart, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { LanguageSwitcher } from "@/lib/i18n/LanguageContext"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 sm:py-32">
          <div className="text-center">
            <Badge className="mb-4 bg-green-600 text-white">
              🚖 Jharkhand's Own Ride App
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-green-600">TribeTaxi</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Zero commission, transparent pricing, and reliable rides across Jharkhand. 
              Join the community-owned mobility platform that puts drivers and riders first.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link href="/rider/register">Book Your First Ride</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/driver/register">Become a Driver</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TribeTaxi?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for Jharkhand, by the community of Jharkhand
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Zero Commission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Drivers keep 100% of their earnings. No hidden fees, no commissions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Safe & Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Verified drivers, tracked rides, and 24/7 support for your safety.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Jharkhand Wide</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Available in Ranchi, Dhanbad, Bokaro, Deoghar, and more cities.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Car className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Multiple Options</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Auto rickshaws, cars, bikes - choose what suits your needs and budget.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Transparent Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Know your fare before you book. No surge pricing, no surprises.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Community Owned</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Built by the community, for the community. Your feedback shapes our future.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Available Cities
            </h2>
            <p className="text-xl text-gray-600">
              Serving major cities across Jharkhand
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              "Ranchi",
              "Dhanbad", 
              "Bokaro",
              "Deoghar",
              "Jamshedpur",
              "Hazaribagh",
              "Giridih", 
              "Ramgarh",
              "Palamu",
              "Chatra"
            ].map((city) => (
              <Card key={city} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold">{city}</h3>
                  <p className="text-sm text-gray-500">Active</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rural Services Section */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-amber-600 text-white">
              🌾 Rural Initiative
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Rural Connectivity Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bringing transportation to every village with our rural hub system and offline booking capabilities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-amber-600" />
                </div>
                <CardTitle>Rural Hubs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  6 strategic hubs connecting 30+ villages across Jharkhand with designated pickup points
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <WifiOff className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Offline Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Book rides without internet connection. Automatically syncs when you're back online
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Shared Rides</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Cost-effective shared transportation options for rural communities
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Voice Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Book rides via phone call in your local language with our support team
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
              <Link href="/rural">Explore Rural Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Industrial Services Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-600 text-white">
              🏭 Industrial Solutions
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Corporate Transportation Partnerships
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Reliable, safe, and cost-effective transportation solutions for industries across Jharkhand
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>6 Major Industries</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Partnered with Tata Steel, SAIL, BCCL and other leading industries
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>140K+ Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Serving over 140,000 employees with daily transportation needs
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>24/7 Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Round-the-clock transportation for all shift timings
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>30% Cost Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Significant cost reduction compared to traditional transport
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/industrial">Corporate Solutions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-20 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-red-600 text-white">
              🛡️ Safety First
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Safety Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your safety is our priority with verified drivers, real-time tracking, and 24/7 emergency support
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Verified Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  100% background verification and license checks for all drivers
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <CardTitle>Women Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Women-only drivers and enhanced safety features for women passengers
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Real-time Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Live GPS tracking with location sharing for emergency contacts
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Emergency Response</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  SOS button and quick emergency response across all locations
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <Link href="/safety">Explore Safety Features</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Experience TribeTaxi?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied riders and drivers across Jharkhand
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/rider/register">Start Riding</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              <Link href="/driver/register">Start Earning</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TribeTaxi</h3>
              <p className="text-gray-400">
                Jharkhand's own community-owned ride-hailing platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Riders</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/rider/register" className="hover:text-white">Register</Link></li>
                <li><Link href="/rider/login" className="hover:text-white">Login</Link></li>
                <li><Link href="/support" className="hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Drivers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/driver/register" className="hover:text-white">Register</Link></li>
                <li><Link href="/driver/login" className="hover:text-white">Login</Link></li>
                <li><Link href="/driver/earnings" className="hover:text-white">Earnings</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TribeTaxi. Made with ❤️ for Jharkhand.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}