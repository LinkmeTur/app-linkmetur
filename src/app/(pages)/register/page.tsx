'use client';

import { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    LinearProgress,
    Typography,
    Paper,
    AppBar,
    Toolbar,
    Card,
    CardContent,
    CardActions,
    CardHeader,
} from '@mui/material';
import Image from 'next/image';

const planos = [
    {
        title: 'Empresas do setor de turismo',
        description: ' Empresas que trabalham diretamente com turismo ou atividades turisticas.',
        details: `Planejam e vendem pacotes turísticos, passagens, hospedagem e
                                acomodações|guia, acompanha e(ou) organiza de eventos, etc. feiras,
                                congressos, exposições, atividades naturais e esportivas, etc...`,
    },
    {
        title: 'Prestadores de serviços especializados',
        description: ' Empresas que prestam serviços auxiliares para empresas turisticas.',
        details: `marketing, tecnologia, consultoria, jurídico, contábil,
                                treinamentos, sustentabilidade, etc....`,
    },
];

export default function Register() {
    const [plan, setPlan] = useState<'T' | 'P' | undefined>(undefined);
    const [step, setStep] = useState(0);
    const totalSteps = 8;
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [companyData, setCompanyData] = useState<{
        [x: string]: string | number | boolean;
    } | null>(null);
    const [password, setPassword] = useState('');

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <Box sx={{ height: '100vh', bgcolor: 'white', display: 'flex', flexDirection: 'column' }}>
            <AppBar sx={{ height: '10%' }} variant='elevation' position='static'>
                <Toolbar variant='dense' sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Image src='/logoblackp.svg' alt='Logo' width={150} height={50} />
                    <Typography>CADASTRO</Typography>
                </Toolbar>
            </AppBar>

            {!plan ? (
                <Box
                    sx={{
                        height: '90%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 4,
                    }}
                >
                    {planos.map((info, index) => (
                        <Paper elevation={4} key={index}>
                            <Card
                                sx={{
                                    height: 300,
                                    width: 600,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <CardHeader
                                    title={
                                        <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                                            {info.title}
                                        </Typography>
                                    }
                                />
                                <CardContent>
                                    <Typography variant='body1'>{info.description}</Typography>
                                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                                        como:
                                    </Typography>
                                    <Typography variant='body2'>{info.details}</Typography>
                                </CardContent>
                                <CardActions sx={{ width: '100%' }}>
                                    <Button
                                        fullWidth
                                        variant='contained'
                                        onClick={() => setPlan(index === 0 ? 'T' : 'P')}
                                    >
                                        Selecionar
                                    </Button>
                                </CardActions>
                            </Card>
                        </Paper>
                    ))}
                </Box>
            ) : (
                <Paper sx={{ maxWidth: 400, mx: 'auto', p: 4, mt: 4 }}>
                    <LinearProgress variant='determinate' value={(step / totalSteps) * 100} />
                    <Typography align='center' sx={{ mt: 2 }}>
                        {Math.round((step / totalSteps) * 100)}% concluído
                    </Typography>

                    {step === 0 && (
                        <Box>
                            <TextField
                                label='Digite seu Email'
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button variant='contained' fullWidth sx={{ mt: 2 }} onClick={nextStep}>
                                Continuar
                            </Button>
                        </Box>
                    )}

                    {step === 1 && (
                        <Box>
                            <TextField
                                label='Digite seu Telefone'
                                fullWidth
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <Button variant='contained' fullWidth sx={{ mt: 2 }} onClick={nextStep}>
                                Continuar
                            </Button>
                        </Box>
                    )}

                    {step === 2 && (
                        <Box>
                            <Typography>Escolha como deseja receber o código:</Typography>
                            <Button variant='contained' fullWidth sx={{ mt: 2 }} onClick={nextStep}>
                                Email
                            </Button>
                            <Button variant='contained' fullWidth sx={{ mt: 2 }} onClick={nextStep}>
                                Telefone
                            </Button>
                        </Box>
                    )}

                    {step === 3 && (
                        <Box>
                            <TextField
                                label='Digite o código OTP'
                                fullWidth
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <Button variant='contained' fullWidth sx={{ mt: 2 }} onClick={nextStep}>
                                Validar Código
                            </Button>
                        </Box>
                    )}

                    {step === 4 && (
                        <Box>
                            <TextField
                                label='Digite seu CNPJ'
                                fullWidth
                                value={cnpj}
                                onChange={(e) => setCnpj(e.target.value)}
                            />
                            <Button
                                variant='contained'
                                fullWidth
                                sx={{ mt: 2 }}
                                onClick={async () => {
                                    const response = await fetch(
                                        `https://api.exemplo.com/cnpj/${cnpj}`,
                                    );
                                    const data = await response.json();
                                    setCompanyData(data);
                                    nextStep();
                                }}
                            >
                                Buscar Dados
                            </Button>
                        </Box>
                    )}

                    {step === 5 && companyData && (
                        <Box>
                            <Typography>
                                <strong>Empresa:</strong> {companyData?.nome}
                            </Typography>
                            <Typography>
                                <strong>CNPJ:</strong> {companyData?.cnpj}
                            </Typography>
                            <Button variant='contained' fullWidth sx={{ mt: 2 }} onClick={nextStep}>
                                Continuar
                            </Button>
                        </Box>
                    )}

                    {step === 6 && (
                        <Box>
                            <TextField
                                label='Crie sua senha'
                                type='password'
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                variant='contained'
                                fullWidth
                                sx={{ mt: 2 }}
                                onClick={() => alert('Cadastro concluído!')}
                            >
                                Finalizar
                            </Button>
                        </Box>
                    )}

                    {step > 0 && (
                        <Button variant='outlined' fullWidth sx={{ mt: 2 }} onClick={prevStep}>
                            Voltar
                        </Button>
                    )}
                </Paper>
            )}
        </Box>
    );
}
