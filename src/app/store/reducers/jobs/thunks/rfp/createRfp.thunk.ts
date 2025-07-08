import { createAsyncThunk } from '@reduxjs/toolkit';
import { IRfp } from '../../jobs.slice';
import api from '@/app/api/axios_HTTP';
import { setloading } from '../../../configApp/configApp.slice';

const createRfp = createAsyncThunk('createRfp/POST', async (rfp: Partial<IRfp>, { dispatch }) => {
    dispatch(setloading(true));
    const response = await api.doPost('/request-for-proposal', rfp);
    dispatch(setloading(false));
    return response;
});
export default createRfp;
