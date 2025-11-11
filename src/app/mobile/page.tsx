'use client';

import { MobileRideBooking } from '@/components/mobile/MobileRideBooking';

export default function MobilePage() {
  const handleBookRide = async (location: { lat: number; lng: number }) => {
    // Handle ride booking logic
    console.log('Booking ride from location:', location);
    
    // For demo purposes, we'll just show an alert
    alert(`Ride booked from location: ${location.lat}, ${location.lng}`);
    
    // In a real app, this would:
    // 1. Send the booking request to the backend
    // 2. Navigate to the ride tracking page
    // 3. Show real-time updates
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">TribeTaxi Mobile</h1>
          <p className="text-muted-foreground">
            Experience the full power of TribeTaxi with native mobile features
          </p>
        </div>

        <MobileRideBooking onBookRide={handleBookRide} />
      </div>
    </div>
  );
}