/**
 * Palette de couleurs pour l'application RANKED
 * Design System "Aura Liquide"
 */

export const colors = {
  // Fonds
  background: {
    deep: '#050507',      // Deep Black - fond principal
    soft: '#0D0D12',      // Soft Black - cartes
    elevated: '#16161F',  // Elevated - éléments surélevés
  },

  // Auras - couleurs des stats avec glow effect
  aura: {
    humor: '#FFE66D',         // 😂 Humour - jaune soleil
    intelligence: '#7B68EE',  // 🧠 Intelligence - violet électrique
    reliability: '#4ECDC4',   // 💪 Fiabilité - turquoise
    charisma: '#FF6B6B',      // 🔥 Charisme - corail
    creativity: '#F093FB',    // 🎨 Créativité - rose magenta
    gold: '#FFD700',          // 👑 Global/Or
  },

  // Texte
  text: {
    primary: '#FFFFFF',    // Texte principal
    secondary: '#8B8B9A',  // Texte secondaire
    muted: '#4A4A57',      // Texte atténué
  },

  // Accents
  accent: {
    success: '#34D399',  // Succès
    warning: '#FBBF24',  // Avertissement
    error: '#F87171',    // Erreur
  },
} as const;

/**
 * Mapping des stats vers leurs couleurs d'aura
 */
export const statColors = {
  humor: colors.aura.humor,
  intelligence: colors.aura.intelligence,
  reliability: colors.aura.reliability,
  charisma: colors.aura.charisma,
  creativity: colors.aura.creativity,
  global: colors.aura.gold,
} as const;

export type StatType = keyof typeof statColors;
