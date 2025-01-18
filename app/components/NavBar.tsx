"use client";
import React, {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {AppBar, Box, Button, Container, Drawer, IconButton, List, ListItem, ListItemText, Toolbar} from '@mui/material';
import {useTheme} from 'next-themes';
import ThemeToggle from "@/app/components/ThemeToggle";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const NavBar: React.FC = () => {
    const pathname = usePathname();
    const {theme, systemTheme} = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const currentTheme = theme === 'system' ? systemTheme : theme;

    const navItems = [
        {name: 'About', path: '/about'},
        {name: 'Projects', path: '/projects'},
        {name: 'Contact', path: '/contact'},
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters className="mt-10 justify-between">
                    <Link href="/" passHref legacyBehavior>
                        <Box
                            component="a"
                            sx={{
                                flexGrow: 0,
                                display: 'flex',
                                alignItems: 'center',
                                mr: 2,
                                textDecoration: 'none',
                            }}
                        >
                            <Image
                                src="/svg/logo.svg"
                                alt="Logo"
                                width={40}
                                height={65}
                                style={{
                                    filter: currentTheme === 'dark' ? 'invert(1)' : 'none'
                                }}
                            />
                        </Box>
                    </Link>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}} gap={3}>
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.path} passHref legacyBehavior>
                                <Button
                                    component="a"
                                    className={`nav-item ${pathname === item.path ? 'active' : ''}`}
                                    sx={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '2px',
                                            backgroundColor: 'var(--primary)',
                                            transform: 'scaleX(0)',
                                            transformOrigin: 'center',
                                            transition: 'transform 0.9s ease',
                                        },
                                        '&:hover::after, &.active::after': {
                                            transform: 'scaleX(1)',
                                            transformOrigin: 'center',
                                            transition: 'transform 0.4s ease',
                                        },
                                    }}
                                >
                                    {item.name}
                                </Button>
                            </Link>
                        ))}
                        <ThemeToggle/>
                    </Box>
                    <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            color="inherit"
                        >
                            <MenuIcon sx={{width: '50px', height: '60px'}}/>
                        </IconButton>
                    </Box>
                    <Drawer
                        variant="temporary"
                        anchor="right"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: {xs: 'block', md: 'none'},
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: '100%',
                                backgroundColor: 'var(--background)',
                                color: 'var(--foreground)',
                            },
                        }}
                    >
                        <Box sx={{textAlign: 'right', p: 2}}>
                            <IconButton onClick={handleDrawerToggle} sx={{color: 'var(--foreground)'}}>
                                <CloseIcon/>
                            </IconButton>
                        </Box>
                        <List>
                            {navItems.map((item) => (
                                <ListItem
                                    key={item.name}
                                    disablePadding
                                    className={pathname === item.path ? 'active' : ''}
                                    sx={{
                                        '&:active': {
                                            '& .MuiTypography-root::hover': {
                                                transform: 'scaleX(1)',
                                            },
                                        },
                                    }}
                                >
                                    <Link href={item.path} passHref style={{width: '100%'}}>
                                        <ListItemText
                                            primary={item.name}
                                            sx={{
                                                textAlign: 'center',
                                                py: 2,
                                                color: 'var(--foreground)',
                                                '& .MuiTypography-root': {
                                                    fontSize: '1.5rem',
                                                    position: 'relative',
                                                    display: 'inline-block',
                                                    padding: '0.25em 0',
                                                    '&::after': {
                                                        content: '""',
                                                        position: 'absolute',
                                                        bottom: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '2px',
                                                        backgroundColor: 'var(--primary)',
                                                        transform: 'scaleX(0)',
                                                        transformOrigin: 'center',
                                                        transition: 'transform 0.3s ease',
                                                    },
                                                },
                                            }}
                                            onClick={handleDrawerToggle}
                                        />
                                    </Link>
                                </ListItem>
                            ))}
                            <ListItem sx={{justifyContent: 'center', mt: 2}}>
                                <ThemeToggle/>
                            </ListItem>
                        </List>
                    </Drawer>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;