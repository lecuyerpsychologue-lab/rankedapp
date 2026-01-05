import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import des fichiers de traduction
import en from '../locales/en.json';
import fr from '../locales/fr.json';
import es from '../locales/es.json';
import de from '../locales/de.json';
import it from '../locales/it.json';
import pt from '../locales/pt.json';

const LANGUAGE_STORAGE_KEY = 'ranked_app_language';

/**
 * Configuration de i18next pour RANKED
 * 
 * Langues supportées:
 * - 🇫🇷 Français (fr) — défaut si langue latine non trouvée
 * - 🇬🇧 English (en) — défaut global
 * - 🇪🇸 Español (es)
 * - 🇩🇪 Deutsch (de)
 * - 🇮🇹 Italiano (it)
 * - 🇵🇹 Português (pt)
 */

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  es: { translation: es },
  de: { translation: de },
  it: { translation: it },
  pt: { translation: pt },
};

/**
 * Détecte la langue du device et retourne le code langue approprié
 */
const getDeviceLanguage = (): string => {
  const deviceLanguage = Localization.getLocales()[0]?.languageCode || 'en';
  
  // Si la langue est supportée, on l'utilise
  if (resources[deviceLanguage as keyof typeof resources]) {
    return deviceLanguage;
  }
  
  // Fallback: anglais
  return 'en';
};

/**
 * Initialise i18next
 */
export const initI18n = async () => {
  // Récupérer la langue sauvegardée ou utiliser celle du device
  const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
  const initialLanguage = savedLanguage || getDeviceLanguage();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: initialLanguage,
      fallbackLng: 'en',
      compatibilityJSON: 'v3',
      interpolation: {
        escapeValue: false, // React native already escapes
      },
    });
};

/**
 * Change la langue de l'application
 */
export const changeLanguage = async (language: string) => {
  await i18n.changeLanguage(language);
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
};

/**
 * Retourne la langue actuelle
 */
export const getCurrentLanguage = (): string => {
  return i18n.language;
};

export default i18n;
