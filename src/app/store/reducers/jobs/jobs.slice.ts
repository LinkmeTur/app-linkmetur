/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
interface IService {
    nome_servico: string;
    categoria: string;
    sub_categoria: string;
    descricao: string;
    min_valor: number;
    max_valor: number;
    video_url: string;
    certificacoes: string;
    disponibilidade: string;
    publicado: boolean;
    photos: {
        job_ID: string;
        photo: Buffer;
        photo_URL: string;
        photo_alt: string;
    }[];
}
export type TJobState = {
    serviceList: Array<IService>;
    rfpList: Array<any>;
    proposalList: Array<any>;
};

const initialState: TJobState = {
    serviceList: [],
    rfpList: [],
    proposalList: [],
};

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setJobs: (state, action) => {
            return action.payload;
        },
    },
});

export const { setJobs } = jobsSlice.actions;
export default jobsSlice.reducer;
