import configureStore from '@reduxjs/toolkit'
import rootReducer from './reducers';

// Configure redux store with root reducer and default middleware
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;