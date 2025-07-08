import api from '@/app/api/axios_HTTP';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAlertApp, setloading } from '../../../configApp/configApp.slice';

const getRequestforcorpartion = createAsyncThunk(
    'getRequestforcorpartion/GET',
    async (data: { id: string; tipo: 'P' | 'T' | null }, { dispatch }) => {
        try {
            dispatch(setloading(true));
            const { id, tipo } = data;

            const response = await api.doGet(`request/user/${id}`, { params: { tipo } });
            dispatch(setloading(false));
            return response;
        } catch (error) {
            console.log(error);
            dispatch(setloading(false));
            dispatch(
                setAlertApp({
                    type: 'error',
                    message: 'Erro ao buscar serviços!',
                    open: true,
                }),
            );
            console.error(error);
        }
    },
);
export default getRequestforcorpartion;
