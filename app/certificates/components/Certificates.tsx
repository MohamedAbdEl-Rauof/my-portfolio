'use client';

import {useState, useEffect} from 'react';
import {Box, Container, Typography, Grid, Button} from '@mui/material';
import CertificateCard from './CertificateCard';
import CertificateModal from './CertificateModal';

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

const Certificates = () => {
    const [certificatesData, setCertificatesData] = useState<CertificatesData | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await fetch('/data/certificates.json');
                const data = await response.json();
                setCertificatesData(data);
            } catch (error) {
                console.error('Error fetching certificates:', error);
            }
        };

        fetchCertificates();
    }, []);

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

    if (!certificatesData) {
        return (
            <Container maxWidth="lg" sx={{py: 8}}>
            </Container>
        );
    }

    const filteredCertificates = selectedCategory === 'all' 
        ? certificatesData.certificates 
        : certificatesData.certificates.filter(cert => cert.category === selectedCategory);

    return (
        <Container maxWidth="lg" sx={{py: 8}}>
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
                    My Certificates
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
                    A collection of professional certifications and achievements that demonstrate my expertise and commitment to continuous learning.
                </Typography>
            </Box>

            {/* Category Filter */}
            <Box sx={{mb: 4, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1}}>
                {certificatesData.categories.map((category) => (
                    <Button
                        key={category.id}
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
                ))}
            </Box>

            {/* Results Count */}
            <Box sx={{mb: 3, textAlign: 'center'}}>
                <Typography variant="body1" sx={{color: 'var(--secondary)'}}>
                    Showing {filteredCertificates.length} certificate{filteredCertificates.length !== 1 ? 's' : ''}
                    {selectedCategory !== 'all' && ` in ${certificatesData.categories.find(cat => cat.id === selectedCategory)?.name}`}
                </Typography>
            </Box>

            {/* Certificates Grid */}
            <Grid container spacing={3}>
                {filteredCertificates.map((certificate) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={certificate.id}>
                        <CertificateCard
                            certificate={certificate}
                            onClick={() => handleCertificateClick(certificate)}
                        />
                    </Grid>
                ))}
            </Grid>

            {/* No Results */}
            {filteredCertificates.length === 0 && (
                <Box sx={{textAlign: 'center', py: 8}}>
                    <Typography variant="h5" sx={{color: 'var(--secondary)', mb: 2}}>
                        No certificates found
                    </Typography>
                    <Typography variant="body1" sx={{color: 'var(--secondary)'}}>
                        Try selecting a different category to view more certificates.
                    </Typography>
                </Box>
            )}

            {/* Certificate Modal */}
            <CertificateModal
                open={modalOpen}
                onClose={handleCloseModal}
                certificate={selectedCertificate}
            />
        </Container>
    );
};

export default Certificates;
