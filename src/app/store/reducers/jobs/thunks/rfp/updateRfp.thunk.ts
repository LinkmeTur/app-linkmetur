import { createAsyncThunk } from '@reduxjs/toolkit';
import { IRfp } from '../../jobs.slice';
import { setloading } from '../../../configApp/configApp.slice';
import api from '@/app/api/axios_HTTP';

const updateRfp = createAsyncThunk('updateRfp/PATCH', async (rfp: Partial<IRfp>, { dispatch }) => {
    dispatch(setloading(true));
    const { id, ...rfpUpdate } = rfp;
    const response = await api.doPatch(`/request-for-proposal/${id}`, rfpUpdate);
    dispatch(setloading(false));
    return response;
});
export default updateRfp;
