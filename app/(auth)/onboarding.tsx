import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { ParticleBackground } from '../../components/ui/ParticleBackground';
import { GradientButton } from '../../components/ui/GradientButton';
import { useAuthStore } from '../../stores/authStore';

/**
 * Écran d'onboarding (première connexion)
 * Présente les fonctionnalités principales de RANKED
 */

const { width } = Dimensions.get('window');

const OnboardingSlide = ({
  emoji,
  title,
  subtitle,
}: {
  emoji: string;
  title: string;
  subtitle: string;
}) => (
  <View className="flex-1 items-center justify-center px-8" style={{ width }}>
    <View
      className="w-32 h-32 rounded-full bg-elevated items-center justify-center mb-8"
      style={{
        shadowColor: '#FFD700',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
        elevation: 8,
      }}
    >
      <Text className="text-7xl">{emoji}</Text>
    </View>

    <Text className="text-text-primary text-3xl font-bold text-center mb-4">
      {title}
    </Text>

    <Text className="text-text-secondary text-center text-lg">
      {subtitle}
    </Text>
  </View>
);

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { setIsOnboarded } = useAuthStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      emoji: '🔮',
      title: t('onboarding.title1'),
      subtitle: t('onboarding.subtitle1'),
    },
    {
      emoji: '🗳️',
      title: t('onboarding.title2'),
      subtitle: t('onboarding.subtitle2'),
    },
    {
      emoji: '👑',
      title: t('onboarding.title3'),
      subtitle: t('onboarding.subtitle3'),
    },
  ];

  const handleGetStarted = () => {
    setIsOnboarded(true);
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 bg-deep-black">
      <ParticleBackground />

      <View className="flex-1 justify-center">
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            const slide = Math.ceil(
              event.nativeEvent.contentOffset.x /
                event.nativeEvent.layoutMeasurement.width
            );
            if (slide !== currentSlide) {
              setCurrentSlide(slide);
            }
          }}
          scrollEventThrottle={200}
        >
          {slides.map((slide, index) => (
            <OnboardingSlide key={index} {...slide} />
          ))}
        </ScrollView>

        {/* Indicateurs de pagination */}
        <View className="flex-row justify-center items-center mb-8">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${
                index === currentSlide ? 'bg-aura-gold' : 'bg-text-muted'
              }`}
            />
          ))}
        </View>

        {/* Bouton */}
        <View className="px-8 mb-12">
          {currentSlide === slides.length - 1 ? (
            <GradientButton
              title={t('onboarding.getStarted')}
              variant="accent"
              size="lg"
              fullWidth
              onPress={handleGetStarted}
            />
          ) : (
            <Text className="text-text-secondary text-center">
              {t('common.next')} →
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
