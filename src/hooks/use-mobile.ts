'use client';

import { useEffect, useState } from 'react';
import { mobileService } from '@/lib/mobile-service';

interface DeviceInfo {
  model?: string;
  platform?: string;
  operatingSystem?: string;
  osVersion?: string;
  manufacturer?: string;
  isVirtual?: boolean;
  memUsed?: number;
  diskFree?: number;
  diskTotal?: number;
}

interface NetworkStatus {
  connected: boolean;
  connectionType: string;
}

interface Position {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export function useMobile() {
  const [isNative, setIsNative] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Position | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeMobile = async () => {
      try {
        // Check if running on native platform
        const native = mobileService.isNative();
        setIsNative(native);

        if (native) {
          // Get device information
          const info = await mobileService.getDeviceInfo();
          setDeviceInfo(info);

          // Initialize push notifications
          await mobileService.initializePushNotifications();

          // Initialize local notifications
          await mobileService.initializeLocalNotifications();

          // Get network status
          const network = await mobileService.getNetworkStatus();
          setNetworkStatus(network);

          // Listen for network status changes
          mobileService.listenNetworkStatus((status) => {
            setNetworkStatus(status);
          });

          // Get current location
          const location = await mobileService.getCurrentLocation();
          setCurrentLocation(location);
        } else {
          // For web, get basic network status
          setNetworkStatus({
            connected: navigator.onLine,
            connectionType: navigator.onLine ? 'unknown' : 'none'
          });

          // Listen for network status changes
          window.addEventListener('online', () => {
            setNetworkStatus({ connected: true, connectionType: 'unknown' });
          });

          window.addEventListener('offline', () => {
            setNetworkStatus({ connected: false, connectionType: 'none' });
          });
        }
      } catch (error) {
        console.error('Error initializing mobile services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeMobile();
  }, []);

  const refreshLocation = async () => {
    try {
      const location = await mobileService.getCurrentLocation();
      setCurrentLocation(location);
      return location;
    } catch (error) {
      console.error('Error refreshing location:', error);
      return null;
    }
  };

  const scheduleNotification = async (options: {
    title: string;
    body: string;
    id?: number;
    schedule?: { at: Date };
    largeBody?: boolean;
    sound?: string;
  }) => {
    try {
      await mobileService.scheduleNotification(options);
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  return {
    isNative,
    deviceInfo,
    networkStatus,
    currentLocation,
    isLoading,
    refreshLocation,
    scheduleNotification
  };
}

// Hook for watching location changes
export function useLocationWatch() {
  const [location, setLocation] = useState<Position | null>(null);
  const [isWatching, setIsWatching] = useState(false);
  const [watchId, setWatchId] = useState<string | null>(null);

  const startWatching = async () => {
    try {
      const id = await mobileService.watchLocation((position) => {
        setLocation(position);
      });
      
      if (id) {
        setWatchId(id);
        setIsWatching(true);
      }
    } catch (error) {
      console.error('Error starting location watch:', error);
    }
  };

  const stopWatching = async () => {
    if (watchId) {
      try {
        await mobileService.stopWatchingLocation(watchId);
        setIsWatching(false);
        setWatchId(null);
      } catch (error) {
        console.error('Error stopping location watch:', error);
      }
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (watchId) {
        stopWatching();
      }
    };
  }, [watchId]);

  return {
    location,
    isWatching,
    startWatching,
    stopWatching
  };
}