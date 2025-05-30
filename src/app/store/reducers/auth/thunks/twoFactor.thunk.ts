import api from '@/app/api/axios_HTTP';
import { createAsyncThunk } from '@reduxjs/toolkit';

const twoFactorRequest = createAsyncThunk(
    'twoFactor/post',
    async ({ codeFactor, data }: { codeFactor: string; data: string }) => {
        try {
            const response = await api.doPost('/authentications/verificationTwoFactorCode', {
                codeFactor,
                data,
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    },
);

export default twoFactorRequest;
