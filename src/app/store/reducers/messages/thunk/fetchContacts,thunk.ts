import api from '@/app/api/axios_HTTP';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Contact } from '../messages.slice';

const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (corporationID: string) => {
    const response = await api.doGet(`/contacts/${corporationID}`);
    return response.data as Contact[];
});

export default fetchContacts;
