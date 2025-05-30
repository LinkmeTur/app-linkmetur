'use client';
import { ChangeEvent, useEffect, useState } from 'react';
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        console.log(factor);
        console.log(otp);
        if (factor === otp) {
            nextStep();
        } else {
            dispatch(twoFactorRequest({ codeFactor: 'email', data: email }));
            setOtp('');
        }
    };
    const handleDataSend = () => {
        const userMaster: Partial<TUserPass> = {
            nome,
            email,
            telefone: phone,
            senha: password,
            nivel: 1,
        };
        alert(JSON.stringify(userMaster));
        const companyMaster: Partial<TCorporation> = {
            ...companyData,
            tipo: typeCorp,
            localizacao: JSON.stringify(companyData?.localizacao),
        };
        alert(JSON.stringify(companyMaster));
        dispatch(createCorporation({ corp: companyMaster, user: userMaster })).then(() => {
            dispatch(clearCorporationState());
            dispatch(clearUserState());
            router.push('/signin');
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
                <Paper sx={{ maxWidth: 700, mx: 'auto', p: 4, mt: 4 }}>
                    <LinearProgress variant='determinate' value={(step / totalSteps) * 100} />
                    <Typography align='center' sx={{ mt: 2 }}>
                        {Math.round((step / totalSteps) * 100)}% concluído
                    </Typography>

                    {step === 0 && (
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
                                onClick={() => dispatch(consultCNPJ(cnpj)).unwrap().then(nextStep)}
                            >
                                Buscar Dados
                            </Button>
                        </Box>
                    )}

                    {step === 1 && companyData && (
                        <Box>
                            <Box className='flex flex-col gap-2'>
                                <TextField
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
                                    value={companyData.cnpj}
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
                            <Divider sx={{ my: 2 }} />
                            <Box className='flex gap-2'>
                                <TextField
                                    label={'Telefone'}
                                    name={'telefone'}
                                    value={companyData.telefone}
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
                            <Divider />
                            <Box className='flex flex-wrap gap-2 w-full'>
                                <TextField
                                    className='w-[9rem]'
                                    label={'Cep'}
                                    name={'cep'}
                                    value={companyData.cep}
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
                                    className='  w-[24.6rem]'
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

                            <Button variant='contained' fullWidth onClick={handleEditClick}>
                                {isEditing ? 'Salvar' : 'Editar'}
                            </Button>
                            <Button variant='contained' fullWidth sx={{ mt: 2 }} onClick={nextStep}>
                                Continuar
                            </Button>
                        </Box>
                    )}

                    {step === 2 && (
                        <Box>
                            <TextField
                                label='Digite seu Nome'
                                fullWidth
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <Button variant='contained' fullWidth sx={{ mt: 2 }} onClick={nextStep}>
                                Continuar
                            </Button>
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
                                    dispatch(
                                        twoFactorRequest({ codeFactor: 'email', data: email }),
                                    ).then(() => nextStep())
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
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
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
                                onClick={handleDataSend}
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
