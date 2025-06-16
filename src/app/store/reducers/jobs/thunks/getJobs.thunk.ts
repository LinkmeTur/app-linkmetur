import api from '@/app/api/axios_HTTP';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setloading } from '../../configApp/configApp.slice';

const getJobs = createAsyncThunk(
    'getJobs/GET',
    async (
        data: {
            nome_servico?: string;
            categoria?: string;
            localizacao?: string;
            min_valor?: number;
            max_valor?: number;
            min_rating?: number;
            orderBy?: 'relevance' | 'rating' | 'price-asc' | 'price-desc';
            page?: number;
            limit?: number;
        },
        { dispatch },
    ) => {
        try {
            dispatch(setloading(true));
            const {
                page,
                limit,
                nome_servico,
                categoria,
                localizacao,
                max_valor,
                min_rating,
                min_valor,
                orderBy,
            } = data;
            if (page && limit) {
                const response = await api.doGet(`jobs/allJobFilter?page=${page}&limit=${limit}`, {
                    params: {
                        nome_servico,
                        categoria,
                        localizacao,
                        max_valor,
                        min_rating,
                        min_valor,
                        orderBy,
                    },
                });
                dispatch(setloading(false));
                return response;
            }
            const response = await api.doGet(`jobs`);
            dispatch(setloading(false));
            return response;
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setloading(false));
                throw new Error(error.message);
            }
        }
    },
);
const getJobsForCorp = createAsyncThunk(
    'getJobsForCorp/GET',
    async (
        data: {
            corpId: string;
            nome_servico?: string;
            categoria?: string;
            localizacao?: string;
            min_valor?: number;
            max_valor?: number;
            min_rating?: number;
            orderBy?: 'relevance' | 'rating' | 'price-asc' | 'price-desc';
            page?: number;
            limit?: number;
        },
        { dispatch },
    ) => {
        try {
            dispatch(setloading(true));
            const {
                corpId,
                page,
                limit,
                nome_servico,
                categoria,
                localizacao,
                max_valor,
                min_rating,
                min_valor,
                orderBy,
            } = data;
            if (page && limit) {
                const response = await api.doGet(
                    `jobs/corpfilter/${corpId}?page=${page}&limit=${limit}`,
                    {
                        params: {
                            nome_servico,
                            categoria,
                            localizacao,
                            max_valor,
                            min_rating,
                            min_valor,
                            orderBy,
                        },
                    },
                );
                dispatch(setloading(false));
                return response;
            }
            const response = await api.doGet(`jobs/corp/${corpId}`);
            dispatch(setloading(false));
            return response;
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setloading(false));
                throw new Error(error.message);
            }
        }
    },
);

export { getJobs, getJobsForCorp };
