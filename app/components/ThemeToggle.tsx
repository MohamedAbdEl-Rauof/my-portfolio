"use client";

import {useTheme} from 'next-themes';
import React, {useState} from 'react';
import Image from "next/image";
import {Button} from "@mui/material";
import styled from '@emotion/styled';

const RotatingImage = styled(Image)`
    transition: transform 0.5s ease-in-out;

    &.rotate {
        transform: rotate(360deg);
    }
`;

const ThemeToggle = () => {
    const {theme, setTheme} = useTheme();
    const [rotating, setRotating] = useState(false);

    const toggleTheme = () => {
        setRotating(true);
        setTheme(theme === 'dark' ? 'light' : 'dark');
        setTimeout(() => setRotating(false), 500);
    };

    return (
        <Button
            aria-label="Toggle theme"
            className="p-2 rounded-full transition-colors hover:bg-primary/10 dark:hover:bg-primary/20"
            onClick={toggleTheme}
        >
            <RotatingImage
                src={theme === 'dark' ? "/svg/darkIcon.svg" : "/svg/lightIcon.svg"}
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