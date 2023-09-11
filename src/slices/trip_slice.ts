import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './root_reducers';
import { Trip } from '../models/trip';
import { TripPartner } from '../models/trip_partner';
import { TripPartnerInvitation } from '../models/trip_partner_invitation';
import { TripInvitation } from '../models/trip_invitation';
import { PaginationResponse } from '../models/paging';

interface TripState {
  trips: Trip[];
  trip: Trip | null;
  tripPartners: TripPartner[];
  tripInvitations: TripInvitation[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: TripState = {
  trips: [],
  trip: null,
  tripPartners: [],
  tripInvitations: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    // get trips
    getTripsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTripsSuccess: (state, action: PayloadAction<Trip[]>) => {
      state.trips = action.payload;
      state.loading = false;
      state.error = null;
    },
    getTripsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // clear trips
    clearTrips: (state) => {
      state.trips = [];
      state.currentPage = 1;
      state.totalPages = 1;
    },

    // search trips
    searchTripsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    searchTripsSuccess: (state, action: PayloadAction<PaginationResponse<Trip>>) => {
      state.trips.push(...action.payload.data);
      state.currentPage = action.payload.current_page;
      state.totalPages = action.payload.total_page;
      state.loading = false;
      state.error = null;
    },
    searchTripsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // add trip 
    addTripsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addTripsSuccess: (state, action: PayloadAction<Trip>) => {
      state.trips.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    addTripsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // delete trip
    deleteTripsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTripsSuccess: (state, action: PayloadAction<Trip>) => {
      state.trips = state.trips.filter((trip) => trip.trip_id !== action.payload.trip_id);
      state.loading = false;
      state.error = null;
    },
    deleteTripsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // leave trip
    leaveTripsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    leaveTripsSuccess: (state, action: PayloadAction<TripPartner>) => {
      state.tripPartners = state.tripPartners.filter((tripPartner) => tripPartner.user_id !== action.payload.user_id);
      state.trips = state.trips.filter((trip) => trip.trip_id !== action.payload.trip_id);
      state.loading = false;
      state.error = null;
    },
    leaveTripsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // get trip
    getTripStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTripSuccess: (state, action: PayloadAction<Trip>) => {
      state.trip = action.payload;
      state.loading = false;
      state.error = null;
    },
    getTripFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // update trip & trips
    updateTripStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTripSuccess: (state, action: PayloadAction<Trip>) => {
      const index = state.trips.findIndex((trip) => trip.trip_id === action.payload.trip_id);
      if (index !== -1) {
        state.trips[index] = action.payload;
      }
      state.trip = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateTripFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // get trip partner & invitation
    getTripPartnerInvitationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTripPartnerInvitationSuccess: (state, action: PayloadAction<TripPartnerInvitation>) => {
      state.tripPartners = action.payload.trip_partners;
      state.tripInvitations = action.payload.trip_invitations;
      state.loading = false;
      state.error = null;
    },
    getTripPartnerInvitationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // add trip partner
    addTripPartnerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addTripPartnerSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    addTripPartnerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    //delete trip partner
    deleteTripPartnerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTripPartnerSuccess: (state, action: PayloadAction<TripPartner>) => {
      state.tripPartners = state.tripPartners.filter((tripPartner) => tripPartner.user_id !== action.payload.user_id);
      state.loading = false;
      state.error = null;
    },
    deleteTripPartnerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // add trip invitation
    addTripInvitationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addTripInvitationSuccess: (state, action: PayloadAction<TripInvitation>) => {
      state.tripInvitations.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    addTripInvitationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // delete trip invitation
    deleteTripInvitationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTripInvitationSuccess: (state, action: PayloadAction<TripInvitation>) => {
      state.tripInvitations = state.tripInvitations.filter((tripInvitation) => tripInvitation.trip_id !== action.payload.trip_id);
      state.loading = false;
      state.error = null;
    },
    deleteTripInvitationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },


  },
});

export const {
  getTripsStart,
  getTripsSuccess,
  getTripsFailure,
  clearTrips,
  searchTripsStart,
  searchTripsSuccess,
  searchTripsFailure,
  addTripsStart,
  addTripsSuccess,
  addTripsFailure,
  deleteTripsStart,
  deleteTripsSuccess,
  deleteTripsFailure,
  leaveTripsStart,
  leaveTripsSuccess,
  leaveTripsFailure,

  getTripStart,
  getTripSuccess,
  getTripFailure,

  updateTripStart,
  updateTripSuccess,
  updateTripFailure,

  getTripPartnerInvitationStart,
  getTripPartnerInvitationSuccess,
  getTripPartnerInvitationFailure,

  addTripPartnerStart,
  addTripPartnerSuccess,
  addTripPartnerFailure,
  deleteTripPartnerStart,
  deleteTripPartnerSuccess,
  deleteTripPartnerFailure,

  addTripInvitationStart,
  addTripInvitationSuccess,
  addTripInvitationFailure,
  deleteTripInvitationStart,
  deleteTripInvitationSuccess,
  deleteTripInvitationFailure,

} = tripSlice.actions;

export const tripSelector = (state: RootState) => state.trip;

export default tripSlice.reducer;