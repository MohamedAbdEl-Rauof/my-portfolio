import React from "react";
import { motion } from "framer-motion";
import { Box, Typography, Chip } from "@mui/material";
import Link from "next/link";
import { itemVariants } from "./animations";

const IntroText: React.FC = () => (
  <Box sx={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
    <motion.div
      variants={itemVariants}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Typography
        variant="h6"
        component="p"
        paragraph
        sx={{
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          lineHeight: 1.7,
          color: 'var(--secondary)',
          marginBottom: '2rem',
        }}
      >
        <span className="gradient-text font-bold">Front-End Developer</span>  passionate about building fast, responsive, and visually engaging web applications using React.js, Next.js, and modern JavaScript tools.
      </Typography>
    </motion.div>

    <motion.div
      variants={itemVariants}
      transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.1 }}
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', marginBottom: '2rem' }}>
        {['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS'].map((tech, index) => (
          <motion.div
            key={tech}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
          >
            <Chip
              label={tech}
              sx={{
                background: 'var(--gradient-accent)',
                color: 'var(--foreground)',
                fontWeight: '500',
                border: '1px solid var(--border)',
                '&:hover': {
                  background: 'var(--gradient-primary)',
                  color: 'var(--primary-foreground)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            />
          </motion.div>
        ))}
      </Box>
    </motion.div>

    <motion.div
      variants={itemVariants}
      transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.2 }}
    >
      <Typography
        variant="body1"
        paragraph
        sx={{
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          lineHeight: 1.6,
          color: 'var(--muted-foreground)',
          marginBottom: '2rem',
        }}
      >
        Check out my{" "}
        <Link href="/projects" className="inline-block">
          <motion.span
            className="font-bold text-primary hover:underline cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="View my projects"
          >
            Projects
          </motion.span>
        </Link>{" "}
        to see how I turn complex problems into elegant, user-friendly solutions.
      </Typography>
    </motion.div>

    <motion.div
      variants={itemVariants}
      transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.3 }}
    >
      <Typography
        variant="body1"
        paragraph
        sx={{
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          lineHeight: 1.6,
          color: 'var(--muted-foreground)',
        }}
      >
        Always learning and adapting to new challenges. When not coding, I&apos;m exploring tech,
        enjoying music, and finding inspiration in everyday life. Ready to bring your ideas to life?{" "}
        <Link href="/contact" className="inline-block">
          <motion.span
            className="font-bold text-primary hover:underline cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Contact me"
          >
            Let&apos;s connect
          </motion.span>
        </Link>{" "}
        and create something amazing together.
      </Typography>
    </motion.div>
  </Box>
);

export default IntroText;
