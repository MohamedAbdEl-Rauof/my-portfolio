"use client";

import {useEffect, useState} from 'react';
import {Box, Container, Typography} from '@mui/material';
import {AnimatePresence, motion} from 'framer-motion';
import {useTranslation} from 'react-i18next';
import ProjectList from './ProjectList';
import ProjectDrawer from './ProjectDrawer';
import CategoryFilter from './CategoryFilter';
import {useLocalizedData} from '@/app/i18n/useLocalizedData';
import LoadingSpinner from '@/app/components/LoadingSpinner';

export interface Project {
    id: number;
    title: string;
    paragraph: string;
    image: string;
    about: string;
    description: string;
    technologies: string[];
    website?: string;
    src?: string;
    category: string;
    note?: string;
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

interface ProjectsData {
    categories: {name: string; id: string}[];
    projects: Project[];
}

const Projects = () => {
    const {t} = useTranslation();
    const {data, loading} = useLocalizedData<ProjectsData>('projects');
    const [category, setCategory] = useState('all');
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const categories = data?.categories ?? [];

    useEffect(() => {
        if (!data) return;
        setFilteredProjects(
            category === 'all'
                ? data.projects
                : data.projects.filter((project) => project.category === category)
        );
    }, [category, data]);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setDrawerOpen(true);
    };

    if (loading) {
        return <LoadingSpinner message={t('common.loading')} />;
    }

    return (
        <Container maxWidth="lg" sx={{py: 8}}>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div variants={itemVariants}>
                    <Box sx={{textAlign: 'center', mb: 6}}>
                        <Typography 
                            variant="h3" 
                            component="h1" 
                            gutterBottom 
                            sx={{
                                fontWeight: 'bold',
                                color: 'var(--primary)',
                                mb: 2
                            }}
                        >
                            {t('projects.title')}
                        </Typography>
                        <Typography 
                            variant="h6" 
                            sx={{
                                color: 'var(--secondary)',
                                maxWidth: '600px',
                                mx: 'auto',
                                lineHeight: 1.6
                            }}
                        >
                            {t('projects.subtitle')}
                        </Typography>
                    </Box>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <CategoryFilter
                        categories={categories}
                        selectedCategory={category}
                        onCategoryChange={setCategory}
                    />
                </motion.div>

                <motion.div variants={itemVariants}>
                    {/* Results Count */}
                    <Box sx={{mb: 3, textAlign: 'center'}}>
                        <Typography variant="body1" sx={{color: 'var(--secondary)'}}>
                            {t('projects.showing', {count: filteredProjects.length})}
                            {category !== 'all' && ` ${t('projects.inCategory', {category: categories.find(cat => cat.id === category)?.name ?? ''})}`}
                        </Typography>
                    </Box>
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

                {/* No Results */}
                <AnimatePresence>
                    {filteredProjects.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <Box sx={{textAlign: 'center', py: 8}}>
                                <Typography variant="h5" sx={{color: 'var(--secondary)', mb: 2}}>
                                    {t('projects.noResults')}
                                </Typography>
                                <Typography variant="body1" sx={{color: 'var(--secondary)'}}>
                                    {t('projects.noResultsHint')}
                                </Typography>
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>

                <ProjectDrawer
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    project={selectedProject}
                />
            </motion.div>
        </Container>
    );
};

export default Projects;