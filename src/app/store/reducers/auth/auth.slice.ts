import { createSlice } from '@reduxjs/toolkit';
import twoFactorRequest from './thunks/twoFactor.thunk';

import signin from '@/app/store/reducers/auth/thunks/signin.thunk';
import { TUser } from '../user/user.slice';

export type TAuth = {
    usuario: TUser;
    token: string | null;
    twoFactorCode: string | number | null;
    secaoAtiva: boolean;
};

const initialState: TAuth = {
    usuario: {
        id: null,
        avatar_url: null,
        avatar: null,
        nome: null,
        email: null,
        telefone: null,
        nivel: null,
        corpId: null,
    },
    token: null,
    twoFactorCode: null,
    secaoAtiva: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAuthState: () => {
            return initialState;
        },
        setUser: (state, action) => {
            const payload = action.payload;
            // Atualiza somente os campos que foram modificados no payload
            Object.keys(payload).forEach((key) => {
                if (key !== 'senha') {
                    state.usuario[key as keyof TUser] = payload[key];
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(twoFactorRequest.fulfilled, (state, action) => {
            state.twoFactorCode = action.payload;
        });

        builder.addCase(signin.fulfilled, (state, action) => {
            state.secaoAtiva = true;
            console.log(action.payload);
            state.usuario = action.payload?.usuario;
            state.token = action.payload?.token ?? null;
        });
    },
});

export const { clearAuthState, setUser } = authSlice.actions;
export default authSlice.reducer;
