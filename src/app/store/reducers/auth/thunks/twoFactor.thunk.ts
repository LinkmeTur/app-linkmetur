import api from '@/app/api/axios_HTTP';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setloading } from '../../configApp/configApp.slice';

const twoFactorRequest = createAsyncThunk(
    'twoFactor/post',
    async ({ data }: { data: string }, { dispatch }) => {
        try {
            dispatch(setloading(true));

            const response = await api.doPost('/authentications/verificationTwoFactorCode', {
                data,
            });
            dispatch(setloading(false));
            return response;
        } catch (error) {
            console.error(error);
        }
    },
);

export default twoFactorRequest;
