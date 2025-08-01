'use client';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks/hooks';
import { TCorporation } from '@/app/store/reducers/corporation/corporation.slice';
import getAllCorp from '@/app/store/reducers/corporation/thunks/getAllCorporations.thunk';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    Modal,
    Pagination,
    Paper,
    Select,
    Stack,
    Typography,
} from '@mui/material';
import { PageContainer } from '@toolpad/core/PageContainer';
import { LiaBusinessTimeSolid } from 'react-icons/lia';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import ModalRfp from './components/modalRfp.component';
import { IProposal, IRfp } from '@/app/store/reducers/jobs/jobs.slice';
import ModalProposal from './components/modalProposal.component';
import { getRfpForCorp } from '@/app/store/reducers/jobs/thunks/rfp/getRfpforCorp.thunk';

export default function RFP() {
    const dispatch = useAppDispatch();
    const { rfpList } = useAppSelector((state) => state.jobs);
    const { usuario } = useAppSelector((state) => state.auth);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    const [resultList, setResultList] = useState<typeof rfpList>({
        rfps: [],
        totalPages: 0,
        totalRecords: 0,
    });
    const [empresa, setEmpresa] = useState('');
    const [tipo, setTipo] = useState('');
    const [status, setStatus] = useState('');
    const [prestador, setPrestador] = useState<TCorporation[]>([]);
    const [modalRfpSelect, setModalRfpSelect] = useState<{
        open: boolean;
        rfp: IRfp | null;
    }>({ open: false, rfp: null });
    const [proposalview, setProposalview] = useState<{ show: boolean; id: string | null }>({
        show: false,
        id: null,
    });
    const [modalProposal, setModalProposal] = useState<{
        show: boolean;
        proposal: IProposal | null;
    }>({ show: false, proposal: null });
    const [modalImageCard, setModalImageCard] = useState<{
        open: boolean;
        id: string | undefined;
        photo_URL: string;
        photo_alt: string;
    }>({
        open: false,
        id: undefined,
        photo_URL: '',
        photo_alt: '',
    });
    useEffect(() => {
        dispatch(getAllCorp('P'))
            .unwrap()
            .then((res) => {
                setPrestador(res);
            });
        dispatch(getRfpForCorp({ corpID: usuario.corpId as string, page, limit }));
    }, []);
    useEffect(() => {
        if (rfpList && Array.isArray(rfpList.rfps)) {
            setResultList(rfpList);
        }
    }, [rfpList]);

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
                    <Button onClick={() => setModalRfpSelect({ open: true, rfp: null })}>
                        Gerar Nova Solicitção de Serviço
                    </Button>
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
                        <InputLabel id='tipo_servico'>Tipo de Serviço</InputLabel>
                        <Select
                            labelId='tipo_servico'
                            label='Tipo de Serviço'
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                        >
                            <MenuItem value=''>Todos os serviços</MenuItem>
                            <MenuItem value='marketing'>Marketing</MenuItem>
                            <MenuItem value='tecnologia'>Tecnologia</MenuItem>
                            <MenuItem value='consultoria'>Consultoria</MenuItem>
                            <MenuItem value='juridico'>Jurídico</MenuItem>
                            <MenuItem value='contabil'>Contábil</MenuItem>
                            <MenuItem value='treinamentos'>Treinamentos</MenuItem>
                            <MenuItem value='sustentabilidade'>Sustentabilidade</MenuItem>
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
            {Array.isArray(resultList.rfps) && resultList.rfps.length ? (
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
                        {!!resultList.rfps.length &&
                            resultList.rfps.map((rfp) => (
                                <Card key={rfp.id} className='mb-4'>
                                    <Stack direction={'row'}>
                                        <CardContent>
                                            <Typography gutterBottom variant='h5' component='div'>
                                                Serviço Solicitado: {rfp.titulo}
                                            </Typography>

                                            <Typography variant='body2' color='text.secondary'>
                                                {rfp.descricao}
                                            </Typography>
                                            <Typography variant='body2' color='text.secondary'>
                                                {rfp.detalhes}
                                            </Typography>
                                            <Typography variant='body2' color='text.secondary'>
                                                {rfp.prazo &&
                                                    (() => {
                                                        const prazo = new Date(rfp.prazo);

                                                        return (
                                                            prazo
                                                                .getDate()
                                                                .toString()
                                                                .padStart(2, '0') +
                                                            '/' +
                                                            (prazo.getMonth() + 1)
                                                                .toString()
                                                                .padStart(2, '0') +
                                                            '/' +
                                                            prazo.getFullYear()
                                                        );
                                                    })()}
                                            </Typography>
                                            <Typography variant='body2' color='text.secondary'>
                                                {rfp.status}
                                            </Typography>
                                            <Typography variant='body2' color='text.secondary'>
                                                {rfp.tipo}
                                            </Typography>
                                        </CardContent>

                                        {rfp?.fotos &&
                                            Array.isArray(rfp.fotos) &&
                                            !!rfp.fotos.length && (
                                                <CardMedia className='flex items-center justify-center gap-2'>
                                                    {rfp.fotos.map((foto) => (
                                                        <Box
                                                            component={'button'}
                                                            key={foto.id}
                                                            onClick={() =>
                                                                setModalImageCard({
                                                                    open: true,
                                                                    id: foto.id,
                                                                    photo_URL: foto.photo_URL,
                                                                    photo_alt: foto.photo_alt,
                                                                })
                                                            }
                                                        >
                                                            <Image
                                                                src={foto.photo_URL}
                                                                alt={foto.photo_alt}
                                                                height={100}
                                                                width={100}
                                                                className='w-[50px] h-[50px] object-cover rounded-md'
                                                            />
                                                        </Box>
                                                    ))}
                                                </CardMedia>
                                            )}
                                        {proposalview.show && proposalview.id === rfp.id && (
                                            <List sx={{ width: '100%' }}>
                                                <Box className='flex items-center justify-between px-6 my-4'>
                                                    <h2 className='text-lg font-semibold '>
                                                        {usuario.corp?.tipo === 'P'
                                                            ? 'Proposta'
                                                            : 'Propostas'}
                                                    </h2>
                                                </Box>
                                                {rfp.proposals.map((p) => (
                                                    <CardActionArea
                                                        key={p.id}
                                                        onClick={() =>
                                                            setModalProposal({
                                                                show: true,
                                                                proposal: p,
                                                            })
                                                        }
                                                        sx={{
                                                            width: '100%',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <ListItem className='w-full flex items-center justify-center gap-2'>
                                                            <ListItemAvatar>
                                                                <Avatar>
                                                                    <LiaBusinessTimeSolid />
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={p.nome_empresa}
                                                                secondary={
                                                                    <Fragment>
                                                                        <Typography
                                                                            sx={{
                                                                                display: 'inline',
                                                                            }}
                                                                            component='span'
                                                                            variant='body2'
                                                                            color='text.primary'
                                                                        >
                                                                            {p.resumo_proposta}
                                                                        </Typography>
                                                                        {` — ${p.valor_proposta}`}
                                                                    </Fragment>
                                                                }
                                                            />
                                                        </ListItem>
                                                    </CardActionArea>
                                                ))}
                                            </List>
                                        )}
                                    </Stack>

                                    <CardActions>
                                        <Button
                                            size='small'
                                            color='info'
                                            onClick={() =>
                                                setModalRfpSelect({ open: true, rfp: rfp })
                                            }
                                        >
                                            Editar
                                        </Button>
                                        <Button size='small' color='error'>
                                            Excluir
                                        </Button>
                                        {rfp.proposals && rfp.proposals.length ? (
                                            <Button
                                                size='small'
                                                color='success'
                                                onClick={() =>
                                                    setProposalview({ show: true, id: rfp.id })
                                                }
                                            >
                                                {rfp.proposals.length > 1
                                                    ? `Visualizar Propostas(${rfp.proposals.length})`
                                                    : 'Visualizar Proposta'}
                                            </Button>
                                        ) : (
                                            <Typography>Sem Propostas</Typography>
                                        )}
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
                        Sem Solicitações
                    </Typography>
                </Box>
            )}
            <ModalProposal
                key={modalProposal.proposal?.id}
                open={modalProposal.show}
                setProposal={setModalProposal}
                proposal={modalProposal.proposal}
            />
            <ModalRfp
                key={modalRfpSelect.rfp?.id}
                open={modalRfpSelect.open}
                setState={setModalRfpSelect}
                data={{ rfp: modalRfpSelect.rfp, page: page, limit: limit }}
            />
            <Modal
                key={modalImageCard.id}
                open={modalImageCard.open}
                onClose={() =>
                    setModalImageCard({
                        open: false,
                        id: undefined,
                        photo_URL: '',
                        photo_alt: '',
                    })
                }
                className='flex items-center justify-center'
            >
                <Image
                    src={modalImageCard.photo_URL}
                    alt={modalImageCard.photo_alt}
                    height={100}
                    width={100}
                    className='w-[400px]  object-cover rounded-md'
                />
            </Modal>
        </PageContainer>
    );
}
