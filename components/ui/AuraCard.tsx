import React, { useEffect } from 'react';
import { View, ViewProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

/**
 * Composant AuraCard
 * Carte avec effet d'aura lumineuse qui pulse doucement
 */

interface AuraCardProps extends ViewProps {
  children: React.ReactNode;
  auraColor: string;
  className?: string;
  pulseEnabled?: boolean;
}

export const AuraCard: React.FC<AuraCardProps> = ({
  children,
  auraColor,
  className = '',
  pulseEnabled = true,
  style,
  ...props
}) => {
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    if (pulseEnabled) {
      opacity.value = withRepeat(
        withTiming(1, {
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      );
    }
  }, [pulseEnabled]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View className={`relative ${className}`} style={style} {...props}>
      {/* Aura (glow effect) */}
      <Animated.View
        className="absolute -inset-1 rounded-card"
        style={[
          {
            backgroundColor: auraColor,
            shadowColor: auraColor,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 20,
            elevation: 8,
          },
          animatedStyle,
        ]}
      />
      
      {/* Contenu de la carte */}
      <View className="relative bg-soft-black rounded-card border border-elevated/50 overflow-hidden">
        {children}
      </View>
    </View>
  );
};
