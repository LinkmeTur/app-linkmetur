/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import createJob from './thunks/createdJob.thunk';
import { getJobs, getJobsForCorp } from './thunks/getJobs.thunk';
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
    evaluations?: {
        user_id: string;
        rating: number;
        comment: string;
    }[];
    corp?: {
        id: string;
        logo_url: string;
        cnpj: string;
        razao_social: string;
        natureza_juridica: string;
        nome_fantasia: string;
        data_inicio_atividade: string;
        cnae_fiscal_principal: string;
        tipo: string;
        tags: string;
        telefone: string;
        email: string;
        cep: string;
        endereco: string;
        numero: string;
        bairro: string;
        cidade: string;
        estado: string;
        pais: string;
        localizacao: string;
    };
}

export type TJobState = {
    serviceList: {
        jobs: Array<IService & { id: string }>;
        totalRecords: number;
        totalPages: number;
    };
    registerService: IService | null;
    rfpList: Array<any>;
    proposalList: Array<any>;
};

const initialState: TJobState = {
    serviceList: { jobs: [], totalRecords: 0, totalPages: 0 },
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
            state.serviceList.jobs.push(action.payload);
            state.registerService = null;
        });
        builder.addCase(getJobs.fulfilled, (state, action) => {
            console.log('action.payload', action.payload);
            state.serviceList = action.payload;
        });
        builder.addCase(getJobsForCorp.fulfilled, (state, action) => {
            console.log('action.payload', action.payload);
            state.serviceList = action.payload;
        });
    },
});

export const { setJobs, cleanStatejobs, setRegisterService, clearResgisterService } =
    jobsSlice.actions;
export default jobsSlice.reducer;
