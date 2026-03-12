import React from 'react';
import {motion} from 'framer-motion';
import {Box, IconButton, Typography} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {itemVariants, socialIconAnimation} from './animations';

const socialLinks = [
    {icon: <GitHubIcon/>, link: "https://github.com/MohamedAbdEl-Rauof", label: "GitHub", color: "#333"},
    {icon: <LinkedInIcon/>, link: "https://www.linkedin.com/in/mohamed-abd-el-raouf-6b5b3b235/", label: "LinkedIn", color: "#0077b5"},
    {icon: <EmailIcon/>, link: "mailto:mohamedabdelrauof112@gmail.com", label: "Email", color: "#ea4335"},
    {icon: <InstagramIcon/>, link: "https://www.instagram.com/mohamed.abdelrauoff/", label: "Instagram", color: "#e4405f"},
    {icon: <FacebookIcon/>, link: "https://www.facebook.com/profile.php?id=100040578035349", label: "Facebook", color: "#1877f2"},
    {icon: <WhatsAppIcon/>, link: "https://wa.me/966569447804", label: "WhatsApp", color: "#25D366"},
];

const SocialIcons: React.FC = () => (
    <motion.div variants={itemVariants}>
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            mt: 4,
            gap: 2 
        }}>
            <Typography 
                variant="body2" 
                sx={{ 
                    color: 'var(--muted-foreground)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                }}
            >
                Connect with me
            </Typography>
            
            <Box sx={{ 
                display: 'flex', 
                gap: 1,
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                {socialLinks.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={socialIconAnimation}
                        whileHover={{ 
                            scale: 1.1,
                            y: -2
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <IconButton
                            aria-label={`Visit ${item.label}`}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                width: '48px',
                                height: '48px',
                                color: 'var(--secondary)',
                                background: 'var(--gradient-accent)',
                                border: '1px solid var(--border)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    color: item.color,
                                    background: 'var(--card)',
                                    borderColor: item.color,
                                    boxShadow: `0 4px 12px ${item.color}20`,
                                    transform: 'translateY(-2px)',
                                },
                                '&:focus': {
                                    outline: `2px solid ${item.color}`,
                                    outlineOffset: '2px',
                                },
                            }}
                        >
                            {item.icon}
                        </IconButton>
                    </motion.div>
                ))}
            </Box>
        </Box>
    </motion.div>
);

export default React.memo(SocialIcons);