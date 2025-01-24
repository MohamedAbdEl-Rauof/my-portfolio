import React from 'react';
import {Box, Card, CardContent, Container, Link, styled, Typography} from '@mui/material';
import {Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator} from '@mui/lab';
import aboutContent from '../../../public/data/about-content.json';
import CodeTwoToneIcon from '@mui/icons-material/CodeTwoTone';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import {useTheme} from 'next-themes';
import {motion} from 'framer-motion';

const iconMap: { [key: string]: React.ComponentType } = {
    Coding: CodeTwoToneIcon,
    SentimentVerySatisfiedIcon: SentimentVerySatisfiedIcon,
    WhatshotIcon: WhatshotIcon,
};

const StyledTimeline = styled(Timeline)(({theme}) => ({
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

const Content = () => {
    const {theme} = useTheme();

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
        <Container maxWidth="lg" sx={{
            paddingTop: '100px',
        }}>
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
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            mb: 2
                                                        }}>
                                                            <Typography variant="h6" component="h2">
                                                                {section.title}
                                                            </Typography>
                                                            <Link href={section.link.url} target="_blank"
                                                                  rel="noopener noreferrer"
                                                                  sx={{color: 'var(--primary)'}}>
                                                                {section.link.text}
                                                            </Link>
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
};

export default Content;