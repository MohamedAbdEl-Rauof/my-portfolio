"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppBar, Toolbar, Button, Box, Container } from '@mui/material';
import { useTheme } from 'next-themes';
import ThemeToggle from "@/app/components/ThemeToggle";

const NavBar: React.FC = () => {
    const pathname = usePathname();
    const { theme, systemTheme } = useTheme();

    const navItems = [
        { name: 'About', path: '/about' },
        { name: 'Projects', path: '/projects' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Container maxWidth="lg">
                <Toolbar disableGutters className="mt-10 justify-between" >
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
                                    filter: theme === 'dark' ? 'invert(1)' : 'none'
                                }}
                            />
                        </Box>
                    </Link>
                    <Box sx={{ display: 'flex' }} gap={3}>
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.path} passHref legacyBehavior>
                                <Button
                                    component="a"
                                    className={`hover-bg ${pathname === item.path ? 'text-primary' : 'text-foreground'}`}
                                >
                                    {item.name}
                                </Button>
                            </Link>
                        ))}
                        <ThemeToggle />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;