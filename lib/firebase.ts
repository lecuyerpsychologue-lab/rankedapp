import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/**
 * Configuration Firebase pour RANKED
 * 
 * IMPORTANT: Remplacer ces valeurs par vos propres credentials Firebase
 * Utiliser les variables d'environnement pour plus de sécurité
 */
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || (() => {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('FIREBASE_API_KEY is required in production');
    }
    console.warn('⚠️ Firebase not configured - using placeholder values');
    return 'demo-api-key';
  })(),
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  projectId: process.env.FIREBASE_PROJECT_ID || 'demo-project-id',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.FIREBASE_APP_ID || 'demo-app-id',
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || 'G-XXXXXXXXXX',
};

/**
 * Initialise Firebase (ou retourne l'instance existante)
 */
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

/**
 * Services Firebase
 */
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
