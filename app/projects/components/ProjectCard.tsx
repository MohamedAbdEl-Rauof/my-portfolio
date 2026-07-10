import {Box, Card, CardMedia, Chip, Typography, Skeleton} from '@mui/material';
import {Project} from './Projects';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

interface ProjectCardProps {
    project: Project;
    onClick: () => void;
}

const ProjectCard = ({project, onClick}: ProjectCardProps) => {
    const {t} = useTranslation();
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const isVideo = project.image.endsWith('.mp4') || project.image.endsWith('.webm');

    return (
        <Card
            sx={{
                position: 'relative',
                height: 300,
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 'inset 0 -100px 50px -50px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 0, 0, 0.3)',
                },
                '&:hover .projectInfo': {
                    opacity: 1,
                    transform: 'translateY(0)',
                }
            }}
            onClick={onClick}
        >
            {isVideo ? (
                <Box
                    component="video"
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src={project.image} type={`video/${project.image.split('.').pop()}`}/>
                </Box>
            ) : (
                <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                    {imageLoading && (
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height="100%"
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex: 1,
                            }}
                        />
                    )}
                    <CardMedia
                        component="img"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: imageLoading ? 0 : 1,
                            transition: 'opacity 0.3s ease',
                        }}
                        image={project.image}
                        alt={project.title}
                        onLoad={() => setImageLoading(false)}
                        onError={() => {
                            setImageLoading(false);
                            setImageError(true);
                        }}
                    />
                    {imageError && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'var(--muted)',
                                color: 'var(--muted-foreground)',
                            }}
                        >
                            <Typography variant="body2">{t('projects.imageError')}</Typography>
                        </Box>
                    )}
                </Box>
            )}
            <Box
                className="projectInfo"
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    opacity: 0,
                    transform: 'translateY(100%)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    padding: 2,
                    color: 'white',
                    boxShadow: '0 -4px 8px rgba(0,0,0,0.2)',
                }}
            >
                <Typography variant="h6" gutterBottom>
                    {project.title}
                </Typography>
                <Typography variant="body2" sx={{mb: 2}}>
                    {project.paragraph}
                </Typography>
                <Box>
                    {project.technologies.map((tech, index) => (
                        <Chip
                            key={index}
                            label={tech}
                            sx={{
                                mr: 1,
                                mb: 1,
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                color: 'white'
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Card>
    );
};

export default ProjectCard;