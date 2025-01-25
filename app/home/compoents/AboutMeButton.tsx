import React from 'react';
import {motion} from 'framer-motion';
import {Button} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {arrowAnimation, itemVariants} from './animations';

const AboutMeButton: React.FC = () => (
    <motion.div variants={itemVariants}>
        <Button
            variant="text"
            sx={{
                color: 'var(--primary)',
                '&:hover': {
                    textDecoration: 'underline',
                },
            }}
            href="/about"
        >
            <span>See More About Me</span>
            <motion.div animate={arrowAnimation}>
                <ArrowForwardIcon className="font-light"/>
            </motion.div>
        </Button>
    </motion.div>
);

export default AboutMeButton;