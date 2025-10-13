import {Box, Card, CardMedia, Chip, Typography} from '@mui/material';

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

interface CertificateCardProps {
    certificate: Certificate;
    onClick: () => void;
}

const CertificateCard = ({certificate, onClick}: CertificateCardProps) => {
    return (
        <Card
            sx={{
                position: 'relative',
                height: 300,
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 'inset 0 -100px 50px -50px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 0, 0, 0.3)',
                },
                '&:hover .certificateInfo': {
                    opacity: 1,
                    transform: 'translateY(0)',
                }
            }}
            onClick={onClick}
        >
            <CardMedia
                component="img"
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
                image={certificate.thumbnail}
                alt={certificate.title}
            />
            <Box
                className="certificateInfo"
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    opacity: 0,
                    transform: 'translateY(100%)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    padding: 2,
                    color: 'white',
                    boxShadow: '0 -4px 8px rgba(0,0,0,0.2)',
                }}
            >
                <Typography variant="h6" gutterBottom>
                    {certificate.title}
                </Typography>
                <Typography variant="body2" sx={{mb: 1}}>
                    {certificate.issuer}
                </Typography>
                <Typography variant="body2" sx={{mb: 2, fontSize: '0.75rem'}}>
                    {new Date(certificate.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long' 
                    })}
                </Typography>
                <Box>
                    {certificate.skills.slice(0, 3).map((skill: string, index: number) => (
                        <Chip
                            key={index}
                            label={skill}
                            size="small"
                            sx={{
                                mr: 0.5,
                                mb: 0.5,
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                color: 'white',
                                fontSize: '0.7rem',
                                height: '20px'
                            }}
                        />
                    ))}
                    {certificate.skills.length > 3 && (
                        <Chip
                            label={`+${certificate.skills.length - 3}`}
                            size="small"
                            sx={{
                                mr: 0.5,
                                mb: 0.5,
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                color: 'white',
                                fontSize: '0.7rem',
                                height: '20px'
                            }}
                        />
                    )}
                </Box>
            </Box>
        </Card>
    );
};

export default CertificateCard;
