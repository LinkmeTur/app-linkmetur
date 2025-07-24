'use client';

import { TProfile } from './components/t-profile.component';

import { useAppSelector } from '@/app/store/hooks/hooks';

export default function Profile() {
    const { usuario } = useAppSelector((state) => state.auth);

    return <TProfile user={usuario} />;
}
