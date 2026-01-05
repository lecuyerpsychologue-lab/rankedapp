import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCirclesStore } from '../../stores/circlesStore';
import { ParticleBackground } from '../../components/ui/ParticleBackground';
import { GlassCard } from '../../components/ui/GlassCard';

/**
 * Écran de détail d'un cercle
 * Affiche les membres du cercle, les statistiques et options
 */

export default function CircleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { circles } = useCirclesStore();
  
  const circle = circles.find(c => c.id === id);

  if (!circle) {
    return (
      <SafeAreaView className="flex-1 bg-deep-black">
        <Stack.Screen options={{ title: t('circles.title') }} />
        <View className="flex-1 items-center justify-center">
          <Text className="text-text-secondary">{t('errors.notFound')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-deep-black">
      <Stack.Screen 
        options={{ 
          title: circle.name,
          headerShown: true,
          headerStyle: { backgroundColor: '#0D0D12' },
          headerTintColor: '#FFFFFF',
        }} 
      />
      <ParticleBackground />
      
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* En-tête du cercle */}
        <View className="items-center mb-8">
          <View 
            className="w-32 h-32 rounded-full items-center justify-center mb-4"
            style={{ backgroundColor: circle.color }}
          >
            <Text className="text-7xl">{circle.emoji}</Text>
          </View>
          
          <Text className="text-text-primary text-3xl font-bold mb-2">
            {circle.name}
          </Text>
          
          <Text className="text-text-secondary text-lg">
            {circle.memberIds.length} {t('circles.members', { count: circle.memberIds.length })}
          </Text>
        </View>

        {/* Informations */}
        <GlassCard className="p-6 mb-6">
          <Text className="text-text-primary text-xl font-bold mb-4">
            À propos
          </Text>
          
          <View className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-text-secondary">Statut</Text>
              <Text className={`font-bold ${
                circle.memberIds.length >= 5 
                  ? 'text-accent-success' 
                  : 'text-accent-warning'
              }`}>
                {circle.memberIds.length >= 5 ? 'Actif' : 'En attente'}
              </Text>
            </View>
            
            <View className="flex-row justify-between">
              <Text className="text-text-secondary">Membres</Text>
              <Text className="text-text-primary font-bold">
                {circle.memberIds.length} / 50
              </Text>
            </View>
          </View>
        </GlassCard>

        {/* Liste des membres */}
        <GlassCard className="p-6">
          <Text className="text-text-primary text-xl font-bold mb-4">
            Membres
          </Text>
          
          <Text className="text-text-secondary text-center py-8">
            Liste des membres à venir...
          </Text>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}
