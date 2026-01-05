import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Svg, { Polygon, Circle, Line, Text as SvgText } from 'react-native-svg';
import { statColors, StatType } from '../../theme/colors';

/**
 * Composant RadarChart
 * Graphique radar pour visualiser les 5 stats d'un utilisateur
 */

interface RadarChartProps {
  stats: {
    humor: number;
    intelligence: number;
    reliability: number;
    charisma: number;
    creativity: number;
  };
  size?: number;
  className?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  stats,
  size = 200,
  className = '',
}) => {
  const center = size / 2;
  const radius = size / 2 - 40;
  const statKeys = ['humor', 'intelligence', 'reliability', 'charisma', 'creativity'] as StatType[];
  
  // Calculer les points pour chaque stat
  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Points pour les lignes de grille (cercles concentriques)
  const gridLevels = [20, 40, 60, 80, 100];

  // Points pour le polygone des stats
  const statPoints = statKeys.map((key, index) => getPoint(index, stats[key] || 0));
  const polygonPoints = statPoints.map(p => `${p.x},${p.y}`).join(' ');

  // Points pour les axes
  const axisPoints = statKeys.map((_, index) => {
    const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  });

  return (
    <View className={className}>
      <Svg width={size} height={size}>
        {/* Cercles de grille */}
        {gridLevels.map((level, i) => {
          const r = (level / 100) * radius;
          const points = statKeys.map((_, index) => {
            const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2;
            return {
              x: center + r * Math.cos(angle),
              y: center + r * Math.sin(angle),
            };
          });
          const gridPolygon = points.map(p => `${p.x},${p.y}`).join(' ');
          
          return (
            <Polygon
              key={`grid-${i}`}
              points={gridPolygon}
              fill="none"
              stroke="#4A4A57"
              strokeWidth="0.5"
              opacity={0.3}
            />
          );
        })}

        {/* Axes */}
        {axisPoints.map((point, index) => (
          <Line
            key={`axis-${index}`}
            x1={center}
            y1={center}
            x2={point.x}
            y2={point.y}
            stroke="#4A4A57"
            strokeWidth="1"
            opacity={0.5}
          />
        ))}

        {/* Polygone des stats */}
        <Polygon
          points={polygonPoints}
          fill={statColors[statKeys[0]]}
          fillOpacity={0.3}
          stroke={statColors.global}
          strokeWidth="2"
        />

        {/* Points sur chaque stat */}
        {statPoints.map((point, index) => (
          <Circle
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            r="4"
            fill={statColors[statKeys[index]]}
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        ))}
      </Svg>

      {/* Labels des stats */}
      <View className="absolute inset-0">
        {statKeys.map((key, index) => {
          const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2;
          const labelRadius = radius + 25;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);
          
          return (
            <View
              key={`label-${key}`}
              style={{
                position: 'absolute',
                left: x - 30,
                top: y - 10,
                width: 60,
              }}
            >
              <Text
                className="text-xs text-text-secondary text-center font-medium"
                numberOfLines={1}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};
