'use client';
import { ReactNode, Suspense, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks/hooks';
import { Alert, CircularProgress, Modal } from '@mui/material';
import { setAlertApp } from './store/reducers/configApp/configApp.slice';

const ModalLoading = ({ open }: { open: boolean }) => {
    return (
        <Modal open={open} className='flex items-center justify-center'>
            <>
                <svg width={0} height={0}>
                    <defs>
                        <linearGradient id='my_gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
                            <stop offset='0%' stopColor='#e01cd5' />
                            <stop offset='100%' stopColor='#1CB5E0' />
                        </linearGradient>
                    </defs>
                </svg>
                <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
            </>
        </Modal>
    );
};

export default function SuspenseFallback({ children }: { children: ReactNode }) {
    const dispatch = useAppDispatch();
    const { loading, alertApp } = useAppSelector((state) => state.commonApp);
    useEffect(() => {
        setTimeout(() => {
            dispatch(setAlertApp({ show: false, message: '', type: 'success' }));
        }, 3000);
    }, [alertApp.show]);
    return (
        <>
            {alertApp && alertApp.show && (
                <Alert
                    variant='filled'
                    sx={{ position: 'fixed', top: 0, zIndex: 9999 }}
                    severity={alertApp.type}
                >
                    {alertApp.message}.
                </Alert>
            )}
            {loading && <ModalLoading open={loading} />}
            <Suspense fallback={<ModalLoading open={loading} />}>{children}</Suspense>
        </>
    );
}
