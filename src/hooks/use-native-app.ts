'use client';

import { useEffect, useState } from 'react';
import { nativeAppService } from '@/lib/native-app';

export function useNativeApp() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [currentPosition, setCurrentPosition] = useState<any>(null);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);

  useEffect(() => {
    const initializeNativeApp = async () => {
      try {
        await nativeAppService.initialize();
        setIsInitialized(true);
        
        // Get initial device info
        const info = nativeAppService.getDeviceInfo();
        setDeviceInfo(info);
        
        // Check initial network status
        const online = await nativeAppService.isOnline();
        setIsOnline(online);
        
        // Get initial position
        const position = await nativeAppService.getCurrentPosition();
        setCurrentPosition(position);
        
      } catch (error) {
        console.error('Error initializing native app:', error);
      }
    };

    initializeNativeApp();
  }, []);

  // Share content
  const shareContent = async (options: { title: string; text: string; url?: string }) => {
    return await nativeAppService.shareContent(options);
  };

  // Take picture
  const takePicture = async () => {
    return await nativeAppService.takePicture();
  };

  // Schedule notification
  const scheduleNotification = async (options: {
    title: string;
    body: string;
    id: number;
    schedule?: { at: Date };
  }) => {
    return await nativeAppService.scheduleNotification(options);
  };

  // Get current position
  const getCurrentPosition = async () => {
    const position = await nativeAppService.getCurrentPosition();
    setCurrentPosition(position);
    return position;
  };

  // Check if online
  const checkOnlineStatus = async () => {
    const online = await nativeAppService.isOnline();
    setIsOnline(online);
    return online;
  };

  return {
    isInitialized,
    isOnline,
    currentPosition,
    deviceInfo,
    isNativeApp: nativeAppService.isNativeApp,
    shareContent,
    takePicture,
    scheduleNotification,
    getCurrentPosition,
    checkOnlineStatus
  };
}