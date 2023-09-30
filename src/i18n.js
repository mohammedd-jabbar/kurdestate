import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(Backend) // Registering the back-end plugin
  .init({
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
