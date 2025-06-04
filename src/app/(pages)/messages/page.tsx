/* eslint-disable @next/next/no-img-element */
import { Box, Paper } from '@mui/material';
import { PageContainer } from '@toolpad/core/PageContainer';

export default function Messages() {
    return (
        <PageContainer title='' breadcrumbs={[]} className='px-0  overflow-hidden'>
            {/* <!-- Messaging Content --> */}

            <Paper elevation={4} className='h-[60%]  rounded-lg  flex'>
                {/* <!-- Conversation List --> */}
                <Box id='conversation-list' className='w-1/3  border-r border-gray-200 '>
                    {/* <!-- Search Bar --> */}
                    <div className='p-3 border-b border-gray-200'>
                        <div className='relative'>
                            <input
                                type='text'
                                placeholder='Buscar conversas...'
                                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
                            />
                            <i className='fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'></i>
                        </div>
                    </div>

                    {/* <!-- Conversation Filters --> */}
                    <div className='flex border-b border-gray-200 text-sm'>
                        <button className='flex-1 py-3 text-center font-medium text-emerald-600 border-b-2 border-emerald-500'>
                            Todas
                        </button>
                        <button className='flex-1 py-3 text-center font-medium text-gray-500 hover:text-gray-700'>
                            Não lidas
                        </button>
                        <button className='flex-1 py-3 text-center font-medium text-gray-500 hover:text-gray-700'>
                            Arquivadas
                        </button>
                    </div>

                    {/* <!-- Conversation Items --> */}
                    <div className='overflow-y-auto h-[calc(100%-109px)]'>
                        <div
                            id='conversation-1'
                            className='p-3 border-b border-gray-200 bg-emerald-50 cursor-pointer'
                        >
                            <div className='flex items-start'>
                                <img
                                    src='https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg'
                                    alt='Avatar'
                                    className='w-10 h-10 rounded-full mr-3'
                                />
                                <div className='flex-1 min-w-0'>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-sm font-semibold text-gray-900 truncate'>
                                            Pousada Recanto Verde
                                        </p>
                                        <p className='text-xs text-gray-500'>09:45</p>
                                    </div>
                                    <p className='text-xs font-medium text-emerald-600 mb-1'>
                                        Proposta - Fotografia Profissional
                                    </p>
                                    <p className='text-xs text-gray-600 truncate'>
                                        Olá Carlos! Gostaria de saber mais detalhes sobre o seu
                                        serviço de fotografia para nossa pousada...
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            id='conversation-2'
                            className='p-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer'
                        >
                            <div className='flex items-start'>
                                <img
                                    src='https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg'
                                    alt='Avatar'
                                    className='w-10 h-10 rounded-full mr-3'
                                />
                                <div className='flex-1 min-w-0'>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-sm font-semibold text-gray-900 truncate'>
                                            Hotel Montanha Azul
                                        </p>
                                        <p className='text-xs text-gray-500'>Ontem</p>
                                    </div>
                                    <p className='text-xs font-medium text-gray-600 mb-1'>
                                        Consultoria em Gestão Turística
                                    </p>
                                    <p className='text-xs text-gray-600 truncate'>
                                        Prezado Carlos, agradecemos pelo excelente trabalho
                                        realizado. Gostaríamos de agendar uma reunião...
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            id='conversation-3'
                            className='p-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer'
                        >
                            <div className='flex items-start'>
                                <img
                                    src='https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-7.jpg'
                                    alt='Avatar'
                                    className='w-10 h-10 rounded-full mr-3'
                                />
                                <div className='flex-1 min-w-0'>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-sm font-semibold text-gray-900 truncate'>
                                            Agência Aventuras
                                        </p>
                                        <p className='text-xs text-gray-500'>2 dias</p>
                                    </div>
                                    <p className='text-xs font-medium text-gray-600 mb-1'>
                                        Desenvolvimento de Website
                                    </p>
                                    <p className='text-xs text-gray-600 truncate'>
                                        Boa tarde! Estamos interessados no seu serviço de
                                        desenvolvimento web. Qual seria o prazo...
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            id='conversation-4'
                            className='p-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer'
                        >
                            <div className='flex items-start'>
                                <img
                                    src='https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg'
                                    alt='Avatar'
                                    className='w-10 h-10 rounded-full mr-3'
                                />
                                <div className='flex-1 min-w-0'>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-sm font-semibold text-gray-900 truncate'>
                                            Restaurante Sabor da Serra
                                        </p>
                                        <p className='text-xs text-gray-500'>3 dias</p>
                                    </div>
                                    <p className='text-xs font-medium text-gray-600 mb-1'>
                                        Marketing Digital
                                    </p>
                                    <p className='text-xs text-gray-600 truncate'>
                                        Carlos, estamos muito satisfeitos com a campanha que você
                                        desenvolveu. Conseguimos um aumento...
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            id='conversation-5'
                            className='p-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer'
                        >
                            <div className='flex items-start'>
                                <img
                                    src='https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg'
                                    alt='Avatar'
                                    className='w-10 h-10 rounded-full mr-3'
                                />
                                <div className='flex-1 min-w-0'>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-sm font-semibold text-gray-900 truncate'>
                                            Parque Ecológico Vale Verde
                                        </p>
                                        <p className='text-xs text-gray-500'>1 semana</p>
                                    </div>
                                    <p className='text-xs font-medium text-gray-600 mb-1'>
                                        Consultoria em Sustentabilidade
                                    </p>
                                    <p className='text-xs text-gray-600 truncate'>
                                        Prezado Carlos, seguindo nosso último encontro, gostaria de
                                        confirmar a implementação das...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                <img
                                    src='https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg'
                                    alt='Avatar'
                                    className='w-8 h-8 rounded-full mr-2'
                                />
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
                                    <i className='fa-solid fa-image'></i>
                                </button>
                                <button className='hover:text-gray-700'>
                                    <i className='fa-solid fa-file'></i>
                                </button>
                                <button className='hover:text-gray-700'>
                                    <i className='fa-solid fa-face-smile'></i>
                                </button>
                            </div>
                            <div className='text-xs text-gray-500'>
                                <i className='fa-solid fa-lock mr-1'></i> Mensagens criptografadas
                            </div>
                        </div>
                    </div>
                </Box>
            </Paper>
        </PageContainer>
    );
}
