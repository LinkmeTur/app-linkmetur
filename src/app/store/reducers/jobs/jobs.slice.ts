/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import createJob from './thunks/createdJob.thunk';
import { getJobs, getJobsForCorp } from './thunks/getJobs.thunk';
import { getRfpForCorp, getRfpForFilter } from './thunks/rfp/getRfpforCorp.thunk';
import updateRfp from './thunks/rfp/updateRfp.thunk';
import { getRfpForPretador } from '@/app/store/reducers/jobs/thunks/rfp/getRfpforCorp.thunk';
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
export interface IRfp {
    id?: string;
    corpID: string;
    prestadorID?: string;
    jobID?: string;
    titulo: string;
    descricao: string;
    detalhes: string;
    prazo: Date;
    valor_medio: string;
    tipo: string;
    status?: string;
    fotos?: {
        id?: string;
        photo_URL: string;
        photo_alt: string;
    }[];
    proposal: Array<IProposal>;
}
export interface IProposal {
    id?: string;
    reqId: string;
    corpID: string;
    prestadorID?: string;
    nome_empresa: string;
    resumo_proposta: string;
    valor_proposta: string;
    observações: string;
    prazo: Date;
    status: string;
    fotos?: {
        id?: string;
        photo_URL: string;
        photo_alt: string;
    }[];
    rfp: IRfp;
}
export interface IRequest {
    id?: string;
    jobID: string;
    nome_job: string;
    corpID: string;
    nome_corp: string;
    prestadorID: string;
    nome_prestador: string;
    rfpID: string;
    rfp: IRfp;
    proposalID: string;
    proposal: IProposal;
    prazo: Date;
    status: string;
    confirmOk: boolean;
    payOk: boolean;
}
export type TJobState = {
    serviceList: {
        jobs: Array<IService & { id: string }>;
        totalRecords: number;
        totalPages: number;
    };
    registerService: IService | null;
    rfpList: {
        rfps: Array<IRfp & { id: string }>;
        totalRecords: number;
        totalPages: number;
    };
    rfp: IRfp | null;
    proposalList: {
        proposals: Array<IProposal>;
        totalRecords: number;
        totalPages: number;
    };
    proposal: IProposal | null;
    requestList: {
        requests: Array<IRequest>;
        totalRecords: number;
        totalPages: number;
    };
    request: IRequest | null;
};

const initialState: TJobState = {
    serviceList: { jobs: [], totalRecords: 0, totalPages: 0 },
    registerService: null,
    rfpList: { rfps: [], totalRecords: 0, totalPages: 0 },
    rfp: null,
    proposalList: { proposals: [], totalRecords: 0, totalPages: 0 },
    proposal: null,
    requestList: { requests: [], totalRecords: 0, totalPages: 0 },
    request: null,
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
        builder.addCase(getRfpForCorp.fulfilled, (state, action) => {
            console.log('action.payload', action.payload);
            state.rfpList = action.payload;
        });
        builder.addCase(getRfpForPretador.fulfilled, (state, action) => {
            console.log('action.payload', action.payload);
            state.rfpList = action.payload;
        });
        builder.addCase(getRfpForFilter.fulfilled, (state, action) => {
            console.log('action.payload', action.payload);
            state.rfpList = action.payload;
        });
        builder.addCase(updateRfp.fulfilled, (state, action) => {
            console.log('action.payload', action.payload);
            state.rfpList = action.payload;
        });
    },
});

export const { setJobs, cleanStatejobs, setRegisterService, clearResgisterService } =
    jobsSlice.actions;
export default jobsSlice.reducer;
