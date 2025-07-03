'use client';

import { Box, Button, Chip, Paper, Rating, Stack, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { PageContainer } from '@toolpad/core/PageContainer';
import { MdVerified } from 'react-icons/md';
import { FaLeaf } from 'react-icons/fa';
import { FaBriefcase, FaLanguage, FaLocationDot } from 'react-icons/fa6';
import { useState } from 'react';
import { TUser } from '@/app/store/reducers/user/user.slice';

export function PProfile({ user }: { user: TUser }) {
    const [value, setValue] = useState('1');

    const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <PageContainer title='' breadcrumbs={[]}>
            <Paper className='rounded-lg overflow-hidden'>
                <Box className='bg-emerald-600 h-32 relative'>
                    <Box
                        sx={{ backgroundImage: `url(/floresta.jpg)` }}
                        className='absolute top-16 left-8 h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden'
                    ></Box>
                    <Box className='absolute top-4 right-4'>
                        <Button className='bg-white text-emerald-600 text-xs font-medium py-1.5 px-3 rounded-md'>
                            Editar Perfil
                        </Button>
                    </Box>
                </Box>
                <Box className='pt-20 pb-6 px-8 flex justify-between'>
                    <Stack>
                        <Box className='flex items-start gap-2 mb-4 md:mb-0'>
                            <Typography>{user.corp?.razao_social}</Typography>
                            <Chip
                                icon={<MdVerified />}
                                label='Verificado'
                                color='primary'
                                size='small'
                            />
                            <Chip icon={<FaLeaf />} label='Sutentável' color='info' size='small' />
                        </Box>
                        <Typography className='text-gray-600 mb-2'>
                            Consultoria em Marketing Digital para Turismo
                        </Typography>
                        <Box className='flex items-center gap-2'>
                            <FaLocationDot />
                            <Typography className='text-gray-600'>Porto Alegre, RS</Typography>
                            <FaBriefcase />
                            <Typography className='text-gray-600'>8 anos de experiência</Typography>
                            <FaLanguage />
                            <Typography className='text-gray-600'>
                                Portugues, Inglês, Espanhol
                            </Typography>
                        </Box>
                    </Stack>
                    <Box className='flex flex-col items-end'>
                        <Stack className='flex items-center mb-2'>
                            <Rating value={4} size='small' />
                            <Typography className='text-sm text-gray-500'>
                                (42 avaliações)
                            </Typography>
                        </Stack>

                        <Button
                            id='btn-request-quote'
                            className='bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-lg shadow-sm transition'
                        >
                            Solicitar Orçamento
                        </Button>
                    </Box>
                </Box>
            </Paper>

            <TabContext value={value}>
                <Paper className='my-4'>
                    <TabList onChange={handleChangeTab} aria-label='lab API tabs example'>
                        <Tab label='Sobre' value='1' />
                        <Tab label='Serviços' value='2' />
                        <Tab label='Avaliações' value='3' />
                        <Tab label='Portifólio' value='4' />
                        <Tab label='FAQ' value='5' />
                    </TabList>
                </Paper>
                <TabPanel value='1'>Sobre</TabPanel>
                <TabPanel value='2'>Serviços</TabPanel>
                <TabPanel value='3'>Avaliações</TabPanel>
                <TabPanel value='4'>Portifólio</TabPanel>
                <TabPanel value='5'>FAQ</TabPanel>
            </TabContext>
        </PageContainer>
    );
}
