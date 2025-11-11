import { NextRequest, NextResponse } from 'next/server'
import { PaymentService } from '@/lib/payment/payment-service'

export async function POST(request: NextRequest) {
  try {
    const { driverId, amount, rideId } = await request.json()

    if (!driverId || !amount || !rideId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    const result = await PaymentService.processDriverPayout(driverId, amount, rideId)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      payout: result
    })

  } catch (error) {
    console.error('Driver payout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}