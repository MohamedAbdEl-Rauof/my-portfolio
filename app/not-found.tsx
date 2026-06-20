"use client";

import React from "react";
import { motion } from "framer-motion";
import { Box, Button, Container, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";

const floatVariants = {
    animate: {
        y: [0, -18, 0],
        transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
    },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    gap: 3,
                    py: 8,
                }}
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}
                >
                    {/* Animated 404 number */}
                    <motion.div variants={itemVariants}>
                        <motion.div variants={floatVariants} animate="animate">
                            <Typography
                                component="h1"
                                sx={{
                                    fontSize: "clamp(6rem, 20vw, 14rem)",
                                    fontWeight: 900,
                                    lineHeight: 1,
                                    background: "var(--gradient-primary)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    letterSpacing: "-0.04em",
                                    userSelect: "none",
                                    position: "relative",
                                }}
                            >
                                404
                                {/* Decorative blobs matching AnimatedName */}
                                <Box
                                    component={motion.div}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                    sx={{
                                        position: "absolute",
                                        top: "-10px",
                                        right: "-24px",
                                        width: 22,
                                        height: 22,
                                        background: "var(--gradient-primary)",
                                        borderRadius: "50%",
                                        filter: "blur(2px)",
                                    }}
                                />
                                <Box
                                    component={motion.div}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                    sx={{
                                        position: "absolute",
                                        bottom: "-10px",
                                        left: "-18px",
                                        width: 16,
                                        height: 16,
                                        background: "var(--gradient-secondary)",
                                        borderRadius: "50%",
                                        filter: "blur(2px)",
                                    }}
                                />
                            </Typography>
                        </motion.div>
                    </motion.div>

                    {/* Title */}
                    <motion.div variants={itemVariants}>
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{ fontWeight: 700, color: "var(--foreground)" }}
                        >
                            {t("notFound.title")}
                        </Typography>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.div variants={itemVariants}>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "var(--secondary)",
                                maxWidth: 480,
                                lineHeight: 1.7,
                                fontSize: "1.05rem",
                            }}
                        >
                            {t("notFound.subtitle")}
                        </Typography>
                    </motion.div>

                    {/* Divider line */}
                    <motion.div variants={itemVariants}>
                        <Box
                            sx={{
                                width: 60,
                                height: 3,
                                borderRadius: 2,
                                background: "var(--gradient-primary)",
                            }}
                        />
                    </motion.div>

                    {/* Back to Home button */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            component={NextLink}
                            href="/"
                            variant="contained"
                            startIcon={<HomeIcon />}
                            sx={{
                                background: "var(--gradient-primary)",
                                color: "var(--primary-foreground)",
                                px: 4,
                                py: 1.5,
                                borderRadius: 3,
                                textTransform: "none",
                                fontSize: "1rem",
                                fontWeight: 600,
                                boxShadow: "var(--shadow-lg)",
                                border: "none",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    boxShadow: "var(--shadow-xl)",
                                    transform: "translateY(-2px)",
                                },
                                "&:focus": {
                                    outline: "2px solid var(--ring)",
                                    outlineOffset: "2px",
                                },
                            }}
                        >
                            {t("notFound.backHome")}
                        </Button>
                    </motion.div>
                </motion.div>
            </Box>
        </Container>
    );
}
