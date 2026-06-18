"use client";

import React from 'react';
import {Box, Card, CardContent, Chip, Container, styled, Typography} from '@mui/material';
import {Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator} from '@mui/lab';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import {motion} from 'framer-motion';
import {useLocalizedData} from '@/app/i18n/useLocalizedData';

interface ExperienceRole {
    company: string;
    role: string;
    period: string;
    location: string;
    summary: string;
    highlights: string[];
}

interface ExperienceData {
    title: string;
    roles: ExperienceRole[];
}

const StyledTimeline = styled(Timeline)(() => ({
    padding: 0,
    '& .MuiTimelineItem-root:before': {
        flex: 0,
        padding: 0,
    },
    '& .MuiTimelineDot-root': {
        margin: 0,
    },
}));

const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            when: 'beforeChildren',
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {duration: 0.5},
    },
};

const ExperienceSection = React.memo(() => {
    const {data: experienceData} = useLocalizedData<ExperienceData>('experience');

    if (!experienceData) return null;

    return (
        <Container maxWidth="lg" sx={{py: {xs: 8, md: 12}}}>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.2}}
                variants={containerVariants}
            >
                <Box sx={{maxWidth: '1000px', mx: 'auto', px: 3}}>
                    <motion.div variants={itemVariants}>
                        <Typography variant="h2" component="h2" className="font-black" gutterBottom
                                    sx={{textAlign: {xs: 'center', md: 'left'}}}>
                            {experienceData.title}
                        </Typography>
                    </motion.div>

                    <StyledTimeline position="right">
                        {experienceData.roles.map((role, index) => (
                            <TimelineItem key={index}>
                                <TimelineSeparator>
                                    <TimelineDot color="primary">
                                        <Box sx={{display: 'flex', fontSize: 'small'}}>
                                            <WorkOutlineIcon fontSize="small"/>
                                        </Box>
                                    </TimelineDot>
                                    {index !== experienceData.roles.length - 1 && <TimelineConnector/>}
                                </TimelineSeparator>
                                <TimelineContent>
                                    <motion.div variants={itemVariants}>
                                        <Card elevation={3} sx={{
                                            mb: 4,
                                            backgroundColor: 'var(--background)',
                                            color: 'var(--foreground)',
                                        }}>
                                            <CardContent>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: {xs: 'column', sm: 'row'},
                                                    justifyContent: 'space-between',
                                                    alignItems: {xs: 'flex-start', sm: 'center'},
                                                    gap: 1,
                                                    mb: 1,
                                                }}>
                                                    <Typography variant="h6" component="h3" sx={{fontWeight: 700}}>
                                                        {role.role}
                                                    </Typography>
                                                    {role.period && (
                                                        <Chip
                                                            label={role.period}
                                                            size="small"
                                                            sx={{
                                                                bgcolor: 'var(--accent)',
                                                                color: 'var(--primary)',
                                                                fontWeight: 600,
                                                            }}
                                                        />
                                                    )}
                                                </Box>
                                                <Typography variant="subtitle1"
                                                            sx={{color: 'var(--primary)', fontWeight: 600, mb: 0.5}}>
                                                    {role.company}
                                                    {role.location && (
                                                        <Typography component="span" variant="body2"
                                                                    sx={{color: 'var(--secondary)', ml: 1}}>
                                                            · {role.location}
                                                        </Typography>
                                                    )}
                                                </Typography>
                                                <Typography variant="body1" sx={{color: 'var(--secondary)', mb: 2}}>
                                                    {role.summary}
                                                </Typography>
                                                <Box component="ul" sx={{m: 0, pl: 3, display: 'flex', flexDirection: 'column', gap: 1}}>
                                                    {role.highlights.map((highlight, hIndex) => (
                                                        <Typography component="li" variant="body2" key={hIndex}
                                                                    sx={{color: 'var(--foreground)', lineHeight: 1.6}}>
                                                            {highlight}
                                                        </Typography>
                                                    ))}
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </StyledTimeline>
                </Box>
            </motion.div>
        </Container>
    );
});

ExperienceSection.displayName = 'ExperienceSection';

export default ExperienceSection;
