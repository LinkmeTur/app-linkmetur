import api from '@/app/api/axios_HTTP';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getOneCorp = createAsyncThunk('getOneCorp/GET', async (id: string) => {
    return await api.doGet(`/corporations/${id}`);
});
export default getOneCorp;
