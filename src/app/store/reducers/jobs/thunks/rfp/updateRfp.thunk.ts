import { createAsyncThunk } from '@reduxjs/toolkit';
import { IRfp } from '../../jobs.slice';
import { setloading } from '../../../configApp/configApp.slice';
import api from '@/app/api/axios_HTTP';

const updateRfp = createAsyncThunk(
    'updateRfp/PATCH',
    async (data: { rfp: Partial<IRfp>; page: number; limit: number }, { dispatch }) => {
        dispatch(setloading(true));
        const { rfp, page, limit } = data;
        const { id, ...rfpUpdate } = rfp;
        const response = await api.doPatch(`/request-for-proposal/${id}`, rfpUpdate, {
            params: { page, limit },
        });
        dispatch(setloading(false));
        return response;
    },
);
export default updateRfp;
