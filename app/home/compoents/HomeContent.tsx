"use client";

import React from 'react';
import {ThemeProvider} from "next-themes";
import {Box, Container} from '@mui/material';
import {motion} from 'framer-motion';
import {containerVariants} from './animations';
import AnimatedName from './AnimatedName';
import IntroText from './IntroText';
import AboutMeButton from './AboutMeButton';
import SocialIcons from './SocialIcons';

export default function HomeContent() {
    return (
        <ThemeProvider attribute="class">
            <Container maxWidth="md" sx={{paddingTop: '100px'}}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Box my={4}>
                        <AnimatedName/>
                        <IntroText/>
                        <AboutMeButton/>
                        <SocialIcons/>
                    </Box>
                </motion.div>
            </Container>
        </ThemeProvider>
    );
}