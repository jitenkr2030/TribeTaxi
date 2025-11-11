"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  CreditCard, 
  Smartphone, 
  Wallet, 
  DollarSign, 
  CheckCircle,
  AlertCircle,
  Clock,
  Shield
} from "lucide-react"

interface PaymentComponentProps {
  amount: number
  rideId: string
  onSuccess?: (paymentData: any) => void
  onError?: (error: string) => void
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function PaymentComponent({ amount, rideId, onSuccess, onError }: PaymentComponentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState("")
  const [upiId, setUpiId] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "processing" | "success" | "failed">("pending")

  const paymentMethods = [
    { value: "UPI", label: "UPI", icon: Smartphone, color: "bg-blue-600" },
    { value: "CARD", label: "Credit/Debit Card", icon: CreditCard, color: "bg-purple-600" },
    { value: "WALLET", label: "Digital Wallet", icon: Wallet, color: "bg-green-600" },
    { value: "CASH", label: "Cash (Pay Driver)", icon: DollarSign, color: "bg-orange-600" }
  ]

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    if (!selectedMethod) {
      onError?.("Please select a payment method")
      return
    }

    if (selectedMethod === "CASH") {
      // Handle cash payment
      onSuccess?.({
        method: "CASH",
        amount,
        status: "PENDING",
        rideId
      })
      return
    }

    setIsLoading(true)
    setPaymentStatus("processing")

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        throw new Error("Failed to load payment gateway")
      }

      // Create order
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount,
          currency: "INR",
          receipt: `receipt_${rideId}`,
          notes: {
            rideId,
            paymentMethod: selectedMethod
          }
        })
      })

      const orderData = await orderResponse.json()

      if (!orderData.success) {
        throw new Error(orderData.error || "Failed to create payment order")
      }

      // Initialize Razorpay payment
      const options = {
        key: "rzp_test_YourKeyId", // Replace with your Razorpay key
        amount: amount * 100, // Razorpay expects amount in paise
        currency: "INR",
        name: "TribeTaxi",
        description: `Payment for Ride ${rideId}`,
        order_id: orderData.order.id,
        prefill: {
          name: "Amit Kumar", // Get from user context
          email: "amit.kumar@email.com",
          contact: "+919876543210"
        },
        notes: {
          rideId,
          paymentMethod: selectedMethod
        },
        theme: {
          color: "#059669" // Green color matching TribeTaxi
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false)
            setPaymentStatus("pending")
            onError?.("Payment cancelled")
          }
        },
        handler: async (response: any) => {
          try {
            // Verify payment
            const verifyResponse = await fetch("/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            })

            const verifyData = await verifyResponse.json()

            if (verifyData.success) {
              setPaymentStatus("success")
              onSuccess?.({
                method: selectedMethod,
                amount,
                paymentId: verifyData.paymentId,
                orderId: verifyData.orderId,
                status: "PAID",
                rideId
              })
            } else {
              throw new Error(verifyData.error || "Payment verification failed")
            }
          } catch (error) {
            setPaymentStatus("failed")
            onError?.(error instanceof Error ? error.message : "Payment verification failed")
          } finally {
            setIsLoading(false)
          }
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()

    } catch (error) {
      setPaymentStatus("failed")
      onError?.(error instanceof Error ? error.message : "Payment failed")
      setIsLoading(false)
    }
  }

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case "UPI":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="upi">UPI ID *</Label>
              <Input
                id="upi"
                type="text"
                placeholder="your@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
              <p className="text-xs text-gray-500">Enter your UPI ID (e.g., mobile@upi or name@bank)</p>
            </div>
          </div>
        )

      case "CARD":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card">Card Number *</Label>
              <Input
                id="card"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={19}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry *</Label>
                <Input
                  id="expiry"
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  maxLength={5}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV *</Label>
                <Input
                  id="cvv"
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  maxLength={3}
                />
              </div>
            </div>
          </div>
        )

      case "WALLET":
        return (
          <div className="space-y-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select your wallet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paytm">Paytm</SelectItem>
                <SelectItem value="phonepe">PhonePe</SelectItem>
                <SelectItem value="gpay">Google Pay</SelectItem>
                <SelectItem value="mobikwik">MobiKwik</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-600">You will be redirected to your wallet app to complete the payment</p>
          </div>
        )

      case "CASH":
        return (
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-orange-800">Cash Payment</span>
              </div>
              <p className="text-sm text-orange-700 mt-2">
                Please pay the driver directly in cash after completing your ride. The driver will confirm the payment.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (paymentStatus === "success") {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-800 mb-2">Payment Successful!</h3>
          <p className="text-gray-600">Your payment of ₹{amount} has been processed successfully.</p>
        </CardContent>
      </Card>
    )
  }

  if (paymentStatus === "failed") {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-800 mb-2">Payment Failed</h3>
          <p className="text-gray-600 mb-4">There was an issue processing your payment. Please try again.</p>
          <Button onClick={() => setPaymentStatus("pending")} variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="w-5 h-5 text-green-600" />
          <span>Complete Payment</span>
        </CardTitle>
        <CardDescription>
          Select your preferred payment method to complete the booking
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Amount Display */}
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-gray-600">Total Amount</p>
          <p className="text-3xl font-bold text-green-600">₹{amount}</p>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-4">
          <h3 className="font-semibold">Select Payment Method</h3>
          <div className="grid grid-cols-2 gap-3">
            {paymentMethods.map((method) => (
              <Card
                key={method.value}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedMethod === method.value ? 'ring-2 ring-green-500' : ''
                }`}
                onClick={() => setSelectedMethod(method.value)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-8 h-8 ${method.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                    <method.icon className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-medium text-sm">{method.label}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Form */}
        {selectedMethod && (
          <div className="space-y-4">
            <h3 className="font-semibold">Payment Details</h3>
            {renderPaymentForm()}
          </div>
        )}

        {/* Security Badge */}
        <div className="flex items-center justify-center space-x-2 p-3 bg-gray-50 rounded-lg">
          <Shield className="w-4 h-4 text-green-600" />
          <span className="text-sm text-gray-600">Secured by Razorpay • 256-bit SSL encryption</span>
        </div>

        {/* Pay Button */}
        <Button
          onClick={handlePayment}
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={!selectedMethod || isLoading}
        >
          {isLoading ? (
            <>
              <Clock className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay ₹${amount}`
          )}
        </Button>
      </CardContent>
    </Card>
  )
}