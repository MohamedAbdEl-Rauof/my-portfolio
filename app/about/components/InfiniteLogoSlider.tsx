import React from 'react';
import Image from 'next/image';
import {Box, Typography} from '@mui/material';
import {styled} from '@mui/system';
import {useTheme} from 'next-themes';
import logoData from '../../../public/data/about-logos.json';

const SliderContainer = styled(Box)({
    position: 'relative',
    width: '100%',
    overflowX: 'hidden',
    '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        width: '100px',
        height: '100%',
        zIndex: 2,
    },
    '&::before': {
        left: 0,
        background: 'linear-gradient(to right, var(--background), transparent)',
    },
    '&::after': {
        right: 0,
        background: 'linear-gradient(to left, var(--background), transparent)',
    },
});

const SlideContainer = styled(Box)({
    display: 'flex',
    overflow: 'hidden',
    width: '100%',
    marginBottom: '16px',
});

const SlideContent = styled(Box)<{ direction: 'left' | 'right' }>(({direction}) => ({
    display: 'flex',
    animation: `slide-${direction} 50s linear infinite`,
    '@keyframes slide-left': {
        '0%': {transform: 'translateX(0%)'},
        '100%': {transform: 'translateX(-50%)'},
    },
    '@keyframes slide-right': {
        '0%': {transform: 'translateX(-50%)'},
        '100%': {transform: 'translateX(0%)'},
    },
}));

const LogoWrapper = styled(Box)({
    flexShrink: 0,
    width: '200px',
    margin: '0 16px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '16px',
});

const LogoImage = styled(Image)({
    width: '80px',
    height: '80px',
    objectFit: 'contain',
});

const LogoText = styled(Typography)({
    fontSize: '0.75rem',
    maxWidth: '100px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
});

const InfiniteLogoSlider = () => {
    const {theme} = useTheme();

    return (
        <SliderContainer
            sx={{
                bgcolor: 'var(--background)',
                color: 'var(--foreground)',
                transition: 'background-color 0.3s ease, color 0.3s ease',
            }}
        >
            {logoData.logoGroups.map((group, groupIndex) => (
                <SlideContainer key={groupIndex}>
                    <SlideContent direction={groupIndex % 2 === 0 ? 'left' : 'right'}>
                        {[...group, ...group, ...group].map((logo, index) => (
                            <LogoWrapper key={`${groupIndex}-${index}`} sx={{
                                marginTop: (index + 1) % group.length === 0 ? '64px' : '64px', // Add extra margin after each group
                            }}>
                                <LogoImage
                                    src={logo.src}
                                    alt={logo.alt}
                                    width={80}
                                    height={80}
                                    style={{
                                        filter: theme === 'dark' ? 'invert(1)' : 'none',
                                        transition: 'filter 0.3s ease',
                                    }}
                                />
                                <LogoText sx={{fontSize: '20px'}}>
                                    {logo.alt}
                                </LogoText>
                            </LogoWrapper>
                        ))}
                    </SlideContent>
                </SlideContainer>
            ))}
        </SliderContainer>
    );
};

export default InfiniteLogoSlider;