"use client";

import {useEffect, useState} from 'react';
import {Box, Button, Card, CardMedia, Chip, Container, Drawer, Grid, Typography} from '@mui/material';
import projectsData from '../../../public/data/projects.json';

interface Project {
    id: number;
    title: string;
    paragraph: string;
    image: string;
    about: string;
    description: string;
    technologies: string[];
    website: string;
    src: string;
    category: string;
}

const Projects = () => {
    const [category, setCategory] = useState('all');
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        setFilteredProjects(
            category === 'all'
                ? projectsData.projects
                : projectsData.projects.filter((project) => project.category === category)
        );
    }, [category]);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setDrawerOpen(true);
    };

    return (
        <Container maxWidth="md" sx={{marginTop: '30px'}}>
            <Box sx={{padding: 4}}>
                <Typography variant="h4" gutterBottom>
                    My Projects
                </Typography>
                <Box sx={{marginBottom: 4}}>
                    {projectsData.categories.map((cat) => (
                        <Button
                            key={cat.id}
                            onClick={() => setCategory(cat.id)}
                            variant={category === cat.id ? 'contained' : 'outlined'}
                            sx={{marginRight: 2, marginBottom: 2}}
                        >
                            {cat.name}
                        </Button>
                    ))}
                </Box>
                <Grid container spacing={4}>
                    {filteredProjects.map((project) => (
                        <Grid item xs={12} sm={6} md={6} key={project.id}>
                            <Card
                                sx={{
                                    position: 'relative',
                                    height: 300,
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    transition: 'box-shadow 0.9s ease',
                                    '&:hover': {
                                        tranform: 'scale(1.05)',
                                        boxShadow: 'inset 0 -100px 50px -50px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 0, 0, 0.3)',

                                    },
                                    '&:hover .projectInfo': {
                                        opacity: 1,
                                        transform: 'translateY(0)',
                                    }
                                }}
                                onClick={() => handleProjectClick(project)}
                            >
                                <CardMedia
                                    component="img"
                                    height="100%"
                                    image={project.image}
                                    alt={project.title}
                                />
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
                                        '&:hover': {
                                            opacity: 1,
                                            transform: 'translateY(0)',
                                        }
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
                        </Grid>
                    ))}
                </Grid>
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                >
                    {selectedProject && (
                        <Box sx={{width: 350, padding: 3}}>
                            <Typography variant="h5" gutterBottom>{selectedProject.title}</Typography>
                            <Typography variant="body1" paragraph>{selectedProject.about}</Typography>
                            <Typography variant="body2" paragraph>{selectedProject.description}</Typography>
                            <Typography variant="h6" gutterBottom>Technologies:</Typography>
                            <Box sx={{mb: 2}}>
                                {selectedProject.technologies.map((tech, index) => (
                                    <Chip key={index} label={tech} sx={{mr: 1, mb: 1}}/>
                                ))}
                            </Box>
                            <Button variant="contained" href={selectedProject.website} target="_blank"
                                    rel="noopener noreferrer" sx={{mr: 2}}>
                                Visit Website
                            </Button>
                            <Button variant="outlined" href={selectedProject.src} target="_blank"
                                    rel="noopener noreferrer">
                                View Source
                            </Button>
                        </Box>
                    )}
                </Drawer>
            </Box>
        </Container>
    );
};

export default Projects;