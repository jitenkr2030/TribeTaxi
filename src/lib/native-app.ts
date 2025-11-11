import { Capacitor } from '@capacitor/core';
import { 
  PushNotifications,
  PushNotificationSchema,
  Token,
  ActionPerformed,
} from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Device } from '@capacitor/device';
import { Network } from '@capacitor/network';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Share } from '@capacitor/share';

export class NativeAppService {
  private isNative: boolean;
  private deviceInfo: any = null;
  private currentPosition: Position | null = null;

  constructor() {
    this.isNative = Capacitor.isNativePlatform();
  }

  // Initialize native app features
  async initialize() {
    if (!this.isNative) {
      console.log('Running on web platform, native features limited');
      return;
    }

    try {
      // Get device info
      this.deviceInfo = await Device.getInfo();
      console.log('Device Info:', this.deviceInfo);

      // Initialize push notifications
      await this.initializePushNotifications();

      // Initialize local notifications
      await this.initializeLocalNotifications();

      // Initialize geolocation
      await this.initializeGeolocation();

      // Initialize network monitoring
      await this.initializeNetworkMonitoring();

      console.log('Native app features initialized successfully');
    } catch (error) {
      console.error('Error initializing native app features:', error);
    }
  }

  // Push Notifications
  private async initializePushNotifications() {
    try {
      // Request permission
      const permission = await PushNotifications.requestPermissions();
      if (permission.receive === 'granted') {
        // Register for push notifications
        await PushNotifications.register();
        
        // Listen for registration
        PushNotifications.addListener('registration', (token: Token) => {
          console.log('Push notification token:', token.value);
          // Send this token to your backend
          this.savePushToken(token.value);
        });

        // Listen for notification received
        PushNotifications.addListener('pushNotificationReceived', 
          (notification: PushNotificationSchema) => {
            console.log('Push notification received:', notification);
            this.handlePushNotification(notification);
          }
        );

        // Listen for notification action performed
        PushNotifications.addListener('pushNotificationActionPerformed', 
          (notification: ActionPerformed) => {
            console.log('Push notification action performed:', notification);
            this.handlePushNotificationAction(notification);
          }
        );
      }
    } catch (error) {
      console.error('Error initializing push notifications:', error);
    }
  }

  // Local Notifications
  private async initializeLocalNotifications() {
    try {
      await LocalNotifications.requestPermissions();
      
      LocalNotifications.addListener('localNotificationReceived', (notification) => {
        console.log('Local notification received:', notification);
      });

      LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
        console.log('Local notification action performed:', notification);
      });
    } catch (error) {
      console.error('Error initializing local notifications:', error);
    }
  }

  // Geolocation
  private async initializeGeolocation() {
    try {
      const permission = await Geolocation.requestPermissions();
      if (permission.location === 'granted') {
        // Get current position
        this.currentPosition = await Geolocation.getCurrentPosition();
        console.log('Current position:', this.currentPosition);

        // Watch position for real-time updates
        Geolocation.watchPosition({
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }, (position) => {
          if (position) {
            this.currentPosition = position;
            console.log('Position updated:', position);
          }
        });
      }
    } catch (error) {
      console.error('Error initializing geolocation:', error);
    }
  }

  // Network Monitoring
  private async initializeNetworkMonitoring() {
    try {
      const status = await Network.getStatus();
      console.log('Network status:', status);

      Network.addListener('networkStatusChange', (status) => {
        console.log('Network status changed:', status);
        this.handleNetworkChange(status);
      });
    } catch (error) {
      console.error('Error initializing network monitoring:', error);
    }
  }

  // Camera
  async takePicture(): Promise<string | null> {
    if (!this.isNative) {
      console.log('Camera not available on web');
      return null;
    }

    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      return image.dataUrl;
    } catch (error) {
      console.error('Error taking picture:', error);
      return null;
    }
  }

  // Share functionality
  async shareContent(options: { title: string; text: string; url?: string }) {
    if (!this.isNative) {
      // Fallback to web share API
      if (navigator.share) {
        try {
          await navigator.share(options);
          return true;
        } catch (error) {
          console.error('Error sharing content:', error);
          return false;
        }
      }
      return false;
    }

    try {
      await Share.share(options);
      return true;
    } catch (error) {
      console.error('Error sharing content:', error);
      return false;
    }
  }

  // Schedule local notification
  async scheduleNotification(options: {
    title: string;
    body: string;
    id: number;
    schedule?: { at: Date };
  }) {
    if (!this.isNative) {
      console.log('Local notifications not available on web');
      return false;
    }

    try {
      await LocalNotifications.schedule({
        notifications: [{
          title: options.title,
          body: options.body,
          id: options.id,
          schedule: options.schedule,
          smallIcon: 'ic_stat_icon',
          iconColor: '#2D2D2D'
        }]
      });
      return true;
    } catch (error) {
      console.error('Error scheduling notification:', error);
      return false;
    }
  }

  // Get current position
  async getCurrentPosition(): Promise<Position | null> {
    if (!this.isNative) {
      // Fallback to browser geolocation
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation not available'));
          return;
        }
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(error)
        );
      });
    }

    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000
      });
      return position;
    } catch (error) {
      console.error('Error getting current position:', error);
      return null;
    }
  }

  // Check if device is online
  async isOnline(): Promise<boolean> {
    if (!this.isNative) {
      return navigator.onLine;
    }

    try {
      const status = await Network.getStatus();
      return status.connected;
    } catch (error) {
      console.error('Error checking network status:', error);
      return false;
    }
  }

  // Private methods
  private async savePushToken(token: string) {
    // Send token to backend
    try {
      // TODO: Implement API call to save push token
      console.log('Saving push token to backend:', token);
    } catch (error) {
      console.error('Error saving push token:', error);
    }
  }

  private handlePushNotification(notification: PushNotificationSchema) {
    // Handle incoming push notification
    console.log('Handling push notification:', notification);
    
    // Show local notification
    this.scheduleNotification({
      title: notification.title || 'TribeTaxi',
      body: notification.body || 'New notification',
      id: Date.now()
    });
  }

  private handlePushNotificationAction(notification: ActionPerformed) {
    // Handle push notification action
    console.log('Handling push notification action:', notification);
    
    // Navigate to appropriate screen based on action
    if (notification.actionId === 'view_ride') {
      // Navigate to ride details
      window.location.href = '/rider/dashboard';
    }
  }

  private handleNetworkChange(status: any) {
    // Handle network status changes
    if (status.connected) {
      console.log('Network connected');
      // Sync offline data
      this.syncOfflineData();
    } else {
      console.log('Network disconnected');
      // Show offline message
      this.showOfflineMessage();
    }
  }

  private async syncOfflineData() {
    // Sync offline data when network is restored
    console.log('Syncing offline data...');
    // TODO: Implement offline data sync
  }

  private async showOfflineMessage() {
    // Show offline message to user
    await this.scheduleNotification({
      title: 'Offline Mode',
      body: 'You are currently offline. Some features may be limited.',
      id: Date.now()
    });
  }

  // Public getters
  get isNativeApp(): boolean {
    return this.isNative;
  }

  getDeviceInfo() {
    return this.deviceInfo;
  }

  getCurrentPositionSync() {
    return this.currentPosition;
  }
}

// Export singleton instance
export const nativeAppService = new NativeAppService();