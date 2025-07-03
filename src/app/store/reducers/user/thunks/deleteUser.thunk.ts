import api from '@/app/api/axios_HTTP';
import { createAsyncThunk } from '@reduxjs/toolkit';

const deleteUser = createAsyncThunk('deleteUser', async (id: string) => {
    const response = await api.doDelete(`/users/${id}`);
    console.log('response', response);
    return response;
});
export default deleteUser;
