import { combineReducers } from '@reduxjs/toolkit';
import commonAppslice from './configApp/configApp.slice';
import corporationSlice from './corporation/corporation.slice';
import authSlice from './auth/auth.slice';
import userSlice from './user/user.slice';

const rootReducer = combineReducers({
    auth: authSlice,
    commonApp: commonAppslice,
    corporation: corporationSlice,
    user: userSlice,
});

export default rootReducer;
