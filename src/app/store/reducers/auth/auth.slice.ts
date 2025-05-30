import { createSlice } from '@reduxjs/toolkit';
import twoFactorRequest from './thunks/twoFactor.thunk';

export type TAuth = {
    usuario: string | null;
    token: string | null;
    twoFactorCode: string | number | null;
    secaoAtiva: boolean;
};

const initialState: TAuth = {
    usuario: null,
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
    },
    extraReducers: (builder) => {
        builder.addCase(twoFactorRequest.fulfilled, (state, action) => {
            state.twoFactorCode = action.payload;
        });
    },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
