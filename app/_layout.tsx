import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';
import { initI18n } from '../lib/i18n';
import { useAuthStore } from '../stores/authStore';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserProfile } from '../lib/firestore';

/**
 * Layout racine de l'application RANKED
 * Configure la navigation et l'état d'authentification
 */

export default function RootLayout() {
  const { setUser, setUserProfile, setIsLoading } = useAuthStore();

  useEffect(() => {
    // Initialiser i18n
    initI18n();

    // Observer les changements d'authentification
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Charger le profil utilisateur
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#050507' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="circle/[id]" />
      </Stack>
    </>
  );
}
