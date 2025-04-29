"use client";

import ContactForm from "./components/ContactForm";
import {Box, Container, Paper, Typography} from "@mui/material";
import {motion} from "framer-motion";

const ContactUs = () => {
    return (
        <Container maxWidth="md">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <Box sx={{mt: 10}}>
                    <motion.div
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{delay: 0.2, duration: 0.5}}
                    >
                        <Typography
                            variant="h4"
                            component="h1"
                            gutterBottom
                            sx={{color: 'var(--primary)'}}
                        >
                            Contact Us
                        </Typography>
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, scale: 0.9}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{delay: 0.4, duration: 0.5}}
                    >
                        <Paper
                            elevation={3}
                            sx={{
                                backgroundColor: 'var(--background)',
                                color: 'var(--foreground)',
                                transition: 'background-color 0.3s ease, color 0.3s ease',
                            }}
                        >
                            <Box sx={{p: 4}}>
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    gutterBottom
                                    sx={{color: 'var(--primary)'}}
                                >
                                    Get in Touch
                                </Typography>
                                <Typography
                                    variant="body1"
                                    paragraph
                                    sx={{color: 'var(--secondary)'}}
                                >
                                    Have a question or want to work together? Fill out the form below and I&#39;ll get
                                    back
                                    to you
                                    as soon as possible.
                                </Typography>
                                <ContactForm/>
                            </Box>
                        </Paper>
                    </motion.div>
                </Box>
            </motion.div>
        </Container>
    );
};

export default ContactUs;