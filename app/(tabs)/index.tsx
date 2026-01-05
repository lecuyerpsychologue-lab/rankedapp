import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../stores/authStore';
import { ParticleBackground } from '../../components/ui/ParticleBackground';
import { ProfileHeader } from '../../components/ProfileHeader';
import { GlassCard } from '../../components/ui/GlassCard';

/**
 * Écran d'accueil (Home)
 * Affiche le profil de l'utilisateur avec ses stats et son score global
 */

export default function HomeScreen() {
  const { t } = useTranslation();
  const { userProfile } = useAuthStore();

  if (!userProfile) {
    return (
      <SafeAreaView className="flex-1 bg-deep-black">
        <View className="flex-1 items-center justify-center">
          <Text className="text-text-secondary">{t('common.loading')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-deep-black">
      <ParticleBackground />
      
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-6"
        showsVerticalScrollIndicator={false}
      >
        {/* En-tête avec titre */}
        <View className="mb-6">
          <Text className="text-text-primary text-3xl font-bold">
            {t('home.title')}
          </Text>
        </View>

        {/* Profil avec stats */}
        <ProfileHeader profile={userProfile} showRadarChart={true} />

        {/* Évolution hebdomadaire */}
        <GlassCard className="mt-6 p-6">
          <Text className="text-text-primary text-xl font-bold mb-4">
            {t('home.weeklyEvolution')}
          </Text>
          
          <View className="space-y-3">
            {Object.entries(userProfile.stats)
              .filter(([key]) => key !== 'global')
              .map(([key, value]) => (
                <View
                  key={key}
                  className="flex-row items-center justify-between"
                >
                  <Text className="text-text-secondary capitalize">
                    {t(`stats.${key}`)}
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-text-primary font-bold mr-2">
                      {value.toFixed(0)}
                    </Text>
                    {/* TODO: Afficher l'évolution (+/- par rapport à la semaine précédente) */}
                    <Text className="text-accent-success text-sm">
                      +0
                    </Text>
                  </View>
                </View>
              ))}
          </View>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}
