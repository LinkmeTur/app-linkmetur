/* eslint-disable @next/next/no-img-element */
'use client';
import socket from '@/app/api/socket';
import {
    Box,
    IconButton,
    List,
    ListItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useEffect, useState } from 'react';
import { FaFile, FaImage, FaLock, FaSearch } from 'react-icons/fa';
import { FaFaceSmile } from 'react-icons/fa6';

export default function Messages() {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [messages, setMessages] = useState<{ [key: string]: string[] }>({});
    const [input, setInput] = useState('');
    useEffect(() => {
        socket.on('receive_message', ({ from, message }) => {
            setMessages((prev) => ({
                ...prev,
                [from]: [...(prev[from] || []), message],
            }));
        });
        return () => socket.off('receive_message');
    }, []);

    const sendMessage = () => {
        if (!selectedContact) return;
        socket.emit('send_message', { to: selectedContact, message: input });
        setMessages((prev) => ({
            ...prev,
            [selectedContact]: [...(prev[selectedContact] || []), `Você: ${input}`],
        }));
        setInput('');
    };

    return (
        <PageContainer title='' breadcrumbs={[]} className='px-0  overflow-hidden'>
            {/* <!-- Messaging Content --> */}

            <Paper elevation={4} className='h-[60%]  rounded-lg  flex'>
                {/* <!-- Conversation List --> */}
                <Box id='conversation-list' className='w-1/3  border-r border-gray-200 '>
                    {/* <!-- Search Bar --> */}

                    <Stack className='p-3'>
                        <TextField
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <IconButton>
                                            <FaSearch />
                                        </IconButton>
                                    ),
                                },
                            }}
                            type='text'
                            placeholder='Buscar conversas...'
                            className='text-sm '
                            size='small'
                            fullWidth
                        />
                    </Stack>

                    {/* <!-- Conversation Items --> */}
                    <List className='overflow-y-auto h-[calc(100%-109px)]'>
                        {contacts.map((contact) => (
                            <ListItem
                                key={contact}
                                onClick={() => setSelectedContact(contact)}
                                className={`p-3 cursor-pointer hover:bg-gray-100 ${
                                    selectedContact === contact ? 'bg-gray-200' : ''
                                }`}
                            >
                                <div className='flex items-center'>
                                    <img
                                        src='XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                                        alt='Avatar'
                                        className='w-10 h-10 rounded-full mr-3'
                                    />
                                    <div>
                                        <p className='font-medium text-gray-900'>{contact}</p>
                                        <p className='text-xs text-gray-500'>Online agora</p>
                                    </div>
                                </div>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* <!-- Chat Window --> */}
                <Box id='chat-window' className='w-2/3 flex flex-col overflow-auto'>
                    {/* <!-- Chat Header --> */}
                    <div className='p-3 border-b border-gray-200 flex items-center justify-between'>
                        <div className='flex items-center'>
                            <img
                                src='https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg'
                                alt='Avatar'
                                className='w-10 h-10 rounded-full mr-3'
                            />
                            <div>
                                <p className='font-medium text-gray-900'>Pousada Recanto Verde</p>
                                <p className='text-xs text-gray-500'>Online agora</p>
                            </div>
                        </div>
                        <div className='flex items-center space-x-3'>
                            <button className='text-gray-500 hover:text-gray-700'>
                                <i className='fa-solid fa-phone'></i>
                            </button>
                            <button className='text-gray-500 hover:text-gray-700'>
                                <i className='fa-solid fa-video'></i>
                            </button>
                            <button className='text-gray-500 hover:text-gray-700'>
                                <i className='fa-solid fa-ellipsis-vertical'></i>
                            </button>
                        </div>
                    </div>

                    {/* <!-- Chat Messages --> */}
                    <div id='chat-messages' className='flex-1 p-4 overflow-y-auto'>
                        <div className='flex flex-col space-y-4'>
                            {/* <!-- Date Divider --> */}
                            <div className='flex items-center justify-center'>
                                <span className='text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full'>
                                    Hoje, 12 de maio de 2025
                                </span>
                            </div>

                            {/* <!-- Received Message --> */}
                            <div className='flex items-end'>
                                <div className='max-w-[70%]'>
                                    <div className='bg-gray-100 p-3 rounded-t-lg rounded-r-lg'>
                                        <p className='text-sm text-gray-800'>
                                            Olá Carlos! Gostaria de saber mais detalhes sobre o seu
                                            serviço de fotografia para nossa pousada. Temos
                                            interesse em fazer um novo material promocional para a
                                            temporada de inverno.
                                        </p>
                                    </div>
                                    <p className='text-xs text-gray-500 mt-1'>
                                        09:30{' '}
                                        <i className='fa-solid fa-check ml-1 text-gray-400'></i>
                                    </p>
                                </div>
                            </div>

                            {/* <!-- Sent Message --> */}
                            <div className='flex items-end justify-end'>
                                <div className='max-w-[70%]'>
                                    <div className='bg-emerald-100 p-3 rounded-t-lg rounded-l-lg'>
                                        <p className='text-sm text-gray-800'>
                                            Olá! Obrigado pelo interesse. Ofereço um pacote completo
                                            de fotografia para hotelaria que inclui imagens dos
                                            quartos, áreas comuns, gastronomia e arredores. Posso
                                            enviar um portfólio com trabalhos anteriores para você
                                            avaliar.
                                        </p>
                                    </div>
                                    <p className='text-xs text-gray-500 mt-1 text-right'>
                                        09:34{' '}
                                        <i className='fa-solid fa-check-double ml-1 text-blue-500'></i>
                                    </p>
                                </div>
                            </div>

                            {/* <!-- Received Message with Attachment --> */}
                            <div className='flex items-end'>
                                <img
                                    src='https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg'
                                    alt='Avatar'
                                    className='w-8 h-8 rounded-full mr-2'
                                />
                                <div className='max-w-[70%]'>
                                    <div className='bg-gray-100 p-3 rounded-t-lg rounded-r-lg'>
                                        <p className='text-sm text-gray-800 mb-2'>
                                            Seria ótimo ver seu portfólio! Também gostaria de
                                            entender melhor sobre valores e prazos. Estou anexando
                                            algumas referências do estilo que buscamos.
                                        </p>
                                        <div className='bg-white rounded-lg p-2 border border-gray-200 flex items-center'>
                                            <i className='fa-solid fa-file-pdf text-red-500 text-xl mr-2'></i>
                                            <div className='flex-1'>
                                                <p className='text-xs font-medium text-gray-900'>
                                                    Referencias_Fotos.pdf
                                                </p>
                                                <p className='text-xs text-gray-500'>2.4 MB</p>
                                            </div>
                                            <button className='text-gray-500 hover:text-gray-700'>
                                                <i className='fa-solid fa-download'></i>
                                            </button>
                                        </div>
                                    </div>
                                    <p className='text-xs text-gray-500 mt-1'>
                                        09:40{' '}
                                        <i className='fa-solid fa-check ml-1 text-gray-400'></i>
                                    </p>
                                </div>
                            </div>

                            {/* <!-- Sent Message with Attachment --> */}
                            <div className='flex items-end justify-end'>
                                <div className='max-w-[70%]'>
                                    <div className='bg-emerald-100 p-3 rounded-t-lg rounded-l-lg'>
                                        <p className='text-sm text-gray-800 mb-2'>
                                            Claro, segue meu portfólio com os últimos trabalhos
                                            realizados para hotéis e pousadas. Quanto aos valores,
                                            depende da quantidade de ambientes e dias de trabalho.
                                            Podemos agendar uma visita técnica para avaliar melhor?
                                        </p>
                                        <div className='bg-white rounded-lg p-2 border border-gray-200 flex items-center'>
                                            <i className='fa-solid fa-file-image text-blue-500 text-xl mr-2'></i>
                                            <div className='flex-1'>
                                                <p className='text-xs font-medium text-gray-900'>
                                                    Portfolio_Fotografia_Hotelaria.jpg
                                                </p>
                                                <p className='text-xs text-gray-500'>4.8 MB</p>
                                            </div>
                                            <button className='text-gray-500 hover:text-gray-700'>
                                                <i className='fa-solid fa-download'></i>
                                            </button>
                                        </div>
                                    </div>
                                    <p className='text-xs text-gray-500 mt-1 text-right'>
                                        09:45{' '}
                                        <i className='fa-solid fa-check-double ml-1 text-blue-500'></i>
                                    </p>
                                </div>
                            </div>

                            {/* <!-- Message Status --> */}
                            <div className='flex justify-center'>
                                <span className='text-xs text-gray-500'>Digitando...</span>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Chat Input --> */}
                    <div id='chat-input' className='p-3 border-t border-gray-200'>
                        <div className='flex items-end space-x-2'>
                            <button className='text-gray-500 hover:text-gray-700 p-2'>
                                <i className='fa-solid fa-paperclip'></i>
                            </button>
                            <div className='flex-1 border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent'>
                                <textarea
                                    rows={1}
                                    placeholder='Digite sua mensagem...'
                                    className='w-full text-sm focus:outline-none resize-none'
                                ></textarea>
                            </div>
                            <button className='bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center'>
                                <i className='fa-solid fa-paper-plane'></i>
                            </button>
                        </div>
                        <div className='flex items-center justify-between mt-2 px-2'>
                            <div className='flex items-center space-x-3 text-gray-500'>
                                <button className='hover:text-gray-700'>
                                    <FaImage />
                                </button>
                                <button className='hover:text-gray-700'>
                                    <FaFile />
                                </button>
                                <button className='hover:text-gray-700'>
                                    <FaFaceSmile />
                                </button>
                            </div>
                            <Stack
                                direction={'row'}
                                gap={1}
                                alignItems={'center'}
                                className='text-xs text-gray-500'
                            >
                                <FaLock />
                                <Typography variant='body2'>Mensagens criptografadas</Typography>
                            </Stack>
                        </div>
                    </div>
                </Box>
            </Paper>
        </PageContainer>
    );
}
