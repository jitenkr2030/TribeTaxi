import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tribetaxi.app',
  appName: 'TribeTaxi',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    // In development, you might want to use the Next.js dev server
    // For production, this should point to your deployed app
    url: 'http://localhost:3000',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  },
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#ffffff'
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon',
      iconColor: '#2D2D2D',
      launchShowLast: true
    }
  }
};

export default config;
