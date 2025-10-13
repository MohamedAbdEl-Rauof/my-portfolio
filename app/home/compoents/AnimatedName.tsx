import React, {useMemo} from 'react';
import {motion} from 'framer-motion';
import {Box, Typography} from '@mui/material';
import {colorAnimation, letterAnimation, textAnimation} from './animations';

const AnimatedName: React.FC = React.memo(() => {
    const animatedText = useMemo(() => (
        "I'M Mohamed Abd El-Raouf".toUpperCase().split("").map((char, index) => (
            <motion.span
                key={`${char}-${index}`}
                variants={letterAnimation}
                animate={colorAnimation.animate}
                style={{
                    display: 'inline-block',
                    marginRight: char === ' ' ? '0.25em' : '0',
                    fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                    fontWeight: '800',
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 30px rgba(23, 23, 23, 0.3)',
                    letterSpacing: '0.05em',
                }}
            >
                {char}
            </motion.span>
        ))
    ), []);

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
                padding: '2rem 0',
            }}
        >
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
                    Full Stack Developer & React Specialist
                </Typography>
            </motion.div>
        </Box>
    );
});

AnimatedName.displayName = 'AnimatedName';

export default AnimatedName;