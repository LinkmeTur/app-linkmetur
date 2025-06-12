import api from '@/app/api/axios_HTTP';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAlertApp, setloading } from '../../configApp/configApp.slice';
import { AxiosError } from 'axios';

const sendEmailForRecoveryPass = createAsyncThunk(
    'sendEmailForRecoveryPass/post',
    async (email: string, { dispatch }) => {
        try {
            dispatch(
                setAlertApp({
                    type: 'info',
                    message: 'Enviando email...',
                    open: true,
                }),
            );
            dispatch(setloading(true));
            const response = await api.doPost('authentications/recovery-pass', { email });

            dispatch(setloading(false));
            dispatch(
                setAlertApp({
                    type: 'success',
                    message: 'Email enviado com sucesso!',
                    open: true,
                }),
            );
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                dispatch(setloading(false));
                dispatch(
                    setAlertApp({
                        type: 'error',
                        message: error.message,
                        open: true,
                    }),
                );
            }
            dispatch(setloading(false));
            console.error(error);
        }
    },
);

export default sendEmailForRecoveryPass;
