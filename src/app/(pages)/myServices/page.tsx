'use client';
import { PageContainer } from '@toolpad/core/PageContainer';
import SearchService from './components/search-service/seachService.component';
import CardService from './components/card-service/cardService.component';
import { FormControl, Pagination, Select, MenuItem, InputLabel } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks/hooks';
import { useEffect, useState } from 'react';
import { getJobs, getJobsForCorp } from '@/app/store/reducers/jobs/thunks/getJobs.thunk';

export default function MyServices() {
    const dispatch = useAppDispatch();
    const { serviceList } = useAppSelector((state) => state.jobs);
    const { usuario } = useAppSelector((state) => state.auth);
    const [resultList, setResultList] = useState<typeof serviceList>({
        jobs: [],
        totalPages: 0,
        totalRecords: 0,
    });
    const [filters, setFilters] = useState<{
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
    const [limit, setLimit] = useState<number>(10);

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
    }, [page, limit, filters.orderBy]);

    useEffect(() => {
        if (serviceList) {
            setResultList(serviceList);
        }
    }, [serviceList]);
    const handleSearch = () => {
        if (usuario.corp) {
            if (usuario.corp.tipo === 'T') {
                dispatch(getJobs({ ...filters, page, limit }));
                return;
            }
            dispatch(
                getJobsForCorp({
                    corpId: usuario.corp.id as string,
                    ...filters,
                    page,
                    limit,
                }),
            );
        }
    };
    return (
        <PageContainer title='' breadcrumbs={[]} id='main-content'>
            {/* <!-- Search Content --> */}

            <SearchService filter={filters} onSet={setFilters} onPress={handleSearch} />

            {/* <!-- Search Results --> */}
            <div className='flex flex-col lg:flex-row gap-6'>
                {/* <!-- Results List --> */}
                <section id='search-results' className='lg:w-2/3'>
                    <div className='flex items-center justify-between mb-4'>
                        <h2 className='text-lg font-semibold text-gray-500'>
                            Resultados ({resultList.totalRecords})
                        </h2>
                        <div className='flex items-center gap-2'>
                            <span className='text-sm text-gray-500'>Mostrar</span>

                            <Select
                                size='small'
                                value={limit}
                                onChange={(e) => setLimit(e.target.value as number)}
                                className='text-sm border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'
                            >
                                <MenuItem value={10}>10 </MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={30}>30</MenuItem>
                            </Select>
                        </div>

                        <FormControl className='flex items-center'>
                            <InputLabel id={'orderList'} className='text-sm mr-2'>
                                Ordenar por:
                            </InputLabel>
                            <Select
                                size='small'
                                label=' Ordenar por:'
                                labelId='orderList'
                                value={filters.orderBy}
                                onChange={(e) =>
                                    setFilters({ ...filters, orderBy: e.target.value })
                                }
                                className='text-sm border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'
                            >
                                <MenuItem value='relevance'>Relevância</MenuItem>
                                <MenuItem value='rating'>Avaliação</MenuItem>
                                <MenuItem value='price-asc'>Preço: menor para maior</MenuItem>
                                <MenuItem value='price-desc'>Preço: maior para menor</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className='space-y-4'>
                        {/* <!-- Result Card 1 --> */}
                        {resultList &&
                            Array.isArray(resultList.jobs) &&
                            resultList.jobs.length > 0 &&
                            resultList.jobs.map((service) => (
                                <CardService key={service.id} service={service} />
                            ))}

                        {/* <!-- Pagination --> */}
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
                    </div>
                </section>

                {/* <!-- Map View --> */}
                {/* <section id='map-view' className='lg:w-1/3'>
                    <div className='bg-white rounded-lg shadow overflow-hidden'>
                        <div className='p-4 border-b border-gray-200'>
                            <h2 className='text-lg font-semibold text-gray-800'>
                                Mapa de Prestadores
                            </h2>
                        </div>
                        <div className='h-[600px] bg-gray-100 relative'>
                            /* <MapaEmpresas /> 
                            <img
                                className='w-full h-full object-cover'
                                src='https://storage.googleapis.com/uxpilot-auth.appspot.com/8e8f0510b8-4b920496ba5bfdf1190c.png'
                                alt='map showing service providers for tourism businesses in Brazil, with pins and markers showing different service categories, professional quality map view'
                            />
                            /* <!-- Map Controls --> 
                            <div className='absolute top-4 right-4 bg-white rounded-lg shadow p-2'>
                                <div className='flex flex-col space-y-2'>
                                    <button className='h-8 w-8 flex items-center justify-center text-gray-600 hover:text-gray-900 bg-white rounded-md border border-gray-300'>
                                        <i className='fa-solid fa-plus'></i>
                                    </button>
                                    <button className='h-8 w-8 flex items-center justify-center text-gray-600 hover:text-gray-900 bg-white rounded-md border border-gray-300'>
                                        <i className='fa-solid fa-minus'></i>
                                    </button>
                                    <button className='h-8 w-8 flex items-center justify-center text-gray-600 hover:text-gray-900 bg-white rounded-md border border-gray-300'>
                                        <i className='fa-solid fa-location-crosshairs'></i>
                                    </button>
                                </div>
                            </div>
                            {/* <!-- Map Legend --> 
                            <div className='absolute bottom-4 left-4 bg-white rounded-lg shadow p-3'>
                                <p className='text-sm font-medium text-gray-800 mb-2'>Categorias</p>
                                <div className='space-y-1.5'>
                                    <div className='flex items-center'>
                                        <span className='h-3 w-3 rounded-full bg-blue-500 mr-2'></span>
                                        <span className='text-xs text-gray-600'>Marketing</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <span className='h-3 w-3 rounded-full bg-indigo-500 mr-2'></span>
                                        <span className='text-xs text-gray-600'>Tecnologia</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <span className='h-3 w-3 rounded-full bg-rose-500 mr-2'></span>
                                        <span className='text-xs text-gray-600'>Consultoria</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <span className='h-3 w-3 rounded-full bg-green-500 mr-2'></span>
                                        <span className='text-xs text-gray-600'>
                                            Sustentabilidade
                                        </span>
                                    </div>
                                    <div className='flex items-center'>
                                        <span className='h-3 w-3 rounded-full bg-amber-500 mr-2'></span>
                                        <span className='text-xs text-gray-600'>Outros</span>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Map Popup --> 
                            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-3 w-64'>
                                <div className='flex items-start'>
                                    <img
                                        src='https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg'
                                        alt='Prestador'
                                        className='w-12 h-12 rounded-full mr-3'
                                    />
                                    <div className='flex-1'>
                                        <h3 className='font-medium text-gray-900 text-sm'>
                                            Carlos Oliveira
                                        </h3>
                                        <p className='text-xs text-gray-500'>Marketing Digital</p>
                                        <div className='flex text-amber-400 text-xs mt-1'>
                                            <i className='fa-solid fa-star'></i>
                                            <i className='fa-solid fa-star'></i>
                                            <i className='fa-solid fa-star'></i>
                                            <i className='fa-solid fa-star'></i>
                                            <i className='fa-solid fa-star'></i>
                                            <span className='text-gray-500 ml-1'>4.9</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-2 pt-2 border-t border-gray-100'>
                                    <button className='w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium py-1.5 px-3 rounded-md'>
                                        Ver detalhes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
            </div>
        </PageContainer>
    );
}
