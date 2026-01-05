import { Redirect, Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../stores/authStore';
import { View, Text } from 'react-native';

/**
 * Layout pour les onglets principaux de l'application
 */

export default function TabsLayout() {
  const { t } = useTranslation();
  const { user, isLoading, isOnboarded } = useAuthStore();

  // Si pas connecté, rediriger vers login
  if (!isLoading && !user) {
    return <Redirect href="/(auth)/login" />;
  }

  // Si connecté mais pas onboardé, rediriger vers onboarding
  if (!isLoading && user && !isOnboarded) {
    return <Redirect href="/(auth)/onboarding" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0D0D12',
          borderTopColor: '#16161F',
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#8B8B9A',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('home.title'),
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🏠</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="circles"
        options={{
          title: t('circles.title'),
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🔮</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="vote"
        options={{
          title: t('vote.title'),
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🗳️</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('profile.title'),
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>👤</Text>
          ),
        }}
      />
    </Tabs>
  );
}
