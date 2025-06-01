'use client';
import { useState } from 'react';
import { TProfile } from './components/t-profile.component';
import { PProfile } from './components/p-profile.component';

export default function Profile() {
    const [typeUser, setTypeUser] = useState<'T' | 'P'>('T');
    return <>{typeUser === 'T' ? <TProfile /> : <PProfile />}</>;
}
