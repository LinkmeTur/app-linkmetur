import api from '@/app/api/axios_HTTP';
import { createAsyncThunk } from '@reduxjs/toolkit';

const signin = createAsyncThunk('signin/post', async (data: { email: string; senha: string }) => {
    try {
        const response = await api.doPost('/authentications', data);
        localStorage.setItem('tipo', response.user.corp.tipo);

        return { message: 'ok', usuario: response.user, token: response.token };
    } catch (error) {
        console.error(error);
    }
});

export default signin;
