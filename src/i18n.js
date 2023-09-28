import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
  ku: {
    translation: {
      Delete: "سڕیەنەوە",
      "Find Your Dream Property ^500": "موڵکی خەونەکانت بدۆزەرەوە",
      "Discover Your Dream Property with Us":
        "لەگەڵ ئێمە موڵکی خەونەکانت بدۆزەرەوە",
      "Find Your Dream House ^500": "خانووی خەونەکانت بدۆزەرەوە ^500",
      "Find Your Dream Place ^500": "شوێنی خەونەکانت بدۆزەرەوە ^500",
      "Find Your Dream Land ^500": "زەوی خەونەکانت بدۆزەرەوە ^500",
      "Find Your Dream Villa ^500": "ڤێلای خەونەکانت بدۆزەرەوە ^500",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
