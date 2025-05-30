import { createSlice } from '@reduxjs/toolkit';

type CommonStateApp = {
    loading: boolean;
    modal: {
        show: boolean;
        tipo: string | null;
        tranferArea: null | Array<unknown>;
    };
    notifications: string;
};

const initialState: CommonStateApp = {
    loading: false,
    modal: {
        show: false,
        tipo: null,
        tranferArea: null,
    },
    notifications: '',
};

const commonAppslice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        clearState: () => {
            return initialState;
        },
    },
    extraReducers() {},
});

export const { clearState } = commonAppslice.actions;
export default commonAppslice.reducer;
