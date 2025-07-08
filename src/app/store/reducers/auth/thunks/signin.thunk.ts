import api from '@/app/api/axios_HTTP';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAlertApp, setloading } from '../../configApp/configApp.slice';

const signin = createAsyncThunk(
    'signin/post',
    async (data: { email: string; senha: string }, { dispatch }) => {
        try {
            dispatch(setloading(true));
            const response = await api.doPost('/authentications', data);

            if (!response.usuario && !response.token) {
                throw new Error('Erro ao fazer login');
            }

            const responseCorp = await api.doGet(`/corporations/${response.usuario.corpId}`);
            if (!responseCorp) {
                throw new Error('Erro ao fazer login');
            }
            const auth = {
                usuario: { ...response.usuario, corp: responseCorp },
                token: response.token,
            };
            localStorage.setItem('tipo', response.usuario.corp.tipo);
            dispatch(setloading(false));
            dispatch(
                setAlertApp({
                    type: 'success',
                    message: 'Login realizado com sucesso',
                    show: true,
                }),
            );
            return auth;
        } catch (error) {
            dispatch(setloading(false));
            dispatch(
                setAlertApp({
                    type: 'error',
                    message: 'Email ou senha inválidos',
                    show: true,
                }),
            );
            console.error(error);
        }
    },
);

export default signin;
