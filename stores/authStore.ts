import { create } from 'zustand';
import { User } from 'firebase/auth';
import { UserProfile } from '../lib/firestore';

/**
 * Store Zustand pour l'authentification dans RANKED
 */

interface AuthState {
  // État
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  isOnboarded: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setIsLoading: (loading: boolean) => void;
  setIsOnboarded: (onboarded: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // État initial
  user: null,
  userProfile: null,
  isLoading: true,
  isOnboarded: false,

  // Actions
  setUser: (user) => set({ user }),
  setUserProfile: (profile) => set({ userProfile: profile }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setIsOnboarded: (onboarded) => set({ isOnboarded: onboarded }),
  logout: () =>
    set({
      user: null,
      userProfile: null,
      isOnboarded: false,
    }),
}));
