'use client';
import { useAppDispatch } from '@/app/store/hooks/hooks';
import { setAlertApp } from '@/app/store/reducers/configApp/configApp.slice';
import { TCorporation } from '@/app/store/reducers/corporation/corporation.slice';
import getOneCorp from '@/app/store/reducers/corporation/thunks/getOneCorp.thunk';
import { IProposal } from '@/app/store/reducers/jobs/jobs.slice';
import createRequest from '@/app/store/reducers/jobs/thunks/request/createdRequest.thunk';
import { Avatar, Box, Button, Chip, Grid, Modal, Paper, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function ModalProposal({
    open,
    setProposal,
    proposal,
}: {
    open: boolean;
    setProposal: Dispatch<
        SetStateAction<{
            show: boolean;
            proposal: IProposal | null;
        }>
    >;
    proposal: IProposal | null;
}) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [imageFull, setImageFull] = useState<string>('');
    const [prestador, setPrestador] = useState<TCorporation | null>(null);
    useEffect(() => {
        if (proposal) {
            dispatch(getOneCorp(proposal.prestadorID as string))
                .unwrap()
                .then((res: TCorporation) => {
                    setPrestador(res);
                })
                .catch((err) => dispatch(setAlertApp({ type: 'error', message: err })));
            if (Array.isArray(proposal.fotos) && proposal.fotos.length) {
                setImageFull(proposal.fotos[0].photo_URL);
            }
        }
    }, []);
    const handleClose = () => {
        setProposal({ show: false, proposal: null });
        setPrestador(null);
    };
    const handleSelect = () => {
        dispatch(createRequest(proposal?.id as string))
            .unwrap()
            .then(() => {
                dispatch(
                    setAlertApp({ type: 'success', message: 'Proposta selecionada com sucesso!' }),
                );
                handleClose();
                setTimeout(() => {
                    router.push('/rfp/requests');
                }, 1500);
            })
            .catch((err) => dispatch(setAlertApp({ type: 'error', message: err })));
    };
    return (
        <Modal open={open} onClose={handleClose}>
            <Paper
                elevation={2}
                sx={{
                    width: '60%',
                    height: '80%',
                    marginX: 'auto',
                    marginY: '3%',
                    p: 1,
                    overflow: 'auto',
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Grid
                                size={12}
                                sx={{
                                    bgcolor: 'grey.300',
                                    height: 250,
                                    borderRadius: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'grey.500',
                                    mb: 1,
                                }}
                            >
                                <Image
                                    src={imageFull}
                                    alt='full'
                                    width={500}
                                    height={500}
                                    style={{ height: '100%', width: '100%' }}
                                />
                            </Grid>
                            <Grid size={12}>
                                <Grid container spacing={11}>
                                    {Array.isArray(proposal?.fotos) && proposal.fotos.length
                                        ? proposal.fotos.map((p) => (
                                              <Grid size={1} key={p.photo_alt}>
                                                  <Box
                                                      sx={{
                                                          bgcolor: 'grey.300',
                                                          height: 50,
                                                          width: 70,
                                                          borderRadius: 2,
                                                          display: 'flex',
                                                          alignItems: 'center',
                                                          justifyContent: 'center',
                                                          color: 'grey.500',
                                                          cursor: 'pointer',
                                                      }}
                                                      onClick={() => setImageFull(p.photo_URL)}
                                                  >
                                                      <Image
                                                          src={p.photo_URL}
                                                          alt={p.photo_alt || 'no image'}
                                                          width={100}
                                                          height={100}
                                                          style={{
                                                              height: '100%',
                                                              width: '100%',
                                                          }}
                                                      />
                                                  </Box>
                                              </Grid>
                                          ))
                                        : null}
                                </Grid>
                            </Grid>

                            <Typography variant='h5' fontWeight='bold' color='textPrimary' my={1}>
                                {'Proposta - ' + proposal?.id?.split('-')[4]}
                            </Typography>

                            <Box mb={2}>
                                <Stack direction={'row'} gap={2}>
                                    <Typography
                                        variant='body2'
                                        fontWeight='bold'
                                        color='textPrimary'
                                        mb={1}
                                    >
                                        Prazo de entega:
                                    </Typography>
                                    <Typography variant='body2' color='textSecondary'>
                                        {proposal?.prazo &&
                                            new Date(proposal.prazo).toLocaleDateString('pt-BR', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        fontWeight='bold'
                                        color='textPrimary'
                                        mb={1}
                                    >
                                        Preço:
                                    </Typography>
                                    <Typography variant='body2' color='textSecondary'>
                                        {Number(proposal?.valor_proposta).toLocaleString('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        })}
                                    </Typography>
                                    <Chip
                                        label={proposal?.status}
                                        color={
                                            proposal?.status === 'Selecionado'
                                                ? 'success'
                                                : proposal?.status === 'Recusado'
                                                  ? 'error'
                                                  : 'warning'
                                        }
                                        size='small'
                                    />
                                </Stack>
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 12, md: 5 }}>
                            <Paper sx={{ p: 2, borderRadius: 2 }}>
                                <Typography
                                    variant='body2'
                                    fontWeight='bold'
                                    color='textPrimary'
                                    mb={1}
                                >
                                    Prestador
                                </Typography>
                                <Box display='flex' alignItems='center' mb={2}>
                                    <Avatar src={prestador?.logo_url ?? undefined} sx={{ mr: 2 }} />
                                    <Box>
                                        <Typography
                                            variant='body2'
                                            fontWeight='bold'
                                            color='textPrimary'
                                        >
                                            {prestador?.nome_fantasia ??
                                                prestador?.razao_social ??
                                                ' S/N'}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Button variant='contained' onClick={handleSelect} fullWidth>
                                    Selecionar Proposta
                                </Button>
                            </Paper>
                            <Stack direction={'column'} gap={1} mt={2}>
                                <Typography variant='body2' fontWeight='bold' color='textPrimary'>
                                    Descrição
                                </Typography>
                                <Typography variant='body2' color='textSecondary'>
                                    {proposal?.resumo_proposta}
                                </Typography>
                                <Typography variant='body2' fontWeight='bold' color='textPrimary'>
                                    Observaçoes
                                </Typography>
                                <Typography variant='body2' color='textSecondary'>
                                    {proposal?.observações}
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Modal>
    );
}
