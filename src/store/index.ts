import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './apps/global';
import { api } from './utils/api';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
    reducer: {
        global: globalReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefault) => getDefault().concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
