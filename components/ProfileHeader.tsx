import React from 'react';
import { View, Text, Image } from 'react-native';
import { AuraCard } from './ui/AuraCard';
import { statColors } from '../theme/colors';
import { RadarChart } from './ui/RadarChart';
import { UserProfile } from '../lib/firestore';

/**
 * Composant ProfileHeader
 * En-tête du profil utilisateur avec photo, stats et aura dorée
 */

interface ProfileHeaderProps {
  profile: UserProfile;
  showRadarChart?: boolean;
  className?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  showRadarChart = true,
  className = '',
}) => {
  return (
    <AuraCard
      auraColor={statColors.global}
      className={`p-6 ${className}`}
      pulseEnabled={true}
    >
      <View className="items-center">
        {/* Photo de profil avec aura dorée */}
        <View className="mb-4">
          <View
            className="w-24 h-24 rounded-full overflow-hidden border-4 border-aura-gold"
            style={{
              shadowColor: statColors.global,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: 20,
              elevation: 8,
            }}
          >
            <Image
              source={{ uri: profile.photoURL }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Nom */}
        <Text className="text-text-primary text-2xl font-bold mb-2">
          {profile.displayName}
        </Text>

        {/* Score global */}
        <View className="bg-elevated px-4 py-2 rounded-full mb-4">
          <Text className="text-aura-gold text-lg font-bold">
            {profile.stats.global.toFixed(0)} pts
          </Text>
        </View>

        {/* Graphique radar des stats */}
        {showRadarChart && (
          <View className="mt-4">
            <RadarChart stats={profile.stats} size={250} />
          </View>
        )}

        {/* Stats en liste */}
        <View className="mt-6 w-full space-y-2">
          {Object.entries(profile.stats)
            .filter(([key]) => key !== 'global')
            .map(([key, value]) => (
              <View
                key={key}
                className="flex-row items-center justify-between bg-elevated/50 px-4 py-3 rounded-2xl"
              >
                <Text className="text-text-secondary text-sm font-medium capitalize">
                  {key}
                </Text>
                <View className="flex-row items-center">
                  <View
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: statColors[key as keyof typeof statColors] }}
                  />
                  <Text className="text-text-primary text-base font-bold">
                    {value.toFixed(0)}
                  </Text>
                </View>
              </View>
            ))}
        </View>
      </View>
    </AuraCard>
  );
};
