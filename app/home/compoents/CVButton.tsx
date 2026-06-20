"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Box, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DescriptionIcon from "@mui/icons-material/Description";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/app/providers/AppProviders";
import { itemVariants } from "./animations";

const EN_CV = "/mohamed-abd-el-rauof-full-stack-developer.pdf";
const AR_CV = "/mohamed-abd-el-rauof-full-stack-developer(ar).pdf";

const CV_OPTIONS = [
    { code: "en", labelKey: "home.cvEnglish" as const, file: EN_CV },
    { code: "ar", labelKey: "home.cvArabic" as const, file: AR_CV },
];

const viewButtonSx = {
    background: "var(--gradient-primary)",
    color: "var(--primary-foreground)",
    px: 4,
    py: 2,
    borderRadius: 3,
    textTransform: "none",
    fontSize: "1.1rem",
    fontWeight: 600,
    boxShadow: "var(--shadow-lg)",
    border: "none",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
    "&:hover": {
        boxShadow: "var(--shadow-xl)",
        transform: "translateY(-2px)",
    },
    "&:focus": {
        outline: "2px solid var(--ring)",
        outlineOffset: "2px",
    },
} as const;

const downloadButtonSx = {
    borderColor: "var(--primary)",
    color: "var(--primary)",
    backgroundColor: "transparent",
    px: 4,
    py: 2,
    borderRadius: 3,
    textTransform: "none",
    fontSize: "1.1rem",
    fontWeight: 600,
    border: "2px solid var(--primary)",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
    "&:hover": {
        background: "var(--primary)",
        color: "var(--primary-foreground)",
        boxShadow: "var(--shadow-lg)",
        transform: "translateY(-2px)",
    },
    "&:focus": {
        outline: "2px solid var(--ring)",
        outlineOffset: "2px",
    },
} as const;

const CVButton: React.FC = () => {
    const { t } = useTranslation();
    const { lang } = useLanguage();
    const [viewAnchor, setViewAnchor] = useState<null | HTMLElement>(null);
    const [dlAnchor, setDlAnchor] = useState<null | HTMLElement>(null);

    return (
        <motion.div variants={itemVariants}>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center", mt: 4, mb: 4 }}>

                {/* View CV */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        variant="contained"
                        startIcon={<DescriptionIcon />}
                        endIcon={<KeyboardArrowDownIcon />}
                        onClick={(e) => setViewAnchor(e.currentTarget)}
                        sx={viewButtonSx}
                        aria-label="View my CV"
                        aria-haspopup="true"
                        aria-expanded={Boolean(viewAnchor)}
                    >
                        {t("home.viewCV")}
                    </Button>
                    <Menu
                        anchorEl={viewAnchor}
                        open={Boolean(viewAnchor)}
                        onClose={() => setViewAnchor(null)}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        transformOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        {CV_OPTIONS.map((opt) => (
                            <MenuItem
                                key={opt.code}
                                component="a"
                                href={opt.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setViewAnchor(null)}
                                sx={{ cursor: "pointer" }}
                            >
                                <ListItemIcon sx={{ minWidth: 32, visibility: lang === opt.code ? "visible" : "hidden" }}>
                                    <CheckIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>{t(opt.labelKey)}</ListItemText>
                            </MenuItem>
                        ))}
                    </Menu>
                </motion.div>

                {/* Download CV */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        endIcon={<KeyboardArrowDownIcon />}
                        onClick={(e) => setDlAnchor(e.currentTarget)}
                        sx={downloadButtonSx}
                        aria-label="Download my CV"
                        aria-haspopup="true"
                        aria-expanded={Boolean(dlAnchor)}
                    >
                        {t("home.downloadCV")}
                    </Button>
                    <Menu
                        anchorEl={dlAnchor}
                        open={Boolean(dlAnchor)}
                        onClose={() => setDlAnchor(null)}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        transformOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        {CV_OPTIONS.map((opt) => (
                            <MenuItem
                                key={opt.code}
                                component="a"
                                href={opt.file}
                                download
                                onClick={() => setDlAnchor(null)}
                                sx={{ cursor: "pointer" }}
                            >
                                <ListItemIcon sx={{ minWidth: 32, visibility: lang === opt.code ? "visible" : "hidden" }}>
                                    <CheckIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>{t(opt.labelKey)}</ListItemText>
                            </MenuItem>
                        ))}
                    </Menu>
                </motion.div>

            </Box>
        </motion.div>
    );
};

export default CVButton;
