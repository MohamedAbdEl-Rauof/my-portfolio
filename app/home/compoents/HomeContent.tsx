"use client";

import React from 'react';
import {Box, Container} from '@mui/material';
import {motion} from 'framer-motion';
import {containerVariants} from './animations';
import AnimatedName from './AnimatedName';
import IntroText from './IntroText';
import AboutMeButton from './AboutMeButton';
import SocialIcons from './SocialIcons';

export default function HomeContent() {
    return (
        <Container maxWidth="md" sx={{paddingTop: '100px'}}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <Box my={4} role="main" aria-label="Home content">
                    <AnimatedName/>
                    <IntroText/>
                    <AboutMeButton/>
                    <SocialIcons/>
                </Box>
            </motion.div>
        </Container>
    );
}