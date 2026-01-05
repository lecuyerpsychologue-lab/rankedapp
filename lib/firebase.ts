import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/**
 * Configuration Firebase pour RANKED
 * Configuration de production avec les clés du projet Firebase
 */
const firebaseConfig = {
  apiKey: "AIzaSyA7rEQ4lnDesbmh448Cb4CVO46peyt8_BU",
  authDomain: "ranked-app-e066c.firebaseapp.com",
  projectId: "ranked-app-e066c",
  storageBucket: "ranked-app-e066c.firebasestorage.app",
  messagingSenderId: "602200538308",
  appId: "1:602200538308:web:015b9a5646d0194917dd91",
  measurementId: "G-87HGT9PZEQ"
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
