/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import createJob from './thunks/createdJob.thunk';
export interface IService {
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
        photo_URL: string;
        photo_alt: string;
    }[];
}
export type TJobState = {
    serviceList: Array<IService>;
    registerService: IService | null;
    rfpList: Array<any>;
    proposalList: Array<any>;
};

const initialState: TJobState = {
    serviceList: [],
    registerService: null,
    rfpList: [],
    proposalList: [],
};

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        cleanStatejobs: () => {
            return initialState;
        },
        setJobs: (state, action) => {
            return action.payload;
        },
        setRegisterService: (state, action) => {
            state.registerService = { ...state.registerService, ...action.payload };
        },
        clearResgisterService: (state) => {
            state.registerService = null;
        },
    },
    extraReducers(builder) {
        builder.addCase(createJob.fulfilled, (state, action) => {
            state.serviceList.push(action.payload);
            state.registerService = null;
        });
    },
});

export const { setJobs, cleanStatejobs, setRegisterService, clearResgisterService } =
    jobsSlice.actions;
export default jobsSlice.reducer;
