import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { mediumImpact } from '../../lib/haptics';

/**
 * Composant GradientButton
 * Bouton avec gradient et animations
 */

interface GradientButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const gradientColors: Record<string, readonly [string, string]> = {
  primary: ['#7B68EE', '#4ECDC4'],
  secondary: ['#FF6B6B', '#F093FB'],
  accent: ['#FFD700', '#FFE66D'],
};

export const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onPress,
  disabled = false,
  ...props
}) => {
  const handlePress = async (e: any) => {
    await mediumImpact();
    onPress?.(e);
  };

  const sizeClasses = {
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      className={`rounded-2xl overflow-hidden ${fullWidth ? 'w-full' : ''}`}
      style={{ opacity: disabled ? 0.5 : 1 }}
      {...props}
    >
      <LinearGradient
        colors={gradientColors[variant]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className={`${sizeClasses[size]} items-center justify-center`}
      >
        <Text
          className={`${textSizeClasses[size]} font-bold text-white text-center`}
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
