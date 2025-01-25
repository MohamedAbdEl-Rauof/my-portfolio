import {Grid} from '@mui/material';
import {AnimatePresence, motion} from 'framer-motion';
import {Project} from './Projects';
import ProjectCard from './ProjectCard';

interface ProjectListProps {
    projects: Project[];
    onProjectClick: (project: Project) => void;
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
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 12
        }
    }
};

const ProjectList = ({projects, onProjectClick}: ProjectListProps) => (
    <AnimatePresence>
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <Grid container spacing={4}>
                {projects.map((project) => (
                    <Grid item xs={12} sm={6} md={6} key={project.id}>
                        <motion.div variants={itemVariants}>
                            <ProjectCard
                                project={project}
                                onClick={() => onProjectClick(project)}
                                style={{
                                    backgroundColor: 'var(--background)',
                                    color: 'var(--foreground)',
                                    transition: 'background-color 0.3s, color 0.3s'
                                }}
                            />
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </motion.div>
    </AnimatePresence>
);

export default ProjectList;