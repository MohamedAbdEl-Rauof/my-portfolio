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

const ProjectDrawer = ({open, onClose, project}: ProjectDrawerProps) => (
    <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
            sx: {
                width: {xs: '100%', sm: '50%', md: 400},
                maxWidth: '100%',
                bgcolor: 'background.paper',
                boxShadow: 3,
                cursor: 'default',
            }
        }}
    >
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    borderBottom: 1,
                    borderColor: 'divider'
                }}
            >
                <IconButton onClick={onClose} aria-label="close drawer">
                    <ArrowBackIcon className="cursor-pointer"/>
                </IconButton>
                <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                    Project Details
                </Typography>
            </Box>

            {project && (
                <Box sx={{flexGrow: 1, overflow: 'auto', p: 3}}>
                    <Typography variant="h5" gutterBottom sx={{fontWeight: 'bold', mb: 2}}>
                        {project.title}
                    </Typography>
                    <Typography variant="body1" paragraph sx={{mb: 2}}>
                        {project.about}
                    </Typography>
                    <CardMedia
                        component="img"
                        height="100%"
                        image={project.image}
                        alt={project.title}
                    />
                    <Typography variant="h6" gutterBottom sx={{fontWeight: 'bold', mt: 2}}>
                        About:
                    </Typography>
                    <Typography variant="body2" paragraph sx={{mb: 3}}>
                        {project.description}
                    </Typography>
                    <Typography variant="h6" gutterBottom sx={{fontWeight: 'bold', mb: 2}}>
                        Technologies:
                    </Typography>
                    <Box sx={{mb: 3}}>
                        {project.technologies.map((tech, index) => (
                            <Chip
                                key={index}
                                label={tech}
                                sx={{mr: 1, mb: 1, bgcolor: 'primary.light', color: 'primary.contrastText'}}
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
                            className="cursor-pointer"
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
                            className="cursor-pointer"
                        >
                            View Source
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    </Drawer>
);

export default ProjectDrawer;