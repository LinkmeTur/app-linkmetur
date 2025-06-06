'use client';
import {
    Paper,
    Typography,
    Box,
    TextField,
    Grid,
    Divider,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import { Info } from '@mui/icons-material';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useActivePage } from '@toolpad/core/useActivePage';
import { FC, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import PreviewSection from './components/preview-section/preview.component';
import BasicInfoSection from './components/basic-info/basicInfo.component';
import MediaSection from './components/media-setction/mediaSection.component';

const certificationsList = [
    { id: 'eco-friendly', label: 'Sustentabilidade / Eco-friendly' },
    { id: 'quality-cert', label: 'Certificação de Qualidade ISO' },
    { id: 'accessibility', label: 'Acessibilidade' },
    { id: 'specialized', label: 'Especialização em Turismo' },
];

const CertificationsSection: FC = () => {
    const [certifications, setCertifications] = useState<{ [key: string]: boolean }>({});

    const handleCheckboxChange = (id: string) => {
        setCertifications((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    return (
        <Box sx={{ p: 2, mb: 4 }}>
            <Typography variant='h6' gutterBottom>
                Certificações{' '}
                <Typography variant='caption' color='text.secondary'>
                    (Opcional)
                </Typography>
            </Typography>

            <Grid container spacing={1}>
                {certificationsList.map((cert) => (
                    <Grid size={12} key={cert.id}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={certifications[cert.id] || false}
                                    onChange={() => handleCheckboxChange(cert.id)}
                                    color='primary'
                                />
                            }
                            label={cert.label}
                        />
                    </Grid>
                ))}

                {/* Campo para outras certificações */}
                <Grid size={12}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Outras Certificações'
                        placeholder='Descreva outras certificações relevantes'
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

const shifts = [
    { id: 'morning', label: 'Manhã (08:00 - 12:00)' },
    { id: 'afternoon', label: 'Tarde (13:00 - 17:00)' },
    { id: 'evening', label: 'Noite (18:00 - 22:00)' },
    { id: 'full-day', label: 'Dia inteiro' },
    { id: 'custom', label: 'Horário personalizado' },
];

const ShiftsSection: FC = () => {
    const [selectedShifts, setSelectedShifts] = useState<{ [key: string]: boolean }>({});

    const toggleShiftSelection = (id: string) => {
        setSelectedShifts((prevShifts) => ({
            ...prevShifts,
            [id]: !prevShifts[id],
        }));
    };

    return (
        <Box className='bg-gray-50 p-4 rounded-lg'>
            <Typography variant='h6' gutterBottom>
                Turnos Disponíveis
            </Typography>

            <Grid container spacing={1.8}>
                {shifts.map((shift) => (
                    <Grid size={12} key={shift.id}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedShifts[shift.id] || false}
                                    onChange={() => toggleShiftSelection(shift.id)}
                                    color='primary'
                                />
                            }
                            label={shift.label}
                        />
                    </Grid>
                ))}
            </Grid>

            <Typography variant='body2' color='success.main' sx={{ mt: 2 }}>
                Dias selecionados: {Object.values(selectedShifts).filter((v) => v).length} turnos
            </Typography>
        </Box>
    );
};

export default function RegisterService() {
    const activePage = useActivePage();

    return (
        <PageContainer
            title=''
            breadcrumbs={activePage?.breadcrumbs.filter((p) => p.path !== '/')}
            className='w-full px-6'
        >
            <Paper elevation={2} className=' rounded-lg  p-6 mb-6'>
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',

                            borderRadius: '50%',

                            mr: 2,
                        }}
                    >
                        <Info />
                    </Box>
                    <Box>
                        <Typography variant='h6' color='text.primary'>
                            Informações do Serviço
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Preencha os detalhes do serviço que deseja oferecer
                        </Typography>
                    </Box>
                </Box>

                <Divider />

                <form id='service-form'>
                    {/* <!-- Basic Information Section --> */}
                    <BasicInfoSection />
                    <Divider />
                    {/* <!-- Photos and Media Section --> */}
                    <MediaSection />
                    <Divider />
                    {/* <!-- Certifications Section --> */}
                    <CertificationsSection />

                    {/* <!-- Availability Section --> */}
                    <Box id='availability-section' className='mb-8'>
                        <Typography className='text-md font-medium text-gray-700 mb-4 pb-2 border-b border-gray-200'>
                            Disponibilidade
                        </Typography>

                        <Box className='mb-6'>
                            <Typography className='text-sm text-gray-700 mb-3'>
                                Selecione os dias e turnos em que você está disponível para prestar
                                este serviço:
                            </Typography>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Box className='bg-gray-50 p-2 rounded-lg flex items-center justify-center'>
                                            <DateRangeCalendar calendars={1} />
                                        </Box>
                                    </LocalizationProvider>
                                </div>
                                <div>
                                    <ShiftsSection />
                                </div>
                            </div>
                        </Box>
                    </Box>
                </form>
            </Paper>

            {/* <!-- Preview Section --> */}
            <PreviewSection />

            {/* <!-- Form Actions --> */}
            <div id='form-actions' className='flex items-center justify-between'>
                <button
                    type='button'
                    className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 font-medium'
                >
                    Salvar como Rascunho
                </button>

                <div className='flex space-x-3'>
                    <button
                        type='button'
                        className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 font-medium'
                    >
                        Cancelar
                    </button>
                    <button
                        type='submit'
                        form='service-form'
                        className='px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-medium'
                    >
                        Publicar Serviço
                    </button>
                </div>
            </div>
        </PageContainer>
    );
}
