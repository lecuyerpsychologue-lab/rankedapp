# 🚀 Quick Start Guide - RANKED

## Démarrage Rapide (5 minutes)

### 1. Installation

```bash
# Cloner le projet
git clone https://github.com/lecuyerpsychologue-lab/rankedapp.git
cd rankedapp

# Installer les dépendances
npm install
```

### 2. Configuration Firebase (Minimum)

Pour tester l'application, créez un fichier `.env` :

```bash
cp .env.example .env
```

Vous pouvez laisser les valeurs par défaut pour le développement initial.

### 3. Lancer l'application

```bash
# Démarrer Expo
npm start

# Ou directement sur un simulateur
npm run ios      # iOS (nécessite macOS + Xcode)
npm run android  # Android (nécessite Android Studio)
```

## 📱 Structure des Écrans

### Authentication Flow
- `/app/(auth)/login.tsx` - Écran de connexion avec OAuth
- `/app/(auth)/onboarding.tsx` - Onboarding première connexion

### Main App
- `/app/(tabs)/index.tsx` - **Home** : Profil avec stats et radar chart
- `/app/(tabs)/circles.tsx` - **Cercles** : Liste des cercles de l'utilisateur
- `/app/(tabs)/vote.tsx` - **Vote** : Système de vote hebdomadaire
- `/app/(tabs)/profile.tsx` - **Profil** : Paramètres et informations utilisateur
- `/app/circle/[id].tsx` - **Détail cercle** : Informations d'un cercle spécifique

## 🎨 Design System

### Couleurs Principales

```typescript
// Fonds
background.deep    // #050507 - Fond principal
background.soft    // #0D0D12 - Cartes
background.elevated // #16161F - Éléments surélevés

// Auras (Stats)
aura.humor         // #FFE66D - Humour
aura.intelligence  // #7B68EE - Intelligence
aura.reliability   // #4ECDC4 - Fiabilité
aura.charisma      // #FF6B6B - Charisme
aura.creativity    // #F093FB - Créativité
aura.gold          // #FFD700 - Global/Or
```

### Composants UI Disponibles

```typescript
// Cartes
<GlassCard>          // Carte avec effet glassmorphism
<AuraCard>           // Carte avec effet de glow animé

// Boutons
<GradientButton 
  title="Texte"
  variant="primary" | "secondary" | "accent"
  size="sm" | "md" | "lg"
/>

// Graphiques
<RadarChart stats={userStats} />

// Effets
<ParticleBackground /> // Fond animé avec particules

// Profil
<ProfileHeader profile={userProfile} />
<CircleCard circle={circle} />
```

## 🔧 Commandes Utiles

```bash
# Développement
npm start              # Lancer Expo Dev Server
npm run ios           # Lancer sur iOS
npm run android       # Lancer sur Android
npm run web           # Lancer sur navigateur (preview)

# Qualité du code
npm run type-check    # Vérifier les types TypeScript
npm run lint          # Linter le code

# Build (nécessite EAS CLI)
eas build --platform ios
eas build --platform android
```

## 📦 Architecture

```
rankedapp/
├── app/              # 📱 Screens (Expo Router)
├── components/       # 🎨 Composants React
│   ├── ui/          # Composants UI de base
│   └── *.tsx        # Composants métier
├── lib/             # 🛠️ Helpers & Config
│   ├── firebase.ts  # Configuration Firebase
│   ├── auth.ts      # Authentification
│   ├── firestore.ts # Base de données
│   └── i18n.ts      # Internationalisation
├── stores/          # 📊 State Management (Zustand)
├── theme/           # 🎨 Design System
├── locales/         # 🌍 Traductions (6 langues)
└── firebase/        # ☁️ Cloud Functions
    └── functions/
```

## 🌍 Internationalisation

6 langues disponibles avec détection automatique :

```typescript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

// Utilisation
<Text>{t('home.title')}</Text>
<Text>{t('circles.members', { count: 5 })}</Text>
```

Fichiers de traduction : `/locales/[lang].json`

## 📊 State Management (Zustand)

```typescript
// Auth Store
import { useAuthStore } from '@/stores/authStore';

const { user, userProfile, logout } = useAuthStore();

// Circles Store
import { useCirclesStore } from '@/stores/circlesStore';

const { circles, setCircles, selectedCircle } = useCirclesStore();

// Votes Store
import { useVotesStore } from '@/stores/votesStore';

const { votes, hasVotedForCircle } = useVotesStore();
```

## 🔥 Firebase Configuration

### 1. Créer un projet Firebase
1. Aller sur https://console.firebase.google.com
2. Créer un nouveau projet
3. Activer Authentication (Google + Apple)
4. Créer une base Firestore
5. Copier les credentials

### 2. Configurer .env

```env
FIREBASE_API_KEY=your_actual_api_key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
# ...etc
```

### 3. Déployer les Cloud Functions

```bash
cd firebase/functions
npm install
npm run build
firebase deploy --only functions
```

## 🎯 Fonctionnalités Principales

### ✅ Implémentées
- 🔐 Structure d'authentification OAuth (Google, Apple)
- 🎨 Design system complet "Aura Liquide"
- 🌍 Internationalisation (6 langues)
- 📱 Navigation avec Expo Router
- 🎯 Composants UI avec animations
- 📊 State management avec Zustand
- 🔥 Configuration Firebase
- ☁️ Cloud Functions (calcul des scores)
- 📄 Documents légaux (RGPD, etc.)

### 🚧 À Compléter
- Flux de création de cercle
- Logique de vote complète
- Affichage du leaderboard
- Interface premium
- Tests unitaires
- CI/CD

## 🐛 Débogage

### Problème : L'app ne démarre pas

```bash
# Nettoyer le cache
npm start -- --clear

# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

### Problème : Erreurs TypeScript

```bash
# Vérifier les types
npm run type-check

# Réinitialiser TypeScript
rm -rf .expo
npm start
```

### Problème : Firebase non configuré

Vérifiez que le fichier `.env` existe et contient les bonnes credentials Firebase.

## 📚 Ressources

- [Documentation Expo](https://docs.expo.dev)
- [Documentation React Native](https://reactnative.dev)
- [Documentation Firebase](https://firebase.google.com/docs)
- [NativeWind](https://www.nativewind.dev)
- [Zustand](https://github.com/pmndrs/zustand)

## 🤝 Support

- Issues GitHub : https://github.com/lecuyerpsychologue-lab/rankedapp/issues
- Email : support@rankedapp.com

---

**Note** : Cette application est un MVP complet et prêt pour le développement. Tous les composants de base sont implémentés avec TypeScript strict et un design system cohérent.
