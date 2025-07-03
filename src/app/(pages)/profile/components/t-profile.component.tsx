'use client';

import { formatPhone } from '@/app/config/functions/formatPhone';
import { TUser } from '@/app/store/reducers/user/user.slice';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { PageContainer } from '@toolpad/core/PageContainer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaHeart, FaUserEdit } from 'react-icons/fa';

export function TProfile({ user }: { user: TUser }) {
    const router = useRouter();

    return (
        <PageContainer title='' breadcrumbs={[]}>
            <Paper elevation={12} className='rounded-lg overflow-hidden'>
                {/* <!-- Company Header --> */}
                <Box id='company-header' className='relative'>
                    <Stack className='h-36 bg-emerald-600 relative w-full'>
                        {user.corp?.profile?.Wallpaper_Url && (
                            <Box className='w-full h-full opacity-20'>
                                <Image
                                    src={user.corp?.profile.Wallpaper_Url}
                                    alt='Wallpaper'
                                    width={500}
                                    height={500}
                                    className='w-full h-full'
                                />
                            </Box>
                        )}
                        <Stack className='absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent' />
                    </Stack>

                    <Stack className='absolute bottom-0 left-0 w-full px-8 pb-4'>
                        <Box className='flex items-end'>
                            <Stack className='relative mr-6 h-24 w-24 rounded-lg  p-1 shadow-md border-4 border-white'>
                                {user.corp?.logo_url && (
                                    <Image
                                        src={user.corp?.logo_url}
                                        alt='logo'
                                        width={500}
                                        height={500}
                                        className='w-full h-full'
                                    />
                                )}
                            </Stack>

                            <Stack className='flex-1 text-white pb-1'>
                                <Typography className='text-2xl font-bold'>
                                    {user?.corp?.razao_social}
                                </Typography>
                                <Box className='flex items-center mt-1'>
                                    <i className='fa-solid fa-location-dot mr-2 text-emerald-300'></i>
                                    <span className='text-sm'>
                                        {user?.corp?.cidade}, {user?.corp?.estado}
                                    </span>
                                </Box>
                            </Stack>

                            <Stack>
                                <Button
                                    startIcon={<FaUserEdit />}
                                    onClick={() => router.push('/profile/edit')}
                                    id='btn-edit'
                                    className='bg-white text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-md shadow-sm font-medium text-sm flex items-center'
                                >
                                    Editar
                                </Button>
                                {/* <Button
                                    startIcon={<FaHeart />}
                                    id='btn-favorite'
                                    className='bg-white text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-md shadow-sm font-medium text-sm flex items-center'
                                >
                                    Favoritar
                                </Button> */}
                            </Stack>
                        </Box>
                    </Stack>
                </Box>

                {/* <!-- Company Basic Info --> */}
                <div id='company-info' className='p-8'>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                        <div className='lg:col-span-2'>
                            <section id='basic-info' className='mb-8'>
                                <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                                    Informações Básicas
                                </h3>

                                <div className='space-y-4'>
                                    <div className='flex'>
                                        <div className='w-32 flex-shrink-0'>
                                            <span className='text-sm font-medium text-gray-500'>
                                                Nome
                                            </span>
                                        </div>
                                        <div className='flex-1'>
                                            <span className='text-sm text-gray-800'>
                                                {user?.corp?.nome_fantasia ||
                                                    user?.corp?.razao_social}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='flex'>
                                        <div className='w-32 flex-shrink-0'>
                                            <span className='text-sm font-medium text-gray-500'>
                                                Localização
                                            </span>
                                        </div>
                                        <div className='flex-1'>
                                            <span className='text-sm text-gray-800'>
                                                {user?.corp?.endereco}, {user?.corp?.numero} -{' '}
                                                {user?.corp?.bairro}, {user?.corp?.cidade} -{' '}
                                                {user?.corp?.estado}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='flex'>
                                        <div className='w-32 flex-shrink-0'>
                                            <span className='text-sm font-medium text-gray-500'>
                                                Segmento
                                            </span>
                                        </div>
                                        <div className='flex-1'>
                                            <span className='text-sm text-gray-800'>
                                                {user?.corp?.cnae_fiscal_principal}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='flex'>
                                        <div className='w-32 flex-shrink-0'>
                                            <span className='text-sm font-medium text-gray-500'>
                                                Telefone
                                            </span>
                                        </div>
                                        <div className='flex-1'>
                                            <span className='text-sm text-gray-800'>
                                                {formatPhone(user?.corp?.telefone as string)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='flex'>
                                        <div className='w-32 flex-shrink-0'>
                                            <span className='text-sm font-medium text-gray-500'>
                                                E-mail
                                            </span>
                                        </div>
                                        <div className='flex-1'>
                                            <span className='text-sm text-gray-800'>
                                                {user?.corp?.email}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='flex'>
                                        <div className='w-32 flex-shrink-0'>
                                            <span className='text-sm font-medium text-gray-500'>
                                                Site
                                            </span>
                                        </div>
                                        <div className='flex-1'>
                                            <span className='text-sm text-emerald-600 hover:underline cursor-pointer'>
                                                {user?.corp?.profile?.site ?? ''}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section id='about-company' className='mb-8'>
                                <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                                    Sobre a Empresa
                                </h3>
                                <p className='text-sm text-gray-700 mb-4'>
                                    {user?.corp?.profile?.descricao}.
                                </p>
                                <p className='text-sm text-gray-700'>
                                    {user?.corp?.profile?.sobre}
                                </p>
                            </section>

                            <section id='services-offered'>
                                <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                                    Serviços Contratados
                                </h3>

                                <div className='space-y-4'>
                                    <div
                                        id='service-item-1'
                                        className='border border-gray-200 rounded-lg p-4 hover:shadow-sm transition'
                                    >
                                        <div className='flex items-start'>
                                            <div className='h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500 mr-4 flex-shrink-0'>
                                                <i className='fa-solid fa-camera text-xl'></i>
                                            </div>
                                            <div className='flex-1'>
                                                <h4 className='font-medium text-gray-800 mb-1'>
                                                    Fotografia Profissional
                                                </h4>
                                                <div className='flex items-center mb-2'>
                                                    <div className='flex text-amber-400 text-xs'>
                                                        <i className='fa-solid fa-star'></i>
                                                        <i className='fa-solid fa-star'></i>
                                                        <i className='fa-solid fa-star'></i>
                                                        <i className='fa-solid fa-star'></i>
                                                        <i className='fa-solid fa-star'></i>
                                                    </div>
                                                    <span className='text-gray-500 text-xs ml-2'>
                                                        Avaliado em 18/03/2025
                                                    </span>
                                                </div>
                                                <p className='text-sm text-gray-600'>
                                                    &quot;Excelente serviço! As fotos capturaram
                                                    perfeitamente a essência das nossas atividades
                                                    de ecoturismo. Recomendamos!&quot;
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        id='service-item-2'
                                        className='border border-gray-200 rounded-lg p-4 hover:shadow-sm transition'
                                    >
                                        <div className='flex items-start'>
                                            <div className='h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-500 mr-4 flex-shrink-0'>
                                                <i className='fa-solid fa-globe text-xl'></i>
                                            </div>
                                            <div className='flex-1'>
                                                <h4 className='font-medium text-gray-800 mb-1'>
                                                    Desenvolvimento de Website
                                                </h4>
                                                <div className='flex items-center mb-2'>
                                                    <div className='flex text-amber-400 text-xs'>
                                                        <i className='fa-solid fa-star'></i>
                                                        <i className='fa-solid fa-star'></i>
                                                        <i className='fa-solid fa-star'></i>
                                                        <i className='fa-solid fa-star'></i>
                                                        <i className='fa-regular fa-star'></i>
                                                    </div>
                                                    <span className='text-gray-500 text-xs ml-2'>
                                                        Avaliado em 05/02/2025
                                                    </span>
                                                </div>
                                                <p className='text-sm text-gray-600'>
                                                    &quot;Nosso site ficou muito bom, moderno e
                                                    responsivo. Apenas tivemos alguns atrasos na
                                                    entrega, mas o resultado final compensou.&quot;
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        id='service-item-3'
                                        className='border border-gray-200 rounded-lg p-4 hover:shadow-sm transition'
                                    >
                                        <div className='flex items-start'>
                                            <div className='h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center text-green-500 mr-4 flex-shrink-0'>
                                                <i className='fa-solid fa-leaf text-xl'></i>
                                            </div>
                                            <div className='flex-1'>
                                                <h4 className='font-medium text-gray-800 mb-1'>
                                                    Consultoria em Sustentabilidade
                                                </h4>
                                                <div className='flex items-center mb-2'>
                                                    <div className='flex text-amber-400 text-xs'>
                                                        <i className='fa-solid fa-star'></i>
                                                        <i className='fa-solid fa-star'></i>
                                                        <i className='fa-solid fa-star'></i>
                                                        <i className='fa-solid fa-star'></i>
                                                        <i className='fa-solid fa-star-half-stroke'></i>
                                                    </div>
                                                    <span className='text-gray-500 text-xs ml-2'>
                                                        Avaliado em 22/01/2025
                                                    </span>
                                                </div>
                                                <p className='text-sm text-gray-600'>
                                                    &quot;A consultoria nos ajudou a implementar
                                                    práticas sustentáveis em todas as nossas
                                                    operações. As orientações foram claras e
                                                    práticas.&quot;
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className='lg:col-span-1'>
                            <section id='company-stats' className='bg-gray-50 rounded-lg p-6 mb-6'>
                                <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                                    Estatísticas
                                </h3>

                                <div className='space-y-4'>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-sm text-gray-600'>Membro desde</span>
                                        <span className='text-sm font-medium'>Março 2025</span>
                                    </div>

                                    <div className='flex items-center justify-between'>
                                        <span className='text-sm text-gray-600'>
                                            Serviços contratados
                                        </span>
                                        <span className='text-sm font-medium'>7</span>
                                    </div>

                                    <div className='flex items-center justify-between'>
                                        <span className='text-sm text-gray-600'>
                                            Avaliações feitas
                                        </span>
                                        <span className='text-sm font-medium'>5</span>
                                    </div>

                                    <div className='flex items-center justify-between'>
                                        <span className='text-sm text-gray-600'>
                                            Nota média dada
                                        </span>
                                        <div className='flex items-center'>
                                            <div className='flex text-amber-400 text-xs mr-1'>
                                                <i className='fa-solid fa-star'></i>
                                                <i className='fa-solid fa-star'></i>
                                                <i className='fa-solid fa-star'></i>
                                                <i className='fa-solid fa-star'></i>
                                                <i className='fa-solid fa-star-half-stroke'></i>
                                            </div>
                                            <span className='text-sm font-medium'>4.5</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section
                                id='company-certifications'
                                className='bg-gray-50 rounded-lg p-6 mb-6'
                            >
                                <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                                    Certificações
                                </h3>

                                <div className='space-y-3'>
                                    <div className='flex items-center'>
                                        <i className='fa-solid fa-certificate text-emerald-500 mr-2'></i>
                                        <span className='text-sm text-gray-700'>CADASTUR</span>
                                    </div>

                                    <div className='flex items-center'>
                                        <i className='fa-solid fa-certificate text-emerald-500 mr-2'></i>
                                        <span className='text-sm text-gray-700'>
                                            Turismo Responsável
                                        </span>
                                    </div>

                                    <div className='flex items-center'>
                                        <i className='fa-solid fa-certificate text-emerald-500 mr-2'></i>
                                        <span className='text-sm text-gray-700'>ISO 14001</span>
                                    </div>
                                </div>
                            </section>

                            <section id='company-contact' className='bg-gray-50 rounded-lg p-6'>
                                <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                                    Contato
                                </h3>

                                <div className='space-y-4'>
                                    <button className='w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md font-medium text-sm transition'>
                                        <i className='fa-solid fa-envelope mr-2'></i>
                                        Enviar Mensagem
                                    </button>

                                    <div className='flex space-x-2'>
                                        <span className='flex-1 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium text-sm transition cursor-pointer'>
                                            <i className='fa-brands fa-whatsapp mr-2 text-green-600'></i>
                                            WhatsApp
                                        </span>

                                        <span className='flex-1 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium text-sm transition cursor-pointer'>
                                            <i className='fa-solid fa-phone mr-2 text-blue-600'></i>
                                            Ligar
                                        </span>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </Paper>
        </PageContainer>
    );
}
