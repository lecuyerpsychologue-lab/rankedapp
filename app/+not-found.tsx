import { View, Text } from 'react-native';
import { Link, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ParticleBackground } from '../components/ui/ParticleBackground';
import { GradientButton } from '../components/ui/GradientButton';

/**
 * Écran 404 - Page non trouvée
 */

export default function NotFoundScreen() {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 bg-deep-black items-center justify-center px-6">
        <ParticleBackground />
        
        <Text className="text-8xl mb-4">👑</Text>
        <Text className="text-text-primary text-3xl font-bold mb-2">
          {t('errors.notFound')}
        </Text>
        <Text className="text-text-secondary text-center mb-8">
          Cette page n'existe pas.
        </Text>

        <Link href="/" asChild>
          <GradientButton
            title={t('common.back')}
            variant="accent"
            size="lg"
          />
        </Link>
      </View>
    </>
  );
}
