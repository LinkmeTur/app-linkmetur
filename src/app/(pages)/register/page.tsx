'use client';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
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
    Divider,
} from '@mui/material';
import Image from 'next/image';
import {
    TCorporation,
    clearCorporationState,
    setCorporation,
} from '@/app/store/reducers/corporation/corporation.slice';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/hooks';
import consultCNPJ from '@/app/store/reducers/corporation/thunks/consutCNPJ.thunk';
import twoFactorRequest from '@/app/store/reducers/auth/thunks/twoFactor.thunk';
import { clearUserState, TUserPass } from '@/app/store/reducers/user/user.slice';
import createCorporation from '@/app/store/reducers/corporation/thunks/createCorporation.thunk';
import { useRouter } from 'next/navigation';
import { formatCNPJ } from '@/app/config/functions/formatCNPJ';
import { formatPhone } from '@/app/config/functions/formatPhone';
import { cleanCaracters } from '@/app/config/functions/cleanCaracters';
import { formatCep } from '@/app/config/functions/formatCep';
import { setloading } from '@/app/store/reducers/configApp/configApp.slice';

const tiposCorporacoes = [
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
    const dispatch = useAppDispatch();
    const router = useRouter();
    const corpState = useAppSelector((state) => state.corporation);
    const { twoFactorCode } = useAppSelector((state) => state.auth);
    const [typeCorp, setTypeCorp] = useState<'T' | 'P' | null>(null);
    const [step, setStep] = useState(0);
    const totalSteps = 8;
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [nome, setNome] = useState('');
    const [factor, setFactor] = useState(twoFactorCode);
    const [otp, setOtp] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [companyData, setCompanyData] = useState<Partial<TCorporation> | null>(null);
    const [password, setPassword] = useState('');

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);
    useEffect(() => {
        if (corpState.tipo) {
            setTypeCorp(corpState.tipo);
        }
        if (corpState.cnpj) {
            setCnpj(corpState.cnpj);
        }
        setCompanyData(corpState);
    }, [corpState]);
    useEffect(() => {
        setFactor(twoFactorCode);
    }, [twoFactorCode]);
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCompanyData({
            ...companyData,
            [event.target.name]: event.target.value,
        });
    };
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };
    const handleValidar = () => {
        if (factor === otp) {
            nextStep();
        } else {
            dispatch(twoFactorRequest({ data: email }));
            setOtp('');
        }
    };
    const handleDataSend = () => {
        dispatch(setloading(true));
        const userMaster: Partial<TUserPass> = {
            nome,
            email,
            telefone: cleanCaracters(phone),
            senha: password,
            nivel: 1,
        };

        const companyMaster: Partial<TCorporation> = {
            ...companyData,
            telefone: cleanCaracters(companyData?.telefone as string),
            cnpj: cleanCaracters(companyData?.cnpj as string),
            cep: cleanCaracters(companyData?.cep as string),
            tipo: typeCorp,
            localizacao: JSON.stringify(companyData?.localizacao),
        };

        dispatch(createCorporation({ corp: companyMaster, user: userMaster })).then(() => {
            dispatch(setloading(false));
            dispatch(clearCorporationState());
            dispatch(clearUserState());
            router.push('/');
        });
    };

    return (
        <Box sx={{ height: '100vh', bgcolor: 'white', display: 'flex', flexDirection: 'column' }}>
            <AppBar sx={{ height: '10%' }} variant='elevation' position='static'>
                <Toolbar
                    variant='dense'
                    sx={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}
                >
                    <Image src='/logoblackp.svg' alt='Logo' width={200} height={200} />
                    <Typography>CADASTRO</Typography>
                </Toolbar>
            </AppBar>

            {!typeCorp ? (
                <Box
                    sx={{
                        height: '90%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 4,
                    }}
                >
                    {tiposCorporacoes.map((info, index) => (
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
                                        onClick={() =>
                                            dispatch(
                                                setCorporation({ tipo: index === 0 ? 'T' : 'P' }),
                                            )
                                        }
                                    >
                                        Selecionar
                                    </Button>
                                </CardActions>
                            </Card>
                        </Paper>
                    ))}
                </Box>
            ) : (
                <Paper sx={{ maxWidth: 700, mx: 'auto', p: 2, mt: 4 }}>
                    <LinearProgress variant='determinate' value={(step / totalSteps) * 100} />
                    <Typography align='center' sx={{ mt: 2 }}>
                        {Math.round((step / totalSteps) * 100)}% concluído
                    </Typography>

                    {step === 0 && (
                        <Box>
                            <TextField
                                label='Digite seu CNPJ'
                                fullWidth
                                value={formatCNPJ(cnpj)}
                                onChange={(e) => setCnpj(e.target.value)}
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') {
                                        dispatch(consultCNPJ(cnpj.replace(/\D/g, '')))
                                            .unwrap()
                                            .then((r) => {
                                                return r?.status === 200 ? nextStep() : setCnpj('');
                                            });
                                    }
                                }}
                            />
                            <Button
                                variant='contained'
                                fullWidth
                                sx={{ mt: 2 }}
                                onClick={() =>
                                    dispatch(consultCNPJ(cnpj.replace(/\D/g, '')))
                                        .unwrap()
                                        .then((r) => {
                                            return r?.status === 200 ? nextStep() : setCnpj('');
                                        })
                                }
                            >
                                Buscar Dados
                            </Button>
                        </Box>
                    )}

                    {step === 1 && companyData && (
                        <Fragment>
                            <Box sx={{ height: 340, overflow: 'auto' }}>
                                <Box>
                                    <TextField
                                        fullWidth
                                        label={'Empresa'}
                                        name={'razao_social'}
                                        value={companyData.razao_social}
                                        onChange={handleChange}
                                        margin='dense'
                                        disabled
                                        size='small'
                                    />
                                </Box>
                                <Box className='flex gap-2'>
                                    <TextField
                                        label={'CNPJ'}
                                        name={'cnpj'}
                                        value={
                                            companyData.cnpj
                                                ? formatCNPJ(companyData.cnpj)
                                                : companyData.cnpj
                                        }
                                        onChange={handleChange}
                                        margin='dense'
                                        disabled
                                        size='small'
                                    />
                                    <TextField
                                        className='flex-1'
                                        label={'Nome Fantasia'}
                                        name={'nome_fantasia'}
                                        value={companyData.nome_fantasia}
                                        onChange={handleChange}
                                        margin='dense'
                                        disabled={!isEditing}
                                        size='small'
                                    />
                                </Box>
                                <Box className='flex gap-2'>
                                    <TextField
                                        className='flex-1'
                                        label={'Natureza Juridica'}
                                        name={'natureza_juridica'}
                                        value={companyData.natureza_juridica}
                                        onChange={handleChange}
                                        margin='dense'
                                        disabled
                                        size='small'
                                    />
                                    <TextField
                                        label={'Situação'}
                                        name={'situacao_cadastral'}
                                        value={companyData.situacao_cadastral}
                                        onChange={handleChange}
                                        margin='dense'
                                        disabled
                                        size='small'
                                    />
                                </Box>
                                <TextField
                                    label={'Atividade'}
                                    name={'cnae_fiscal_principal'}
                                    value={companyData.cnae_fiscal_principal}
                                    onChange={handleChange}
                                    margin='dense'
                                    disabled
                                    size='small'
                                    fullWidth
                                />
                                <Divider sx={{ my: 1 }} />
                                <Box className='flex gap-2'>
                                    <TextField
                                        label={'Telefone'}
                                        name={'telefone'}
                                        value={
                                            companyData.telefone
                                                ? formatPhone(companyData.telefone)
                                                : ''
                                        }
                                        onChange={handleChange}
                                        margin='dense'
                                        disabled={!isEditing}
                                        size='small'
                                    />
                                    <TextField
                                        className='flex-1'
                                        label={'Email'}
                                        name={'email'}
                                        value={companyData.email}
                                        onChange={handleChange}
                                        margin='dense'
                                        disabled={!isEditing}
                                        size='small'
                                    />
                                </Box>

                                <Box className='flex flex-wrap gap-2 w-full'>
                                    <TextField
                                        className='w-[9rem]'
                                        label={'Cep'}
                                        name={'cep'}
                                        value={
                                            companyData.cep
                                                ? formatCep(companyData.cep)
                                                : companyData.cep
                                        }
                                        onChange={handleChange}
                                        margin='dense'
                                        disabled={!isEditing}
                                        size='small'
                                    />
                                    <TextField
                                        className='w-[5rem]'
                                        label={'Nº'}
                                        name={'numero'}
                                        value={companyData.numero}
                                        onChange={handleChange}
                                        margin='dense'
                                        disabled={!isEditing}
                                        size='small'
                                    />
                                    <TextField
                                        className='  w-[25.8rem]'
                                        label={'Bairro'}
                                        name={'bairro'}
                                        value={companyData.bairro}
                                        onChange={handleChange}
                                        margin='dense'
                                        disabled={!isEditing}
                                        size='small'
                                    />
                                    <TextField
                                        className='  w-[22rem]'
                                        label={'Cidade'}
                                        name={'cidade'}
                                        value={companyData.cidade}
                                        onChange={handleChange}
                                        margin='dense'
                                        disabled={!isEditing}
                                        size='small'
                                    />
                                    <TextField
                                        className='flex-1'
                                        label={'UF'}
                                        name={'estado'}
                                        value={companyData.estado}
                                        onChange={handleChange}
                                        margin='dense'
                                        disabled={!isEditing}
                                        size='small'
                                    />
                                    <TextField
                                        label={'País'}
                                        name={'pais'}
                                        value={companyData.pais}
                                        onChange={handleChange}
                                        margin='dense'
                                        disabled={!isEditing}
                                        size='small'
                                    />
                                </Box>
                            </Box>
                            <Button variant='contained' fullWidth onClick={handleEditClick}>
                                {isEditing ? 'Salvar' : 'Editar'}
                            </Button>
                        </Fragment>
                    )}

                    {step === 2 && (
                        <Box>
                            <TextField
                                label='Digite seu Nome'
                                fullWidth
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </Box>
                    )}
                    {step === 3 && (
                        <Box>
                            <TextField
                                label='Digite seu Email'
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button
                                variant='contained'
                                fullWidth
                                sx={{ mt: 2 }}
                                onClick={() =>
                                    dispatch(twoFactorRequest({ data: email })).then(() =>
                                        nextStep(),
                                    )
                                }
                            >
                                Continuar
                            </Button>
                        </Box>
                    )}
                    {step === 4 && (
                        <Box>
                            <TextField
                                label='Digite o código OTP'
                                fullWidth
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <Typography variant='body2' textAlign={'center'} mt={2}>
                                Um código de validação foi enviado para sua caixa
                                <br /> de mensagens,verifique também a caixa de spam
                            </Typography>
                            <Button
                                variant='contained'
                                fullWidth
                                sx={{ mt: 2 }}
                                onClick={handleValidar}
                            >
                                Validar Código
                            </Button>
                        </Box>
                    )}
                    {step === 5 && (
                        <Box>
                            <TextField
                                label='Digite seu Telefone'
                                fullWidth
                                value={formatPhone(phone)}
                                onChange={(e) => setPhone(e.target.value)}
                            />
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
                                onClick={handleDataSend}
                            >
                                Finalizar
                            </Button>
                        </Box>
                    )}

                    {step > 0 && (
                        <Box className='flex gap-2'>
                            <Button variant='outlined' fullWidth sx={{ mt: 2 }} onClick={prevStep}>
                                Voltar
                            </Button>
                            {step !== 3 && step !== 4 && step !== 6 && (
                                <Button
                                    variant='contained'
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    onClick={nextStep}
                                >
                                    Continuar
                                </Button>
                            )}
                        </Box>
                    )}
                </Paper>
            )}
        </Box>
    );
}
