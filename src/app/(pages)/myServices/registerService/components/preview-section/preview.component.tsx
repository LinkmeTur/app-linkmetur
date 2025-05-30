import { Paper, Typography, Box, Avatar, Button, Chip, Grid } from '@mui/material';
import { FaEye, FaImage, FaStar } from 'react-icons/fa';

const PreviewSection = () => {
    return (
        <Paper elevation={2} sx={{ borderRadius: 2, p: 3, mb: 3 }}>
            <Box display='flex' alignItems='center' mb={2}>
                <Box
                    sx={{
                        height: 40,
                        width: 40,
                        borderRadius: '50%',
                        backgroundColor: 'lightblue',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'blue',
                        mr: 2,
                    }}
                >
                    <FaEye />
                </Box>
                <Box>
                    <Typography variant='h6' color='textPrimary'>
                        Pré-visualização
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                        Veja como seu serviço ficará para os clientes
                    </Typography>
                </Box>
            </Box>

            <Paper sx={{ border: 1, borderColor: 'grey.200', borderRadius: 2, overflow: 'hidden' }}>
                <Box
                    sx={{
                        backgroundColor: 'grey.100',
                        p: 2,
                        borderBottom: 1,
                        borderColor: 'grey.200',
                    }}
                >
                    <Typography variant='h6' color='textPrimary'>
                        Visualização do Anúncio
                    </Typography>
                </Box>

                <Box sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Box
                                sx={{
                                    bgcolor: 'grey.300',
                                    height: 130,
                                    borderRadius: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'grey.500',
                                    mb: 2,
                                }}
                            >
                                <FaImage size={40} />
                            </Box>

                            <Typography variant='h5' fontWeight='bold' color='textPrimary' mb={2}>
                                Título do Serviço
                            </Typography>

                            <Box mb={2}>
                                <Chip label='Categoria' color='primary' size='small' />
                                <Chip
                                    label='Subcategoria'
                                    variant='outlined'
                                    size='small'
                                    sx={{ ml: 1 }}
                                />
                            </Box>

                            <Typography
                                variant='body2'
                                fontWeight='bold'
                                color='textPrimary'
                                mb={1}
                            >
                                Descrição
                            </Typography>
                            <Typography variant='body2' color='textSecondary'>
                                Sua descrição aparecerá aqui. Descreva detalhadamente o serviço que
                                você oferece...
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <Paper sx={{ p: 2, borderRadius: 2 }}>
                                <Typography
                                    variant='body2'
                                    fontWeight='bold'
                                    color='textPrimary'
                                    mb={1}
                                >
                                    Prestador
                                </Typography>
                                <Box display='flex' alignItems='center' mb={2}>
                                    <Avatar
                                        src='https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg'
                                        sx={{ mr: 2 }}
                                    />
                                    <Box>
                                        <Typography
                                            variant='body2'
                                            fontWeight='bold'
                                            color='textPrimary'
                                        >
                                            Carlos Oliveira
                                        </Typography>
                                        <Box color='amber.400' display='flex' alignItems='center'>
                                            <FaStar /> <FaStar /> <FaStar /> <FaStar />{' '}
                                            <FaStar size={14} />
                                            <Typography
                                                variant='body2'
                                                color='textSecondary'
                                                ml={1}
                                            >
                                                4.8 (42)
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                <Button variant='contained' disabled fullWidth>
                                    Solicitar Proposta
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Paper>
    );
};

export default PreviewSection;
