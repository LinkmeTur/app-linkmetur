import api from '@/app/api/axios_HTTP';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAlertApp, setloading } from '../../configApp/configApp.slice';
import { setUser } from '../../auth/auth.slice';

const getOneUser = createAsyncThunk('getOneUser/GET', async (id: string, { dispatch }) => {
    dispatch(setloading(true));
    const response = await api.doGet(`/users/${id}`);
    if (response) {
        dispatch(setloading(false));
        dispatch(
            setAlertApp({ type: 'success', message: 'Usuario Criado com sucesso', open: true }),
        );
        dispatch(setUser(response));
    }
    return response;
});
export default getOneUser;
