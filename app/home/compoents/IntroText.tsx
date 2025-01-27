import React from 'react';
import {motion} from 'framer-motion';
import {Box, Typography} from '@mui/material';
import Link from "next/link";
import {itemVariants} from './animations';

const IntroText: React.FC = () => (
    <>
        <motion.div
            variants={itemVariants}
            transition={{type: "spring", stiffness: 400, damping: 10}}
        >
            <Typography variant="body1" component="h1" paragraph>
                Full-stack developer. Passionate about crafting seamless web experiences
                from front to back.
                Check out my <Link href="/Mohamed Abd El-Raouf Full Stack Resume.pdf" target="_blank"
                                   rel="noopener noreferrer">
                <span className="font-bold p-1 hover:underline" aria-label="View my CV (opens in a new tab)">CV</span>
            </Link> and <Link href="/projects">
                <span className="font-bold p-1 hover:underline" aria-label="View my projects">Projects</span>
            </Link> to see how I turn complex problems into elegant, user-friendly solutions.
            </Typography>
        </motion.div>
        <motion.div
            variants={itemVariants}
            transition={{type: "spring", stiffness: 400, damping: 10}}
        >
            <Typography variant="body1" paragraph>
                Minimalist in design and code, always adapting to new challenges. When not coding, I&apos;m exploring
                tech,
                enjoying music, and finding inspiration in everyday life.
                Ready to bring your ideas to life? <Link href="/contact">
                <Box component="span" sx={{fontWeight: 'bold', '&:hover': {textDecoration: 'underline'}}}
                     aria-label="Contact me">Let&apos;s connect</Box>
            </Link> and create something amazing together.
            </Typography>
        </motion.div>
    </>
);

export default IntroText;