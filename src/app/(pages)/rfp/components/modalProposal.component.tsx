'use client';
import { useAppDispatch } from '@/app/store/hooks/hooks';
import { setAlertApp } from '@/app/store/reducers/configApp/configApp.slice';
import { TCorporation } from '@/app/store/reducers/corporation/corporation.slice';
import getOneCorp from '@/app/store/reducers/corporation/thunks/getOneCorp.thunk';
import { IProposal } from '@/app/store/reducers/jobs/jobs.slice';
import { Avatar, Box, Button, Chip, Grid, Modal, Paper, Typography } from '@mui/material';
import Image from 'next/image';
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
        }
    }, []);
    const handleClose = () => {
        setProposal({ show: false, proposal: null });
        setPrestador(null);
    };
    return (
        <Modal open={open} onClose={handleClose}>
            <Paper elevation={2} sx={{ borderRadius: 2, p: 3, mb: 3 }}>
                <Paper sx={{ border: 1, borderRadius: 2, overflow: 'hidden' }}>
                    <Box
                        sx={{
                            p: 2,
                            borderBottom: 1,
                        }}
                    >
                        <Typography variant='h6' color='textPrimary'>
                            {proposal?.nome_empresa}
                        </Typography>
                    </Box>

                    <Box sx={{ p: 3 }}>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 8 }}>
                                <Grid
                                    size={12}
                                    sx={{
                                        bgcolor: 'grey.300',
                                        height: 300,
                                        borderRadius: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'grey.500',
                                        mb: 2,
                                    }}
                                >
                                    <Image
                                        src={imageFull || '/window.svg'}
                                        alt='full'
                                        width={500}
                                        height={500}
                                        style={{ height: '100%', width: '100%' }}
                                    />
                                </Grid>
                                <Grid size={12}>
                                    <Grid container spacing={1}>
                                        {Array.isArray(proposal?.fotos) && proposal.fotos.length
                                            ? proposal.fotos.map((p) => (
                                                  <Grid size={2} key={p.photo_alt}>
                                                      <Box
                                                          sx={{
                                                              bgcolor: 'grey.300',
                                                              height: 60,
                                                              width: 100,
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

                                <Typography
                                    variant='h5'
                                    fontWeight='bold'
                                    color='textPrimary'
                                    mb={2}
                                >
                                    {'Proposta - ' + proposal?.id}
                                </Typography>

                                <Box mb={2}>
                                    <Typography
                                        variant='body2'
                                        fontWeight='bold'
                                        color='textPrimary'
                                        mb={1}
                                    >
                                        Prazo de entega:
                                    </Typography>
                                    <Typography variant='body2' color='textSecondary'>
                                        {proposal?.prazo.toLocaleDateString('pt-BR', {
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
                                    {proposal?.resumo_proposta}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    fontWeight='bold'
                                    color='textPrimary'
                                    mb={1}
                                >
                                    Observaçoes
                                </Typography>
                                <Typography variant='body2' color='textSecondary'>
                                    {proposal?.observações}
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
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
                                        <Avatar
                                            src={prestador?.logo_url ?? undefined}
                                            sx={{ mr: 2 }}
                                        />
                                        <Box>
                                            <Typography
                                                variant='body2'
                                                fontWeight='bold'
                                                color='textPrimary'
                                            >
                                                {prestador?.nome_fantasia ?? ' S/N'}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Button variant='contained' disabled fullWidth>
                                        Selecionar Proposta
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Paper>
        </Modal>
    );
}
