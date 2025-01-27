import React from 'react';
import {motion} from 'framer-motion';
import {Grid, IconButton} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import {itemVariants, socialIconAnimation} from './animations';

const socialLinks = [
    {icon: <GitHubIcon/>, link: "https://github.com/MohamedAbdEl-Rauof", label: "GitHub"},
    {icon: <LinkedInIcon/>, link: "https://www.linkedin.com/in/mohamed-abd-el-raouf-6b5b3b235/", label: "LinkedIn"},
    {icon: <EmailIcon/>, link: "mailto:mohamedabdelrauof112@gmail.com", label: "Email"},
    {icon: <InstagramIcon/>, link: "https://www.instagram.com/mohamed.abdelrauoff/", label: "Instagram"},
    {icon: <FacebookIcon/>, link: "https://www.facebook.com/profile.php?id=100040578035349", label: "Facebook"},
];

const SocialIcons: React.FC = () => (
    <motion.div variants={itemVariants}>
        <Grid container mt={2} spacing={2}>
            {socialLinks.map((item, index) => (
                <Grid item key={index}>
                    <motion.div
                        variants={socialIconAnimation}
                        whileHover={{scale: 1.2}}
                        whileTap={{scale: 0.9}}
                    >
                        <IconButton
                            aria-label={`Visit ${item.label}`}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                width: '40px',
                                height: '40px',
                                color: 'var(--secondary)',
                                '&:hover': {
                                    color: 'var(--primary)',
                                    backgroundColor: 'var(--hover)',
                                },
                            }}
                        >
                            {item.icon}
                        </IconButton>
                    </motion.div>
                </Grid>
            ))}
        </Grid>
    </motion.div>
);

export default React.memo(SocialIcons);