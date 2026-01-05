import React from 'react';
import { View, ViewProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';

/**
 * Composant GlassCard
 * Carte avec effet de verre givré (glassmorphism)
 */

interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  style,
  ...props
}) => {
  return (
    <View
      className={`bg-soft-black/80 rounded-card border border-elevated/50 ${className}`}
      style={[
        {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 4,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};
