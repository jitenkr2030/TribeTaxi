import Razorpay from 'razorpay'

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_YourKeyId',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'YourSecretKey'
})

export interface PaymentOrder {
  amount: number
  currency: string
  receipt: string
  notes?: Record<string, string>
}

export interface PaymentData {
  rideId: string
  riderId: string
  driverId: string
  amount: number
  paymentMethod: string
  orderId?: string
  paymentId?: string
  status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
}

export class PaymentService {
  static async createOrder(orderData: PaymentOrder) {
    try {
      const order = await razorpay.orders.create({
        amount: orderData.amount * 100, // Razorpay expects amount in paise
        currency: orderData.currency || 'INR',
        receipt: orderData.receipt,
        notes: orderData.notes || {}
      })

      return {
        success: true,
        order
      }
    } catch (error) {
      console.error('Error creating Razorpay order:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  static async verifyPayment(paymentData: {
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
  }) {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentData
      
      // Generate signature for verification
      const generatedSignature = razorpay.webhooks.generateSignature({
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id
      })

      const isSignatureValid = generatedSignature === razorpay_signature

      return {
        success: true,
        isValid: isSignatureValid,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id
      }
    } catch (error) {
      console.error('Error verifying payment:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  static async fetchPayment(paymentId: string) {
    try {
      const payment = await razorpay.payments.fetch(paymentId)
      return {
        success: true,
        payment
      }
    } catch (error) {
      console.error('Error fetching payment:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  static async calculateFare(rideData: {
    distance: number
    duration: number
    vehicleType: string
    city: string
  }) {
    // Base fare calculation logic
    const baseFares: Record<string, number> = {
      'AUTO_RICKSHAW': 30,
      'CAR_ECONOMY': 50,
      'CAR_PREMIUM': 80,
      'BIKE': 20
    }

    const perKmRates: Record<string, number> = {
      'AUTO_RICKSHAW': 11,
      'CAR_ECONOMY': 15,
      'CAR_PREMIUM': 20,
      'BIKE': 8
    }

    const perMinRates: Record<string, number> = {
      'AUTO_RICKSHAW': 1,
      'CAR_ECONOMY': 2,
      'CAR_PREMIUM': 3,
      'BIKE': 0.5
    }

    const baseFare = baseFares[rideData.vehicleType] || 30
    const distanceFare = rideData.distance * (perKmRates[rideData.vehicleType] || 11)
    const timeFare = rideData.duration * (perMinRates[rideData.vehicleType] || 1)

    // City-specific multipliers
    const cityMultipliers: Record<string, number> = {
      'Ranchi': 1.0,
      'Dhanbad': 0.95,
      'Bokaro': 0.9,
      'Deoghar': 0.85,
      'Jamshedpur': 1.1
    }

    const cityMultiplier = cityMultipliers[rideData.city] || 1.0

    const totalFare = Math.max(
      (baseFare + distanceFare + timeFare) * cityMultiplier,
      baseFare * 0.5 // Minimum fare is 50% of base fare
    )

    return {
      baseFare,
      distanceFare,
      timeFare,
      cityMultiplier,
      totalFare: Math.round(totalFare),
      breakdown: {
        base: baseFare,
        distance: distanceFare,
        time: timeFare,
        city: (baseFare + distanceFare + timeFare) * (cityMultiplier - 1)
      }
    }
  }

  static async processDriverPayout(driverId: string, amount: number, rideId: string) {
    // In a real implementation, this would integrate with Razorpay Payouts or similar
    // For now, we'll simulate the process
    try {
      console.log(`Processing payout of ₹${amount} to driver ${driverId} for ride ${rideId}`)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return {
        success: true,
        payoutId: `payout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        amount,
        driverId,
        rideId,
        status: 'PROCESSED',
        processedAt: new Date()
      }
    } catch (error) {
      console.error('Error processing driver payout:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}