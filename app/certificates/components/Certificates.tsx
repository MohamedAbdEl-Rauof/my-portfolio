'use client';

import {useState, useEffect} from 'react';
import {Box, Container, Typography, Grid, Button} from '@mui/material';
import {AnimatePresence, motion} from 'framer-motion';
import {useTranslation} from 'react-i18next';
import CertificateCard from './CertificateCard';
import CertificateModal from './CertificateModal';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import {useLanguage} from '@/app/providers/AppProviders';

export interface Certificate {
    id: number;
    title: string;
    issuer: string;
    date: string;
    description: string;
    skills: string[];
    thumbnail: string;
    fullImage: string;
    category: string;
}

export interface CertificateCategory {
    name: string;
    id: string;
}

export interface CertificatesData {
    categories: CertificateCategory[];
    certificates: Certificate[];
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

const Certificates = () => {
    const {t} = useTranslation();
    const {lang} = useLanguage();
    const [certificatesData, setCertificatesData] = useState<CertificatesData | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        let cancelled = false;
        const fetchCertificates = async () => {
            setError(false);
            setCertificatesData(null);
            try {
                const response = await fetch(`/data/${lang}/certificates.json`);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
                if (!cancelled) setCertificatesData(data);
            } catch (error) {
                console.error('Error fetching certificates:', error);
                if (!cancelled) setError(true);
            }
        };

        fetchCertificates();
        return () => {
            cancelled = true;
        };
    }, [lang]);

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const handleCertificateClick = (certificate: Certificate) => {
        setSelectedCertificate(certificate);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedCertificate(null);
    };

    if (error) {
        return (
            <Container maxWidth="lg" sx={{py: 8}}>
                <Box sx={{textAlign: 'center', py: 8}}>
                    <Typography variant="h5" sx={{color: 'var(--secondary)', mb: 2}}>
                        {t('certificates.errorTitle')}
                    </Typography>
                    <Typography variant="body1" sx={{color: 'var(--secondary)'}}>
                        {t('certificates.errorHint')}
                    </Typography>
                </Box>
            </Container>
        );
    }

    if (!certificatesData) {
        return (
            <Container maxWidth="lg" sx={{py: 8}}>
                <LoadingSpinner message={t('certificates.loading')} />
            </Container>
        );
    }

    const filteredCertificates = selectedCategory === 'all' 
        ? certificatesData.certificates 
        : certificatesData.certificates.filter(cert => cert.category === selectedCategory);

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
                            {t('certificates.title')}
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
                            {t('certificates.subtitle')}
                        </Typography>
                    </Box>
                </motion.div>

                <motion.div variants={itemVariants}>
                    {/* Category Filter */}
                    <Box sx={{mb: 4, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1}}>
                        {certificatesData.categories.map((category, index) => (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Button
                                    variant={selectedCategory === category.id ? 'contained' : 'outlined'}
                                    onClick={() => handleCategoryChange(category.id)}
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
                </motion.div>

                <motion.div variants={itemVariants}>
                    {/* Results Count */}
                    <Box sx={{mb: 3, textAlign: 'center'}}>
                        <Typography variant="body1" sx={{color: 'var(--secondary)'}}>
                            {t('certificates.showing', {count: filteredCertificates.length})}
                            {selectedCategory !== 'all' && ` ${t('certificates.inCategory', {category: certificatesData.categories.find(cat => cat.id === selectedCategory)?.name ?? ''})}`}
                        </Typography>
                    </Box>
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -20}}
                        transition={{duration: 0.3}}
                    >
                        {/* Certificates Grid */}
                        <Grid container spacing={3}>
                            {filteredCertificates.map((certificate, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={certificate.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <CertificateCard
                                            certificate={certificate}
                                            onClick={() => handleCertificateClick(certificate)}
                                        />
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </motion.div>
                </AnimatePresence>

                {/* No Results */}
                <AnimatePresence>
                    {filteredCertificates.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <Box sx={{textAlign: 'center', py: 8}}>
                                <Typography variant="h5" sx={{color: 'var(--secondary)', mb: 2}}>
                                    {t('certificates.noResults')}
                                </Typography>
                                <Typography variant="body1" sx={{color: 'var(--secondary)'}}>
                                    {t('certificates.noResultsHint')}
                                </Typography>
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Certificate Modal */}
                <CertificateModal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    certificate={selectedCertificate}
                />
            </motion.div>
        </Container>
    );
};

export default Certificates;
