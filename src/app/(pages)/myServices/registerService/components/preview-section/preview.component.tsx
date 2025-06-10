/* eslint-disable @next/next/no-img-element */
'use client';
import { useAppSelector } from '@/app/store/hooks/hooks';
import { Paper, Typography, Box, Avatar, Button, Chip, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { FaEye, FaStar } from 'react-icons/fa';

const PreviewSection = () => {
    const { registerService } = useAppSelector((state) => state.jobs);
    const { usuario } = useAppSelector((state) => state.auth);
    const [imageFull, setImageFull] = useState('');
    const [imageList, setImageList] = useState<{ photo_URL: string; photo_alt: string }[]>([]);
    useEffect(() => {
        if (registerService?.photos) {
            setImageFull(registerService.photos[0]?.photo_URL);
            setImageList(registerService.photos);
        } else {
            setImageFull('');
            setImageList([]);
        }
    }, [registerService]);
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

            <Paper sx={{ border: 1, borderRadius: 2, overflow: 'hidden' }}>
                <Box
                    sx={{
                        p: 2,
                        borderBottom: 1,
                    }}
                >
                    <Typography variant='h6' color='textPrimary'>
                        Visualização do Anúncio
                    </Typography>
                </Box>

                <Box sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Grid
                                size={12}
                                sx={{
                                    bgcolor: 'grey.300',
                                    height: 300,
                                    borderRadius: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'grey.500',
                                    mb: 2,
                                }}
                            >
                                <img
                                    src={imageFull}
                                    alt='p'
                                    style={{ height: '100%', width: '100%' }}
                                />
                            </Grid>
                            <Grid size={12}>
                                <Grid container spacing={1}>
                                    {registerService?.photos
                                        ? imageList.map((p) => (
                                              <Grid size={2} key={p.photo_alt}>
                                                  <Box
                                                      sx={{
                                                          bgcolor: 'grey.300',
                                                          height: 60,
                                                          width: 100,
                                                          borderRadius: 2,
                                                          display: 'flex',
                                                          alignItems: 'center',
                                                          justifyContent: 'center',
                                                          color: 'grey.500',
                                                          cursor: 'pointer',
                                                      }}
                                                      onClick={() => setImageFull(p.photo_URL)}
                                                  >
                                                      <img
                                                          src={p.photo_URL}
                                                          alt={p.photo_alt}
                                                          style={{ height: '100%', width: '100%' }}
                                                      />
                                                  </Box>
                                              </Grid>
                                          ))
                                        : null}
                                    <Grid size={2}>
                                        <Box
                                            sx={{
                                                bgcolor: 'grey.300',
                                                height: 60,
                                                width: 100,
                                                borderRadius: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'grey.500',
                                            }}
                                        >
                                            <iframe
                                                src={registerService?.video_url}
                                                title={registerService?.nome_servico}
                                                style={{ height: '100%', width: '100%' }}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Typography variant='h5' fontWeight='bold' color='textPrimary' mb={2}>
                                {registerService?.nome_servico ?? 'Título do Serviço'}
                            </Typography>

                            <Box mb={2}>
                                <Chip
                                    label={registerService?.categoria ?? 'Categoria'}
                                    color='primary'
                                    size='small'
                                />
                                <Chip
                                    label={registerService?.sub_categoria ?? 'Subcategoria'}
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
                                {registerService?.descricao ??
                                    'Sua descrição aparecerá aqui. Descreva detalhadamente o serviço que você oferece...'}
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
                                        src={usuario?.corp?.logo_url ?? undefined}
                                        sx={{ mr: 2 }}
                                    />
                                    <Box>
                                        <Typography
                                            variant='body2'
                                            fontWeight='bold'
                                            color='textPrimary'
                                        >
                                            {usuario.corp?.nome_fantasia ?? ' Carlos Oliveira'}
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
