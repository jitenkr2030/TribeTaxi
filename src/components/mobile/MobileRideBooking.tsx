'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMobile } from '@/hooks/use-mobile';
import { useLocationWatch } from '@/hooks/use-mobile';
import { 
  MapPin, 
  Navigation, 
  Wifi, 
  WifiOff, 
  Smartphone,
  BatteryCharging,
  Signal
} from 'lucide-react';

interface MobileRideBookingProps {
  onBookRide: (location: { lat: number; lng: number }) => void;
}

export function MobileRideBooking({ onBookRide }: MobileRideBookingProps) {
  const { isNative, deviceInfo, networkStatus, currentLocation, refreshLocation } = useMobile();
  const { location: watchedLocation, isWatching, startWatching, stopWatching } = useLocationWatch();
  const [isBooking, setIsBooking] = useState(false);

  const displayLocation = watchedLocation || currentLocation;

  const handleBookRide = async () => {
    if (!displayLocation) {
      await refreshLocation();
      return;
    }

    setIsBooking(true);
    try {
      await onBookRide({
        lat: displayLocation.latitude,
        lng: displayLocation.longitude
      });
    } catch (error) {
      console.error('Error booking ride:', error);
    } finally {
      setIsBooking(false);
    }
  };

  const toggleLocationWatch = () => {
    if (isWatching) {
      stopWatching();
    } else {
      startWatching();
    }
  };

  if (!isNative) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Mobile Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Smartphone className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">
              Native mobile features are only available when using the TribeTaxi mobile app.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Install the app to access:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Push notifications</li>
                <li>• Real-time location tracking</li>
                <li>• Offline ride booking</li>
                <li>• Native device features</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Device Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Device Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Device:</span>
              <p className="text-muted-foreground">{deviceInfo?.model || 'Unknown'}</p>
            </div>
            <div>
              <span className="font-medium">Platform:</span>
              <p className="text-muted-foreground">{deviceInfo?.platform || 'Unknown'}</p>
            </div>
            <div>
              <span className="font-medium">OS Version:</span>
              <p className="text-muted-foreground">{deviceInfo?.osVersion || 'Unknown'}</p>
            </div>
            <div>
              <span className="font-medium">Manufacturer:</span>
              <p className="text-muted-foreground">{deviceInfo?.manufacturer || 'Unknown'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Network Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {networkStatus?.connected ? (
              <Wifi className="h-5 w-5 text-green-500" />
            ) : (
              <WifiOff className="h-5 w-5 text-red-500" />
            )}
            Network Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant={networkStatus?.connected ? "default" : "destructive"}>
                {networkStatus?.connected ? "Online" : "Offline"}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {networkStatus?.connectionType}
              </span>
            </div>
            <Signal className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      {/* Location Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {displayLocation ? (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Latitude:</span>
                    <p className="text-muted-foreground">{displayLocation.latitude.toFixed(6)}</p>
                  </div>
                  <div>
                    <span className="font-medium">Longitude:</span>
                    <p className="text-muted-foreground">{displayLocation.longitude.toFixed(6)}</p>
                  </div>
                  <div>
                    <span className="font-medium">Accuracy:</span>
                    <p className="text-muted-foreground">{displayLocation.accuracy.toFixed(0)}m</p>
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>
                    <Badge variant={isWatching ? "default" : "secondary"}>
                      {isWatching ? "Tracking" : "Idle"}
                    </Badge>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Location not available
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLocationWatch}
                className="flex-1"
              >
                {isWatching ? "Stop Tracking" : "Start Tracking"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={refreshLocation}
                disabled={!networkStatus?.connected}
              >
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ride Booking Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Book Ride
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {displayLocation
                  ? "Ready to book a ride from your current location"
                  : "Please enable location services to book a ride"
                }
              </p>
            </div>

            <Button
              onClick={handleBookRide}
              disabled={!displayLocation || !networkStatus?.connected || isBooking}
              className="w-full"
            >
              {isBooking ? "Booking..." : "Book Ride Now"}
            </Button>

            {!networkStatus?.connected && (
              <div className="text-center">
                <p className="text-sm text-destructive">
                  Please connect to the internet to book a ride
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}