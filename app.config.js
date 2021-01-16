import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env.development') });
dotenv.config({ path: path.join(__dirname, '.env.local') });

export default {
    name: 'ballrr',
    slug: 'ballrr',
    version: '1.0.0',
    scheme: 'ballrr',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
        image: './assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
    },
    updates: {
        fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
        supportsTablet: true,
    },
    android: {
        adaptiveIcon: {
            foregroundImage: './assets/adaptive-icon.png',
            backgroundColor: '#FFFFFF',
        },
    },
    web: {
        favicon: './assets/favicon.png',
    },
    extra: {
        APP_HOST: process.env.APP_HOST,
        GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
        AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
        AUTH0_AUTH_ENDPOINT: process.env.AUTH0_AUTH_ENDPOINT,
        AUTH0_SCOPE: process.env.AUTH0_SCOPE,
        AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    },
};
