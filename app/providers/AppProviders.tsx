"use client";

import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {I18nextProvider} from 'react-i18next';
import {CacheProvider} from '@emotion/react';
import createCache, {EmotionCache} from '@emotion/cache';
import {prefixer} from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import i18n, {DEFAULT_LANGUAGE, getInitialLanguage, isRtl, Language, STORAGE_KEY} from '@/app/i18n/config';

interface LanguageContextValue {
    lang: Language;
    dir: 'ltr' | 'rtl';
    setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const useLanguage = (): LanguageContextValue => {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within AppProviders');
    return ctx;
};

// Build the two emotion caches once. Switching the active cache re-renders all
// MUI/emotion styles mirrored (RTL) or normal (LTR) — no page reload.
const ltrCache: EmotionCache = createCache({key: 'mui', prepend: true, stylisPlugins: [prefixer]});
const rtlCache: EmotionCache = createCache({key: 'muirtl', prepend: true, stylisPlugins: [prefixer, rtlPlugin]});

const AppProviders: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [lang, setLangState] = useState<Language>(DEFAULT_LANGUAGE);

    // Sync to the persisted language after mount (avoids SSR/client mismatch).
    useEffect(() => {
        const initial = getInitialLanguage();
        setLangState(initial);
        void i18n.changeLanguage(initial);
    }, []);

    // Keep <html lang> and <html dir> in sync with the active language.
    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('lang', lang);
        root.setAttribute('dir', isRtl(lang) ? 'rtl' : 'ltr');
    }, [lang]);

    const setLang = useCallback((next: Language) => {
        setLangState(next);
        void i18n.changeLanguage(next);
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(STORAGE_KEY, next);
        }
    }, []);

    const dir = isRtl(lang) ? 'rtl' : 'ltr';
    const value = useMemo<LanguageContextValue>(() => ({lang, dir, setLang}), [lang, dir, setLang]);

    return (
        <LanguageContext.Provider value={value}>
            <I18nextProvider i18n={i18n}>
                <CacheProvider value={dir === 'rtl' ? rtlCache : ltrCache}>
                    {children}
                </CacheProvider>
            </I18nextProvider>
        </LanguageContext.Provider>
    );
};

export default AppProviders;
