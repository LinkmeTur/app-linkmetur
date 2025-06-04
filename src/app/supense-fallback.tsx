'use client';

import { ReactNode, Suspense } from 'react';
import { useAppSelector } from './store/hooks/hooks';
import { CircularProgress, Modal } from '@mui/material';

const ModalLoading = ({ open }: { open: boolean }) => {
    return (
        <Modal open={open}>
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
    const { loading } = useAppSelector((state) => state.commonApp);
    return (
        <>
            {loading && <ModalLoading open={loading} />}
            <Suspense fallback={<ModalLoading open={loading} />}>{children}</Suspense>
        </>
    );
}
