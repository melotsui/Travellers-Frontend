import { Action, configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/user_slice';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { RootState } from '../slices/root_reducers';

const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: [thunk],
},);


export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type DispatchThunk = ThunkDispatch<RootState, null, Action<string>>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;