import {Grid} from '@mui/material';
import {motion} from 'framer-motion';
import {Project} from './Projects';
import ProjectCard from './ProjectCard';

interface ProjectListProps {
    projects: Project[];
    onProjectClick: (project: Project) => void;
}

const ProjectList = ({projects, onProjectClick}: ProjectListProps) => (
    <Grid container spacing={3}>
        {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                        scale: 1.05,
                        transition: {duration: 0.2}
                    }}
                    whileTap={{scale: 0.95}}
                >
                    <ProjectCard
                        project={project}
                        onClick={() => onProjectClick(project)}
                    />
                </motion.div>
            </Grid>
        ))}
    </Grid>
);

export default ProjectList;