// app/not-found.tsx
'use client';

import { Box, Paper, Typography, IconButton, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Image from 'next/image';

export default function NotFound() {
    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                backgroundImage: 'url(/mar.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                position: 'relative',
            }}
        >
            {/* Lado Esquerdo - Conteúdo */}
            <Box
                sx={{
                    flex: 1,
                    padding: { xs: 2, sm: 4, md: 8 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Paper
                    elevation={12}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 4,
                        width: '100%',
                        maxWidth: '500px',
                        height: { xs: 'auto', md: '80%' },
                        borderRadius: '2rem',
                        borderWidth: '0.5rem',
                        borderColor: 'whitesmoke',
                        bgcolor: 'rgba(255, 255, 255, 0.7)',
                        color: 'black',
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant='h1'
                        component='h1'
                        sx={{
                            fontSize: { xs: '5rem', sm: '6rem', md: '8rem' },
                            fontWeight: '900',
                            margin: 0,
                        }}
                    >
                        404
                    </Typography>

                    <Typography variant='h6' sx={{ mt: 2, fontWeight: 500 }}>
                        OOPS! NÃO TEM DESTINO AQUI!
                    </Typography>

                    {/* Redes Sociais */}
                    <Box sx={{ mt: 3 }}>
                        <IconButton
                            component={Link}
                            href='https://facebook.com/linkmetur'
                            target='_blank'
                            aria-label='Facebook'
                            color='primary'
                        >
                            <FacebookIcon fontSize='large' />
                        </IconButton>

                        <IconButton
                            component={Link}
                            href='https://instagram.com/linkmetur'
                            target='_blank'
                            aria-label='Instagram'
                            color='primary'
                        >
                            <InstagramIcon fontSize='large' />
                        </IconButton>

                        <IconButton
                            component={Link}
                            href='https://linkedin.com/company/linkmetur'
                            target='_blank'
                            aria-label='LinkedIn'
                            color='primary'
                        >
                            <LinkedInIcon fontSize='large' />
                        </IconButton>

                        <IconButton
                            component={Link}
                            href='https://wa.me/5511999999999'
                            target='_blank'
                            aria-label='WhatsApp'
                            color='success'
                        >
                            <WhatsAppIcon fontSize='large' />
                        </IconButton>
                    </Box>

                    {/* Botão de Voltar */}
                    <Box sx={{ mt: 4 }}>
                        <Link
                            href='/'
                            sx={{
                                fontSize: '1.2rem',
                                fontWeight: 600,
                                color: 'primary.main',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            {'<<<'} VOLTAR
                        </Link>
                    </Box>
                </Paper>
            </Box>

            {/* Lado Direito - Logo */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    padding: 4,
                    position: 'relative',
                }}
            >
                <Box
                    component='div'
                    sx={{
                        position: 'absolute',
                        bottom: { xs: 20, sm: 32, md: 64 },
                        right: { xs: 16, sm: 24, md: 64 },
                        zIndex: 1,
                    }}
                >
                    <Image
                        src='/logoblackp.svg'
                        alt='Logo Linkme Tur - Página não encontrada'
                        width={450}
                        height={100}
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                        }}
                        priority
                    />
                </Box>
            </Box>
        </Box>
    );
}
