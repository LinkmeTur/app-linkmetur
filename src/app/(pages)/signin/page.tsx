'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Link } from '@mui/material';
import Image from 'next/image';

export default function Signin() {
    const [inputValue, setInputValue] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const getPasswordError = (value: string) => {
        if (value.length < 4) return 'Senha deve ter pelo menos 4 caracteres';
        if (!/[A-Z]/.test(value)) return 'Senha precisa de pelo menos uma letra maiúscula';
        if (!/[^a-zA-Z0-9]/.test(value)) return 'Senha precisa de pelo menos um símbolo';
        return null;
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        const passwordError = getPasswordError(password);
        if (passwordError) newErrors.password = passwordError;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        console.log({ inputValue, password });
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
            <Paper
                sx={{
                    width: '70%',
                    height: '85%',
                    borderRadius: 6,
                    display: 'flex',
                    boxShadow: 3,
                    overflow: 'hidden',
                    zIndex: 99,
                }}
                elevation={12}
            >
                <Box
                    sx={{
                        width: '50%',
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // bgcolor: 'white',
                        // color: 'black',
                    }}
                >
                    <Image src='/linkmelp.jpeg' alt='logo linkme' width={200} height={100} />
                    <Box
                        component='form'
                        onSubmit={onSubmit}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            my: 2,
                        }}
                    >
                        <TextField
                            // focused
                            label='Email ou Telefone'
                            value={inputValue}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={!!errors.email}
                            helperText={errors.email}
                            sx={{ zIndex: 99 }}
                        />
                        <TextField
                            // focused
                            label='Senha'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            required
                            error={!!errors.password}
                            helperText={errors.password}
                            sx={{ zIndex: 99 }}
                        />
                        <Button
                            sx={{ zIndex: 99 }}
                            type='submit'
                            variant='contained'
                            color='primary'
                            fullWidth
                        >
                            Login
                        </Button>
                    </Box>
                    <Link
                        style={{ zIndex: 99, cursor: 'pointer' }}
                        href='/recover-pass'
                        variant='body2'
                    >
                        Esqueci a senha
                    </Link>
                    <Typography variant='body2'>Recaptcha</Typography>
                    <Box sx={{ display: 'flex', gap: 1, zIndex: 99 }}>
                        <Typography variant='body2'>Não tem uma conta?</Typography>
                        <Link
                            style={{ cursor: 'pointer' }}
                            href='/register'
                            variant='body2'
                            fontWeight='bold'
                        >
                            Cadastre-se aqui
                        </Link>
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: '50%',
                        bgcolor: 'grey.200',
                    }}
                >
                    {/* <Image src='/imagemLogin.png' alt='pessos' width={100} height={100} /> */}
                    <Box
                        sx={{
                            position: 'relative',
                            left: '-11rem',
                            width: '150%',
                            height: '100%',
                            backgroundImage: 'url(/imagemLogin.png)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            zIndex: 9,
                        }}
                    />
                </Box>
            </Paper>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    width: '50vw',
                    height: '100vh',
                    bgcolor: '#17cb95',
                }}
            ></Box>
        </Box>
    );
}
