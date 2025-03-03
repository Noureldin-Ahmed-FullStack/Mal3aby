
import { create } from "zustand";
import i18n from "../i18n";
// Function to save state to local storage
const saveToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
};
// Function to load state from local storage
const loadFromLocalStorage = (key: string) => {
    const saved = localStorage.getItem(key);
    return saved === 'ar' ? 'ar' : 'en'; // Defaults to 'en' if not found
};
type LangState = {
    lang: 'en' | 'ar';
    setLanguage: (lang: 'en' | 'ar') => void;
    ToggleLanguage: () => void
};

const updateDocumentClass = (lang: 'en' | 'ar') => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.classList.toggle('ar', lang === 'ar');
};
export const useLanguageStore = create<LangState>((set) => ({
    // Initialize the Language from local storage and apply the class
    lang: (() => {
        const loadedLanguage = loadFromLocalStorage('lang');
        updateDocumentClass(loadedLanguage); // Apply Language class on load
        return loadedLanguage;
    })(),

    // Function to set a specific Language
    setLanguage: (lang) => {
        saveToLocalStorage('lang', lang); // Save the lang to local storage
        updateDocumentClass(lang); // Apply the Tailwind ar mode class
        i18n.changeLanguage(lang); // Ensure i18n updates as well
        set({ lang });
    },

    // Function to toggle between en and ar Languages
    ToggleLanguage: () =>
        set((state) => {
            const newLang = state.lang === 'en' ? 'ar' : 'en';
            saveToLocalStorage('lang', newLang); // Save the new theme to local storage
            updateDocumentClass(newLang); // Apply the Tailwind ar mode class
            i18n.changeLanguage(newLang); // Change i18n language
            console.log("Language changed to:", newLang);
            return { lang: newLang };
        }),
}));