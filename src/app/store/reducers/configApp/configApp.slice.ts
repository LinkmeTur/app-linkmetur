import { createSlice } from '@reduxjs/toolkit';

type CommonStateApp = {
    loading: boolean;
    modal: {
        show: boolean;
        tipo: string | null;
        tranferArea: null | Array<unknown>;
    };
    notifications: string;
    alertApp: {
        show: boolean;
        message: string;
        type: 'success' | 'info' | 'warning' | 'error';
    };
};

const initialState: CommonStateApp = {
    loading: false,
    modal: {
        show: false,
        tipo: null,
        tranferArea: null,
    },
    notifications: '',
    alertApp: {
        show: false,
        message: '',
        type: 'success',
    },
};

const commonAppslice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        clearState: () => {
            return initialState;
        },
        setloading: (state, action) => {
            state.loading = action.payload;
        },
        setModal: (state, action) => {
            state.modal = action.payload;
        },
        setNotifications: (state, action) => {
            state.notifications = action.payload;
        },
        setAlertApp: (state, action) => {
            state.alertApp = action.payload;
        },
    },
    extraReducers() {},
});

export const { clearState, setloading, setModal, setNotifications, setAlertApp } =
    commonAppslice.actions;
export default commonAppslice.reducer;
