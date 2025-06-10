import { createSlice } from '@reduxjs/toolkit';
import { TCorporation } from '../corporation/corporation.slice';

export type TUser = {
    id: string | null;
    avatar_url: string | null;
    avatar: Buffer | null;
    nome: string | null;
    email: string | null;
    telefone: string | null;
    nivel: number | null;
    corpId: string | null;
    corp?: TCorporation | null;
};

const initialState: TUser = {
    id: null,
    avatar_url: null,
    avatar: null,
    nome: null,
    email: null,
    telefone: null,
    nivel: null,
    corpId: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserState: () => initialState,
        setUserState: (state, action) => {
            const payload = action.payload;
            // Atualiza somente os campos que foram modificados no payload
            Object.keys(payload).forEach((key) => {
                state[key as keyof TUser] = payload[key];
            });
        },
    },
    extraReducers() {},
});
export type TUserPass = TUser & Record<'senha', string>;
export const { clearUserState, setUserState } = userSlice.actions;
export default userSlice.reducer;
