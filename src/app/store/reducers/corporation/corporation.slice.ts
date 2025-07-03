import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '../user/user.slice';

type InitialCorporationState = {
    id: string | null;
    logo_url: string | null;
    logo: Buffer | null;
    cnpj: string | null;
    razao_social: string | null;
    natureza_juridica: string | null;
    nome_fantasia: string | null;
    situacao_cadastral: string | null;
    data_situacao_cadastral: string | null;
    data_inicio_atividade: string | null;
    cnae_fiscal_principal: string | null;
    tipo: 'T' | 'P' | null;
    tags: string | null;
    telefone: string | null;
    email: string | null;
    cep: string | null;
    endereco: string | null;
    numero: string | null;
    bairro: string | null;
    cidade: string | null;
    estado: string | null;
    pais: string | null;
    localizacao: string | null;
    profile: {
        id?: string | null;
        corpID?: string;
        Wallpaper_Url?: string;
        site?: string;
        descricao?: string;
        sobre?: string;
        horario?: string;
        certificacoes?: string;
        redesSociais?: string;
    };
    users: TUser[];
};

const initialState: InitialCorporationState = {
    id: null,
    logo_url: null,
    logo: null,
    cnpj: null,
    razao_social: null,
    nome_fantasia: null,
    natureza_juridica: null,
    situacao_cadastral: null,
    data_situacao_cadastral: null,
    data_inicio_atividade: null,
    cnae_fiscal_principal: null,
    tipo: null,
    tags: null,
    telefone: null,
    email: null,
    cep: null,
    endereco: null,
    numero: null,
    bairro: null,
    cidade: null,
    estado: null,
    pais: null,
    localizacao: null,
    profile: {
        corpID: '',
        Wallpaper_Url: '',
        site: '',
        descricao: '',
        sobre: '',
        horario: '',
        certificacoes: '',
        redesSociais: '',
    },
    users: [],
};

const corporationSlice = createSlice({
    name: 'corporation',
    initialState: initialState,
    reducers: {
        clearCorporationState: () => {
            return initialState;
        },
        setCorporation: (state, action) => {
            const payload = action.payload;
            // Atualiza somente os campos que foram modificados no payload
            Object.keys(payload).forEach((key) => {
                state[key as keyof InitialCorporationState] = payload[key];
            });
        },
    },
    extraReducers() {},
});

export type TCorporation = typeof initialState;
export const { clearCorporationState, setCorporation } = corporationSlice.actions;
export default corporationSlice.reducer;
