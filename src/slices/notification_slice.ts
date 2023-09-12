import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './root_reducers';
import Notification from '../models/notification';

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
};

const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    // get Notifications
    getNotificationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getNotificationSuccess: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
      state.loading = false;
      state.error = null;
    },
    getNotificationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    respondNotificationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    respondNotificationSuccess: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
      state.loading = false;
      state.error = null;
    },
    respondNotificationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getNotificationStart,
  getNotificationSuccess,
  getNotificationFailure,

  respondNotificationStart,
  respondNotificationSuccess,
  respondNotificationFailure
} = NotificationSlice.actions;

export const NotificationSelector = (state: RootState) => state.notification;

export default NotificationSlice.reducer;