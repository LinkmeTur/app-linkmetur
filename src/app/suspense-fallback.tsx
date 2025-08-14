// app/suspense-fallback.tsx
'use client';

import { Fragment, ReactNode, Suspense, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks/hooks';
import { Alert, CircularProgress, Slide, Snackbar, Modal } from '@mui/material';
import { setAlertApp } from './store/reducers/configApp/configApp.slice';

// 🔹 SVG do gradiente (único na página)
const GradientDefs = () => (
    <svg width={0} height={0}>
        <defs>
            <linearGradient id='linkmetur-gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
                <stop offset='0%' stopColor='#e01cd5' />
                <stop offset='100%' stopColor='#1CB5E0' />
            </linearGradient>
        </defs>
    </svg>
);

// 🔹 Modal de Loading com gradiente
const ModalLoading = ({ open }: { open: boolean }) => {
    return (
        <Modal open={open} className='flex items-center justify-center'>
            <Fragment>
                <GradientDefs />
                <CircularProgress
                    sx={{
                        'svg circle': {
                            stroke: 'url(#linkmetur-gradient)',
                        },
                    }}
                    size={60}
                    thickness={4}
                />
            </Fragment>
        </Modal>
    );
};

// 🔹 Fallback com Suspense e Alert global
export default function SuspenseFallback({ children }: { children: ReactNode }) {
    const dispatch = useAppDispatch();
    const { loading, alertApp } = useAppSelector((state) => state.commonApp);

    const [openAlert, setOpenAlert] = useState(false);

    // Controle do Snackbar
    useEffect(() => {
        if (alertApp.show && alertApp.message) {
            setOpenAlert(true);
        }
    }, [alertApp]);

    const handleCloseAlert = () => {
        setOpenAlert(false);
        // Auto-dismiss no Redux após fechar
        const timer = setTimeout(() => {
            dispatch(setAlertApp({ show: false, message: '', type: 'success' }));
        }, 150);
        return () => clearTimeout(timer);
    };

    return (
        <Fragment>
            {/* Gradiente global (única instância) */}
            <GradientDefs />

            {/* Snackbar para alertas (melhor que Alert fixo) */}
            <Snackbar
                open={openAlert}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                slots={{
                    transition: Slide, // Transição suave
                }}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity={alertApp.type}
                    variant='filled'
                    sx={{
                        fontWeight: 500,
                        boxShadow: 3,
                        borderRadius: 2,
                    }}
                >
                    {alertApp.message}
                </Alert>
            </Snackbar>

            {/* Modal de loading condicional (para ações explícitas) */}
            {loading && <ModalLoading open={true} />}

            {/* Suspense com fallback (para carregamento de componentes/lazy) */}
            <Suspense fallback={<ModalLoading open={true} />}>{children}</Suspense>
        </Fragment>
    );
}
