import React from 'react';
import {Box} from '@mui/material';
import {styled} from '@mui/system';
import {AnimatePresence, motion} from 'framer-motion';

interface Category {
    id: string;
    name: string;
}

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

const StyledButton = styled(motion.button)(({theme}) => ({
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: '8px 16px',
    border: '1px solid var(--secondary)',
    borderRadius: '4px',
    background: 'none',
    color: 'var(--secondary)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: 'var(--hover)',
        borderColor: 'var(--primary)',
        color: 'var(--primary)',
    },
    '&.selected': {
        backgroundColor: 'var(--primary)',
        color: 'var(--background)',
        '&:hover': {
            backgroundColor: 'var(--primary)',
        },
    },
}));

const CategoryFilter = ({categories, selectedCategory, onCategoryChange}: CategoryFilterProps) => (
    <Box sx={{marginBottom: 4}}>
        <AnimatePresence>
            {categories.map((cat) => (
                <StyledButton
                    key={cat.id}
                    onClick={() => onCategoryChange(cat.id)}
                    className={selectedCategory === cat.id ? 'selected' : ''}
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.95}}
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 20}}
                    transition={{duration: 0.2}}
                >
                    {cat.name}
                </StyledButton>
            ))}
        </AnimatePresence>
    </Box>
);

export default CategoryFilter;