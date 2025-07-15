import { createAsyncThunk } from '@reduxjs/toolkit';
import { IProposal } from '../../jobs.slice';
import api from '@/app/api/axios_HTTP';
import { setloading } from '../../../configApp/configApp.slice';

const createProposal = createAsyncThunk(
    'createProposal/POST',
    async (proposal: Partial<IProposal>, { dispatch }) => {
        dispatch(setloading(true));
        const response = await api.doPost('/proposal', proposal);
        alert(response);
        dispatch(setloading(false));
    },
);

export default createProposal;
