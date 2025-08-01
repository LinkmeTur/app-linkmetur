import api from '@/app/api/axios_HTTP';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAlertApp, setloading } from '../../../configApp/configApp.slice';
import { IProposal, IService } from '../../jobs.slice';

const createRequest = createAsyncThunk('createRequest/POST', async (id: string, { dispatch }) => {
    dispatch(setloading(true));
    const verifiedProposal: IProposal = await api.doGet(`proposal/${id}`);
    if (!verifiedProposal) {
        dispatch(setloading(false));
        dispatch(setAlertApp({ type: 'error', message: 'Não foi possivel continuar' }));
        throw new Error('Não foi possivel continuar');
    }

    const getjob: (IService & { id: string }) | string = await api.doGet(
        `jobs/${verifiedProposal.rfp.jobID}`,
    );
    if (typeof getjob !== 'object') {
        dispatch(setloading(false));
        dispatch(setAlertApp({ type: 'error', message: 'Não foi possivel continuar' }));
        throw new Error('Não foi possivel continuar');
    }
    const newResquest = {
        jobID: getjob.id,
        nome_job: getjob.nome_servico,
        prestadorID: verifiedProposal.prestadorID,
        corpID: verifiedProposal.rfp.corpID,
        nome_corp: getjob.corp?.razao_social,
        nome_prestador: verifiedProposal.nome_empresa,
        rfpID: verifiedProposal.rfp.id,
        proposalID: verifiedProposal.id,
        prazo: verifiedProposal.prazo,
    };
    const response = await api.doPost('request', newResquest);
    dispatch(setloading(false));
    if (response) {
        dispatch(setAlertApp({ type: 'success', message: 'Solicitação enviada com sucesso' }));
    }
    return response;
});

export default createRequest;
