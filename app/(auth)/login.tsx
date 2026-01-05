import React, { useState } from 'react';
import { View, Text, ScrollView, Platform, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { ParticleBackground } from '../../components/ui/ParticleBackground';
import { GradientButton } from '../../components/ui/GradientButton';
import { GlassCard } from '../../components/ui/GlassCard';
import { signInWithGoogle, signInWithApple, useGoogleAuth } from '../../lib/auth';
import * as Haptics from '../../lib/haptics';

/**
 * Écran de connexion (Login)
 * Permet aux utilisateurs de se connecter avec Google, Apple ou Instagram
 */

export default function LoginScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Configuration Google Auth
  const { request, response, promptAsync } = useGoogleAuth();

  // Gérer la réponse Google Auth
  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.idToken) {
        handleGoogleSignIn(authentication.idToken);
      }
    }
  }, [response]);

  const handleGoogleSignIn = async (idToken?: string) => {
    try {
      setIsLoading(true);
      await Haptics.lightImpact();
      
      if (idToken) {
        await signInWithGoogle(idToken);
      } else {
        await promptAsync();
      }
    } catch (error) {
      console.error('Erreur Google Sign In:', error);
      Alert.alert(t('errors.authError'), t('errors.networkError'));
      await Haptics.notificationError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      setIsLoading(true);
      await Haptics.lightImpact();
      await signInWithApple();
    } catch (error) {
      console.error('Erreur Apple Sign In:', error);
      Alert.alert(t('errors.authError'), t('errors.networkError'));
      await Haptics.notificationError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-deep-black">
      <ParticleBackground />
      
      <ScrollView
        contentContainerClassName="flex-1 justify-center items-center px-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo et titre avec aura */}
        <View className="items-center mb-12">
          <View
            className="w-32 h-32 rounded-full bg-elevated items-center justify-center mb-6"
            style={{
              shadowColor: '#FFD700',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: 30,
              elevation: 10,
            }}
          >
            <Text className="text-6xl">👑</Text>
          </View>
          
          <Text className="text-text-primary text-4xl font-bold mb-2">
            {t('common.appName')}
          </Text>
          
          <Text className="text-text-secondary text-center text-base px-8">
            {t('auth.welcomeSubtitle')}
          </Text>
        </View>

        {/* Card avec boutons de connexion */}
        <GlassCard className="w-full p-6 space-y-4">
          <Text className="text-text-primary text-xl font-bold text-center mb-4">
            {t('auth.welcome')}
          </Text>

          {/* Bouton Google */}
          <GradientButton
            title={t('auth.signInWithGoogle')}
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => handleGoogleSignIn()}
            disabled={isLoading || !request}
          />

          {/* Bouton Apple (iOS uniquement) */}
          {Platform.OS === 'ios' && (
            <GradientButton
              title={t('auth.signInWithApple')}
              variant="secondary"
              size="lg"
              fullWidth
              onPress={handleAppleSignIn}
              disabled={isLoading}
            />
          )}

          {/* Bouton Instagram (optionnel) */}
          {/* TODO: Implémenter Instagram OAuth */}
          {/* <GradientButton
            title={t('auth.signInWithInstagram')}
            variant="accent"
            size="lg"
            fullWidth
            onPress={handleInstagramSignIn}
            disabled={isLoading}
          /> */}
        </GlassCard>

        {/* Note légale */}
        <Text className="text-text-muted text-xs text-center mt-8 px-8">
          {t('auth.signIn')} implique l'acceptation des Conditions d'Utilisation et de la Politique de Confidentialité
        </Text>
      </ScrollView>
    </View>
  );
}
