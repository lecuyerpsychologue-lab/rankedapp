import { create } from 'zustand';
import { Vote } from '../lib/firestore';

/**
 * Store Zustand pour les votes dans RANKED
 */

interface VotesState {
  // État
  currentWeekId: string;
  votes: Record<string, Vote>; // Key: circleId
  isLoading: boolean;

  // Actions
  setCurrentWeekId: (weekId: string) => void;
  setVoteForCircle: (circleId: string, vote: Vote) => void;
  getVoteForCircle: (circleId: string) => Vote | undefined;
  hasVotedForCircle: (circleId: string) => boolean;
  setIsLoading: (loading: boolean) => void;
  clearVotes: () => void;
}

export const useVotesStore = create<VotesState>((set, get) => ({
  // État initial
  currentWeekId: '',
  votes: {},
  isLoading: false,

  // Actions
  setCurrentWeekId: (weekId) => set({ currentWeekId: weekId }),
  
  setVoteForCircle: (circleId, vote) =>
    set((state) => ({
      votes: {
        ...state.votes,
        [circleId]: vote,
      },
    })),
  
  getVoteForCircle: (circleId) => {
    const state = get();
    return state.votes[circleId];
  },
  
  hasVotedForCircle: (circleId) => {
    const state = get();
    return circleId in state.votes;
  },
  
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  clearVotes: () =>
    set({
      votes: {},
      isLoading: false,
    }),
}));
