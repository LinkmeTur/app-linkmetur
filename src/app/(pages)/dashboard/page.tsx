'use client';
import { Box, Button, Typography } from '@mui/material';
import { PageContainer } from '@toolpad/core/PageContainer';
import CadMetrics from './components/carMetrics';
import {
    FaEye,
    FaFileContract,
    FaAddressBook,
    FaStar,
    FaChevronRight,
    FaPlus,
    FaTag,
    FaEnvelope,
} from 'react-icons/fa';
import CarFastAction from './components/cardFastActions.component';
import SearchDash from './components/search-dash/SearchDash.component';
import CardServiceOrRfp from './components/cardServiceOrRfp.component';

export default function Dashboard() {
    return (
        <PageContainer title={''} breadcrumbs={[]}>
            <section id='key-metrics' className='mb-8'>
                <Typography className='text-lg font-semibold mb-4'>Métricas-chave</Typography>

                <Box className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <CadMetrics
                        title=' Visualizações do Perfil'
                        count='248'
                        icon={<FaEye />}
                        iconBg='bg-emerald-100'
                        percent='12.5'
                    />
                    <CadMetrics
                        title='Solicitações Recebidas'
                        count='32'
                        icon={<FaFileContract />}
                        iconBg='bg-blue-100'
                        percent='8.3'
                    />
                    <CadMetrics
                        title='Contatos'
                        count='156'
                        icon={<FaAddressBook />}
                        iconBg='bg-indigo-100'
                        percent='8.3'
                    />
                    <CadMetrics
                        title=' Avaliação Média'
                        count='4.8'
                        icon={<FaStar />}
                        iconBg='bg-amber-100'
                        percent={` baseado em 42 avaliações`}
                    />
                </Box>
            </section>

            <section id='quick-actions' className='mb-8'>
                <Box className='flex items-center justify-between mb-4'>
                    <Typography className='text-lg font-semibold'>Ações Rápidas</Typography>

                    <Button
                        id='btn-all-actions'
                        className='text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center'
                    >
                        Ver todas
                        <FaChevronRight />
                    </Button>
                </Box>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <CarFastAction
                        icon={<FaPlus />}
                        iconColor='emerald'
                        title='Cadastrar Serviço'
                        subTitle='Adicione um novo serviço'
                        goPath='/myServices/registerService'
                    />
                    <CarFastAction
                        icon={<FaTag />}
                        iconColor='blue'
                        title='Gerenciar Categorias'
                        subTitle='Edite categorias e subcategorias'
                        goPath=''
                    />
                    <CarFastAction
                        icon={<FaEnvelope />}
                        iconColor='purple'
                        title='Ver Mensagens'
                        subTitle='5 mensagens não lidas'
                        goPath='/messages'
                    />
                    <CarFastAction
                        icon={<FaEnvelope />}
                        iconColor='amber'
                        title='Editar Perfil'
                        subTitle='Atualize suas informações'
                        goPath='/profile'
                    />
                </div>
            </section>
            <section id='search'>
                <SearchDash />
            </section>

            <section id='active-services' className='mb-8'>
                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-lg font-semibold text-gray-800'>Serviços Ativos</h2>

                    <button
                        id='btn-all-services'
                        className='text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center'
                    >
                        Ver todos
                        <i className='fa-solid fa-chevron-right ml-1 text-xs'></i>
                    </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    <CardServiceOrRfp
                        imageUrl='https://storage.googleapis.com/uxpilot-auth.appspot.com/35cdc99b4e-81ebe374d136c68e8a8b.png'
                        imageAlt='oi'
                        title='Fotografia Profissional para Hotelaria'
                        description='Serviço de fotografia especializada para hotéis, pousadas e resorts. Realce a beleza do seu estabelecimento.'
                        price='R$ 1.800,00'
                        status={{
                            label: 'Disponível',
                            color: 'success',
                        }}
                        category={{
                            label: `Marketing`,
                            color: 'primary',
                            subCategory: {
                                label: `Fotografia`,
                                color: 'secondary',
                            },
                        }}
                    />
                </div>
            </section>
        </PageContainer>
    );
}
