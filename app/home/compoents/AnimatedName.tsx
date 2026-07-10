"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/app/providers/AppProviders';
import { letterAnimation, textAnimation } from './animations';

const AnimatedName: React.FC = React.memo(() => {
    const { t } = useTranslation();
    const { dir } = useLanguage();

    const animatedText = useMemo(() => {
        const fullText = `${t('home.greeting')} ${t('home.name')}`;
        // Arabic is cursive — splitting into characters breaks letter joining.
        // Animate per-word for RTL (preserves shaping) and per-letter for LTR.
        const isArabic = dir === 'rtl';
        const tokens = isArabic ? fullText.split(' ') : fullText.toUpperCase().split('');

        return tokens.map((token, index) => (
            <motion.span
                key={`${token}-${index}`}
                variants={letterAnimation}
                style={{
                    display: 'inline-block',
                    marginRight: isArabic ? '0.25em' : (token === ' ' ? '0.25em' : '0'),
                    fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                    fontWeight: '800',
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: isArabic ? 'normal' : '0.05em',
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                }}
            >
                {token === ' ' ? ' ' : token}
            </motion.span>
        ));
    }, [t, dir]);

    return (
        <Box
            component="section"
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                marginBottom: '2rem',
                padding: '2rem 0.7rem',
            }}
        >
            {/* Availability badge — recruiters see it before anything else */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box
                    component="span"
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5em',
                        marginBottom: '1.25rem',
                        padding: '0.4em 1em',
                        borderRadius: '999px',
                        border: '1px solid var(--border)',
                        background: 'var(--gradient-accent)',
                        color: 'var(--foreground)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                    }}
                >
                    <Box
                        component="span"
                        sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: '#22c55e',
                            boxShadow: '0 0 0 3px rgba(34, 197, 94, 0.25)',
                            animation: 'pulse 2s ease-in-out infinite',
                            '@keyframes pulse': {
                                '0%, 100%': { opacity: 1 },
                                '50%': { opacity: 0.5 },
                            },
                        }}
                    />
                    {t('home.availableBadge')}
                </Box>
            </motion.div>
            <motion.div
                variants={textAnimation}
                initial="hidden"
                animate="visible"
                style={{ position: 'relative' }}
            >
                <Typography
                    component="h1"
                    variant="h1"
                    sx={{
                        fontSize: 'clamp(2rem, 5vw, 4rem)',
                        fontWeight: '900',
                        lineHeight: 1.1,
                        marginBottom: '1rem',
                        position: 'relative',
                        display: 'inline-block',
                    }}
                >
                    {animatedText}
                </Typography>

                {/* Decorative elements */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '-20px',
                        width: '20px',
                        height: '20px',
                        background: 'var(--gradient-primary)',
                        borderRadius: '50%',
                        filter: 'blur(1px)',
                    }}
                />
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    style={{
                        position: 'absolute',
                        bottom: '-10px',
                        left: '-20px',
                        width: '15px',
                        height: '15px',
                        background: 'var(--gradient-secondary)',
                        borderRadius: '50%',
                        filter: 'blur(1px)',
                    }}
                />
            </motion.div>

            {/* Subtitle */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        color: 'var(--secondary)',
                        fontWeight: '400',
                        fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                        marginTop: '1rem',
                        opacity: 0.9,
                    }}
                >
                    {t('home.role')}
                </Typography>
            </motion.div>
        </Box>
    );
});

AnimatedName.displayName = 'AnimatedName';

export default AnimatedName;