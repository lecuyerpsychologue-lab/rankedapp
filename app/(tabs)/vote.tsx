import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ParticleBackground } from '../../components/ui/ParticleBackground';
import { GlassCard } from '../../components/ui/GlassCard';

/**
 * Écran de Vote
 * Permet aux utilisateurs de voter pour les membres de leurs cercles
 */

export default function VoteScreen() {
  const { t } = useTranslation();

  // TODO: Implémenter la logique de vote
  // - Récupérer les cercles actifs (>= 5 membres)
  // - Afficher les questions de vote
  // - Permettre la sélection des membres
  // - Enregistrer les votes

  return (
    <SafeAreaView className="flex-1 bg-deep-black">
      <ParticleBackground />
      
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* En-tête */}
        <View className="mb-6">
          <Text className="text-text-primary text-3xl font-bold">
            {t('vote.title')}
          </Text>
        </View>

        {/* Informations sur le vote */}
        <GlassCard className="p-6 mb-6">
          <Text className="text-text-primary text-xl font-bold mb-4">
            {t('vote.weeklyVote')}
          </Text>
          
          <View className="bg-elevated p-4 rounded-2xl mb-4">
            <Text className="text-text-secondary text-center">
              {t('vote.timeRemaining')}
            </Text>
            <Text className="text-aura-gold text-2xl font-bold text-center mt-2">
              3j 14h 32m
            </Text>
          </View>

          <Text className="text-text-secondary text-sm text-center">
            {t('vote.nextVotingStarts')}
          </Text>
        </GlassCard>

        {/* Questions de vote */}
        <View className="space-y-4">
          {[
            { emoji: '😂', question: t('vote.question1') },
            { emoji: '🧠', question: t('vote.question2') },
            { emoji: '💪', question: t('vote.question3') },
            { emoji: '🔥', question: t('vote.question4') },
            { emoji: '🎨', question: t('vote.question5') },
          ].map((item, index) => (
            <GlassCard key={index} className="p-6">
              <View className="flex-row items-center mb-4">
                <Text className="text-4xl mr-3">{item.emoji}</Text>
                <Text className="text-text-primary text-lg font-bold flex-1">
                  {item.question}
                </Text>
              </View>
              
              <View className="bg-elevated p-4 rounded-2xl">
                <Text className="text-text-secondary text-center">
                  {t('vote.selectMember')}
                </Text>
              </View>
            </GlassCard>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
