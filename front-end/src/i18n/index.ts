import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import bootstrapLtr from "bootstrap/dist/css/bootstrap.min.css?url";
import bootstrapRtl from "bootstrap/dist/css/bootstrap.rtl.min.css?url";

import en from "./locales/en.json";
import ar from "./locales/ar.json";

export const SUPPORTED_LANGUAGES = ["en", "ar"] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

// Sets <html lang/dir> and swaps the Bootstrap stylesheet between LTR and RTL builds.
function applyLanguage(lng: string) {
    const dir = i18n.dir(lng);
    document.documentElement.lang = lng;
    document.documentElement.dir = dir;

    let link = document.getElementById("bootstrap-css") as HTMLLinkElement | null;
    if (!link) {
        link = document.createElement("link");
        link.id = "bootstrap-css";
        link.rel = "stylesheet";
        document.head.prepend(link);
    }
    link.href = dir === "rtl" ? bootstrapRtl : bootstrapLtr;
}

i18n.on("languageChanged", applyLanguage);

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {translation: en},
            ar: {translation: ar},
        },
        fallbackLng: "en",
        supportedLngs: SUPPORTED_LANGUAGES,
        nonExplicitSupportedLngs: true,
        load: "languageOnly",
        interpolation: {escapeValue: false},
        detection: {
            order: ["localStorage", "navigator"],
            lookupLocalStorage: "lang",
            caches: ["localStorage"],
        },
    });

export default i18n;
