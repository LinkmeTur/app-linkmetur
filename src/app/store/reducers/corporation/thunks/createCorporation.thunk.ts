import { createAsyncThunk } from '@reduxjs/toolkit';
import { TCorporation } from '../corporation.slice';
import api from '@/app/api/axios_HTTP';

import { setUserState, TUserPass } from '../../user/user.slice';

const createCorporation = createAsyncThunk(
    'createCorporation/post',
    async (data: { corp: Partial<TCorporation>; user: Partial<TUserPass> }, { dispatch }) => {
        try {
            const { corp, user } = data;
            const response = await api.doPost('/corporations', corp);
            console.log('corp', response);
            if (response) {
                const newUser = {
                    avatar_url: user.avatar_url,
                    avatar: user.avatar,
                    nome: user.nome,
                    email: user.email,
                    senha: user.senha,
                    telefone: user.telefone,
                    nivel: user.nivel,
                    corpId: response.id,
                };
                const userResponse = await api.doPost('/users', newUser);
                dispatch(setUserState(userResponse));
            }
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    },
);

export default createCorporation;
