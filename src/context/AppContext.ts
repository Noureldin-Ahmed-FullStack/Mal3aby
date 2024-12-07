// src/store/themeStore.ts

import { create } from "zustand";

interface appState {
  currentDevice: 'Android' | 'iOS' | 'Other' | null;
  setcurrentDevice: (user: 'Android' | 'iOS' | 'Other' | null) => void;
};


export const useAppContext = create<appState>((set) => ({
  currentDevice: null,
  setcurrentDevice: (currentDevice) => set({ currentDevice: currentDevice }),
}));