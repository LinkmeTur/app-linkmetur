import { combineReducers } from '@reduxjs/toolkit';
import commonAppslice from './configApp/configApp.slice';
import corporationSlice from './corporation/corporation.slice';
import authSlice from './auth/auth.slice';
import userSlice from './user/user.slice';
import chatSlice from './messages/messages.slice';
import jobsSlice from './jobs/jobs.slice';

const rootReducer = combineReducers({
    auth: authSlice,
    commonApp: commonAppslice,
    corporation: corporationSlice,
    jobs: jobsSlice,
    messages: chatSlice,
    user: userSlice,
});

export default rootReducer;
