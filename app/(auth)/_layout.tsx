import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '../../stores/authStore';

/**
 * Layout pour les écrans d'authentification
 */

export default function AuthLayout() {
  const { user, isLoading } = useAuthStore();

  // Si l'utilisateur est connecté, rediriger vers l'app
  if (!isLoading && user) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#050507' },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="onboarding" />
    </Stack>
  );
}
