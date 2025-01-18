"use client";

import {useTheme} from 'next-themes';
import React from 'react';
import Image from "next/image";

const ThemeToggle = () => {
    const {theme, setTheme} = useTheme();

    return (
        <button
            aria-label="Toggle theme"
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            {theme === 'dark' ? (
                <Image
                    src="/svg/darkIcon.svg"
                    alt="Logo"
                    width={40}
                    height={65}
                    style={{
                        filter: theme === 'dark' ? 'invert(1)' : 'none'
                    }}
                />

            ) : (
                <Image
                    src="/svg/lightIcon.svg"
                    alt="Logo"
                    width={40}
                    height={65}
                    style={{
                        filter: theme === 'dark' ? 'invert(1)' : 'none'
                    }}
                />
            )}
        </button>
    );
}

export default ThemeToggle;