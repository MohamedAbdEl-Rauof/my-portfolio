"use client";

import React from 'react';
import {ThemeProvider} from "next-themes";
import {Box, Button, Container, Grid, Typography} from '@mui/material';
import {motion} from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function Home() {
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                when: "beforeChildren",
                staggerChildren: 0.3
            }
        },
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        },
    };

    const textAnimation = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2
            }
        }
    };

    const letterAnimation = {
        hidden: {
            opacity: 0,
            y: 50,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            }
        }
    };

    const colorAnimation = {
        animate: {
            color: [
                'hsl(0, 0%, 0%)',
                'hsl(0, 0%, 20%)',
                'hsl(0, 0%, 40%)',
                'hsl(0, 0%, 60%)',
                'hsl(0, 0%, 80%)',
                'hsl(0, 0%, 100%)',
                'hsl(0, 0%, 80%)',
                'hsl(0, 0%, 60%)',
                'hsl(0, 0%, 40%)',
                'hsl(0, 0%, 20%)',
                'hsl(0, 0%, 0%)',
            ],
            transition: {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
            }
        }
    };

    const arrowAnimation = {
        x: [0, 10, 0],
        transition: {
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const socialIconAnimation = {
        hidden: {scale: 0},
        visible: {
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        }
    };

    return (
        <ThemeProvider attribute="class">
            <Container maxWidth="md" sx={{paddingTop: '100px'}}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Box my={4}>
                        <motion.div variants={itemVariants}>
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
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            // whileHover={{scale: 1.05}}
                            transition={{type: "spring", stiffness: 400, damping: 10}}
                        >
                            <Typography variant="body1" paragraph>
                                Your friendly neighborhood frontend developer, UX architect, and JavaScript
                                engineer. I spend my days (and often nights) painting the Internet canvas with Projects
                                and lines of code, turning zeroes and ones into immersive, interactive experiences.
                            </Typography>
                        </motion.div>
                        <motion.div
                            variants={itemVariants}
                            // whileHover={{scale: 1.05}}
                            transition={{type: "spring", stiffness: 400, damping: 10}}
                        >
                            <Typography variant="body1" paragraph>
                                Bona fide photochromic Lens enthusiast - sunlight or indoors, I've got it covered. I
                                tread the path of minimalism, finding beauty in simplicity and order. When I'm not
                                crafting beautiful web experiences, you can find me reading Articles or swaying to the
                                rhythm of
                                Pop Music & Jazz, losing myself in the captivating flow of melodies. Anyways, you can
                                Contact Me.
                            </Typography>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Button
                                variant="text"
                                sx={{
                                    color: 'var(--primary)',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                }}
                            >
                                <span>See More About Me</span>
                                <motion.div animate={arrowAnimation}>
                                    <ArrowForwardIcon className="font-light"/>
                                </motion.div>
                            </Button>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Grid container mt={2} spacing={2}>
                                {[
                                    {
                                        icon: <GitHubIcon/>,
                                        link: "https://github.com/mohamed-abd-el-raouf",
                                    },
                                    {
                                        icon: <LinkedInIcon/>,
                                        link: "https://www.linkedin.com/in/mohamed-abd-el-raouf/",
                                    },
                                    {icon: <EmailIcon/>, link: "mailto:mohamed.abd.el@gmail.com"},
                                    {
                                        icon: <InstagramIcon/>,
                                        link: "https://www.instagram.com/mohamed_abd_el_raouf/",
                                    },
                                    {
                                        icon: <FacebookIcon/>,
                                        link: "https://www.facebook.com/mohamedabdelraouf",
                                    },
                                ].map((item, index) => (
                                    <Grid item key={index}>
                                        <motion.div
                                            variants={socialIconAnimation}
                                            whileHover={{scale: 1.2}}
                                            whileTap={{scale: 0.9}}
                                        >
                                            <Button
                                                href={item.link}
                                                target="_blank"
                                                startIcon={item.icon}
                                                sx={{
                                                    color: 'var(--secondary)',
                                                    '&:hover': {
                                                        color: 'var(--primary)',
                                                        backgroundColor: 'var(--hover)',
                                                    },
                                                }}
                                            >
                                            </Button>
                                        </motion.div>
                                    </Grid>
                                ))}
                            </Grid>
                        </motion.div>
                    </Box>
                </motion.div>
            </Container>
        </ThemeProvider>
    );
}