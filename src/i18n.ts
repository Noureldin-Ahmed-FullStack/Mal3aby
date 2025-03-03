import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi) // Load translations from JSON files
  .use(LanguageDetector) // Detect language from the browser
  .use(initReactI18next) // Bind with React
  .init({
    supportedLngs: ["en", "ar"], // Define supported languages
    fallbackLng: "en", // Default language
    detection: {
      order: ["localStorage", "navigator", "htmlTag", "cookie"],
      caches: ["localStorage", "cookie"], // Cache the language setting
    },
    backend: {
        loadPath: "/locales/{{lng}}/global.json", // Path to translation files
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
