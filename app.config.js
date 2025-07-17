import 'dotenv/config';
import withAndroidQueries from './plugins/withAndroidQueries';

export default {
  expo: {
    name: 'AppA',
    slug: 'appa',
    scheme: 'appa',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    splash: {
      image: './assets/images/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.sumit.appa',
      infoPlist: {
        LSApplicationQueriesSchemes: ['satelliteoracle'],
      },
    },
    android: {
      package: 'com.sumit.appa',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    plugins: [withAndroidQueries],
  },
};
