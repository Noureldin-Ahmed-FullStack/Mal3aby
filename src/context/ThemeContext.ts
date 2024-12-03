// src/store/themeStore.ts

import { create } from "zustand";

// Function to save state to local storage
const saveToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};
// Function to load state from local storage
const loadFromLocalStorage = (key: string) => {
  const saved = localStorage.getItem(key);
  return saved === 'dark' ? 'dark' : 'light'; // Defaults to 'light' if not found
};
type ThemeState = {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  ToggleTheme: () => void
};

const updateDocumentClass = (theme: 'light' | 'dark') => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
};
export const useThemeStore = create<ThemeState>((set) => ({
  // Initialize the theme from local storage and apply the class
  theme: (() => {
    const loadedTheme = loadFromLocalStorage('theme');
    updateDocumentClass(loadedTheme); // Apply theme class on load
    return loadedTheme;
  })(),

  // Function to set a specific theme
  setTheme: (theme) => {
    saveToLocalStorage('theme', theme); // Save the theme to local storage
    updateDocumentClass(theme); // Apply the Tailwind dark mode class
    set({ theme });
  },

  // Function to toggle between light and dark themes
  ToggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      saveToLocalStorage('theme', newTheme); // Save the new theme to local storage
      updateDocumentClass(newTheme); // Apply the Tailwind dark mode class
      return { theme: newTheme };
    }),
}));