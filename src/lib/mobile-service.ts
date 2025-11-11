import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Device } from '@capacitor/device';
import { Geolocation } from '@capacitor/geolocation';
import { Network } from '@capacitor/network';

export class MobileService {
  private static instance: MobileService;

  private constructor() {}

  public static getInstance(): MobileService {
    if (!MobileService.instance) {
      MobileService.instance = new MobileService();
    }
    return MobileService.instance;
  }

  // Check if running on native mobile
  public isNative(): boolean {
    return Capacitor.isNativePlatform();
  }

  // Get device information
  public async getDeviceInfo() {
    if (!this.isNative()) return null;
    
    try {
      const info = await Device.getInfo();
      return info;
    } catch (error) {
      console.error('Error getting device info:', error);
      return null;
    }
  }

  // Initialize push notifications
  public async initializePushNotifications() {
    if (!this.isNative()) return;

    try {
      // Request permission to use push notifications
      let permStatus = await PushNotifications.requestPermissions();

      if (permStatus.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        await PushNotifications.register();
      }

      // Listen for registration
      PushNotifications.addListener('registration', (token) => {
        console.log('Push registration success, token: ' + token.value);
        // Send token to your backend
        this.sendTokenToBackend(token.value);
      });

      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError', (error) => {
        console.error('Error on registration: ' + JSON.stringify(error));
      });

      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener('pushNotificationReceived', (notification) => {
        console.log('Push received: ' + JSON.stringify(notification));
        this.handlePushNotification(notification);
      });

      // Method called when tapping on a notification
      PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
        this.handlePushNotificationAction(notification);
      });

    } catch (error) {
      console.error('Error initializing push notifications:', error);
    }
  }

  // Initialize local notifications
  public async initializeLocalNotifications() {
    if (!this.isNative()) return;

    try {
      // Request permission to use local notifications
      let permStatus = await LocalNotifications.requestPermissions();

      if (permStatus.display === 'granted') {
        console.log('Local notifications permission granted');
      }

      // Listen for notification action
      LocalNotifications.addListener('localNotificationReceived', (notification) => {
        console.log('Local notification received: ' + JSON.stringify(notification));
      });

      LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
        console.log('Local notification action performed: ' + JSON.stringify(notification));
      });

    } catch (error) {
      console.error('Error initializing local notifications:', error);
    }
  }

  // Schedule a local notification
  public async scheduleNotification(options: {
    title: string;
    body: string;
    id?: number;
    schedule?: { at: Date };
    largeBody?: boolean;
    sound?: string;
  }) {
    if (!this.isNative()) return;

    try {
      await LocalNotifications.schedule({
        notifications: [{
          title: options.title,
          body: options.body,
          id: options.id || Math.floor(Math.random() * 10000),
          schedule: options.schedule,
          largeBody: options.largeBody || false,
          sound: options.sound || 'default'
        }]
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }

  // Get current location
  public async getCurrentLocation() {
    if (!this.isNative()) {
      // Fallback to browser geolocation
      return this.getBrowserLocation();
    }

    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000
      });

      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      };
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  }

  // Watch location changes
  public async watchLocation(callback: (position: any) => void) {
    if (!this.isNative()) return null;

    try {
      const watchId = await Geolocation.watchPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000
      }, (position, err) => {
        if (err) {
          console.error('Error watching location:', err);
          return;
        }
        callback({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      });

      return watchId;
    } catch (error) {
      console.error('Error watching location:', error);
      return null;
    }
  }

  // Check network status
  public async getNetworkStatus() {
    if (!this.isNative()) {
      // Fallback to browser network status
      return {
        connected: navigator.onLine,
        connectionType: navigator.onLine ? 'unknown' : 'none'
      };
    }

    try {
      const status = await Network.getStatus();
      return status;
    } catch (error) {
      console.error('Error getting network status:', error);
      return null;
    }
  }

  // Listen for network status changes
  public async listenNetworkStatus(callback: (status: any) => void) {
    if (!this.isNative()) {
      // Fallback to browser network events
      window.addEventListener('online', () => callback({ connected: true, connectionType: 'unknown' }));
      window.addEventListener('offline', () => callback({ connected: false, connectionType: 'none' }));
      return;
    }

    try {
      Network.addListener('networkStatusChange', callback);
    } catch (error) {
      console.error('Error listening to network status:', error);
    }
  }

  // Private methods
  private async sendTokenToBackend(token: string) {
    // Send the push notification token to your backend
    try {
      // Example: await fetch('/api/push-token', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token })
      // });
      console.log('Token sent to backend:', token);
    } catch (error) {
      console.error('Error sending token to backend:', error);
    }
  }

  private handlePushNotification(notification: any) {
    // Handle incoming push notification
    console.log('Handling push notification:', notification);
    
    // Show local notification
    this.scheduleNotification({
      title: notification.title || 'TribeTaxi',
      body: notification.body || 'You have a new notification'
    });
  }

  private handlePushNotificationAction(notification: any) {
    // Handle push notification action (when user taps on notification)
    console.log('Handling push notification action:', notification);
    
    // Navigate to appropriate page based on notification data
    if (notification.notification.data?.rideId) {
      // Navigate to ride details
      window.location.href = `/rider/dashboard?ride=${notification.notification.data.rideId}`;
    }
  }

  private async getBrowserLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 5000
        }
      );
    });
  }
}

// Export singleton instance
export const mobileService = MobileService.getInstance();