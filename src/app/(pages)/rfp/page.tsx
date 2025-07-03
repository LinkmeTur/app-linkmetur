'use client';

import { useAppSelector } from '@/app/store/hooks/hooks';
import {
    Box,
    Button,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Typography,
} from '@mui/material';
import { PageContainer } from '@toolpad/core/PageContainer';
import { FC, Fragment, useState } from 'react';

const RFPClient: FC = () => {
    const [empresa, setEmpresa] = useState('');
    const [tipo, setTipo] = useState('');
    const [status, setStatus] = useState('');
    return (
        <Fragment>
            <Paper elevation={12}>
                <Box className='flex items-center justify-between px-6 my-4'>
                    <Typography variant='h5' className='font-bold'>
                        Filtros de Busca
                    </Typography>
                    <Button>Gerar Nova Solicitção de Serviço</Button>
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
                            <MenuItem>teste</MenuItem>
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
                    <Button variant='contained' color='warning'>
                        Limpar
                    </Button>
                    <Button variant='contained' color='success'>
                        Buscar
                    </Button>
                </Box>
            </Paper>
            <Box>
                <Typography>Resultado:</Typography>
            </Box>
        </Fragment>
    );
};
const RFPPrestador: FC = () => {
    return (
        <Fragment>
            <Paper elevation={12}>
                <Box>filtro</Box>
            </Paper>
            <Box>
                <Typography>Resultado:</Typography>
            </Box>
        </Fragment>
    );
};

export default function RFP() {
    const { corp } = useAppSelector((state) => state.auth.usuario);
    return (
        <PageContainer title='' breadcrumbs={[]} className='p-0 w-full'>
            {corp?.tipo === 'T' && <RFPClient />}
            {corp?.tipo === 'P' && <RFPPrestador />}
        </PageContainer>
    );
}
