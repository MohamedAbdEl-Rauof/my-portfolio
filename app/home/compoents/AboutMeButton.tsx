import React from 'react';
import {motion} from 'framer-motion';
import {Button, Box} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import {arrowAnimation, itemVariants} from './animations';

const AboutMeButton: React.FC = () => (
    <motion.div variants={itemVariants}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Link href="/about" passHref>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        component="a"
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
                            '&:hover': {
                                background: 'var(--primary)',
                                color: 'var(--primary-foreground)',
                                boxShadow: 'var(--shadow-md)',
                                transform: 'translateY(-1px)',
                                '& .arrow-icon': {
                                    transform: 'translateX(4px)',
                                },
                            },
                            '&:focus': {
                                outline: '2px solid var(--ring)',
                                outlineOffset: '2px',
                            },
                        }}
                    >
                        <span style={{marginRight: '8px'}}>See More About Me</span>
                        <motion.div 
                            className="arrow-icon"
                            animate={arrowAnimation}
                            style={{ transition: 'transform 0.3s ease' }}
                        >
                            <ArrowForwardIcon fontSize="small"/>
                        </motion.div>
                    </Button>
                </motion.div>
            </Link>
        </Box>
    </motion.div>
);

export default AboutMeButton;