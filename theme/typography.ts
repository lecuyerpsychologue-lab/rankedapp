/**
 * Configuration de la typographie pour RANKED
 * Utilise Inter ou SF Pro comme police principale
 */

export const typography = {
  fonts: {
    regular: 'System',
    bold: 'System',
    // Note: Pour utiliser Inter, ajouter expo-font et charger les polices
  },

  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },

  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  fontWeights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;
