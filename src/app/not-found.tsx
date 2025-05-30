'use client';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                backgroundImage: 'url(/mar.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Box
                sx={{
                    width: '50%',
                    height: '100%',
                    display: 'flow',
                    float: 'right',
                    zIndex: 9,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '-4rem',
                        right: '-5rem',
                    }}
                >
                    <Image src={'/logoblackp.svg'} alt='linkme' width={600} height={100} />
                </Box>
            </Box>
            <Box
                sx={{
                    width: '50%',
                    height: '100%',
                    display: 'flow',
                    float: 'left',
                    padding: '8rem',
                    zIndex: 1,
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
                        height: '100%',
                        borderRadius: '2rem',
                        borderWidth: '0.5rem',
                        borderColor: 'whitesmoke',
                        bgcolor: 'rgba(255,255,255,0.6)',
                        color: 'black',
                    }}
                >
                    <Typography
                        variant='h1'
                        sx={{
                            fontSize: '8rem',
                            fontWeight: '900',
                        }}
                    >
                        404
                    </Typography>
                    <Typography>OOPS! NÃO TEM DESTINO AQUI!</Typography>
                    <Box>
                        <IconButton>
                            <FacebookIcon />
                        </IconButton>
                        <IconButton>
                            <InstagramIcon />
                        </IconButton>
                        <IconButton>
                            <LinkedInIcon />
                        </IconButton>
                        <IconButton>
                            <WhatsAppIcon />
                        </IconButton>
                    </Box>
                    <Box>
                        <Link href={'/'}>{'<<<'} VOLTAR</Link>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}
