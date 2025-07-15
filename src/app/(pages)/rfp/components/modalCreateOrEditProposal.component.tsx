import { deleteFile, sendFileS3 } from '@/app/api/awsS3';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/hooks';
import { IProposal, IRfp } from '@/app/store/reducers/jobs/jobs.slice';
import createProposal from '@/app/store/reducers/jobs/thunks/proposal/createProposal.thunk';
import { Delete, PhotoCamera } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardMedia,
    Divider,
    Grid,
    IconButton,
    Modal,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

type TFotos = {
    id?: string;
    photo_URL: string;
    photo_alt: string;
}[];

export default function ModalCreateOrEditProposal(props: {
    content: {
        show: boolean;
        rfp?: IRfp;
        proposal?: IProposal;
        mode: undefined | 'edit' | 'createProposal';
    };
    set: Dispatch<
        SetStateAction<{
            show: boolean;
            rfp?: IRfp;
            proposal?: IProposal;
            mode: undefined | 'edit' | 'createProposal';
        }>
    >;
}) {
    const dataBR =
        props.content.mode === 'edit'
            ? (props.content.proposal?.prazo.toLocaleDateString('pt-BR') as string)
            : '';
    const dispatch = useAppDispatch();
    const { usuario } = useAppSelector((state) => state.auth);
    const [descricao, setDescricao] = useState<string>('');
    const [detalhes, setDetalhes] = useState<string>('');
    const [valor, setValor] = useState<string>('');
    const [prazo, setPrazo] = useState<string>(dataBR);
    const [fotos, setFotos] = useState<TFotos>([]);
    const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        if (fotos.length > 5) return;

        const files = event.target.files;
        if (!files) return;

        const newPhoto = await sendFileS3('Proposal_images', files[0]);
        if (newPhoto) {
            setFotos((prevImages) => [
                ...prevImages,
                { photo_URL: newPhoto.file_URL, photo_alt: newPhoto.file_alt },
            ]);
        }
    };
    const removeImage = async (index: number) => {
        const newPhoto = fotos[index];
        await deleteFile('RFP_images', newPhoto.photo_URL);
        setFotos((prevImages) => prevImages.filter((_, i) => i !== index));
    };
    const handleClose = () => {
        props.set({
            show: false,
            mode: undefined,
        });
    };
    const handleCreateorSaved = () => {
        const proposal = {
            id: props.content.mode === 'edit' ? (props.content?.proposal?.id as string) : undefined,
            corpID: props.content.proposal?.corpID || props.content.rfp?.corpID,
            nome_empresa:
                (usuario.corp?.nome_fantasia as string) || (usuario.corp?.razao_social as string),
            prestadorID: usuario.corpId as string,
            status: props.content.mode === 'edit' ? props.content?.proposal?.status : 'Aberto',
            prazo: new Date(prazo),
            valor_proposta: valor,
            reqId: props.content.proposal?.reqId || (props.content?.rfp?.id as string),
            rfp: props.content.proposal?.rfp || props.content?.rfp,
            observações: detalhes,
            resumo_proposta: descricao,
            fotos,
        };
        if (props.content.mode === 'edit') {
            //update
            console.log('foi');
            // dispatch(updateProposal(proposal)).unwrap().then(handleClose);
        } else {
            //create

            dispatch(createProposal(proposal)).unwrap().then(handleClose);
        }
    };
    return (
        <Modal open={props.content.show} onClose={handleClose} sx={{ padding: 5 }}>
            <Paper elevation={12} sx={{ padding: 2 }}>
                <Typography variant='h5' className='font-bold'>
                    {props.content.mode === 'edit' ? 'Editar Proposta' : 'Criar Proposta'}
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
                            value={usuario.corp?.nome_fantasia || usuario.corp?.razao_social}
                            label='Empresa'
                            size='small'
                            fullWidth
                            disabled
                        />

                        <TextField
                            value={
                                props.content.mode === 'edit'
                                    ? props.content.proposal?.status
                                    : 'Aberto'
                            }
                            label='Status'
                            size='small'
                            fullWidth
                            disabled
                        />

                        <TextField
                            type='number'
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            label='Valor Poposta'
                            size='small'
                            sx={{ width: '7.9rem' }}
                        />
                        <TextField
                            type={'datetime-local'}
                            value={prazo}
                            onChange={(e) => setPrazo(e.target.value)}
                            label='Prazo'
                            size='small'
                            sx={{ width: '8rem' }}
                        />
                        <TextField
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            label='Resumo'
                            size='small'
                            fullWidth
                            multiline
                            rows={3}
                        />
                        <TextField
                            value={detalhes}
                            onChange={(e) => setDetalhes(e.target.value)}
                            label='Onservações'
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
                    <Button onClick={handleCreateorSaved}>
                        {props.content.mode === 'edit' ? 'Salvar' : 'Criar'}
                    </Button>
                    <Button onClick={handleClose}>Fechar</Button>
                </Box>
            </Paper>
        </Modal>
    );
}
