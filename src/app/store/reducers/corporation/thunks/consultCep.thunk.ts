import api from '@/app/api/axios_HTTP';
import { createAsyncThunk } from '@reduxjs/toolkit';

const consultCep = createAsyncThunk('cep/consult', async (cep: string) => {
    try {
        const response = await api.doGet(`/corporations/consulta-cep/${cep}`);
        return {
            cep: response.cep,
            endereco: response.street,
            numero: '',
            bairro: response.neighborhood,
            cidade: response.city,
            estado: response.state,
            localizacao: response.location.coordinates,
        };
    } catch (error) {
        console.error(error);
    }
});

export default consultCep;
