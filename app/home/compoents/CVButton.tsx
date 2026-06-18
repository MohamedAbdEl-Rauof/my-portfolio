"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button, Box } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DescriptionIcon from "@mui/icons-material/Description";
import { useTranslation } from "react-i18next";
import { itemVariants } from "./animations";

const CVButton: React.FC = () => {
  const { t } = useTranslation();
  return (
  <motion.div variants={itemVariants}>
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        justifyContent: "center",
        mt: 4,
        mb: 4,
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="contained"
          startIcon={<DescriptionIcon />}
          href="/Mohamed AbdEl-Rauof - React Developer.pdf"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
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
              "&::before": {
                opacity: 1,
              },
            },
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
              transition: "left 0.5s ease",
            },
            "&:focus": {
              outline: "2px solid var(--ring)",
              outlineOffset: "2px",
            },
          }}
          aria-label="View my CV (opens in a new tab)"
        >
          {t('home.viewCV')}
        </Button>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          href="/Mohamed AbdEl-Rauof - React Developer.pdf"
          download="Mohamed AbdEl-Rauof - React Developer.pdf"
          sx={{
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
          }}
          aria-label="Download my CV"
        >
          {t('home.downloadCV')}
        </Button>
      </motion.div>
    </Box>
  </motion.div>
  );
};

export default CVButton;
