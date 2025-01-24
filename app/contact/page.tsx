"use client";

import ContactForm from "./components/ContactForm";
import {Box, Container, Paper, Typography} from "@mui/material";

const ContactUs = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{mt: 10}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Contact Us
                </Typography>
                <Paper elevation={3}>
                    <Box sx={{p: 4}}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Get in Touch
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Have a question or want to work together? Fill out the form below and I'll get back to you
                            as soon as possible.
                        </Typography>
                        <ContactForm/>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default ContactUs;