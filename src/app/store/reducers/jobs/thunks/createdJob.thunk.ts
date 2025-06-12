import { createAsyncThunk } from '@reduxjs/toolkit';
import { IService } from '../jobs.slice';
import api from '@/app/api/axios_HTTP';
import { setAlertApp, setloading } from '../../configApp/configApp.slice';

const createJob = createAsyncThunk(
    'job/post',
    async (data: { id: string; job: IService }, { dispatch }) => {
        try {
            dispatch(setloading(true));
            const { id, job } = data;
            const body = {
                corpId: id,
                ...job,
                publicado: true,
            };
            const response = await api.doPost('jobs', body);

            dispatch(setloading(false));
            dispatch(
                setAlertApp({
                    type: 'success',
                    message: 'Serviço criado com sucesso!',
                    open: true,
                }),
            );
            return response.data;
        } catch (error) {
            console.log(error);
            dispatch(setloading(false));
            dispatch(
                setAlertApp({
                    type: 'error',
                    message: 'Erro ao criar serviço!',
                    open: true,
                }),
            );
        }
    },
);
export default createJob;
