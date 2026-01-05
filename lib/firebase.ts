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
  apiKey: process.env.FIREBASE_API_KEY || 'your_api_key',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'your_project.firebaseapp.com',
  projectId: process.env.FIREBASE_PROJECT_ID || 'your_project_id',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'your_project.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || 'your_sender_id',
  appId: process.env.FIREBASE_APP_ID || 'your_app_id',
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || 'your_measurement_id',
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
