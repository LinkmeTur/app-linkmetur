import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAlertApp, setloading } from '../../configApp/configApp.slice';
import api from '@/app/api/axios_HTTP';
import { AxiosError } from 'axios';

const resetPassword = createAsyncThunk(
    'resetPassword/post',
    async (data: { id: string; senha: string }, { dispatch }) => {
        try {
            dispatch(setloading(true));
            const { id, senha } = data;
            const response = await api.doPatch(`users/${id}`, { senha });

            dispatch(setloading(false));
            dispatch(
                setAlertApp({
                    type: 'success',
                    message: 'Senha alterada com sucesso!',
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
            dispatch(
                setAlertApp({
                    type: 'error',
                    message: 'Erro ao alterar senha!',
                    open: true,
                }),
            );
            console.error(error);
        }
    },
);
export default resetPassword;
