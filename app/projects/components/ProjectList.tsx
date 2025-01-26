import { Grid } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { Project } from './Projects';
import ProjectCard from './ProjectCard';

interface ProjectListProps {
    projects: Project[];
    onProjectClick: (project: Project) => void;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 12,
            duration: 0.5
        }
    }
};

const ProjectList = ({ projects, onProjectClick }: ProjectListProps) => (
    <AnimatePresence>
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <Grid container spacing={4}>
                {projects.map((project, index) => (
                    <Grid item xs={12} sm={6} md={6} key={project.id}>
                        <motion.div
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ProjectCard
                                project={project}
                                onClick={() => onProjectClick(project)}
                                style={{
                                    backgroundColor: 'var(--background)',
                                    color: 'var(--foreground)',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '8px',
                                    overflow: 'hidden'
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