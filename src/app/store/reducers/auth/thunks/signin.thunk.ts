import api from '@/app/api/axios_HTTP';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUserState } from '../../user/user.slice';
import { setCorporation } from '../../corporation/corporation.slice';

const signin = createAsyncThunk(
    'signin/post',
    async (data: { email: string; senha: string }, { dispatch }) => {
        try {
            const response = await api.doPost('/authentications', data);
            dispatch(setUserState(response));
            dispatch(setCorporation(response?.corp));
            return { message: 'ok' };
        } catch (error) {
            console.error(error);
        }
    },
);

export default signin;
