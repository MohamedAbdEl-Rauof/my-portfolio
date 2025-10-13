import React from 'react';
import {Box, Button} from '@mui/material';
import {motion} from 'framer-motion';

interface Category {
    id: string;
    name: string;
}

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({categories, selectedCategory, onCategoryChange}: CategoryFilterProps) => (
    <Box sx={{mb: 4, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1}}>
        {categories.map((category, index) => (
            <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
            >
                <Button
                    variant={selectedCategory === category.id ? 'contained' : 'outlined'}
                    onClick={() => onCategoryChange(category.id)}
                    sx={{
                        color: selectedCategory === category.id ? 'var(--background)' : 'var(--primary)',
                        bgcolor: selectedCategory === category.id ? 'var(--primary)' : 'transparent',
                        borderColor: 'var(--primary)',
                        '&:hover': {
                            bgcolor: selectedCategory === category.id ? 'var(--primary)' : 'var(--accent)',
                            transform: 'scale(1.05)',
                        },
                        transition: 'all 0.3s ease-in-out',
                        textTransform: 'none',
                        fontWeight: 'medium',
                        px: 3,
                        py: 1
                    }}
                >
                    {category.name}
                </Button>
            </motion.div>
        ))}
    </Box>
);

export default CategoryFilter;