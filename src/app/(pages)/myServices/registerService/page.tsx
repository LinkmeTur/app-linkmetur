'use client';
import { Paper, Typography, Box, Divider, Button } from '@mui/material';
import { Info } from '@mui/icons-material';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useActivePage } from '@toolpad/core/useActivePage';
import PreviewSection from './components/preview-section/preview.component';
import BasicInfoSection from './components/basic-info/basicInfo.component';
import MediaSection from './components/media-setction/mediaSection.component';
import CertificationsSection from './components/certfication-section/certificationSection.component';
import AvailabilitySection from './components/availability-section/availabilitySection.component';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/hooks';
import { clearResgisterService } from '@/app/store/reducers/jobs/jobs.slice';
import createJob from '@/app/store/reducers/jobs/thunks/createdJob.thunk';

export default function RegisterService() {
    const dispatch = useAppDispatch();
    const activePage = useActivePage();
    const { registerService } = useAppSelector((state) => state.jobs);
    const { usuario } = useAppSelector((state) => state.auth);
    const rascunho = () => localStorage.setItem('registerService', JSON.stringify(registerService));
    const handlePublish = () => {
        const oneRas = localStorage.getItem('registerService');
        if (usuario.corpId) {
            if (oneRas) {
                const parsedRas = JSON.parse(oneRas);
                dispatch(createJob({ id: usuario.corpId, job: parsedRas }));
            } else if (registerService) {
                dispatch(createJob({ id: usuario.corpId, job: registerService }));
            }
        }
    };

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
                    <AvailabilitySection />
                </form>
            </Paper>

            {/* <!-- Preview Section --> */}
            <PreviewSection />

            {/* <!-- Form Actions --> */}
            <div id='form-actions' className='flex items-center justify-between'>
                <Button onClick={rascunho} className='px-4 py-2 ' color='info'>
                    Salvar como Rascunho
                </Button>

                <div className='flex space-x-3'>
                    <Button
                        onClick={() => dispatch(clearResgisterService())}
                        variant='contained'
                        color='error'
                        className='px-6 py-2  rounded-md font-medium'
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant='contained'
                        color='success'
                        className='px-6 py-2  rounded-md font-medium'
                        onClick={handlePublish}
                    >
                        Publicar Serviço
                    </Button>
                </div>
            </div>
        </PageContainer>
    );
}
