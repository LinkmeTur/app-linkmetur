'use client';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks/hooks';
import { TCorporation } from '@/app/store/reducers/corporation/corporation.slice';
import getAllCorp from '@/app/store/reducers/corporation/thunks/getAllCorporations.thunk';
import getRequestforcorpartion from '@/app/store/reducers/jobs/thunks/request/getRequestsForCorporation.thunk';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Divider,
    Typography,
    Paper,
    Pagination,
    Card,
    CardContent,
    CardActions,
    CardMedia,
} from '@mui/material';
import { PageContainer } from '@toolpad/core/PageContainer';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Requests() {
    const dispatch = useAppDispatch();
    const { usuario } = useAppSelector((state) => state.auth);
    const { requestList } = useAppSelector((state) => state.jobs);
    const [resultList, setResultList] = useState<typeof requestList>({
        requests: [],
        totalPages: 0,
        totalRecords: 0,
    });
    const [empresa, setEmpresa] = useState('');
    const [tipo, setTipo] = useState('');
    const [status, setStatus] = useState('');
    const [prestador, setPrestador] = useState<TCorporation[]>([]);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    useEffect(() => {
        if (usuario.corp)
            dispatch(
                getRequestforcorpartion({
                    id: usuario.corp?.id as string,
                    tipo: usuario.corp?.tipo,
                }),
            );
        if (usuario.corp?.tipo === 'P') {
            dispatch(getAllCorp('T'))
                .unwrap()
                .then((res) => {
                    setPrestador(res);
                });
        }
        if (usuario.corp?.tipo === 'T') {
            dispatch(getAllCorp('P'))
                .unwrap()
                .then((res) => {
                    setPrestador(res);
                });
        }
    }, []);
    useEffect(() => {
        if (requestList && Array.isArray(requestList.requests) && requestList.requests.length > 0) {
            setResultList(requestList);
        }
    }, [requestList]);

    const handleBuscar = () => {
        console.log('buscar');
    };
    return (
        <PageContainer title='' breadcrumbs={[]} className='p-0 w-full'>
            <Paper elevation={12}>
                <Box className='flex items-center justify-between px-6 my-4'>
                    <Typography variant='h5' className='font-bold'>
                        Filtros de Busca
                    </Typography>
                </Box>
                <Divider />
                <Box className='flex items-center justify-between px-6 my-4'>
                    <FormControl size='small' sx={{ width: '20rem' }}>
                        <InputLabel id='rfp_prestador'>Empresa</InputLabel>
                        <Select
                            labelId='rfp_prestador'
                            label='Empresa'
                            value={empresa}
                            onChange={(e) => setEmpresa(e.target.value)}
                        >
                            <MenuItem value=''>Todas</MenuItem>
                            {!!prestador.length &&
                                prestador.map((p) => (
                                    <MenuItem key={p.id as string} value={p.id as string}>
                                        {p.razao_social}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>

                    <FormControl size='small' sx={{ width: '20rem' }}>
                        <InputLabel id='status'>Status</InputLabel>
                        <Select
                            labelId='status'
                            label='Status'
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value=''>Todos os status</MenuItem>
                            <MenuItem value='aberto'>Aberto</MenuItem>
                            <MenuItem value='em_andamento'>Em andamento</MenuItem>
                            <MenuItem value='finalizado'>Finalizado</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box className='flex items-center justify-end px-6 mb-4 gap-3'>
                    <Button
                        variant='contained'
                        color='warning'
                        onClick={() => {
                            setEmpresa('');
                            setStatus('');
                            setTipo('');
                        }}
                    >
                        Limpar
                    </Button>
                    <Button
                        variant='contained'
                        color='success'
                        onClick={handleBuscar}
                        disabled={!empresa && !tipo && !status}
                    >
                        Buscar
                    </Button>
                </Box>
            </Paper>
            {resultList.requests.length ? (
                <Box>
                    <Box className='flex items-center justify-between mb-4'>
                        <h2 className='text-lg font-semibold text-gray-500'>
                            Resultados ({resultList.totalRecords})
                        </h2>
                        <Box className='flex items-center gap-2'>
                            <span className='text-sm text-gray-500'>Mostrar</span>

                            <Select
                                size='small'
                                value={limit}
                                onChange={(e) => setLimit(e.target.value)}
                                className='text-sm border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'
                            >
                                <MenuItem value={10}>10 </MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={30}>30</MenuItem>
                            </Select>
                        </Box>
                    </Box>
                    <Box>
                        {!!resultList.requests.length &&
                            resultList.requests.map((r) => (
                                <Card key={r.id} className='mb-4'>
                                    <CardContent>
                                        <Typography gutterBottom variant='h5' component='div'>
                                            Serviço Solicitado: {r.rfp.titulo}
                                        </Typography>

                                        <Typography variant='body2' color='text.secondary'>
                                            {r.rfp.descricao}
                                        </Typography>
                                        <Typography variant='body2' color='text.secondary'>
                                            {r.rfp.detalhes}
                                        </Typography>
                                        <Typography variant='body2' color='text.secondary'>
                                            {r.proposal.prazo.toLocaleDateString('pt-BR', {
                                                formatMatcher: 'best fit',
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: '2-digit',
                                            })}
                                        </Typography>
                                        <Typography variant='body2' color='text.secondary'>
                                            {r.status}
                                        </Typography>
                                        <Typography variant='body2' color='text.secondary'>
                                            {r.rfp.tipo}
                                        </Typography>
                                    </CardContent>

                                    {r.rfp.fotos?.length && (
                                        <CardMedia>
                                            <Image
                                                src={r.rfp.fotos[0].photo_URL}
                                                alt={r.rfp.fotos[0].photo_alt}
                                                height={100}
                                                width={100}
                                                className='w-[400px] h-[400px] object-cover rounded-md'
                                            />
                                        </CardMedia>
                                    )}

                                    <CardActions>
                                        <Button size='small' color='info'>
                                            Editar
                                        </Button>
                                        <Button size='small' color='error'>
                                            Excluir
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))}
                    </Box>
                    <Box id='pagination' className='flex items-center justify-center mt-6'>
                        <Pagination
                            count={resultList.totalPages}
                            page={page}
                            onChange={(e, value) => {
                                setPage(value);
                            }}
                            shape='rounded'
                        />
                    </Box>
                </Box>
            ) : (
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Typography variant='h5' mt={10} color='success'>
                        Nenhum Pedido Realizado
                    </Typography>
                </Box>
            )}
        </PageContainer>
    );
}
