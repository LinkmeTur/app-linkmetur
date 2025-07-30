import { createAsyncThunk } from '@reduxjs/toolkit';
import { setloading } from '../../../configApp/configApp.slice';
import api from '@/app/api/axios_HTTP';
import { IProposal } from '../../jobs.slice';

const updateProposal = createAsyncThunk(
    'updateProposal/PUT',
    async (proposal: Partial<IProposal>, { dispatch }) => {
        dispatch(setloading(true));
        const response = await api.doPatch('/proposal', proposal);
        dispatch(setloading(false));
        return response;
    },
);

export default updateProposal;
