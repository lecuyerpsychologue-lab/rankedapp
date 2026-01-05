import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../stores/authStore';
import { ParticleBackground } from '../../components/ui/ParticleBackground';
import { GlassCard } from '../../components/ui/GlassCard';
import { signOut } from '../../lib/auth';
import * as Haptics from '../../lib/haptics';

/**
 * Écran de Profil
 * Affiche les paramètres et options de l'utilisateur
 */

export default function ProfileScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { userProfile, logout } = useAuthStore();

  const handleLogout = async () => {
    Alert.alert(
      t('auth.logout'),
      t('auth.logoutConfirm'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('auth.logout'),
          style: 'destructive',
          onPress: async () => {
            await Haptics.notificationWarning();
            await signOut();
            logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  if (!userProfile) {
    return (
      <SafeAreaView className="flex-1 bg-deep-black">
        <View className="flex-1 items-center justify-center">
          <Text className="text-text-secondary">{t('common.loading')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const menuItems = [
    { icon: '⚙️', title: t('profile.settings'), action: () => console.log('Settings') },
    { icon: '🔔', title: t('profile.notifications'), action: () => console.log('Notifications') },
    { icon: '🌍', title: t('profile.language'), action: () => console.log('Language') },
    { icon: '🔒', title: t('profile.privacy'), action: () => console.log('Privacy') },
    { icon: '📄', title: t('profile.terms'), action: () => console.log('Terms') },
    { icon: '💎', title: t('premium.title'), action: () => console.log('Premium') },
  ];

  return (
    <SafeAreaView className="flex-1 bg-deep-black">
      <ParticleBackground />
      
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-6"
        showsVerticalScrollIndicator={false}
      >
        {/* En-tête */}
        <View className="mb-6">
          <Text className="text-text-primary text-3xl font-bold">
            {t('profile.title')}
          </Text>
        </View>

        {/* Info utilisateur */}
        <GlassCard className="p-6 mb-6">
          <View className="items-center">
            <View className="w-24 h-24 rounded-full bg-elevated items-center justify-center mb-4">
              <Text className="text-5xl">👤</Text>
            </View>
            
            <Text className="text-text-primary text-2xl font-bold mb-1">
              {userProfile.displayName}
            </Text>
            
            <Text className="text-text-secondary">
              {userProfile.email}
            </Text>
          </View>
        </GlassCard>

        {/* Menu */}
        <GlassCard className="p-4 mb-6">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={async () => {
                await Haptics.lightImpact();
                item.action();
              }}
              className={`flex-row items-center py-4 ${
                index < menuItems.length - 1 ? 'border-b border-elevated' : ''
              }`}
            >
              <Text className="text-2xl mr-4">{item.icon}</Text>
              <Text className="text-text-primary text-base flex-1">
                {item.title}
              </Text>
              <Text className="text-text-secondary">›</Text>
            </TouchableOpacity>
          ))}
        </GlassCard>

        {/* Bouton de déconnexion */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-accent-error/20 p-4 rounded-2xl items-center"
        >
          <Text className="text-accent-error font-bold">
            {t('auth.logout')}
          </Text>
        </TouchableOpacity>

        {/* Version */}
        <Text className="text-text-muted text-center mt-6">
          {t('profile.version')} 1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
