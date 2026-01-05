# 👑 RANKED — Application Mobile Complète

Application sociale où les utilisateurs votent anonymement sur les traits de personnalité de leurs amis au sein de "cercles" (classe, équipe, groupe d'amis). Chaque personne obtient un profil avec des stats évolutives et un classement.

## 🌟 Fonctionnalités

- **Authentification OAuth** : Google, Apple (iOS obligatoire), Instagram (optionnel)
- **Système de Cercles** : Créer et rejoindre des groupes d'amis
- **Votes Hebdomadaires** : 5 questions anonymes sur la personnalité
- **Profil & Stats** : Graphique radar, scores évolutifs, historique
- **Classements** : Top 3 avec podium, rang par stat
- **i18n** : 6 langues (FR, EN, ES, DE, IT, PT)
- **Design "Aura Liquide"** : Effets de glow, animations fluides

## 🛠️ Stack Technique

### Frontend
- **React Native** avec **Expo** (SDK 51)
- **Expo Router** (navigation file-based)
- **NativeWind** (Tailwind CSS pour React Native)
- **React Native Reanimated 3** (animations performantes)
- **Zustand** (state management)
- **i18next** (internationalisation)

### Backend
- **Firebase Authentication** (Google, Apple)
- **Cloud Firestore** (base de données)
- **Firebase Cloud Functions** (calcul des scores)
- **Firebase Cloud Messaging** (notifications push)

## 📦 Installation

### Prérequis

- **Node.js** 18+ et **npm**
- **Expo CLI** : `npm install -g expo-cli`
- **Compte Firebase** avec projet créé
- **Xcode** (pour iOS) ou **Android Studio** (pour Android)

### 1. Cloner le Projet

```bash
git clone https://github.com/lecuyerpsychologue-lab/rankedapp.git
cd rankedapp
```

### 2. Installer les Dépendances

```bash
npm install
```

### 3. Configuration Firebase

1. Créer un projet Firebase sur [console.firebase.google.com](https://console.firebase.google.com)
2. Activer **Authentication** (Google, Apple)
3. Créer une base de données **Cloud Firestore**
4. Copier les credentials Firebase

### 4. Variables d'Environnement

Copier `.env.example` vers `.env` et remplir les valeurs :

```bash
cp .env.example .env
```

Éditer `.env` :

```env
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id

# OAuth
GOOGLE_CLIENT_ID_IOS=your_google_client_id_ios
GOOGLE_CLIENT_ID_ANDROID=your_google_client_id_android
GOOGLE_CLIENT_ID_WEB=your_google_client_id_web
APPLE_CLIENT_ID=your_apple_client_id
```

### 5. Configurer OAuth

#### Google Sign-In

1. Aller sur [Google Cloud Console](https://console.cloud.google.com)
2. Créer des credentials OAuth 2.0 pour iOS, Android et Web
3. Ajouter les Client IDs dans `.env`

#### Apple Sign-In (iOS)

1. Activer "Sign in with Apple" dans votre compte développeur Apple
2. Configurer dans Xcode : Signing & Capabilities → "+ Capability" → Sign in with Apple

### 6. Déployer Firebase Functions

```bash
cd firebase/functions
npm install
npm run build
firebase deploy --only functions
```

## 🚀 Lancement

### Mode Développement

```bash
# Lancer Expo
npm start

# Lancer sur iOS
npm run ios

# Lancer sur Android
npm run android

# Lancer sur Web (preview)
npm run web
```

### Build de Production

```bash
# Build iOS
eas build --platform ios

# Build Android
eas build --platform android
```

## 📁 Structure du Projet

```
rankedapp/
├── app/                      # Screens avec Expo Router
│   ├── (auth)/              # Authentification
│   │   ├── login.tsx
│   │   └── onboarding.tsx
│   ├── (tabs)/              # Onglets principaux
│   │   ├── index.tsx        # Home
│   │   ├── circles.tsx      # Cercles
│   │   ├── vote.tsx         # Vote
│   │   └── profile.tsx      # Profil
│   ├── circle/[id].tsx      # Détail d'un cercle
│   └── _layout.tsx          # Layout racine
├── components/              # Composants React
│   ├── ui/                  # Composants UI réutilisables
│   │   ├── GlassCard.tsx
│   │   ├── AuraCard.tsx
│   │   ├── GradientButton.tsx
│   │   ├── RadarChart.tsx
│   │   └── ParticleBackground.tsx
│   ├── CircleCard.tsx
│   └── ProfileHeader.tsx
├── lib/                     # Helpers & Configuration
│   ├── firebase.ts          # Configuration Firebase
│   ├── auth.ts              # Authentification
│   ├── firestore.ts         # Base de données
│   ├── i18n.ts              # Internationalisation
│   └── haptics.ts           # Retours haptiques
├── stores/                  # État global (Zustand)
│   ├── authStore.ts
│   ├── circlesStore.ts
│   └── votesStore.ts
├── theme/                   # Design system
│   ├── colors.ts            # Palette de couleurs
│   ├── typography.ts        # Typographie
│   └── animations.ts        # Configurations d'animations
├── locales/                 # Fichiers de traduction
│   ├── en.json              # Anglais
│   ├── fr.json              # Français
│   ├── es.json              # Espagnol
│   ├── de.json              # Allemand
│   ├── it.json              # Italien
│   └── pt.json              # Portugais
├── legal/                   # Documents légaux
│   ├── privacy-policy.md
│   ├── terms-of-service.md
│   └── cookie-policy.md
├── firebase/                # Firebase Cloud Functions
│   └── functions/
│       └── src/
│           ├── index.ts
│           ├── calculateScores.ts
│           └── notifications.ts
├── assets/                  # Images, fonts, etc.
├── .env.example             # Template variables d'environnement
├── app.json                 # Configuration Expo
├── babel.config.js          # Configuration Babel
├── tailwind.config.js       # Configuration Tailwind CSS
├── tsconfig.json            # Configuration TypeScript
└── package.json             # Dépendances
```

## 🎨 Design System — "Aura Liquide"

### Palette de Couleurs

- **Fonds** : Deep Black (#050507), Soft Black (#0D0D12), Elevated (#16161F)
- **Auras (stats)** :
  - 😂 Humour : #FFE66D (jaune soleil)
  - 🧠 Intelligence : #7B68EE (violet électrique)
  - 💪 Fiabilité : #4ECDC4 (turquoise)
  - 🔥 Charisme : #FF6B6B (corail)
  - 🎨 Créativité : #F093FB (rose magenta)
  - 👑 Global : #FFD700 (or)

### Effets Visuels

- **Aura Glow** : Halos lumineux qui pulsent doucement
- **Particules** : Fond avec particules flottantes
- **Transitions** : 300-500ms ease-out
- **Haptics** : Micro-vibrations sur les interactions

## 🌍 Internationalisation

6 langues supportées avec détection automatique :
- 🇫🇷 Français (défaut si langue latine)
- 🇬🇧 English (défaut global)
- 🇪🇸 Español
- 🇩🇪 Deutsch
- 🇮🇹 Italiano
- 🇵🇹 Português

Changement manuel possible dans les paramètres.

## 🔥 Firebase Configuration

### Collections Firestore

```
users/
  {userId}/
    displayName: string
    email: string
    photoURL: string
    stats: {
      humor: number
      intelligence: number
      reliability: number
      charisma: number
      creativity: number
      global: number
    }
    circleIds: string[]
    createdAt: timestamp

circles/
  {circleId}/
    name: string
    emoji: string
    color: string
    creatorId: string
    memberIds: string[]
    createdAt: timestamp

votes/
  {voteId}/
    circleId: string
    voterId: string
    weekId: string (format: YYYY-WW)
    votes: {
      humor: userId
      intelligence: userId
      reliability: userId
      charisma: userId
      creativity: userId
    }
    createdAt: timestamp
```

### Cloud Functions

- **calculateWeeklyScores** : Calcule les scores chaque dimanche à 23:59
- **sendVoteReminders** : Envoie des rappels chaque vendredi à 18:00

## 💎 Système Premium (Préparé)

### Plans

- **Free** : 2 cercles, 5 stats, publicité
- **Gold (2.99€/mois)** : 10 cercles, 10 stats, sans pub
- **Diamond (4.99€/mois)** : Illimité, voir qui a voté

### Gemmes 💎

Monnaie virtuelle pour acheter :
- Cadres de profil
- Thèmes personnalisés
- Super votes
- Stats bonus

## 🔒 Conformité Légale

- **RGPD** (Europe) : Consentement, droit à l'effacement, export des données
- **CCPA** (Californie) : "Do Not Sell My Personal Information"
- **App Store / Play Store** : Privacy labels, Sign in with Apple, 13+ ans
- Documents : Privacy Policy, Terms of Service, Cookie Policy

## 🧪 Tests & Linting

```bash
# Type checking
npm run type-check

# Linting
npm run lint
```

## 📝 Scripts Disponibles

```bash
npm start          # Lancer Expo Dev Server
npm run ios        # Lancer sur simulateur iOS
npm run android    # Lancer sur émulateur Android
npm run web        # Lancer sur navigateur
npm run lint       # Linter le code
npm run type-check # Vérifier les types TypeScript
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Merci de :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 📧 Contact

- **Support** : support@rankedapp.com
- **Privacy** : privacy@rankedapp.com
- **Website** : https://rankedapp.com

## 🙏 Remerciements

- [Expo](https://expo.dev)
- [Firebase](https://firebase.google.com)
- [React Native](https://reactnative.dev)
- [NativeWind](https://www.nativewind.dev)

---

Développé avec ❤️ par l'équipe RANKED
