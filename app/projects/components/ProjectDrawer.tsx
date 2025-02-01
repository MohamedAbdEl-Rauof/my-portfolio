import AnimatedCursor from 'react-animated-cursor';
import {Box, Button, CardMedia, Chip, Drawer, IconButton, Typography} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CodeIcon from '@mui/icons-material/Code';
import LaunchIcon from '@mui/icons-material/Launch';
import {Project} from './Projects';

interface ProjectDrawerProps {
    open: boolean;
    onClose: () => void;
    project: Project | null;
}

const ProjectDrawer = ({open, onClose, project}: ProjectDrawerProps) => {
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: {xs: '100%', sm: '50%', md: 400, lg: 550},
                    maxWidth: '100%',
                    bgcolor: 'var(--background)',
                    color: 'var(--foreground)',
                    boxShadow: 3,
                }
            }}
        >
            <Box sx={{display: 'flex', flexDirection: 'column', height: '100%', cursor: 'none'}}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        borderBottom: 1,
                        borderColor: 'var(--accent)',
                    }}
                >
                    <IconButton
                        onClick={onClose}
                        aria-label="close drawer"
                        sx={{
                            color: 'var(--primary)',
                            '&:hover': {
                                backgroundColor: 'var(--accent)',
                            }
                        }}
                    >
                        <ArrowBackIcon/>
                    </IconButton>
                    <Typography variant="h6" sx={{fontWeight: 'bold', color: 'var(--primary)'}}>
                        Project Details
                    </Typography>
                </Box>

                {project && (
                    <Box sx={{flexGrow: 1, overflow: 'auto', p: 3}}>
                        <Typography variant="h5" gutterBottom sx={{fontWeight: 'bold', mb: 2, color: 'var(--primary)'}}>
                            {project.title}
                        </Typography>
                        <Typography variant="body1" paragraph sx={{mb: 2, color: 'var(--secondary)'}}>
                            {project.about}
                        </Typography>
                        <CardMedia
                            component="img"
                            height="100%"
                            image={project.image}
                            alt={project.title}
                            className="rounded-2xl"
                        />
                        <Typography variant="h6" gutterBottom sx={{fontWeight: 'bold', mt: 2, color: 'var(--primary)'}}>
                            About:
                        </Typography>
                        <Typography variant="body2" paragraph sx={{mb: 3, color: 'var(--secondary)'}}>
                            {project.description}
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{fontWeight: 'bold', mb: 2, color: 'var(--primary)'}}>
                            Technologies:
                        </Typography>
                        <Box sx={{mb: 3}}>
                            {project.technologies.map((tech, index) => (
                                <Chip
                                    key={index}
                                    label={tech}
                                    sx={{mr: 1, mb: 1, bgcolor: 'var(--accent)', color: 'var(--primary)'}}
                                />
                            ))}
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, gap: 2}}>
                            <Button
                                variant="contained"
                                href={project.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                startIcon={<LaunchIcon/>}
                                fullWidth
                                sx={{
                                    bgcolor: 'var(--primary)',
                                    color: 'var(--background)',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                    transition: 'transform 0.3s ease-in-out',
                                }}
                            >
                                Visit Website
                            </Button>
                            <Button
                                variant="outlined"
                                href={project.src}
                                target="_blank"
                                rel="noopener noreferrer"
                                startIcon={<CodeIcon/>}
                                fullWidth
                                sx={{
                                    color: 'var(--primary)',
                                    borderColor: 'var(--primary)',
                                    '&:hover': {
                                        bgcolor: 'var(--accent)',
                                        transform: 'scale(1.05)',
                                    },
                                    transition: 'transform 0.3s ease-in-out',
                                }}
                            >
                                View Source
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
            <AnimatedCursor
                innerSize={8}
                outerSize={35}
                innerScale={1}
                outerScale={1.7}
                outerAlpha={0}
                innerStyle={{
                    backgroundColor: 'var(--primary)'
                }}
                outerStyle={{
                    border: '3px solid var(--primary)'
                }}
            />
        </Drawer>
    );
};

export default ProjectDrawer;