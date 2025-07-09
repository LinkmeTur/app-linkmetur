'use client';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Grid,
    IconButton,
    Modal,
    Paper,
    Rating,
    Typography,
} from '@mui/material';
import {
    FaRegStar,
    //  FaHeart,
    FaRegHeart,
    FaWindowClose,
} from 'react-icons/fa';
import Image from 'next/image';
import { IRfp, IService } from '@/app/store/reducers/jobs/jobs.slice';
import { Fragment, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/hooks';
import createRfp from '@/app/store/reducers/jobs/thunks/rfp/createRfp.thunk';
import { useRouter } from 'next/navigation';
import { setAlertApp } from '@/app/store/reducers/configApp/configApp.slice';

export default function CardService({ service }: { service: IService & { id: string } }) {
    const router = useRouter();
    const dispacth = useAppDispatch();
    const { usuario } = useAppSelector((state) => state.auth);
    const [star, setStar] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
    const [imagemFull, setImagemFull] = useState<string>(service.photos[0].photo_URL || '');
    useEffect(() => {
        if (service.evaluations && service.evaluations.length > 0) {
            const allStar = service.evaluations.reduce((acc, cur) => acc + cur.rating, 0);
            setStar(allStar / service.evaluations.length);
        }
    }, []);
    const certifications = JSON.parse(service.certificacoes || '[]');
    const handleRfp = () => {
        const newRfp: Partial<IRfp> = {
            prestadorID: service.corp?.id,
            corpID: usuario.corpId as string,
            titulo: service.nome_servico,
            descricao: service.descricao,
            detalhes: 'entrar em contato pra detalhes',
            valor_medio: (service.max_valor - service.min_valor).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }),
            tipo: service.categoria,
            jobID: service.id,
        };

        dispacth(createRfp(newRfp))
            .unwrap()
            .then((res) => {
                if (!res) {
                    throw new Error('Não foi possivel solicitar o serviço!');
                }
                router.push('/rfp');
                setOpen(false);
            })
            .catch((err) => {
                dispacth(setAlertApp({ message: err.message, type: 'error' }));
                console.log(err);
            });
    };
    return (
        <Box>
            <Card className='rounded-lg flex flex-col md:flex-row'>
                <CardMedia className='md:w-1/3 h-48 md:h-auto bg-gray-200 relative'>
                    <Image
                        src={service.photos[0].photo_URL}
                        alt={service.photos[0].photo_alt}
                        width={300}
                        height={300}
                        className='w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none'
                    />
                    <Box className='absolute top-2 right-2 bg-amber-400 text-white text-xs font-medium p-1 rounded flex '>
                        <FaRegStar className='mr-1' />{' '}
                        <Typography className=' text-xs'>{star}</Typography>
                    </Box>
                </CardMedia>
                <Box className='md:w-2/3 flex flex-col'>
                    <CardContent>
                        <div className='flex items-center space-x-2 mb-2'>
                            <Chip label={service.categoria} size='small' color='success' />
                            <Chip label={service.sub_categoria} size='small' />
                        </div>
                        <Typography className='font-medium  mb-1'>
                            {service.nome_servico}
                        </Typography>
                        <Typography className='text-sm opacity-70'>{service.descricao}</Typography>
                    </CardContent>
                    <CardActions className='mt-auto flex items-center justify-between'>
                        <div>
                            <p className='font-semibold '>
                                {service.min_valor.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}{' '}
                                -{' '}
                                {service.max_valor.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                            </p>
                            <div className='flex items-center mt-1'>
                                <div className='flex text-amber-400 text-xs'>
                                    <Rating
                                        name='simple-controlled'
                                        value={star}
                                        // onChange={(event, newValue) => {
                                        //   setValue(newValue);
                                        // }}
                                        size='small'
                                        disabled
                                    />
                                </div>
                                <span className='text-xs text-gray-500 ml-1'>
                                    ({service.evaluations?.length} avaliações)
                                </span>
                            </div>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <IconButton className='text-gray-400 hover:text-red-500'>
                                <FaRegHeart className='fa-regular fa-heart text-lg'></FaRegHeart>
                            </IconButton>
                            <Button
                                variant='contained'
                                color='success'
                                className='font-medium py-2 px-4 rounded-md'
                                onClick={() => setOpen(true)}
                            >
                                Ver detalhes
                            </Button>
                        </div>
                    </CardActions>
                </Box>
            </Card>
            <Modal
                // hideBackdrop
                keepMounted
                open={open}
                onClose={() => setOpen(false)}
                className='flex items-center justify-center'
            >
                <Paper
                    elevation={2}
                    sx={{
                        borderRadius: 2,
                        p: 2,
                        my: 3,
                        position: 'relative',
                        height: '85%',
                        overflow: 'hidden',
                    }}
                >
                    <IconButton
                        onClick={() => setOpen(false)}
                        sx={{ position: 'absolute', right: 3, top: 3 }}
                    >
                        <FaWindowClose />
                    </IconButton>
                    <Box sx={{ p: 1, overflow: 'auto', height: '100%', width: 800, mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 7 }}>
                                <Grid
                                    size={12}
                                    sx={{
                                        bgcolor: 'grey.300',
                                        height: 200,
                                        borderRadius: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'grey.500',
                                        mb: 2,
                                    }}
                                >
                                    <Image
                                        src={imagemFull || '/window.svg'}
                                        alt='full'
                                        height={100}
                                        width={100}
                                        className='w-full h-full object-cover rounded-lg '
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <Grid container spacing={1}>
                                        {service.photos
                                            ? service.photos.map((p) => (
                                                  <Grid size={2} key={p.photo_alt}>
                                                      <Box
                                                          sx={{
                                                              bgcolor: 'grey.300',
                                                              height: 40,
                                                              width: 70,
                                                              borderRadius: 2,
                                                              display: 'flex',
                                                              alignItems: 'center',
                                                              justifyContent: 'center',
                                                              color: 'grey.500',
                                                              cursor: 'pointer',
                                                          }}
                                                          onClick={() => setImagemFull(p.photo_URL)}
                                                      >
                                                          <Image
                                                              src={p.photo_URL}
                                                              alt={p.photo_alt || 'no image'}
                                                              height={100}
                                                              width={100}
                                                              className='w-full h-full object-cover rounded-lg '
                                                          />
                                                      </Box>
                                                  </Grid>
                                              ))
                                            : null}
                                        {service.video_url && (
                                            <Grid size={2}>
                                                <Box
                                                    sx={{
                                                        bgcolor: 'grey.300',
                                                        height: 40,
                                                        width: 70,
                                                        borderRadius: 2,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: 'grey.500',
                                                    }}
                                                >
                                                    <iframe
                                                        src={service.video_url}
                                                        title={service.nome_servico}
                                                        className='w-full h-full object-cover rounded-lg '
                                                    />
                                                </Box>
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>

                                <Typography
                                    variant='h5'
                                    fontWeight='bold'
                                    color='textPrimary'
                                    mb={1}
                                >
                                    {service.nome_servico ?? 'Título do Serviço'}
                                </Typography>

                                <Box mb={2}>
                                    <Chip
                                        label={service.categoria ?? 'Categoria'}
                                        color='primary'
                                        size='small'
                                    />
                                    <Chip
                                        label={service.sub_categoria ?? 'Subcategoria'}
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
                                    {service.descricao ??
                                        'Sua descrição aparecerá aqui. Descreva detalhadamente o serviço que você oferece...'}
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 5 }}>
                                <Paper sx={{ p: 2, borderRadius: 2 }}>
                                    <Typography
                                        variant='body2'
                                        fontWeight='bold'
                                        color='textPrimary'
                                        mb={1}
                                    >
                                        Empresa
                                    </Typography>
                                    <Box display='flex' alignItems='center' mb={2}>
                                        <Avatar src={service.corp?.logo_url} sx={{ mr: 2 }} />
                                        <Box>
                                            <Typography
                                                variant='body2'
                                                fontWeight='bold'
                                                color='textPrimary'
                                            >
                                                {service.corp?.nome_fantasia ??
                                                    service.corp?.razao_social}
                                            </Typography>
                                            <Box
                                                color='amber.400'
                                                display='flex'
                                                alignItems='center'
                                            >
                                                <Rating
                                                    name='simple-controlled'
                                                    value={star}
                                                    // onChange={(event, newValue) => {
                                                    //   setValue(newValue);
                                                    // }}
                                                    size='small'
                                                    disabled
                                                />
                                                <Typography
                                                    variant='body2'
                                                    color='textSecondary'
                                                    ml={1}
                                                >
                                                    {star} ({service.evaluations?.length})
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Button variant='contained' onClick={handleRfp} fullWidth>
                                        Solicitar Proposta
                                    </Button>
                                </Paper>
                                {certifications && certifications.length && (
                                    <Fragment>
                                        <Typography
                                            variant='body2'
                                            fontWeight='bold'
                                            color='textPrimary'
                                            my={1}
                                        >
                                            Certificações
                                        </Typography>
                                        <Grid container spacing={1}>
                                            {certifications.map(
                                                (c: { id: string; label: string }) => (
                                                    <Chip
                                                        key={c.id}
                                                        label={c.label}
                                                        variant='filled'
                                                        size='small'
                                                        color={
                                                            c.label.includes('Sustentabilidade')
                                                                ? 'success'
                                                                : c.label.includes('Turismo')
                                                                  ? 'secondary'
                                                                  : 'warning'
                                                        }
                                                    />
                                                ),
                                            )}
                                        </Grid>
                                    </Fragment>
                                )}
                            </Grid>
                            <Grid size={12}>
                                <Typography
                                    variant='h6'
                                    fontWeight='bold'
                                    color='textPrimary'
                                    mb={3}
                                >
                                    {service.min_valor.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    })}{' '}
                                    -{' '}
                                    {service.max_valor.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    })}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Modal>
        </Box>
    );
}
