'use client';

import { formatPhone } from '@/app/config/functions/formatPhone';
import { useAppDispatch } from '@/app/store/hooks/hooks';
import getOneCorp from '@/app/store/reducers/corporation/thunks/getOneCorp.thunk';
import { TUser } from '@/app/store/reducers/user/user.slice';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { PageContainer } from '@toolpad/core/PageContainer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaUserEdit } from 'react-icons/fa';

export function TProfile({ user }: { user: TUser }) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getOneCorp(user.corpId as string))
            .unwrap()
            .then((res) => {
                console.log(res);
            });
    });

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
                            </Stack>
                        </Box>
                    </Stack>
                </Box>

                {/* <!-- Company Basic Info --> */}
                <div id='company-info' className='p-8'>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                        <div className='lg:col-span-2'>
                            <section id='basic-info' className='mb-8'>
                                <h3 className='text-lg font-semibold  mb-4'>Informações Básicas</h3>

                                <div className='space-y-4'>
                                    <div className='flex'>
                                        <div className='w-32 flex-shrink-0'>
                                            <span className='text-sm font-medium text-gray-500'>
                                                Nome
                                            </span>
                                        </div>
                                        <div className='flex-1'>
                                            <span className='text-sm '>
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
                                            <span className='text-sm '>
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
                                            <span className='text-sm '>
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
                                            <span className='text-sm '>
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
                                            <span className='text-sm '>{user?.corp?.email}</span>
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
                                <h3 className='text-lg font-semibold  mb-4'>Sobre a Empresa</h3>
                                <p className='text-sm text-gray-700 mb-4'>
                                    {user?.corp?.profile?.descricao}.
                                </p>
                                <p className='text-sm text-gray-700'>
                                    {user?.corp?.profile?.sobre}
                                </p>
                            </section>
                        </div>

                        <div className='lg:col-span-1'>
                            <Paper id='company-stats' className='bg-gray-200 rounded-lg p-6 mb-6'>
                                <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                                    Estatísticas
                                </h3>

                                <div className='space-y-4'>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-sm text-gray-700'>Membro desde</span>
                                        <span className='text-sm text-gray-500 font-medium'>
                                            {user.corp?.created_at
                                                ? new Date(
                                                      user.corp?.created_at,
                                                  ).toLocaleDateString('pt-BR', {
                                                      day: '2-digit',
                                                      month: '2-digit',
                                                      year: 'numeric',
                                                  })
                                                : null}
                                        </span>
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
                            </Paper>

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
