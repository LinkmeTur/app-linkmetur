import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers/combineReducer';
import storage from '../config/storage';

const persistConfig = {
    key: 'root',
    storage,
};

const pesistedReducer = persistReducer(persistConfig, rootReducer);

const outMiddleware = () => {
    if (process.env.NODE_ENV === 'development') {
        return [thunk, logger];
    }
    return [thunk];
};

const store = () => {
    return configureStore({
        reducer: pesistedReducer,
        middleware: (getDefaultMiddleware) => {
            const defaultMiddleware = getDefaultMiddleware({
                serializableCheck: false,
            });

            const customMiddleware = outMiddleware().filter(
                (mw) => mw !== thunk, // Evita adicionar `thunk` duas vezes
            );

            return defaultMiddleware.concat(...customMiddleware);
        },
    });
};
const useStore = store();
const persistor = persistStore(useStore);

type AppStore = ReturnType<typeof store>;
type RootState = ReturnType<AppStore['getState']>;
type AppDispatch = AppStore['dispatch'];

export { persistor };
export type { AppStore, RootState, AppDispatch };
export default useStore;
