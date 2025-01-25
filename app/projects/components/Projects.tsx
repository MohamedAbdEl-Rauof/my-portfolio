"use client";

import {useEffect, useState} from 'react';
import {Box, Container, Typography} from '@mui/material';
import {AnimatePresence, motion} from 'framer-motion';
import projectsData from '../../../public/data/projects.json';
import ProjectList from './ProjectList';
import ProjectDrawer from './ProjectDrawer';
import CategoryFilter from './CategoryFilter';

export interface Project {
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

const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: {y: 20, opacity: 0},
    visible: {
        y: 0,
        opacity: 1
    }
};

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
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <Box sx={{
                    padding: 4,
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    transition: 'background-color 0.3s, color 0.3s'
                }}>
                    <motion.div variants={itemVariants}>
                        <Typography variant="h4" gutterBottom sx={{color: 'var(--primary)'}}>
                            My Projects
                        </Typography>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <CategoryFilter
                            categories={projectsData.categories}
                            selectedCategory={category}
                            onCategoryChange={setCategory}
                        />
                    </motion.div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={category}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.3}}
                        >
                            <ProjectList
                                projects={filteredProjects}
                                onProjectClick={handleProjectClick}
                            />
                        </motion.div>
                    </AnimatePresence>
                    <ProjectDrawer
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                        project={selectedProject}
                    />
                </Box>
            </motion.div>
        </Container>
    );
};

export default Projects;