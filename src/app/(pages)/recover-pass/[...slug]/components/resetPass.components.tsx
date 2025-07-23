'use client';

import { useAppDispatch } from '@/app/store/hooks/hooks';
import resetPassword from '@/app/store/reducers/auth/thunks/resetPassword.thunk';
import { Box, Button, Paper, TextField, Typography, IconButton } from '@mui/material';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function FormResetPass({ slug }: { slug: string }) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const params = useParams();
    const path = usePathname().split('/');
    const [senha, setSenha] = useState<string>('');
    const [repeteSenha, setRepeteSenha] = useState<string>('');
    const [errorPass, setErrorPass] = useState<boolean>(false);
    const [visibility, setVisibility] = useState<boolean>(false);

    useEffect(() => {
        if (Array.isArray(params.slug)) {
            const paramsSlug = params.slug.toString();
            const newSlug = slug.toString();

            if (newSlug !== paramsSlug) {
                alert('deu ruim');
                router.push('/404');
            }
        }
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (senha !== repeteSenha) {
            setErrorPass(true);
            setTimeout(() => {
                setErrorPass(false);
                setSenha('');
                setRepeteSenha('');
            }, 2000);
            return;
        }
        setErrorPass(false);
        dispatch(resetPassword({ id: path[2], senha }))
            .unwrap()
            .then((res) => {
                console.log(res);
                setErrorPass(false);
                setSenha('');
                setRepeteSenha('');
                router.push('/');
            })
            .catch((err) => {
                console.log(err);
                setErrorPass(false);
                setSenha('');
                setRepeteSenha('');
            });
    };
    return (
        <Paper sx={{ p: 4, width: 400, borderRadius: 4, boxShadow: 3 }}>
            <Typography variant='h5' fontWeight='bold' align='center'>
                {path[4].toUpperCase()}
            </Typography>
            <Typography variant='body2' align='center' sx={{ mt: 1 }}>
                Redefina sua nova senha de acesso!
            </Typography>
            <Box
                component='form'
                sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
                onSubmit={handleSubmit}
            >
                <TextField
                    label='Nova Senha'
                    fullWidth
                    required
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <IconButton onClick={() => setVisibility(!visibility)}>
                                    {!visibility ? <FaEye /> : <FaEyeSlash />}
                                </IconButton>
                            ),
                        },
                    }}
                    type={visibility ? 'text' : 'password'}
                    error={errorPass}
                />
                <TextField
                    label='Repita a Senha'
                    fullWidth
                    required
                    value={repeteSenha}
                    onChange={(e) => setRepeteSenha(e.target.value)}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <IconButton onClick={() => setVisibility(!visibility)}>
                                    {!visibility ? <FaEye /> : <FaEyeSlash />}
                                </IconButton>
                            ),
                        },
                    }}
                    type={visibility ? 'text' : 'password'}
                    error={errorPass}
                    helperText={errorPass ? 'As senhas digitadas não coincidem' : ''}
                />
                <Button type='submit' variant='contained' color='primary' fullWidth>
                    Alterar
                </Button>
            </Box>
        </Paper>
    );
}
