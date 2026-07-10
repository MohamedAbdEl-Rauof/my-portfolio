"use client";

import React from "react";
import { motion } from "framer-motion";
import { Box, Fab, Tooltip } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useTranslation } from "react-i18next";

const WHATSAPP_NUMBER = "966569447804";
const WHATSAPP_DISPLAY = "+966 56 944 7804";

const FloatingWhatsApp: React.FC = () => {
    const { t } = useTranslation();
    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("home.whatsappMessage"))}`;

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: { xs: 20, md: 28 },
                // Logical property: bottom-right in LTR, bottom-left in RTL.
                insetInlineEnd: { xs: 20, md: 28 },
                zIndex: 1200,
            }}
        >
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
            >
                <Tooltip title={`${t("home.whatsapp")} — ${WHATSAPP_DISPLAY}`} placement="top" arrow>
                    <Fab
                        component="a"
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t("home.whatsapp")}
                        sx={{
                            backgroundColor: "#25D366",
                            color: "#fff",
                            width: 56,
                            height: 56,
                            boxShadow: "0 4px 14px rgba(37, 211, 102, 0.5)",
                            "&:hover": {
                                backgroundColor: "#1EBE5D",
                                boxShadow: "0 6px 20px rgba(37, 211, 102, 0.65)",
                            },
                            "&::after": {
                                content: '""',
                                position: "absolute",
                                inset: 0,
                                borderRadius: "50%",
                                border: "2px solid #25D366",
                                animation: "whatsappPulse 2.5s ease-out infinite",
                            },
                            "@keyframes whatsappPulse": {
                                "0%": { transform: "scale(1)", opacity: 0.8 },
                                "70%": { transform: "scale(1.6)", opacity: 0 },
                                "100%": { transform: "scale(1.6)", opacity: 0 },
                            },
                        }}
                    >
                        <WhatsAppIcon sx={{ fontSize: 30 }} />
                    </Fab>
                </Tooltip>
            </motion.div>
        </Box>
    );
};

export default FloatingWhatsApp;
