import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovemultimedia.app',
  appName: 'Love Multimedia',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;