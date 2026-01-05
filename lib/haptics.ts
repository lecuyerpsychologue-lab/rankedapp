import * as Haptics from 'expo-haptics';

/**
 * Helpers pour les retours haptiques dans RANKED
 * Améliore l'expérience utilisateur avec des micro-vibrations
 */

/**
 * Feedback léger (interaction UI standard)
 */
export const lightImpact = async () => {
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch (error) {
    // Haptics non supporté sur cet appareil
    console.log('Haptics not supported');
  }
};

/**
 * Feedback moyen (sélection importante)
 */
export const mediumImpact = async () => {
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } catch (error) {
    console.log('Haptics not supported');
  }
};

/**
 * Feedback fort (action critique)
 */
export const heavyImpact = async () => {
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  } catch (error) {
    console.log('Haptics not supported');
  }
};

/**
 * Feedback de succès
 */
export const notificationSuccess = async () => {
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch (error) {
    console.log('Haptics not supported');
  }
};

/**
 * Feedback d'avertissement
 */
export const notificationWarning = async () => {
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  } catch (error) {
    console.log('Haptics not supported');
  }
};

/**
 * Feedback d'erreur
 */
export const notificationError = async () => {
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  } catch (error) {
    console.log('Haptics not supported');
  }
};

/**
 * Feedback de sélection (UI native)
 */
export const selectionAsync = async () => {
  try {
    await Haptics.selectionAsync();
  } catch (error) {
    console.log('Haptics not supported');
  }
};
