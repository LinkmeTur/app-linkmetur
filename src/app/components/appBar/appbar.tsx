'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { MenuItem, Popover, Stack } from '@mui/material';

export default function LinkmeTurAppBar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
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

    return (
        <Stack direction={'row'} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton onClick={toggleFullscreen} color='primary'>
                {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>

            <IconButton size='large' aria-label='show 4 new mails' color='primary'>
                <Badge badgeContent={4} color='error'>
                    <MailIcon />
                </Badge>
            </IconButton>
            <IconButton size='large' aria-label='show 17 new notifications' color='primary'>
                <Badge badgeContent={2} color='error'>
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <IconButton
                size='large'
                edge='end'
                aria-label='account of current user'
                aria-haspopup='true'
                color='inherit'
                onClick={handleProfileMenuOpen}
            >
                <AccountCircle />
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
