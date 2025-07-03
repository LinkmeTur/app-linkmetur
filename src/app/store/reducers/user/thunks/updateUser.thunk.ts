import { createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '../user.slice';
import api from '@/app/api/axios_HTTP';
import { setUser } from '../../auth/auth.slice';

const updateUser = createAsyncThunk(
    'updateUser',
    async (data: { user: Partial<TUser>; id: string }, { dispatch }) => {
        const response = await api.doPatch(`/users/${data.user.id}`, data.user);
        if (response?.affected) {
            const updatedUser = await api.doGet(`/users/${data.id}`);
            if (updatedUser) dispatch(setUser(updatedUser));
        }
    },
);

export default updateUser;
