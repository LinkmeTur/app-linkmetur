import api from '@/app/api/axios_HTTP';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '../user.slice';
import { setUser } from '../../auth/auth.slice';
import { setloading } from '../../configApp/configApp.slice';

const createUser = createAsyncThunk(
    'createUser',
    async (data: { user: Partial<TUser>; id: string }, { dispatch }) => {
        dispatch(setloading(true));
        const response = await api.doPost('/users', data.user);
        console.log('responsecreatedUser', response);
        if (response) {
            const listResponse = await api.doGet(`/users/${data.id}`);
            if (listResponse) {
                dispatch(setUser(listResponse));
                dispatch(setloading(false));
            }
        }
    },
);

export default createUser;
