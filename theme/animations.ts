/**
 * Configuration des animations pour RANKED
 * Transitions fluides et douces (300-500ms ease-out)
 */

export const animations = {
  // Durées standard
  durations: {
    fast: 200,
    normal: 300,
    slow: 500,
  },

  // Courbes d'accélération
  easings: {
    easeOut: [0.25, 0.46, 0.45, 0.94] as const,
    easeInOut: [0.42, 0, 0.58, 1] as const,
    spring: [0.68, -0.55, 0.265, 1.55] as const,
  },

  // Configuration pour l'effet de pulsation de l'aura
  auraPulse: {
    duration: 2000,
    minOpacity: 0.5,
    maxOpacity: 1,
  },

  // Configuration pour les particules flottantes
  particles: {
    count: 20,
    speed: 0.5,
    size: { min: 2, max: 4 },
  },
} as const;

/**
 * Presets d'animations communes pour Reanimated
 */
export const animationPresets = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration: 300,
  },
  
  slideUp: {
    from: { opacity: 0, translateY: 20 },
    to: { opacity: 1, translateY: 0 },
    duration: 400,
  },

  scaleIn: {
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
    duration: 300,
  },
} as const;
