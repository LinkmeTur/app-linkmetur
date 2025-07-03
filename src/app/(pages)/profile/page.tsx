'use client';

import { Fragment, useEffect, useState } from 'react';
import { TProfile } from './components/t-profile.component';
import { PProfile } from './components/p-profile.component';
import { useAppSelector } from '@/app/store/hooks/hooks';

export default function Profile() {
    const { usuario } = useAppSelector((state) => state.auth);
    const [typeUser, setTypeUser] = useState<'T' | 'P'>('T');
    useEffect(() => {
        if (usuario.corp && usuario.corp.tipo) {
            setTypeUser(usuario.corp.tipo);
        }
    }, [usuario]);
    return (
        <Fragment>
            {typeUser === 'T' ? <TProfile user={usuario} /> : <PProfile user={usuario} />}
        </Fragment>
    );
}
