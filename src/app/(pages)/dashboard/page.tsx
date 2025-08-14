'use client';
import { Box, Button, Pagination, Typography } from '@mui/material';
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
import CardServiceOrRfp from './components/cardServiceOrRfp.component';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/hooks';
import { useEffect, useState } from 'react';
import { getJobs, getJobsForCorp } from '@/app/store/reducers/jobs/thunks/getJobs.thunk';

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const { serviceList } = useAppSelector((state) => state.jobs);
    const { usuario } = useAppSelector((state) => state.auth);
    const [resultList, setResultList] = useState<typeof serviceList>({
        jobs: [],
        totalPages: 0,
        totalRecords: 0,
    });
    const filters = useState<{
        nome_servico: string;
        categoria: string;
        localizacao: string;
        min_valor: number;
        max_valor: number;
        min_rating: number;
        orderBy: 'relevance' | 'rating' | 'price-asc' | 'price-desc';
    }>({
        nome_servico: '',
        categoria: '',
        localizacao: '',
        min_rating: 0,
        min_valor: 0,
        max_valor: 0,
        orderBy: 'relevance',
    });
    const [page, setPage] = useState<number>(1);
    const limit = 3;
    useEffect(() => {
        if (usuario.corp) {
            if (usuario.corp.tipo === 'T') {
                dispatch(getJobs({ ...filters, page, limit }));
                return;
            }
            dispatch(
                getJobsForCorp({
                    corpId: usuario.corpId as string,
                    ...filters,
                    page,
                    limit,
                }),
            );
        }
    }, [page, limit]);
    useEffect(() => {
        if (serviceList) {
            setResultList(serviceList);
        }
    }, [serviceList]);
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
                        title={usuario.corp?.tipo === 'P' ? 'Cadastrar Serviço' : 'Cadastrar RFP'}
                        subTitle='Adicione um novo serviço'
                        goPath={usuario.corp?.tipo === 'P' ? '/myServices/registerService' : '/rfp'}
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
                    {resultList &&
                        Array.isArray(resultList.jobs) &&
                        resultList.jobs.length > 0 &&
                        resultList.jobs.map((service) => (
                            <CardServiceOrRfp
                                key={service.id}
                                imageUrl={
                                    service.photos[0]?.photo_URL || '/images/default-service.jpg'
                                }
                                imageAlt={service.nome_servico}
                                title={service.nome_servico}
                                description={service.descricao}
                                price={
                                    service.min_valor > 0
                                        ? `R$ ${service.min_valor.toFixed(2)} - R$ ${service.max_valor.toFixed(2)}`
                                        : 'Gratuito'
                                }
                                status={{
                                    label: 'Disponível',
                                    color: 'success',
                                }}
                                category={{
                                    label: `${service.categoria}`,
                                    color: 'primary',
                                    subCategory: {
                                        label: `${service.sub_categoria}`,
                                        color: 'secondary',
                                    },
                                }}
                            />
                        ))}
                </div>
                <div id='pagination' className='flex items-center justify-center mt-6'>
                    <Pagination
                        count={resultList.totalPages}
                        page={page}
                        onChange={(e, value) => {
                            setPage(value);
                        }}
                        shape='rounded'
                    />
                </div>
            </section>
        </PageContainer>
    );
}
