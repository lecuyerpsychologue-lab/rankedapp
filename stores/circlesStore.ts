import { create } from 'zustand';
import { Circle } from '../lib/firestore';

/**
 * Store Zustand pour les cercles dans RANKED
 */

interface CirclesState {
  // État
  circles: Circle[];
  selectedCircle: Circle | null;
  isLoading: boolean;

  // Actions
  setCircles: (circles: Circle[]) => void;
  addCircle: (circle: Circle) => void;
  updateCircle: (circleId: string, updates: Partial<Circle>) => void;
  removeCircle: (circleId: string) => void;
  setSelectedCircle: (circle: Circle | null) => void;
  setIsLoading: (loading: boolean) => void;
  clearCircles: () => void;
}

export const useCirclesStore = create<CirclesState>((set) => ({
  // État initial
  circles: [],
  selectedCircle: null,
  isLoading: false,

  // Actions
  setCircles: (circles) => set({ circles }),
  
  addCircle: (circle) =>
    set((state) => ({ circles: [...state.circles, circle] })),
  
  updateCircle: (circleId, updates) =>
    set((state) => ({
      circles: state.circles.map((circle) =>
        circle.id === circleId ? { ...circle, ...updates } : circle
      ),
    })),
  
  removeCircle: (circleId) =>
    set((state) => ({
      circles: state.circles.filter((circle) => circle.id !== circleId),
      selectedCircle:
        state.selectedCircle?.id === circleId ? null : state.selectedCircle,
    })),
  
  setSelectedCircle: (circle) => set({ selectedCircle: circle }),
  
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  clearCircles: () =>
    set({
      circles: [],
      selectedCircle: null,
      isLoading: false,
    }),
}));
