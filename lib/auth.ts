import {
  signInWithCredential,
  GoogleAuthProvider,
  OAuthProvider,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import { auth } from './firebase';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';

/**
 * Helpers pour l'authentification dans RANKED
 */

/**
 * Configuration Google Sign In
 */
export const useGoogleAuth = () => {
  // Vérifier que les Client IDs sont configurés
  if (!process.env.GOOGLE_CLIENT_ID_IOS && !process.env.GOOGLE_CLIENT_ID_ANDROID) {
    console.warn('⚠️ Google OAuth not configured - client IDs missing');
  }

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.GOOGLE_CLIENT_ID_IOS,
    androidClientId: process.env.GOOGLE_CLIENT_ID_ANDROID,
    webClientId: process.env.GOOGLE_CLIENT_ID_WEB,
  });

  return { request, response, promptAsync };
};

/**
 * Sign in avec Google
 */
export const signInWithGoogle = async (idToken: string) => {
  try {
    const credential = GoogleAuthProvider.credential(idToken);
    const result = await signInWithCredential(auth, credential);
    return result.user;
  } catch (error) {
    console.error('Erreur Google Sign In:', error);
    throw error;
  }
};

/**
 * Sign in avec Apple
 * Obligatoire pour iOS
 */
export const signInWithApple = async () => {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    const { identityToken } = credential;
    if (!identityToken) {
      throw new Error('Pas de token Apple reçu');
    }

    const provider = new OAuthProvider('apple.com');
    const oauthCredential = provider.credential({
      idToken: identityToken,
    });

    const result = await signInWithCredential(auth, oauthCredential);
    return result.user;
  } catch (error) {
    console.error('Erreur Apple Sign In:', error);
    throw error;
  }
};

/**
 * Déconnexion
 */
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    throw error;
  }
};

/**
 * Récupère l'utilisateur actuel
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

/**
 * Vérifie si l'utilisateur est connecté
 */
export const isAuthenticated = (): boolean => {
  return auth.currentUser !== null;
};
