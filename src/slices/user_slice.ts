import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/user';
import { RootState } from './root_reducers';

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // get user
    getUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    getUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // logout user
    logoutUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    logoutUserSuccess: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    logoutUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // update user
    updateUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

  },
});

export const {
  getUserStart,
  getUserSuccess,
  getUserFailure,
  logoutUserStart,
  logoutUserSuccess,
  logoutUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;