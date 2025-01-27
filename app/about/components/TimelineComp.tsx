import React, {useCallback} from 'react';
import {Box, Card, CardContent, Container, styled, Typography} from '@mui/material';
import {Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator} from '@mui/lab';
import aboutContent from '../../../public/data/about-content.json';
import {motion} from 'framer-motion';
import dynamic from 'next/dynamic';
import MuiLink from '@mui/material/Link';
import NextLink from 'next/link';

const TimelineIcon = dynamic(() => import('@mui/icons-material/Timeline'));
const PsychologyIcon = dynamic(() => import('@mui/icons-material/Psychology'));
const TravelExploreIcon = dynamic(() => import('@mui/icons-material/TravelExplore'));

const iconMap: { [key: string]: React.ComponentType } = {
    Timeline: TimelineIcon,
    Psychology: PsychologyIcon,
    Explore: TravelExploreIcon,
};

const StyledTimeline = styled(Timeline)(() => ({
    padding: 0,
    '& .MuiTimelineItem-root': {
        minHeight: 70,
    },
    '& .MuiTimelineContent-root': {
        padding: '6px 16px',
    },
    '& .MuiTimelineDot-root': {
        margin: 0,
    },
}));

const TimelineComp = React.memo(() => {
    const isExternalLink = useCallback((url: string) => {
        return url.startsWith('http://') || url.startsWith('https://');
    }, []);

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.5}
        }
    };

    return (
        <Container maxWidth="lg" sx={{paddingTop: '100px'}}>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
                    <Box sx={{maxWidth: '1000px', width: '100%', p: 3}} className="space-y-16">
                        <motion.div variants={itemVariants}>
                            <Typography variant="h2" component="h1" className="font-black" gutterBottom>
                                {aboutContent.title}
                            </Typography>
                        </motion.div>
                        <StyledTimeline position="alternate">
                            {aboutContent.sections.map((section, index) => {
                                const IconComponent = iconMap[section.icon];
                                return (
                                    <TimelineItem key={index}>
                                        <TimelineSeparator>
                                            <TimelineDot color="primary">
                                                {IconComponent && (
                                                    <Box sx={{fontSize: 'small'}}>
                                                        <IconComponent/>
                                                    </Box>
                                                )}
                                            </TimelineDot>
                                            {index !== aboutContent.sections.length - 1 && <TimelineConnector/>}
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <motion.div variants={itemVariants}>
                                                <Card elevation={3} sx={{
                                                    mb: 2,
                                                    width: '100%',
                                                    maxWidth: '600px',
                                                    ml: index % 2 === 0 ? 'auto' : 0,
                                                    mr: index % 2 === 1 ? 'auto' : 0,
                                                    backgroundColor: 'var(--background)',
                                                    color: 'var(--foreground)',
                                                }}>
                                                    <CardContent>
                                                        <Box sx={{
                                                            display: 'flex',
                                                            flexDirection: {xs: 'column', sm: 'row'},
                                                            justifyContent: {xs: 'center', sm: 'space-between'},
                                                            alignItems: {xs: 'flex-start', sm: 'center'},
                                                            gap: {xs: 2, sm: 0},
                                                            mb: 2
                                                        }}>
                                                            <Typography variant="h6" component="h2"
                                                                        sx={{textAlign: {xs: 'center', sm: 'left'}}}>
                                                                {section.title}
                                                            </Typography>
                                                            {isExternalLink(section.link.url) ? (
                                                                <MuiLink
                                                                    href={section.link.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    aria-label={`External link to ${section.link.text}`}
                                                                    sx={{
                                                                        color: 'var(--secondary)',
                                                                        textDecoration: 'underline',
                                                                        '&:hover': {
                                                                            color: 'var(--primary)',
                                                                            backgroundColor: 'transparent',
                                                                        },
                                                                    }}
                                                                >
                                                                    {section.link.text}
                                                                </MuiLink>
                                                            ) : (
                                                                <NextLink href={section.link.url} passHref>
                                                                    <MuiLink
                                                                        aria-label={`Internal link to ${section.link.text}`}
                                                                        sx={{
                                                                            color: 'var(--secondary)',
                                                                            textDecoration: 'underline',
                                                                            '&:hover': {
                                                                                color: 'var(--primary)',
                                                                                backgroundColor: 'transparent',
                                                                            },
                                                                        }}
                                                                    >
                                                                        {section.link.text}
                                                                    </MuiLink>
                                                                </NextLink>
                                                            )}
                                                        </Box>
                                                        <Typography variant="body1" sx={{textAlign: 'left'}}>
                                                            {section.content}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        </TimelineContent>
                                    </TimelineItem>
                                );
                            })}
                        </StyledTimeline>
                    </Box>
                </Box>
            </motion.div>
        </Container>
    );
});

TimelineComp.displayName = 'TimelineComp';

export default TimelineComp;