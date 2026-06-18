"use client";

import {Box, Button, TextField, Typography} from "@mui/material";
import {toast, Toaster} from 'react-hot-toast';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import {useTranslation} from "react-i18next";

// Messages are i18n keys, resolved with t() at render time — keeps the schema
// at module scope while still localizing validation errors.
const schema = z.object({
    name: z.string().min(2, {message: "contact.validation.nameRequired"}).max(15, {message: "contact.validation.nameMax"}),
    email: z.string().email({message: "contact.validation.emailInvalid"}),
    message: z.string().min(2, {message: "contact.validation.messageRequired"}).max(100, {message: "contact.validation.messageMax"}),
});

type FormData = z.infer<typeof schema>;

const ContactForm = () => {
    const {t} = useTranslation();

    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    // Translate a zod error message key (falls back to raw text if not a key).
    const errMsg = (key?: string) => (key ? t(key) : undefined);

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
            toast.success(t('contact.success'), {
                style: {
                    background: 'var(--accent)',
                    color: 'var(--foreground)',
                },
            });
            reset();
        } catch (error) {
            console.error(error);
            toast.error(t('contact.failure'), {
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
                {t('contact.formTitle')}
            </Typography>
            <TextField
                id="outlined-name"
                label={t('contact.name')}
                variant="outlined"
                fullWidth
                error={!!errors.name}
                helperText={errMsg(errors.name?.message)}
                {...register("name")}
                sx={textFieldSx}
            />
            <TextField
                id="outlined-email"
                label={t('contact.email')}
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errMsg(errors.email?.message)}
                {...register("email")}
                sx={textFieldSx}
            />
            <TextField
                id="outlined-message"
                label={t('contact.message')}
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                error={!!errors.message}
                helperText={errMsg(errors.message?.message)}
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
                {t('contact.send')}
            </Button>
        </Box>
    );
};

export default ContactForm;