import React from "react";
import { motion } from "framer-motion";
import { Button, Box } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DescriptionIcon from "@mui/icons-material/Description";
import { itemVariants } from "./animations";

const CVButton: React.FC = () => (
  <motion.div variants={itemVariants}>
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        justifyContent: "start",
        mt: 7,
        mb: 7,
      }}
    >
      <Button
        variant="contained"
        startIcon={<DescriptionIcon />}
        href="/Mohamed AbdEl-Rauof - React Developer.pdf"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          backgroundColor: "var(--primary)",
          color: "white",
          px: 3,
          py: 1.5,
          borderRadius: 2,
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 600,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
          },
          "&:focus": {
            outline: "2px solid var(--primary)",
            outlineOffset: "2px",
          },
        }}
        aria-label="View my CV (opens in a new tab)"
      >
        View My CV
      </Button>

      <Button
        variant="outlined"
        startIcon={<DownloadIcon />}
        href="/Mohamed AbdEl-Rauof - React Developer.pdf"
        download="Mohamed AbdEl-Rauof - React Developer.pdf"
        sx={{
          borderColor: "var(--primary)",
          color: "var(--primary)",
          px: 3,
          py: 1.5,
          borderRadius: 2,
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 600,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
          "&:focus": {
            outline: "2px solid var(--primary)",
            outlineOffset: "2px",
          },
        }}
        aria-label="Download my CV"
      >
        Download CV
      </Button>
    </Box>
  </motion.div>
);

export default CVButton;
