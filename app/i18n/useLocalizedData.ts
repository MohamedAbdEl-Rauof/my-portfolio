"use client";

import {useEffect, useState} from 'react';
import {useLanguage} from '@/app/providers/AppProviders';

interface LocalizedDataState<T> {
    data: T | null;
    loading: boolean;
    error: boolean;
}

/**
 * Fetches a per-language JSON file from `/public/data/{lang}/{name}.json` and
 * re-fetches whenever the active language changes — enabling live (no-reload)
 * language switching for data-driven sections.
 *
 * @param name file name without extension, e.g. 'projects' or 'experience'
 */
export function useLocalizedData<T>(name: string): LocalizedDataState<T> {
    const {lang} = useLanguage();
    const [state, setState] = useState<LocalizedDataState<T>>({data: null, loading: true, error: false});

    useEffect(() => {
        let cancelled = false;
        setState({data: null, loading: true, error: false});

        fetch(`/data/${lang}/${name}.json`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((json: T) => {
                if (!cancelled) setState({data: json, loading: false, error: false});
            })
            .catch((err) => {
                console.error(`Error loading /data/${lang}/${name}.json:`, err);
                if (!cancelled) setState({data: null, loading: false, error: true});
            });

        return () => {
            cancelled = true;
        };
    }, [lang, name]);

    return state;
}
