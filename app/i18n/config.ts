import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './locales/en.json';
import ar from './locales/ar.json';

export const SUPPORTED_LANGUAGES = ['en', 'ar'] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const RTL_LANGUAGES: Language[] = ['ar'];
export const STORAGE_KEY = 'lang';
export const DEFAULT_LANGUAGE: Language = 'en';

export const isRtl = (lang: string): boolean => RTL_LANGUAGES.includes(lang as Language);

/**
 * Read the persisted language from localStorage (client only).
 * Falls back to the default language during SSR / first paint.
 */
export const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return (stored && SUPPORTED_LANGUAGES.includes(stored as Language))
        ? (stored as Language)
        : DEFAULT_LANGUAGE;
};

if (!i18n.isInitialized) {
    void i18n
        .use(initReactI18next)
        .init({
            resources: {
                en: {translation: en},
                ar: {translation: ar},
            },
            lng: getInitialLanguage(),
            fallbackLng: DEFAULT_LANGUAGE,
            supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
            interpolation: {escapeValue: false},
            react: {useSuspense: false},
        });
}

export default i18n;
