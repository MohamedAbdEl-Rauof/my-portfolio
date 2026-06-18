"use client";

import React, {useCallback, useState} from 'react';
import {IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import CheckIcon from '@mui/icons-material/Check';
import {useTranslation} from 'react-i18next';
import {useLanguage} from '@/app/providers/AppProviders';
import {Language} from '@/app/i18n/config';

interface LanguageOption {
    code: Language;
    label: string;
}

// Adding a new language later = one entry here (+ its locale & data files).
const LANGUAGES: LanguageOption[] = [
    {code: 'en', label: 'English'},
    {code: 'ar', label: 'العربية'},
];

const LanguageSwitcher: React.FC = () => {
    const {t} = useTranslation();
    const {lang, setLang} = useLanguage();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleSelect = useCallback((code: Language) => {
        setLang(code);
        setAnchorEl(null);
    }, [setLang]);

    return (
        <>
            <Tooltip title={t('nav.language')}>
                <IconButton
                    onClick={handleOpen}
                    aria-label={t('nav.language')}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    sx={{
                        color: 'var(--foreground)',
                        '&:hover': {
                            color: 'var(--primary)',
                            backgroundColor: 'transparent',
                        },
                    }}
                >
                    <PublicIcon/>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: 'var(--background)',
                            color: 'var(--foreground)',
                            border: '1px solid var(--border)',
                            minWidth: 160,
                        },
                    },
                }}
            >
                {LANGUAGES.map((option) => (
                    <MenuItem
                        key={option.code}
                        selected={option.code === lang}
                        onClick={() => handleSelect(option.code)}
                        sx={{
                            '&:hover': {backgroundColor: 'var(--accent)'},
                            '&.Mui-selected': {backgroundColor: 'var(--accent)'},
                            '&.Mui-selected:hover': {backgroundColor: 'var(--accent)'},
                        }}
                    >
                        <ListItemText primary={option.label}/>
                        {option.code === lang && (
                            <ListItemIcon sx={{minWidth: 'auto', ml: 1, color: 'var(--primary)'}}>
                                <CheckIcon fontSize="small"/>
                            </ListItemIcon>
                        )}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default LanguageSwitcher;
