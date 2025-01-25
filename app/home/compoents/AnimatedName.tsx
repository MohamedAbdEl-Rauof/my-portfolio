import React from 'react';
import {motion} from 'framer-motion';
import {Box} from '@mui/material';
import {colorAnimation, letterAnimation, textAnimation} from './animations';

const AnimatedName: React.FC = () => (
    <Box sx={{position: 'relative', display: 'inline-block', marginBottom: '20px'}}>
        <motion.div
            variants={textAnimation}
            initial="hidden"
            animate="visible"
        >
            {"I'M Mohamed Abd El-Raouf".toUpperCase().split("").map((char, index) => (
                <motion.span
                    key={`${char}-${index}`}
                    variants={letterAnimation}
                    animate={colorAnimation.animate}
                    style={{
                        display: 'inline-block',
                        marginRight: char === ' ' ? '0.25em' : '0',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: 'var(--text-color)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundImage: 'linear-gradient(to right, currentColor, currentColor)',
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.div>
    </Box>
);

export default AnimatedName;