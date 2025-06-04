import api from '@/app/api/axios_HTTP';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchChatHistory = createAsyncThunk(
    'chat/fetchChatHistory',
    async ({ remetenteId, destinatarioId }: { remetenteId: string; destinatarioId: string }) => {
        const response = await api.doPost('/chat/findHistory', { remetenteId, destinatarioId });
        return response.data;
    },
);
export default fetchChatHistory;
