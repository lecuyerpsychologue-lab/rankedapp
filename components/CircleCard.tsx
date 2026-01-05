import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AuraCard } from './ui/AuraCard';
import { Circle } from '../lib/firestore';
import { lightImpact } from '../lib/haptics';

/**
 * Composant CircleCard
 * Affiche une carte de cercle avec son emoji, nom et nombre de membres
 */

interface CircleCardProps {
  circle: Circle;
  onPress?: () => void;
  className?: string;
}

export const CircleCard: React.FC<CircleCardProps> = ({
  circle,
  onPress,
  className = '',
}) => {
  const handlePress = async () => {
    await lightImpact();
    onPress?.();
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <AuraCard
        auraColor={circle.color}
        className={`p-4 ${className}`}
        pulseEnabled={true}
      >
        <View className="flex-row items-center">
          {/* Emoji du cercle */}
          <View className="w-16 h-16 rounded-full bg-elevated items-center justify-center mr-4">
            <Text className="text-4xl">{circle.emoji}</Text>
          </View>

          {/* Informations du cercle */}
          <View className="flex-1">
            <Text className="text-text-primary text-lg font-bold mb-1">
              {circle.name}
            </Text>
            <Text className="text-text-secondary text-sm">
              {circle.memberIds.length} membre{circle.memberIds.length > 1 ? 's' : ''}
            </Text>
          </View>

          {/* Indicateur de statut */}
          {circle.memberIds.length >= 5 ? (
            <View className="bg-accent-success/20 px-3 py-1 rounded-full">
              <Text className="text-accent-success text-xs font-semibold">
                Actif
              </Text>
            </View>
          ) : (
            <View className="bg-accent-warning/20 px-3 py-1 rounded-full">
              <Text className="text-accent-warning text-xs font-semibold">
                {5 - circle.memberIds.length} restants
              </Text>
            </View>
          )}
        </View>
      </AuraCard>
    </TouchableOpacity>
  );
};
