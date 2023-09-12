import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user_slice';
import scheduleReducer from './schedule_slice';
import tripReducer from './trip_slice';
import mediaReducer from './media_slice';
import notificationReducer from './notification_slice';

const rootReducer = combineReducers({
  user: userReducer,
  schedule: scheduleReducer,
  trip: tripReducer,
  media: mediaReducer,
  notification: notificationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;