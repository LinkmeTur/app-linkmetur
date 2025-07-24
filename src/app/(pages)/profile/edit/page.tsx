'use client';
import { formatCep } from '@/app/config/functions/formatCep';
import { formatCNPJ } from '@/app/config/functions/formatCNPJ';
import { formatPhone } from '@/app/config/functions/formatPhone';
import { TCorporation } from '@/app/store/reducers/corporation/corporation.slice';
import { TUser } from '@/app/store/reducers/user/user.slice';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { PageContainer } from '@toolpad/core/PageContainer';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { MdAddAPhoto, MdAddPhotoAlternate, MdDeleteForever, MdEdit } from 'react-icons/md';
import { IoMdPersonAdd } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/hooks';
import { useRouter } from 'next/navigation';
import ModalUserEditOrCreate from '../components/edit-user-profile.componet';
import { sendFileS3 } from '@/app/api/awsS3';
import { ArrowBack } from '@mui/icons-material';
import editProfileCorp from '@/app/store/reducers/corporation/thunks/editProfileCorp.thunk';

export default function EditProlile() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.usuario);
    const router = useRouter();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [userEdit, SetUserEdit] = useState<TUser | undefined>(undefined);
    const [logo, setLogo] = useState<string>((user.corp?.logo_url as string) || '');
    const [companyData, setCompanyData] = useState<Partial<TCorporation | null | undefined>>(
        user.corp,
    );
    const [wallpaper, setWallpaper] = useState<string>(
        (user.corp?.profile?.Wallpaper_Url as string) || '',
    );
    useEffect(() => {
        if (user.corp) {
            setCompanyData(user.corp);
        }
    }, [user.corp]);
    const handleImageUploadLogo = async (event: ChangeEvent<HTMLInputElement>) => {
        const logo = event.target.files?.[0];
        if (logo) {
            const newLogo = await sendFileS3('logo_corp', logo);
            if (newLogo) {
                setLogo(newLogo.file_URL);
            }
        }
    };
    const handleImageUploadWallpaper = async (event: ChangeEvent<HTMLInputElement>) => {
        const wallpaper = event.target.files?.[0];
        if (wallpaper) {
            const newWallpaper = await sendFileS3('wallpaper_corp', wallpaper);
            if (newWallpaper) {
                setWallpaper(newWallpaper.file_URL);
            }
        }
    };
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.target.name.includes('profile')) {
            setCompanyData({
                ...companyData,
                profile: {
                    ...companyData?.profile,
                    [event.target.name.split('.')[1]]: event.target.value,
                },
            });
        } else if (
            event.target.name === 'instagram' ||
            event.target.name === 'facebook' ||
            event.target.name === 'linkedin' ||
            event.target.name === 'x' ||
            event.target.name === 'whatsapp' ||
            event.target.name === 'tiktok'
        ) {
            const redesSociais = JSON.parse(companyData?.profile?.redesSociais ?? '{}');
            redesSociais[event.target.name] = event.target.value;

            setCompanyData({
                ...companyData,
                profile: { ...companyData?.profile, redesSociais: JSON.stringify(redesSociais) },
            });
        } else {
            setCompanyData({
                ...companyData,
                [event.target.name]: event.target.value,
            });
        }
    };

    const handleSaveCorp = () => {
        if (companyData) {
            dispatch(
                editProfileCorp({
                    id: user.id as string,
                    corp: {
                        ...companyData,
                        logo_url: logo,
                        profile: {
                            ...companyData.profile,
                            Wallpaper_Url: wallpaper,
                        },
                    },
                }),
            )
                .unwrap()
                .then(() => router.push('/profile'));
        }
    };
    return (
        <PageContainer
            title=''
            breadcrumbs={[]}
            className='p-0 w-full overflow-hidden'
            sx={{ maxWidth: '100%' }}
        >
            <Paper elevation={12} className='rounded-lg w-full h-[55%]'>
                {/* <!-- Company Header --> */}
                <Box id='company-header' className='relative'>
                    <Stack
                        className='h-36 bg-emerald-600 relative w-full'
                        sx={{ borderRadius: '0.5rem 1rem 0 0' }}
                    >
                        {wallpaper && (
                            <Box className='w-full h-full opacity-20'>
                                <Image
                                    src={wallpaper}
                                    alt='Wallpaper'
                                    width={500}
                                    height={500}
                                    className='w-full h-full'
                                />
                            </Box>
                        )}
                        <Stack className='absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent'>
                            <input
                                type='file'
                                accept='image/*'
                                multiple
                                value={''}
                                onChange={handleImageUploadWallpaper}
                                style={{
                                    display: 'none',
                                }}
                                id='upload-photo'
                            />
                            <label htmlFor='upload-photo'>
                                <IconButton
                                    component='span'
                                    size='small'
                                    sx={{
                                        backgroundColor: 'whitesmoke',
                                        top: '-2.2em',
                                        right: '10px',
                                        position: 'absolute',
                                        fontSize: '20px',
                                    }}
                                    color='success'
                                >
                                    <MdAddPhotoAlternate />
                                </IconButton>
                            </label>
                        </Stack>
                    </Stack>

                    <Stack className='absolute bottom-0 left-0 w-full px-8 pb-4'>
                        <Box className='flex items-end'>
                            <Stack className='relative mr-6 h-24 w-24 rounded-lg  p-1 shadow-md border-4 border-white'>
                                {logo && (
                                    <Image
                                        src={logo}
                                        alt='logo'
                                        width={500}
                                        height={500}
                                        className='w-full h-full'
                                    />
                                )}
                                <input
                                    type='file'
                                    accept='image/*'
                                    multiple
                                    value={''}
                                    onChange={handleImageUploadLogo}
                                    style={{
                                        display: 'none',
                                    }}
                                    id='upload-photo-logo'
                                />
                                <label htmlFor='upload-photo-logo'>
                                    <IconButton
                                        component='span'
                                        size='small'
                                        sx={{
                                            backgroundColor: 'whitesmoke',
                                            top: '-10px',
                                            right: '-10px',
                                            position: 'absolute',
                                        }}
                                        color='success'
                                    >
                                        <MdAddAPhoto />
                                    </IconButton>
                                </label>
                            </Stack>

                            <Stack className='flex-1 text-white pb-1'>
                                <Typography className='text-2xl font-bold'>
                                    {companyData?.razao_social}
                                </Typography>
                            </Stack>
                            <Stack className='flex-end text-white pb-1'>
                                <Button
                                    color='warning'
                                    startIcon={<ArrowBack />}
                                    onClick={() => router.push('/profile')}
                                >
                                    Voltar
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>

                <Box className='mb-2 overflow-hidden h-[80%]'>
                    <Grid container spacing={2} className=' h-[90%]'>
                        <Grid size={7} className='px-4 h-full' sx={{ overflow: 'auto' }}>
                            <Typography className='text-lg font-bold '>
                                Dados Empresariais:
                            </Typography>
                            <Box>
                                <TextField
                                    fullWidth
                                    label={'Empresa'}
                                    name={'razao_social'}
                                    value={companyData?.razao_social}
                                    onChange={handleChange}
                                    margin='dense'
                                    disabled
                                    size='small'
                                    slotProps={{
                                        input: {
                                            style: {
                                                fontSize: '0.7em',
                                            },
                                        },
                                        inputLabel: {
                                            style: {
                                                fontSize: '0.8em',
                                            },
                                        },
                                    }}
                                />
                            </Box>
                            <Box className='flex gap-2'>
                                <TextField
                                    label={'CNPJ'}
                                    name={'cnpj'}
                                    value={
                                        companyData?.cnpj
                                            ? formatCNPJ(companyData?.cnpj)
                                            : companyData?.cnpj
                                    }
                                    onChange={handleChange}
                                    margin='dense'
                                    disabled
                                    size='small'
                                    slotProps={{
                                        input: {
                                            style: {
                                                fontSize: '0.7em',
                                            },
                                        },
                                        inputLabel: {
                                            style: {
                                                fontSize: '0.8em',
                                            },
                                        },
                                    }}
                                />
                                <TextField
                                    className='flex-1'
                                    label={'Nome Fantasia'}
                                    name={'nome_fantasia'}
                                    value={companyData?.nome_fantasia}
                                    onChange={handleChange}
                                    margin='dense'
                                    disabled
                                    size='small'
                                    slotProps={{
                                        input: {
                                            style: {
                                                fontSize: '0.7em',
                                            },
                                        },
                                        inputLabel: {
                                            style: {
                                                fontSize: '0.8em',
                                            },
                                        },
                                    }}
                                />
                            </Box>
                            <Box className='flex gap-2'>
                                <TextField
                                    className='flex-1'
                                    label={'Natureza Juridica'}
                                    name={'natureza_juridica'}
                                    value={companyData?.natureza_juridica}
                                    onChange={handleChange}
                                    margin='dense'
                                    disabled
                                    size='small'
                                    slotProps={{
                                        input: {
                                            style: {
                                                fontSize: '0.7em',
                                            },
                                        },
                                        inputLabel: {
                                            style: {
                                                fontSize: '0.8em',
                                            },
                                        },
                                    }}
                                />
                                <TextField
                                    label={'Situação'}
                                    name={'situacao_cadastral'}
                                    value={companyData?.situacao_cadastral}
                                    onChange={handleChange}
                                    margin='dense'
                                    disabled
                                    size='small'
                                    slotProps={{
                                        input: {
                                            style: {
                                                fontSize: '0.7em',
                                            },
                                        },
                                        inputLabel: {
                                            style: {
                                                fontSize: '0.8em',
                                            },
                                        },
                                    }}
                                />
                            </Box>
                            <TextField
                                label={'Atividade'}
                                name={'cnae_fiscal_principal'}
                                value={companyData?.cnae_fiscal_principal}
                                onChange={handleChange}
                                margin='dense'
                                disabled
                                size='small'
                                fullWidth
                                slotProps={{
                                    input: {
                                        style: {
                                            fontSize: '0.7em',
                                        },
                                    },
                                    inputLabel: {
                                        style: {
                                            fontSize: '0.8em',
                                        },
                                    },
                                }}
                            />
                            <Divider sx={{ my: 1 }} />
                            <Box className='flex gap-2'>
                                <TextField
                                    label={'Telefone'}
                                    name={'telefone'}
                                    value={
                                        companyData?.telefone
                                            ? formatPhone(companyData?.telefone)
                                            : ''
                                    }
                                    onChange={handleChange}
                                    margin='dense'
                                    size='small'
                                    slotProps={{
                                        input: {
                                            style: {
                                                fontSize: '0.7em',
                                            },
                                        },
                                        inputLabel: {
                                            style: {
                                                fontSize: '0.8em',
                                            },
                                        },
                                    }}
                                />
                                <TextField
                                    className='flex-1'
                                    label={'Email'}
                                    name={'email'}
                                    value={companyData?.email}
                                    onChange={handleChange}
                                    margin='dense'
                                    size='small'
                                    slotProps={{
                                        input: {
                                            style: {
                                                fontSize: '0.7em',
                                            },
                                        },
                                        inputLabel: {
                                            style: {
                                                fontSize: '0.8em',
                                            },
                                        },
                                    }}
                                />
                            </Box>

                            <Box className='flex flex-wrap gap-1 w-full'>
                                <TextField
                                    className='w-[8rem]'
                                    label={'Cep'}
                                    name={'cep'}
                                    value={
                                        companyData?.cep
                                            ? formatCep(companyData?.cep)
                                            : companyData?.cep
                                    }
                                    onChange={handleChange}
                                    margin='dense'
                                    size='small'
                                    slotProps={{
                                        input: {
                                            style: {
                                                fontSize: '0.7em',
                                            },
                                        },
                                        inputLabel: {
                                            style: {
                                                fontSize: '0.8em',
                                            },
                                        },
                                    }}
                                />
                                <TextField
                                    className='w-[5rem]'
                                    label={'Nº'}
                                    name={'numero'}
                                    value={companyData?.numero}
                                    onChange={handleChange}
                                    margin='dense'
                                    size='small'
                                    slotProps={{
                                        input: {
                                            style: {
                                                fontSize: '0.7em',
                                            },
                                        },
                                        inputLabel: {
                                            style: {
                                                fontSize: '0.8em',
                                            },
                                        },
                                    }}
                                />
                                <TextField
                                    className='  w-[25rem]'
                                    label={'Bairro'}
                                    name={'bairro'}
                                    value={companyData?.bairro}
                                    onChange={handleChange}
                                    margin='dense'
                                    size='small'
                                    slotProps={{
                                        input: {
                                            style: {
                                                fontSize: '0.7em',
                                            },
                                        },
                                        inputLabel: {
                                            style: {
                                                fontSize: '0.8em',
                                            },
                                        },
                                    }}
                                />
                                <TextField
                                    className='  w-[22rem]'
                                    label={'Cidade'}
                                    name={'cidade'}
                                    value={companyData?.cidade}
                                    onChange={handleChange}
                                    margin='dense'
                                    size='small'
                                    slotProps={{
                                        input: {
                                            style: {
                                                fontSize: '0.7em',
                                            },
                                        },
                                        inputLabel: {
                                            style: {
                                                fontSize: '0.8em',
                                            },
                                        },
                                    }}
                                />
                                <TextField
                                    className='flex-1'
                                    label={'UF'}
                                    name={'estado'}
                                    value={companyData?.estado}
                                    onChange={handleChange}
                                    margin='dense'
                                    size='small'
                                    slotProps={{
                                        input: {
                                            style: {
                                                fontSize: '0.7em',
                                            },
                                        },
                                        inputLabel: {
                                            style: {
                                                fontSize: '0.8em',
                                            },
                                        },
                                    }}
                                />
                                <TextField
                                    label={'País'}
                                    name={'pais'}
                                    value={companyData?.pais}
                                    onChange={handleChange}
                                    margin='dense'
                                    size='small'
                                    slotProps={{
                                        input: {
                                            style: {
                                                fontSize: '0.7em',
                                            },
                                        },
                                        inputLabel: {
                                            style: {
                                                fontSize: '0.8em',
                                            },
                                        },
                                    }}
                                />
                            </Box>
                            <Divider sx={{ my: 1 }} />
                            <Box className='flex flex-col gap-1'>
                                <TextField
                                    label={'Descrição'}
                                    name={'profile.descricao'}
                                    value={companyData?.profile?.descricao}
                                    onChange={handleChange}
                                    margin='dense'
                                    size='medium'
                                    fullWidth
                                    multiline={true}
                                    slotProps={{
                                        input: {
                                            style: {
                                                fontSize: '0.7em',
                                            },
                                        },
                                        inputLabel: {
                                            style: {
                                                fontSize: '0.8em',
                                            },
                                        },
                                    }}
                                />
                                <TextField
                                    label={'Sobre'}
                                    name={'profile.sobre'}
                                    value={companyData?.profile?.sobre}
                                    onChange={handleChange}
                                    margin='dense'
                                    size='medium'
                                    fullWidth
                                    multiline={true}
                                    slotProps={{
                                        input: {
                                            style: {
                                                fontSize: '0.7em',
                                            },
                                        },
                                        inputLabel: {
                                            style: {
                                                fontSize: '0.8em',
                                            },
                                        },
                                    }}
                                />
                                <TextField
                                    label={'Site'}
                                    name={'profile.site'}
                                    value={companyData?.profile?.site}
                                    onChange={handleChange}
                                    margin='dense'
                                    size='small'
                                    fullWidth
                                    slotProps={{
                                        input: {
                                            style: {
                                                fontSize: '0.7em',
                                            },
                                        },
                                        inputLabel: {
                                            style: {
                                                fontSize: '0.8em',
                                            },
                                        },
                                    }}
                                />
                                <TextField
                                    label={'Certificações'}
                                    name={'profile.certificacoes'}
                                    value={companyData?.profile?.certificacoes}
                                    onChange={handleChange}
                                    margin='dense'
                                    size='small'
                                    helperText='Separe cada Certificão por " ; "'
                                    fullWidth
                                    slotProps={{
                                        input: {
                                            style: {
                                                fontSize: '0.7em',
                                            },
                                        },
                                        inputLabel: {
                                            style: {
                                                fontSize: '0.8em',
                                            },
                                        },
                                    }}
                                />
                                <Stack
                                    direction={'row'}
                                    gap={1}
                                    flexWrap={'wrap'}
                                    justifyContent={'space-between'}
                                >
                                    <Box className='w-full'>
                                        <Typography>Redes Sociais</Typography>
                                    </Box>
                                    <TextField
                                        name={'instagram'}
                                        value={
                                            JSON.parse(companyData?.profile?.redesSociais || '{}')
                                                ?.instagram || ''
                                        }
                                        onChange={handleChange}
                                        margin='none'
                                        size='small'
                                        sx={{
                                            width: '49%',
                                            '& .mui-1q55ijt-MuiInputBase-input-MuiOutlinedInput-input':
                                                {
                                                    marginLeft: 2,
                                                    paddingLeft: 2,
                                                    borderLeft: '1px solid ',
                                                },
                                        }}
                                        slotProps={{
                                            input: {
                                                startAdornment: <FaInstagram size={20} />,

                                                style: {
                                                    fontSize: '0.7em',
                                                },
                                            },
                                        }}
                                    />

                                    <TextField
                                        name={'facebook'}
                                        value={
                                            JSON.parse(companyData?.profile?.redesSociais || '{}')
                                                ?.facebook || ''
                                        }
                                        onChange={handleChange}
                                        margin='none'
                                        size='small'
                                        sx={{
                                            width: '49%',
                                            '& .mui-1q55ijt-MuiInputBase-input-MuiOutlinedInput-input':
                                                {
                                                    marginLeft: 2,
                                                    paddingLeft: 2,
                                                    borderLeft: '1px solid ',
                                                },
                                        }}
                                        slotProps={{
                                            input: {
                                                startAdornment: <FaFacebook size={20} />,

                                                style: {
                                                    fontSize: '0.7em',
                                                },
                                            },
                                        }}
                                    />
                                    <TextField
                                        name={'linkedin'}
                                        value={
                                            JSON.parse(companyData?.profile?.redesSociais || '{}')
                                                ?.linkedin || ''
                                        }
                                        onChange={handleChange}
                                        margin='none'
                                        size='small'
                                        sx={{
                                            width: '49%',
                                            '& .mui-1q55ijt-MuiInputBase-input-MuiOutlinedInput-input':
                                                {
                                                    marginLeft: 2,
                                                    paddingLeft: 2,
                                                    borderLeft: '1px solid ',
                                                },
                                        }}
                                        slotProps={{
                                            input: {
                                                startAdornment: <FaLinkedin size={20} />,

                                                style: {
                                                    fontSize: '0.7em',
                                                },
                                            },
                                        }}
                                    />
                                    <TextField
                                        name={'x'}
                                        value={
                                            JSON.parse(companyData?.profile?.redesSociais || '{}')
                                                ?.x || ''
                                        }
                                        onChange={handleChange}
                                        margin='none'
                                        size='small'
                                        sx={{
                                            width: '49%',
                                            '& .mui-1q55ijt-MuiInputBase-input-MuiOutlinedInput-input':
                                                {
                                                    marginLeft: 2,
                                                    paddingLeft: 2,
                                                    borderLeft: '1px solid ',
                                                },
                                        }}
                                        slotProps={{
                                            input: {
                                                startAdornment: <FaSquareXTwitter size={20} />,

                                                style: {
                                                    fontSize: '0.7em',
                                                },
                                            },
                                        }}
                                    />
                                    <TextField
                                        name={'whatsapp'}
                                        value={
                                            JSON.parse(companyData?.profile?.redesSociais || '{}')
                                                ?.whatsapp || ''
                                        }
                                        onChange={handleChange}
                                        margin='none'
                                        size='small'
                                        sx={{
                                            width: '49%',
                                            '& .mui-1q55ijt-MuiInputBase-input-MuiOutlinedInput-input':
                                                {
                                                    marginLeft: 2,
                                                    paddingLeft: 2,
                                                    borderLeft: '1px solid ',
                                                },
                                        }}
                                        slotProps={{
                                            input: {
                                                startAdornment: <FaWhatsapp size={20} />,

                                                style: {
                                                    fontSize: '0.7em',
                                                },
                                            },
                                        }}
                                    />
                                    <TextField
                                        name={'tiktok'}
                                        value={
                                            JSON.parse(companyData?.profile?.redesSociais || '{}')
                                                ?.tiktok || ''
                                        }
                                        onChange={handleChange}
                                        margin='none'
                                        size='small'
                                        sx={{
                                            width: '49%',
                                            '& .mui-1q55ijt-MuiInputBase-input-MuiOutlinedInput-input':
                                                {
                                                    marginLeft: 2,
                                                    paddingLeft: 2,
                                                    borderLeft: '1px solid ',
                                                },
                                        }}
                                        slotProps={{
                                            input: {
                                                startAdornment: <FaTiktok size={20} />,

                                                style: {
                                                    fontSize: '0.7em',
                                                },
                                            },
                                        }}
                                    />
                                </Stack>
                            </Box>
                            <Box className='my-2 w-full flex items-center justify-end gap-2'>
                                <Button variant='outlined'>Cancelar</Button>
                                <Button onClick={handleSaveCorp}>Salvar</Button>
                            </Box>
                        </Grid>
                        <Grid size={5}>
                            <Box className='flex items-center justify-between  gap-2'>
                                <Typography className='text-lg font-bold '>
                                    {companyData?.users && companyData?.users?.length > 1
                                        ? 'Usuários'
                                        : 'Usuário'}
                                    :
                                </Typography>
                                {user.nivel === 1 && (
                                    <Button
                                        startIcon={<IoMdPersonAdd />}
                                        onClick={() => {
                                            setOpenModal(true);
                                            SetUserEdit(undefined);
                                        }}
                                    >
                                        Adicionar Usuario
                                    </Button>
                                )}
                            </Box>
                            <Box className='flex flex-col gap-2 mt-2 px-2 w-full'>
                                <Card
                                    key={user.id}
                                    className='flex items-center gap-2 px-4 w-full justify-between'
                                    sx={{
                                        borderRadius: 2,
                                        boxShadow: 'none',
                                    }}
                                >
                                    <CardMedia>
                                        <Avatar
                                            src={user?.avatar_url || ''}
                                            sx={{ width: 40, height: 40 }}
                                        />
                                    </CardMedia>

                                    <CardContent className='flex-1'>
                                        <Typography className='text-lg font-bold'>
                                            {user?.nome?.toUpperCase()}
                                        </Typography>
                                        <Typography className='text-md'>{user?.email}</Typography>

                                        <Typography className='text-sm'>online</Typography>
                                    </CardContent>
                                    <CardActions className='flex flex-col items-center justify-center gap-2'>
                                        <IconButton
                                            onClick={() => {
                                                SetUserEdit(user);
                                                setOpenModal(true);
                                            }}
                                        >
                                            <MdEdit />
                                        </IconButton>
                                        {user.nivel === 1 && (
                                            <IconButton>
                                                <MdDeleteForever />
                                            </IconButton>
                                        )}
                                    </CardActions>
                                </Card>
                                {user.nivel === 1 &&
                                    companyData?.users?.map((u) => {
                                        if (u.id === user.id) return null;
                                        return (
                                            <Card
                                                key={u.id}
                                                className='flex items-center gap-2 px-4 w-full justify-between'
                                                sx={{
                                                    borderRadius: 2,
                                                    boxShadow: 'none',
                                                }}
                                            >
                                                <CardMedia>
                                                    <Avatar
                                                        src={u?.avatar_url || ''}
                                                        sx={{ width: 40, height: 40 }}
                                                    />
                                                </CardMedia>

                                                <CardContent className='flex-1'>
                                                    <Typography className='text-lg font-bold'>
                                                        {u?.nome?.toUpperCase()}
                                                    </Typography>
                                                    <Typography className='text-md'>
                                                        {u?.email}
                                                    </Typography>

                                                    <Typography className='text-sm'>
                                                        online
                                                    </Typography>
                                                </CardContent>
                                                <CardActions className='flex flex-col items-center justify-center gap-2'>
                                                    <IconButton
                                                        onClick={() => {
                                                            SetUserEdit(u);
                                                            setOpenModal(true);
                                                        }}
                                                    >
                                                        <MdEdit />
                                                    </IconButton>
                                                    <IconButton>
                                                        <MdDeleteForever />
                                                    </IconButton>
                                                </CardActions>
                                            </Card>
                                        );
                                    })}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            <ModalUserEditOrCreate
                open={openModal}
                user={userEdit}
                mode={userEdit !== undefined ? 'edit' : 'new'}
                onClose={() => {
                    SetUserEdit(undefined);
                    setOpenModal(false);
                }}
            />
        </PageContainer>
    );
}
