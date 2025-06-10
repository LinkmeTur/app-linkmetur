'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { Avatar, AvatarGroup, MenuItem, Popover, Stack } from '@mui/material';

export default function LinkmeTurAppBar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorELNotification, setAnchorElNotification] = React.useState<null | HTMLElement>(
        null,
    );
    const [anchorELMessage, setAnchorElMessage] = React.useState<null | HTMLElement>(null);
    const [imageUrl1, setImageUrl1] = React.useState(undefined);
    const [imageUrl2, setImageUrl2] = React.useState(undefined);
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        switch (event.currentTarget.id) {
            case 'perfil':
                setAnchorEl(event.currentTarget);
                break;
            case 'notificação':
                setAnchorElNotification(event.currentTarget);
                break;
            case 'mensagem':
                setAnchorElMessage(event.currentTarget);
                break;

            default:
                break;
        }
        console.log();
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setAnchorElNotification(null);
        setAnchorElMessage(null);
    };
    const [isFullscreen, setIsFullscreen] = React.useState(false);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };
    const getRandomColor = () => {
        let color;
        do {
            color = '#' + Math.floor(Math.random() * 16777215).toString(16); // Gera uma cor aleatória
        } while (color.toLowerCase() === '#ffffff' || color.toLowerCase() === '#000000'); // Evita branco e preto
        return color;
    };

    return (
        <Stack direction={'row'} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton onClick={toggleFullscreen} color='primary'>
                {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>

            <IconButton
                id='mensagem'
                size='large'
                aria-label='show 4 new mails'
                color='primary'
                onClick={handleMenuOpen}
            >
                <Badge badgeContent={4} color='error'>
                    <MailIcon />
                </Badge>
            </IconButton>
            <Popover
                open={Boolean(anchorELMessage)}
                anchorEl={anchorELMessage}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <section id='recent-messages'>
                    <div className='flex items-center justify-between mb-4'>
                        <h2 className='text-lg font-semibold text-gray-800'>Mensagens Recentes</h2>

                        <button
                            id='btn-all-messages'
                            className='text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center'
                        >
                            Ver todas
                            <i className='fa-solid fa-chevron-right ml-1 text-xs'></i>
                        </button>
                    </div>

                    <div className='bg-white rounded-lg shadow overflow-hidden'>
                        <div
                            id='message-1'
                            className='p-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer'
                        >
                            <div className='flex items-start'>
                                <div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0'>
                                    <i className='fa-solid fa-file-contract'></i>
                                </div>
                                <div className='flex-1'>
                                    <p className='text-sm font-medium text-gray-900'>
                                        Nova proposta recebida
                                    </p>
                                    <p className='text-xs text-gray-500 mb-1'>
                                        Pousada Recanto Verde está interessada no seu serviço de
                                        fotografia
                                    </p>
                                    <p className='text-xs text-gray-400'>Hoje, 09:45</p>
                                </div>
                                <div className='ml-3'>
                                    <span className='h-2 w-2 bg-blue-500 rounded-full block'></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Popover>
            <IconButton id='notificação' size='large' color='primary' onClick={handleMenuOpen}>
                <Badge badgeContent={2} color='error'>
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Popover
                open={Boolean(anchorELNotification)}
                anchorEl={anchorELNotification}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <section id='recent-notifications'>
                    <div className='flex items-center justify-between mb-4'>
                        <h2 className='text-lg font-semibold text-gray-800'>
                            Notificações Recentes
                        </h2>

                        <button
                            id='btn-all-notifications'
                            className='text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center'
                        >
                            Ver todas
                            <i className='fa-solid fa-chevron-right ml-1 text-xs'></i>
                        </button>
                    </div>

                    <div className='bg-white rounded-lg shadow overflow-hidden'>
                        <div
                            id='notification-1'
                            className='p-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer'
                        >
                            <div className='flex items-start'>
                                <div className='h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0'>
                                    <i className='fa-solid fa-file-contract'></i>
                                </div>
                                <div className='flex-1'>
                                    <p className='text-sm font-medium text-gray-900'>
                                        Nova proposta recebida
                                    </p>
                                    <p className='text-xs text-gray-500 mb-1'>
                                        Pousada Recanto Verde está interessada no seu serviço de
                                        fotografia
                                    </p>
                                    <p className='text-xs text-gray-400'>Hoje, 09:45</p>
                                </div>
                                <div className='ml-3'>
                                    <span className='h-2 w-2 bg-blue-500 rounded-full block'></span>
                                </div>
                            </div>
                        </div>

                        <div
                            id='notification-2'
                            className='p-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer'
                        >
                            <div className='flex items-start'>
                                <div className='h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 mr-3 flex-shrink-0'>
                                    <i className='fa-solid fa-envelope'></i>
                                </div>
                                <div className='flex-1'>
                                    <p className='text-sm font-medium text-gray-900'>
                                        Nova mensagem
                                    </p>
                                    <p className='text-xs text-gray-500 mb-1'>
                                        João da Agência Aventuras enviou uma mensagem sobre seu
                                        serviço
                                    </p>
                                    <p className='text-xs text-gray-400'>Ontem, 15:32</p>
                                </div>
                                <div className='ml-3'>
                                    <span className='h-2 w-2 bg-emerald-500 rounded-full block'></span>
                                </div>
                            </div>
                        </div>

                        <div
                            id='notification-3'
                            className='p-4 hover:bg-gray-50 transition cursor-pointer'
                        >
                            <div className='flex items-start'>
                                <div className='h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 mr-3 flex-shrink-0'>
                                    <i className='fa-solid fa-star'></i>
                                </div>
                                <div className='flex-1'>
                                    <p className='text-sm font-medium text-gray-900'>
                                        Nova avaliação
                                    </p>
                                    <p className='text-xs text-gray-500 mb-1'>
                                        Hotel Montanha Azul avaliou seu serviço de consultoria com 5
                                        estrelas
                                    </p>
                                    <p className='text-xs text-gray-400'>2 dias atrás</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Popover>
            <IconButton
                disableRipple
                size='large'
                edge='end'
                id='perfil'
                aria-haspopup='true'
                color='inherit'
                onClick={handleMenuOpen}
            >
                <AvatarGroup total={2}>
                    <Avatar
                        src={imageUrl1 ?? undefined}
                        sx={{ bgcolor: imageUrl1 ? undefined : getRandomColor() }}
                    >
                        {!imageUrl1 && 'JC'}
                    </Avatar>
                    <Avatar
                        src={imageUrl2 ?? undefined}
                        sx={{ bgcolor: imageUrl2 ? undefined : getRandomColor() }}
                    >
                        {!imageUrl2 && 'LM'}
                    </Avatar>
                </AvatarGroup>
            </IconButton>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box sx={{ minWidth: 200 }}>
                    <MenuItem onClick={handleMenuClose}>Conta</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Trocar Senha</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Configurações</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                </Box>
            </Popover>
        </Stack>
    );
}
