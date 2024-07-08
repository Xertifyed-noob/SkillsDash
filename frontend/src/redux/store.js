import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

// Configure redux store with root reducer and default middleware
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: true, // Ensure immutable state updates
        }).concat(reduxImmutableStateInvariant()), // Catch state mutations
});

export default store;