import React from 'react';
import {motion} from 'framer-motion';
import {Button} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import {arrowAnimation, itemVariants} from './animations';

const AboutMeButton: React.FC = () => (
    <motion.div variants={itemVariants}>
        <Link href="/about" passHref>
            <Button
                component="a"
                variant="text"
                aria-label="Learn more about me"
                sx={{
                    color: 'var(--primary)',
                    padding: 0,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        textDecoration: 'underline',
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                    '&:focus': {
                        outline: '2px solid var(--primary)',
                        outlineOffset: '2px',
                    },
                }}
            >
                <span style={{marginRight: '8px'}}>See More About Me</span>
                <motion.div animate={arrowAnimation}>
                    <ArrowForwardIcon fontSize="small"/>
                </motion.div>
            </Button>
        </Link>
    </motion.div>
);

export default AboutMeButton;