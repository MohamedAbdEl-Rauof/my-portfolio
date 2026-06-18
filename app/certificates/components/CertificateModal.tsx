import AnimatedCursor from 'react-animated-cursor';
import {Box, Button, CardMedia, Chip, Drawer, IconButton, Typography} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LaunchIcon from '@mui/icons-material/Launch';
import {useTranslation} from 'react-i18next';

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

interface CertificateModalProps {
    open: boolean;
    onClose: () => void;
    certificate: Certificate | null;
}

const CertificateModal = ({open, onClose, certificate}: CertificateModalProps) => {
    const {t} = useTranslation();
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: {xs: '100%', sm: '60%', md: 500, lg: 600},
                    maxWidth: '100%',
                    bgcolor: 'var(--background)',
                    color: 'var(--foreground)',
                    boxShadow: 3,
                }
            }}
        >
            <Box sx={{display: 'flex', flexDirection: 'column', height: '100%', cursor: 'none'}}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        borderBottom: 1,
                        borderColor: 'var(--accent)',
                    }}
                >
                    <IconButton
                        onClick={onClose}
                        aria-label="close drawer"
                        sx={{
                            color: 'var(--primary)',
                            '&:hover': {
                                backgroundColor: 'var(--accent)',
                            }
                        }}
                    >
                        <ArrowBackIcon/>
                    </IconButton>
                    <Typography variant="h6" sx={{fontWeight: 'bold', color: 'var(--primary)'}}>
                        {t('certificates.details')}
                    </Typography>
                </Box>

                {certificate && (
                    <Box sx={{flexGrow: 1, overflow: 'auto', p: 3}}>
                        <Typography variant="h5" gutterBottom sx={{fontWeight: 'bold', mb: 1, color: 'var(--primary)'}}>
                            {certificate.title}
                        </Typography>
                        <Typography variant="h6" gutterBottom sx={{mb: 2, color: 'var(--secondary)'}}>
                            {certificate.issuer}
                        </Typography>
                        
                        <Box sx={{mb: 2, display: 'flex', alignItems: 'center', gap: 1}}>
                            <Typography variant="body2" sx={{color: 'var(--secondary)'}}>
                                {t('certificates.issued')}: {new Date(certificate.date).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </Typography>
                        </Box>

                        <CardMedia
                            component="img"
                            height="300"
                            image={certificate.fullImage}
                            alt={certificate.title}
                            sx={{
                                borderRadius: 2,
                                mb: 3,
                                border: '1px solid var(--accent)',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                            }}
                        />
                        
                        <Typography variant="h6" gutterBottom sx={{fontWeight: 'bold', mb: 2, color: 'var(--primary)'}}>
                            {t('certificates.description')}
                        </Typography>
                        <Typography variant="body2" paragraph sx={{mb: 3, color: 'var(--secondary)', lineHeight: 1.6}}>
                            {certificate.description}
                        </Typography>
                        
                        <Typography variant="h6" gutterBottom sx={{fontWeight: 'bold', mb: 2, color: 'var(--primary)'}}>
                            {t('certificates.skills')}
                        </Typography>
                        <Box sx={{mb: 3}}>
                            {certificate.skills.map((skill: string, index: number) => (
                                <Chip
                                    key={index}
                                    label={skill}
                                    sx={{
                                        mr: 1, 
                                        mb: 1, 
                                        bgcolor: 'var(--accent)', 
                                        color: 'var(--primary)',
                                        fontWeight: 'medium'
                                    }}
                                />
                            ))}
                        </Box>
                        
                        <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, gap: 2}}>
                            <Button
                                variant="outlined"
                                href={certificate.fullImage}
                                target="_blank"
                                rel="noopener noreferrer"
                                startIcon={<LaunchIcon/>}
                                fullWidth
                                sx={{
                                    color: 'var(--primary)',
                                    borderColor: 'var(--primary)',
                                    '&:hover': {
                                        bgcolor: 'var(--accent)',
                                        transform: 'scale(1.05)',
                                    },
                                    transition: 'transform 0.3s ease-in-out',
                                }}
                            >
                                {t('certificates.viewFullSize')}
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
            <AnimatedCursor
                innerSize={8}
                outerSize={35}
                innerScale={1}
                outerScale={1.7}
                outerAlpha={0}
                innerStyle={{
                    backgroundColor: 'var(--primary)'
                }}
                outerStyle={{
                    border: '3px solid var(--primary)'
                }}
            />
        </Drawer>
    );
};

export default CertificateModal;
