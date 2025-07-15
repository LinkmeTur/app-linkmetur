'use client';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/hooks';
import { TCorporation } from '@/app/store/reducers/corporation/corporation.slice';
import getAllCorp from '@/app/store/reducers/corporation/thunks/getAllCorporations.thunk';
import { IProposal, IRfp } from '@/app/store/reducers/jobs/jobs.slice';
import {
    getRfpForFilter,
    getRfpForPretador,
} from '@/app/store/reducers/jobs/thunks/rfp/getRfpforCorp.thunk';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActionArea,
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
import Image from 'next/image';
import { FC, Fragment, useEffect, useState } from 'react';
import { LiaBusinessTimeSolid } from 'react-icons/lia';
import ModalCreateOrEditProposal from '../components/modalCreateOrEditProposal.component';

const RFPPrestador: FC = () => {
    const dispatch = useAppDispatch();
    const { usuario } = useAppSelector((state) => state.auth);
    const { rfpList, proposalList } = useAppSelector((state) => state.jobs);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    const [resultList, setResultList] = useState<typeof rfpList | typeof proposalList>({
        rfps: [],
        totalPages: 0,
        totalRecords: 0,
    });
    const [empresa, setEmpresa] = useState('');
    const [tipoBusca, setTipoBusca] = useState<'S' | 'P'>('S');
    const [tipo, setTipo] = useState('');
    const [status, setStatus] = useState('');
    const [prestador, setPrestador] = useState<TCorporation[]>([]);
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
    const [proposalCreateOrEdit, setProposalCreateOrEdit] = useState<{
        show: boolean;
        rfp?: IRfp;
        proposal?: IProposal;
        mode: undefined | 'edit' | 'createProposal';
    }>({
        show: false,
        mode: undefined,
    });
    useEffect(() => {
        dispatch(getAllCorp('T'))
            .unwrap()
            .then((res) => {
                setPrestador(res);
            });
        dispatch(
            getRfpForPretador({ prestadorID: usuario.corpId as string, page, limit, all: true }),
        );
    }, []);
    useEffect(() => {
        if (tipoBusca === 'S' && rfpList && Array.isArray(rfpList.rfps)) {
            setResultList(rfpList);
            return;
        }
        if (tipoBusca === 'P' && proposalList && Array.isArray(proposalList.proposals)) {
            setResultList(proposalList);
            return;
        }
    }, [rfpList, proposalList]);

    const handleBuscar = () => {
        console.log('buscar');
        const filter = {
            pretadorID: usuario.corpId,
            corpID: empresa,
            tipo,
            status,
            page,
            limit,
        };
        if (tipoBusca === 'S') {
            dispatch(getRfpForFilter(filter));
        }
    };

    return (
        <Fragment>
            <Paper elevation={12}>
                <Box className='flex items-center justify-between px-6 my-4'>
                    <Typography variant='h5' className='font-bold'>
                        Buscar
                    </Typography>
                    <FormControl size='small' sx={{ width: '20rem' }}>
                        <InputLabel id='rfp_busca'>Tipo de Busca</InputLabel>
                        <Select
                            labelId='rfp_busca'
                            label='Tipo de Busca'
                            value={tipoBusca}
                            onChange={(e) => setTipoBusca(e.target.value)}
                        >
                            <MenuItem value='S'>Solicitações</MenuItem>
                            <MenuItem value='P'>Minhas Propostas</MenuItem>
                        </Select>
                    </FormControl>
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
                {/* resultados da busca */}
                <Box>
                    {resultList &&
                        'rfps' in resultList &&
                        Array.isArray(resultList.rfps) &&
                        resultList.rfps.length &&
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
                                    {rfp.proposal && rfp.proposal.length ? (
                                        rfp.proposal.map((p) => {
                                            if (p.prestadorID === usuario.corpId) {
                                                return (
                                                    <CardActionArea key={p.id}>
                                                        <Divider />
                                                        <Box className='flex items-center justify-between px-6 my-4'>
                                                            <h2 className='text-lg font-semibold text-gray-500'>
                                                                Proposta
                                                            </h2>
                                                        </Box>
                                                        <List>
                                                            <ListItem
                                                                component='button'
                                                                onClick={() =>
                                                                    setProposalCreateOrEdit({
                                                                        show: true,
                                                                        proposal: p,
                                                                        mode: 'edit',
                                                                    })
                                                                }
                                                            >
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
                                                                                    display:
                                                                                        'inline',
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
                                                        </List>
                                                    </CardActionArea>
                                                );
                                            }
                                            return null;
                                        })
                                    ) : (
                                        <Button
                                            size='small'
                                            color='success'
                                            onClick={() =>
                                                setProposalCreateOrEdit({
                                                    show: true,
                                                    rfp,
                                                    mode: 'createProposal',
                                                })
                                            }
                                        >
                                            Enviar Proposta
                                        </Button>
                                    )}
                                </Stack>
                            </Card>
                        ))}
                    {resultList &&
                        'proposals' in resultList &&
                        Array.isArray(resultList.proposals) &&
                        resultList.proposals.length &&
                        resultList.proposals.map((proposal) => (
                            <Card key={proposal.id} className='mb-4'>
                                <Stack direction={'row'}>
                                    <CardContent>
                                        <Typography gutterBottom variant='h5' component='div'>
                                            Serviço Solicitado: {proposal.rfp.titulo}
                                        </Typography>
                                        <Typography gutterBottom variant='h5' component='div'>
                                            Empresa: {proposal.nome_empresa}
                                        </Typography>

                                        <Typography variant='body2' color='text.secondary'>
                                            {proposal.resumo_proposta}
                                        </Typography>
                                        <Typography variant='body2' color='text.secondary'>
                                            {proposal.observações}
                                        </Typography>
                                        <Typography variant='body2' color='text.secondary'>
                                            {proposal.prazo &&
                                                (() => {
                                                    const prazo = new Date(proposal.prazo);

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
                                            Status:{proposal.status}
                                        </Typography>
                                        <Typography variant='body2' color='text.secondary'>
                                            {proposal.valor_proposta}
                                        </Typography>
                                    </CardContent>

                                    {proposal?.fotos &&
                                        Array.isArray(proposal.fotos) &&
                                        !!proposal.fotos.length && (
                                            <CardMedia className='flex items-center justify-center gap-2'>
                                                {proposal.fotos.map((foto) => (
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

                                    <Button
                                        size='small'
                                        color='success'
                                        onClick={() =>
                                            setProposalCreateOrEdit({
                                                show: true,
                                                proposal,
                                                mode: 'edit',
                                            })
                                        }
                                    >
                                        Enviar Proposta
                                    </Button>
                                </Stack>
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
            <ModalCreateOrEditProposal
                content={proposalCreateOrEdit}
                set={setProposalCreateOrEdit}
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
        </Fragment>
    );
};

export default function Proposal() {
    const { corp } = useAppSelector((state) => state.auth.usuario);
    return (
        <PageContainer title='' breadcrumbs={[]} className='p-0 w-full'>
            {corp?.tipo === 'P' && <RFPPrestador />}
        </PageContainer>
    );
}
