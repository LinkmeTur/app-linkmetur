import api from '@/app/api/axios_HTTP';
import { createAsyncThunk } from '@reduxjs/toolkit';
import consultCep from './consultCep.thunk';
import { setCorporation } from '../corporation.slice';
import { setAlertApp, setloading } from '../../configApp/configApp.slice';

const consultCNPJ = createAsyncThunk('cnpj/consult', async (cnpj: string, { dispatch }) => {
    try {
        dispatch(setloading(true));
        const response = await api.doGet(`/corporations/consulta-cnpj/${cnpj}`);
        if (!response.estabelecimento.cnpj) {
            throw new Error('Erro ao consultar CNPJ');
        }
        const verifiedCorp = {
            cnpj: response.estabelecimento.cnpj,
            razao_social: response.razao_social,
            nome_fantasia: response.estabelecimento.nome_fantasia,
            natureza_juridica: response.natureza_juridica.descricao,
            situacao_cadastral: response.estabelecimento.situacao_cadastral,
            data_situacao_cadastral: response.estabelecimento.data_situacao_cadastral,
            data_inicio_atividade: response.estabelecimento.data_inicio_atividade,
            cnae_fiscal_principal: response.estabelecimento.atividade_principal.descricao,
            telefone: response.estabelecimento.ddd1 + response.estabelecimento.telefone1,
            email: response.estabelecimento.email,
            pais: response.estabelecimento.pais.nome,
        };

        const { payload } = await dispatch(consultCep(response.estabelecimento.cep));

        dispatch(setCorporation({ ...verifiedCorp, ...(payload as object) }));
        dispatch(setloading(false));
        return { status: 200 };
    } catch (error) {
        dispatch(setloading(false));
        dispatch(
            setAlertApp({
                type: 'error',
                message: 'Erro ao consultar CNPJ, inválido ou inexistente',
                show: true,
            }),
        );
        if (error instanceof Error) {
            alert(error);
            return { status: 400, message: error.message };
        }
    }
});

export default consultCNPJ;
