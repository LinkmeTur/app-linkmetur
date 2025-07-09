'use client';

import { deleteFile, sendFileS3 } from '@/app/api/awsS3';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/hooks';
import { IRfp } from '@/app/store/reducers/jobs/jobs.slice';
import createRfp from '@/app/store/reducers/jobs/thunks/rfp/createRfp.thunk';
import updateRfp from '@/app/store/reducers/jobs/thunks/rfp/updateRfp.thunk';
import { Delete, PhotoCamera } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardMedia,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';

type TFotos = {
    id?: string;
    photo_URL: string;
    photo_alt: string;
}[];

export default function ModalRfp({
    open,
    setState,
    data,
}: {
    open: boolean;
    setState: Dispatch<
        SetStateAction<{
            open: boolean;
            rfp: IRfp | null;
        }>
    >;
    data: { rfp: IRfp | null; page: number; limit: number };
}) {
    const { rfp, page, limit } = data;
    const dataBR = rfp?.prazo ? new Date(rfp.prazo).toLocaleDateString('pt-BR') : '';
    const dispatch = useAppDispatch();
    const { usuario } = useAppSelector((state) => state.auth);
    const [titulo, setTitulo] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');
    const [detalhes, setDetalhes] = useState<string>('');
    const [valor, setValor] = useState<string>('');
    const [prazo, setPrazo] = useState<string>(dataBR);
    const [status, setStatus] = useState<string>('aberto');
    const [tipo, setTipo] = useState<string>('');
    const [fotos, setFotos] = useState<TFotos>([]);
    useEffect(() => {
        if (rfp) {
            setTitulo(rfp.titulo);
            setDescricao(rfp.descricao);
            setDetalhes(rfp.detalhes);
            setValor(rfp.valor_medio);

            setStatus(rfp.status as string);
            setTipo(rfp.tipo);
            setFotos((rfp.fotos as TFotos) ?? []);
            if (rfp.prazo) {
                const data = new Date(rfp.prazo);

                setPrazo(data.toLocaleDateString('pt-BR')); // Ex: "2026-01-01"
            }
        }
    }, [rfp]);

    const handleClose = () => {
        setTitulo('');
        setDescricao('');
        setDetalhes('');
        setValor('');
        setPrazo('');
        setStatus('aberto');
        setTipo('');
        setFotos([]);
        setState({ open: false, rfp: null });
    };

    const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        if (fotos.length > 5) return;

        const files = event.target.files;
        if (!files) return;

        const newPhoto = await sendFileS3('RFP_images', files[0]);
        if (newPhoto) {
            setFotos((prevImages) => [
                ...prevImages,
                { photo_URL: newPhoto.file_URL, photo_alt: newPhoto.file_alt },
            ]);
        }
    };

    const handleCreateorSaved = () => {
        const prazoLocal = new Date(prazo);

        if (rfp) {
            //update
            const upRfp: Partial<IRfp> = {
                id: rfp.id as string,
                corpID: usuario.corpId as string,
                titulo,
                descricao,
                detalhes,
                valor_medio: valor,
                prazo: prazoLocal,
                status,
                tipo,
                fotos,
            };
            dispatch(updateRfp({ rfp: upRfp, page, limit }))
                .unwrap()
                .then(handleClose);
        } else {
            //create
            const newRfp: Partial<IRfp> = {
                corpID: usuario.corpId as string,
                titulo,
                descricao,
                detalhes,
                valor_medio: valor,
                prazo: prazoLocal,
                status,
                tipo,
                fotos,
            };
            dispatch(createRfp(newRfp)).unwrap().then(handleClose);
        }
    };

    const removeImage = async (index: number) => {
        const newPhoto = fotos[index];
        await deleteFile('RFP_images', newPhoto.photo_URL);
        setFotos((prevImages) => prevImages.filter((_, i) => i !== index));
    };
    return (
        <Modal open={open} onClose={handleClose} sx={{ padding: 5 }}>
            <Paper elevation={12} sx={{ padding: 2 }}>
                <Typography variant='h5' className='font-bold'>
                    {rfp ? 'Editar Solicitação de Serviço' : 'Nova Solicitação de Serviço'}
                </Typography>
                <Divider sx={{ marginY: 2 }} />
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'flex-start'}
                    gap={2}
                >
                    <Stack direction={'row'} gap={2} flexWrap={'wrap'} width={'50%'}>
                        <TextField
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            label='Titulo'
                            size='small'
                            fullWidth
                        />
                        <FormControl size='small'>
                            <InputLabel id='status'>Status</InputLabel>
                            <Select
                                labelId='status'
                                label='Status'
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <MenuItem value='aberto'>Aberto</MenuItem>
                                <MenuItem value='em_andamento'>Em andamento</MenuItem>
                                <MenuItem value='finalizado'>Finalizado</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl size='small' sx={{ width: '11rem' }}>
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
                        <TextField
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            label='Valor'
                            size='small'
                            sx={{ width: '7.9rem' }}
                        />
                        <TextField
                            type={prazo === dataBR ? 'text' : 'datetime-local'}
                            value={prazo}
                            onChange={(e) => setPrazo(e.target.value)}
                            label='Prazo'
                            size='small'
                            sx={{ width: '8rem' }}
                        />
                        <TextField
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            label='Descrição'
                            size='small'
                            fullWidth
                            multiline
                            rows={3}
                        />
                        <TextField
                            value={detalhes}
                            onChange={(e) => setDetalhes(e.target.value)}
                            label='Detalhes'
                            size='small'
                            fullWidth
                            multiline
                            rows={3}
                        />
                    </Stack>
                    <Stack>
                        <Typography variant='h6' gutterBottom>
                            Fotos
                        </Typography>

                        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                            Adicione fotos e imagens que demonstrem ou necessarias para sua
                            solicitação. A primeira foto será a principal.
                        </Typography>

                        <input
                            type='file'
                            accept='image/*'
                            multiple
                            value={''}
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                            id='upload-photo'
                        />
                        <label htmlFor='upload-photo'>
                            {fotos && fotos.length < 5 && (
                                <Button
                                    variant='outlined'
                                    component='span'
                                    startIcon={<PhotoCamera />}
                                    disabled={fotos.length >= 5}
                                >
                                    Adicionar Fotos
                                </Button>
                            )}
                        </label>

                        <Grid container spacing={1} sx={{ mt: 2 }}>
                            {fotos &&
                                fotos.map((image, index) => (
                                    <Grid size={2.4} key={index}>
                                        <Card sx={{ position: 'relative', width: 120 }}>
                                            <CardMedia sx={{ height: 80 }}>
                                                <Image
                                                    src={image.photo_URL}
                                                    alt={image.photo_alt || 'Imagem' + index}
                                                    width={120}
                                                    height={80}
                                                    style={{ width: '100%', height: '100%' }}
                                                />
                                            </CardMedia>
                                            <IconButton
                                                onClick={() => removeImage(index)}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 4,
                                                    right: 4,
                                                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                                                    color: 'white',
                                                    width: 2,
                                                    height: 2,
                                                }}
                                            >
                                                <Delete sx={{ fontSize: 15 }} />
                                            </IconButton>
                                        </Card>
                                    </Grid>
                                ))}
                        </Grid>
                    </Stack>
                </Box>
                <Divider sx={{ marginY: 2 }} />
                <Box>
                    <Button onClick={handleCreateorSaved}>{rfp ? 'Salvar' : 'Criar'}</Button>
                    <Button onClick={handleClose}>Fechar</Button>
                </Box>
            </Paper>
        </Modal>
    );
}
