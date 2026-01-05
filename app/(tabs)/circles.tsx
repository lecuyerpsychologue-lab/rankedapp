import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../stores/authStore';
import { useCirclesStore } from '../../stores/circlesStore';
import { ParticleBackground } from '../../components/ui/ParticleBackground';
import { CircleCard } from '../../components/CircleCard';
import { GradientButton } from '../../components/ui/GradientButton';
import { getUserCircles } from '../../lib/firestore';

/**
 * Écran des Cercles
 * Affiche la liste des cercles de l'utilisateur
 */

export default function CirclesScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuthStore();
  const { circles, setCircles, setIsLoading, setSelectedCircle } = useCirclesStore();
  const [refreshing, setRefreshing] = useState(false);

  // Charger les cercles
  const loadCircles = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const userCircles = await getUserCircles(user.uid);
      setCircles(userCircles);
    } catch (error) {
      console.error('Erreur chargement cercles:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadCircles();
  }, [user]);

  const handleCirclePress = (circle: any) => {
    setSelectedCircle(circle);
    router.push(`/circle/${circle.id}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-deep-black">
      <ParticleBackground />
      
      <View className="flex-1 px-4 py-6">
        {/* En-tête */}
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-text-primary text-3xl font-bold">
            {t('circles.title')}
          </Text>
          
          {/* TODO: Bouton créer cercle */}
          {/* <TouchableOpacity className="bg-elevated p-3 rounded-full">
            <Text className="text-2xl">➕</Text>
          </TouchableOpacity> */}
        </View>

        {/* Liste des cercles */}
        {circles.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-6xl mb-4">🔮</Text>
            <Text className="text-text-secondary text-center text-lg mb-8">
              {t('home.noCircles')}
            </Text>
            <GradientButton
              title={t('circles.createCircle')}
              variant="accent"
              size="lg"
              onPress={() => {
                // TODO: Naviguer vers création de cercle
                console.log('Créer un cercle');
              }}
            />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
          >
            <View className="space-y-4">
              {circles.map((circle) => (
                <CircleCard
                  key={circle.id}
                  circle={circle}
                  onPress={() => handleCirclePress(circle)}
                />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
