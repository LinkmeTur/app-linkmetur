import api from '@/app/api/axios_HTTP';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setloading } from '../../configApp/configApp.slice';

const getAllCorp = createAsyncThunk('getAllCorp', async (type: 'T' | 'P', { dispatch }) => {
    dispatch(setloading(true));
    const response = await api.doGet('/corporations');
    dispatch(setloading(false));
    return response.filter((corp: { tipo: string }) => corp.tipo === type);
});
export default getAllCorp;
