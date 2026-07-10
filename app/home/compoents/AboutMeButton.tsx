"use client";

import React from 'react';
import {motion} from 'framer-motion';
import {Button, Box} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import {useTranslation} from 'react-i18next';
import {useLanguage} from '@/app/providers/AppProviders';
import {arrowAnimation, itemVariants} from './animations';

const AboutMeButton: React.FC = () => {
    const {t} = useTranslation();
    const {dir} = useLanguage();
    const isRtl = dir === 'rtl';
    // "Forward" points left in RTL — flip the drift animation and mirror the icon.
    const directedArrowAnimation = {
        ...arrowAnimation,
        x: (arrowAnimation.x as number[]).map((v) => (isRtl ? -v : v)),
    };
    return (
    <motion.div variants={itemVariants}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button
                    component={Link}
                    href="/about"
                    variant="text"
                    aria-label="Learn more about me"
                    sx={{
                        color: 'var(--primary)',
                        padding: '12px 24px',
                        borderRadius: 3,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 500,
                        background: 'var(--gradient-accent)',
                        border: '1px solid var(--border)',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none',
                        '&:hover': {
                            background: 'var(--primary)',
                            color: 'var(--primary-foreground)',
                            boxShadow: 'var(--shadow-md)',
                            transform: 'translateY(-1px)',
                            '& .arrow-icon': {
                                transform: isRtl ? 'translateX(-4px)' : 'translateX(4px)',
                            },
                        },
                        '&:focus': {
                            outline: '2px solid var(--ring)',
                            outlineOffset: '2px',
                        },
                    }}
                >
                    {/* marginInlineEnd: logical property — inline styles bypass the emotion RTL cache */}
                    <span style={{marginInlineEnd: '8px'}}>{t('home.aboutMe')}</span>
                    <motion.div
                        className="arrow-icon"
                        animate={directedArrowAnimation}
                        style={{ transition: 'transform 0.3s ease', display: 'flex' }}
                    >
                        <ArrowForwardIcon fontSize="small" sx={{transform: isRtl ? 'scaleX(-1)' : 'none'}}/>
                    </motion.div>
                </Button>
            </motion.div>
        </Box>
    </motion.div>
    );
};

export default AboutMeButton;