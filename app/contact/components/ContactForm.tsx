"use client";

import {Box, Button, TextField, Typography} from "@mui/material";
import {toast, Toaster} from 'react-hot-toast';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";

const schema = z.object({
    name: z.string().min(2, {message: "Name is required"}).max(15, {message: "Name should not exceed 12 characters"}),
    email: z.string().email({message: "Invalid email address"}),
    message: z.string().min(2, {message: "Message is required"}).max(100, {message: "Message should not exceed 100 characters"}),
});

type FormData = z.infer<typeof schema>;

const ContactForm = () => {

    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const sendEmail = async (data: FormData) => {
        const templateParams = {
            to_name: process.env.NEXT_PUBLIC_TO_NAME,
            from_name: data.name,
            from_email: data.email,
            message: data.message,
        };

        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_USER_ID
            );
            toast.success("Email sent successfully! We will contact you soon.", {
                style: {
                    background: 'var(--accent)',
                    color: 'var(--foreground)',
                },
            });
            reset();
        } catch (error) {
            console.error(error);
            toast.error("Failed to send email. Please try again later.", {
                style: {
                    background: 'var(--accent)',
                    color: 'var(--foreground)',
                },
            });
        }
    };

    const textFieldSx = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'var(--secondary)',
            },
            '&:hover fieldset': {
                borderColor: 'var(--primary)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'var(--primary)',
            },
        },
        '& .MuiInputLabel-root': {
            color: 'var(--foreground)',
            '&.Mui-focused': {
                color: 'var(--primary)',
            },
        },
        '& .MuiInputBase-input': {
            color: 'var(--foreground)',
        },
        '& .MuiFormHelperText-root': {
            color: 'var(--error)',
        },
    };

    return (
        <Box component="form" onSubmit={handleSubmit(sendEmail)}
             sx={{
                 display: 'flex',
                 flexDirection: 'column',
                 gap: 2,
                 color: 'var(--foreground)',
                 backgroundColor: 'var(--background)',
                 padding: '2rem',
                 borderRadius: '8px',
                 boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
             }}>
            <Toaster position="top-right" reverseOrder={false}/>
            <Typography variant="h6" gutterBottom sx={{color: 'var(--primary)'}}>
                Contact Us
            </Typography>
            <TextField
                id="outlined-name"
                label="Name"
                variant="outlined"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register("name")}
                sx={textFieldSx}
            />
            <TextField
                id="outlined-email"
                label="Email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email")}
                sx={textFieldSx}
            />
            <TextField
                id="outlined-message"
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                error={!!errors.message}
                helperText={errors.message?.message}
                {...register("message")}
                sx={textFieldSx}
            />
            <Button
                variant="contained"
                type="submit"
                disabled={!isValid}
                sx={{
                    bgcolor: 'var(--primary)',
                    color: 'var(--background)',
                    width: '11rem',
                    padding: '10px 20px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    borderRadius: '8px',
                    '&:disabled': {
                        bgcolor: 'var(--secondary)',
                        color: 'var(--background)',
                        opacity: 0.7,
                        cursor: 'not-allowed',
                    },
                }}
            >
                Send Message
            </Button>
        </Box>
    );
};

export default ContactForm;