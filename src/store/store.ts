import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../reducers/profile_reducer';

const store = configureStore({
    reducer: {
        profile: profileReducer,
    },
});

export default store;