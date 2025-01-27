"use client";

import {useTheme} from 'next-themes';
import React, {useCallback, useMemo, useState} from 'react';
import Image from "next/image";
import {Button} from "@mui/material";
import styled from '@emotion/styled';

const RotatingImage = styled(Image)`
    transition: transform 0.5s ease-in-out;

    &.rotate {
        transform: rotate(360deg);
    }
`;

const ROTATION_DURATION = 500;

const ThemeToggle = () => {
    const {theme, setTheme} = useTheme();
    const [rotating, setRotating] = useState(false);

    const toggleTheme = useCallback(() => {
        setRotating(true);
        setTheme(theme === 'light' ? 'dark' : 'light');
        setTimeout(() => setRotating(false), ROTATION_DURATION);
    }, [theme, setTheme]);


    const imageSrc = useMemo(() =>
            theme === 'dark' ? "/svg/darkIcon.svg" : "/svg/lightIcon.svg",
        [theme]);

    return (
        <Button
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="p-2 rounded-full transition-colors hover:bg-primary/10 dark:hover:bg-primary/20"
            onClick={toggleTheme}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleTheme();
                }
            }}>
            <RotatingImage
                src={imageSrc}
                alt="Theme toggle"
                width={40}
                height={65}
                className={rotating ? 'rotate' : ''}
                style={{
                    filter: theme === 'dark' ? 'invert(1)' : 'none'
                }}
            />
        </Button>
    );
}

export default ThemeToggle;