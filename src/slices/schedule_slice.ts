import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './root_reducers';
import { ScheduleAccess } from '../models/schedule_access';
import { User } from '../models/user';
import { types } from 'web3';

interface ScheduleState {
  schedules: Schedule[];
  schedule: Schedule | null;
  scheduleAccesses: ScheduleAccess[];
  users: User[];
  types: ScheduleType[];
  loading: boolean;
  error: string | null;
}

const initialState: ScheduleState = {
  schedules: [],
  schedule: null,
  scheduleAccesses: [],

  users: [],
  types: [],
  loading: false,
  error: null,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    // get schedules
    getSchedulesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSchedulesSuccess: (state, action: PayloadAction<Schedule[]>) => {
      state.schedules = action.payload;
      state.loading = false;
      state.error = null;
    },
    getSchedulesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // add schedule
    addSchedulesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addSchedulesSuccess: (state, action: PayloadAction<Schedule>) => {
      state.schedules.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    addSchedulesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // get schedule
    getScheduleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getScheduleSuccess: (state, action: PayloadAction<Schedule>) => {
      const data = state.schedules.find((schedule) => schedule.schedule_id === action.payload.schedule_id);
      if (data) {
        state.schedules[state.schedules.indexOf(data)] = action.payload;
      }
      state.schedule = action.payload;
      state.loading = false;
      state.error = null;
    },
    getScheduleFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // delete schedule
    deleteScheduleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteScheduleSuccess: (state, action: PayloadAction<Schedule>) => {
      state.schedules = state.schedules.filter((schedule) => schedule.schedule_id !== action.payload.schedule_id);
      state.schedule = null;
      state.loading = false;
      state.error = null;
    },
    deleteScheduleFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // get schedule accesses
    getScheduleAccessesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getScheduleAccessesSuccess: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    getScheduleAccessesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // add schedule accesses
    updateScheduleAccessesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateScheduleAccessesSuccess: (state, action: PayloadAction<ScheduleAccess[]>) => {
      state.scheduleAccesses = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateScheduleAccessesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    getScheduleTypesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getScheduleTypesSuccess: (state, action: PayloadAction<ScheduleType[]>) => {
      state.types = action.payload;
      state.loading = false;
      state.error = null;
    },
    getScheduleTypesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // update schedule and schedules
    updateScheduleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateScheduleSuccess: (state, action: PayloadAction<Schedule>) => {
      const index = state.schedules.findIndex((schedule) => schedule.schedule_id === action.payload.schedule_id);
      
      console.log("state.schedules ",state.schedules);
      console.log("action.payload ",action.payload);
      if (index !== -1) {
        state.schedules[index] = action.payload;      
        console.log("state.schedules ",state.schedules);
      }
      state.schedule = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateScheduleFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const {
  getSchedulesStart,
  getSchedulesSuccess,
  getSchedulesFailure,
  addSchedulesStart,
  addSchedulesSuccess,
  addSchedulesFailure,

  getScheduleStart,
  getScheduleSuccess,
  getScheduleFailure,
  deleteScheduleStart,
  deleteScheduleSuccess,
  deleteScheduleFailure,

  getScheduleAccessesStart,
  getScheduleAccessesSuccess,
  getScheduleAccessesFailure,
  updateScheduleAccessesStart,
  updateScheduleAccessesSuccess,
  updateScheduleAccessesFailure,

  getScheduleTypesStart,
  getScheduleTypesSuccess,
  getScheduleTypesFailure,

  updateScheduleStart,
  updateScheduleSuccess,
  updateScheduleFailure

} = scheduleSlice.actions;

export const scheduleSelector = (state: RootState) => state.schedule;

export default scheduleSlice.reducer;