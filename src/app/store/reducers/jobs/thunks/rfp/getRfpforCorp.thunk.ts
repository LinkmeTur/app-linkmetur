import api from '@/app/api/axios_HTTP';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setloading } from '../../../configApp/configApp.slice';

const getAllRfp = createAsyncThunk('getAllRfp/GET', async () => {
    try {
        const response = await api.doGet(`request-for-proposal`);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
});

const getRfpForCorp = createAsyncThunk(
    'getRfpForCorpAndPrestador/GET',
    async (data: { corpID: string; page: number; limit: number }) => {
        try {
            const { corpID, page, limit } = data;
            const response = await api.doGet(`/request-for-proposal/corporation/${corpID}`, {
                params: { page, limit },
            });
            console.log(response);
            return response;
        } catch (error) {
            console.error(error);
        }
    },
);

const getRfpForFilter = createAsyncThunk(
    'getRfpForFilter/GET',
    async (
        filter: {
            corpID?: string;
            prestadorID?: string;
            status?: string;
            tipo?: string;
            page?: number;
            limit?: number;
        },
        { dispatch },
    ) => {
        try {
            dispatch(setloading(true));
            const response = await api.doGet(`/request-for-proposal`, {
                params: filter,
            });
            console.log(response);
            dispatch(setloading(false));
            return response;
        } catch (error) {
            console.error(error);
            dispatch(setloading(false));
        }
    },
);

const getRfpForPretador = createAsyncThunk(
    'getRfpForPretador/GET',
    async (
        data: { prestadorID: string; page: number; limit: number; all: boolean },
        { dispatch },
    ) => {
        try {
            dispatch(setloading(true));
            const { prestadorID, page, limit, all } = data;
            const response = await api.doGet(`/request-for-proposal/prestador/${prestadorID}`, {
                params: { page, limit, all },
            });

            dispatch(setloading(false));
            return response;
        } catch (error) {
            console.error(error);
            dispatch(setloading(false));
        }
    },
);

export { getRfpForCorp, getRfpForPretador, getAllRfp, getRfpForFilter };
