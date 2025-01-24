import {Box, Button, TextField, Typography} from "@mui/material";
import {toast, Toaster} from 'react-hot-toast';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {useTheme} from 'next-themes';
import {useEffect, useState} from 'react';
import emailjs from "@emailjs/browser";


// Define the schema for form validation
const schema = z.object({
    name: z.string().min(2, {message: "Name is required"}),
    email: z.string().email({message: "Invalid email address"}),
    message: z.string().min(1, {message: "Message is required"}),
});

type FormData = z.infer<typeof schema>;

const ContactForm = () => {
    const {theme, systemTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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

    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDarkTheme = currentTheme === 'dark';

    const themeColors = {
        background: isDarkTheme ? '#0a0a0a' : '#ffffff',
        foreground: isDarkTheme ? '#ededed' : '#171717',
        primary: isDarkTheme ? '#4a90e2' : '#3366cc',
        secondary: isDarkTheme ? '#6c757d' : '#495057',
        hover: isDarkTheme ? '#357ae8' : '#2a52a2',
        accent: isDarkTheme ? '#28a745' : '#218838',
    };

    return (
        <Box component="form" onSubmit={handleSubmit(sendEmail)}
             sx={{
                 display: 'flex',
                 flexDirection: 'column',
                 gap: 2,
                 color: themeColors.foreground,
                 backgroundColor: themeColors.background,
             }}>
            <Toaster position="top-center" reverseOrder={false}/>
            <Typography variant="h6" gutterBottom sx={{color: themeColors.primary}}>
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
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: themeColors.secondary,
                        },
                        '&:hover fieldset': {
                            borderColor: themeColors.primary,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: themeColors.primary,
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: themeColors.secondary,
                    },
                    '& .MuiInputBase-input': {
                        color: themeColors.foreground,
                    },
                }}
            />
            <TextField
                id="outlined-email"
                label="Email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email")}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: themeColors.secondary,
                        },
                        '&:hover fieldset': {
                            borderColor: themeColors.primary,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: themeColors.primary,
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: themeColors.secondary,
                    },
                    '& .MuiInputBase-input': {
                        color: themeColors.foreground,
                    },
                }}
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
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: themeColors.secondary,
                        },
                        '&:hover fieldset': {
                            borderColor: themeColors.primary,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: themeColors.primary,
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: themeColors.secondary,
                    },
                    '& .MuiInputBase-input': {
                        color: themeColors.foreground,
                    },
                }}
            />
            <Button
                variant="contained"
                type="submit"
                disabled={!isValid}
                sx={{
                    bgcolor: themeColors.primary,
                    color: themeColors.background,
                    width: '11rem',
                    padding: '10px 20px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        bgcolor: themeColors.hover,
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
                    },
                    '&:active': {
                        transform: 'translateY(1px)',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    },
                    '&:disabled': {
                        bgcolor: themeColors.secondary,
                        color: themeColors.background,
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