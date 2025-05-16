'use client';

import { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Link } from '@mui/material';

export default function RecoverPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email.includes('@')) {
            setError('Insira um email válido.');
            return;
        }

        setError('');
        console.log('Recuperação de senha enviada para:', email);
    };

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                bgcolor: 'grey.100',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper sx={{ p: 4, width: 400, borderRadius: 4, boxShadow: 3 }}>
                <Typography variant='h5' fontWeight='bold' align='center'>
                    Recuperação de Senha
                </Typography>
                <Typography variant='body2' align='center' sx={{ mt: 1 }}>
                    Insira seu email para receber um link de redefinição de senha.
                </Typography>
                <Box
                    component='form'
                    onSubmit={handleSubmit}
                    sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <TextField
                        label='Email'
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!error}
                        helperText={error}
                    />
                    <Button type='submit' variant='contained' color='primary' fullWidth>
                        Enviar
                    </Button>
                </Box>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Link href='/signin' variant='body2'>
                        Voltar para o login
                    </Link>
                </Box>
            </Paper>
        </Box>
    );
}
