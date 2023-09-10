import apis from '../api/api_service';
import { navigate, navigateBack, navigateBackTwoPages } from '../navigation/navigation_service';
import { getTripsStart, getTripsSuccess, getTripsFailure, deleteTripsStart, deleteTripsFailure, deleteTripsSuccess, getTripFailure, getTripStart, getTripSuccess, updateTripFailure, updateTripStart, updateTripSuccess, addTripsFailure, addTripsStart, addTripsSuccess, getTripPartnerInvitationSuccess, getTripPartnerInvitationFailure, getTripPartnerInvitationStart, deleteTripPartnerFailure, deleteTripPartnerStart, deleteTripPartnerSuccess, deleteTripInvitationStart, deleteTripInvitationFailure, deleteTripInvitationSuccess, addTripInvitationFailure, addTripInvitationStart, addTripInvitationSuccess, addTripPartnerFailure, addTripPartnerStart, addTripPartnerSuccess, leaveTripsFailure, leaveTripsStart, leaveTripsSuccess } from '../slices/trip_slice';
import { AppThunk } from '../store/store';

export const fetchTrips = (): AppThunk => async (dispatch) => {
    try {
        dispatch(getTripsStart());

        const response = await apis.trip.getTripList();
        dispatch(getTripsSuccess(response));

    } catch (error) {
        dispatch(getTripsFailure(error as string));
    }
};

export const deleteTrip = (trip_id: number): AppThunk => async (dispatch) => {
    try {
        dispatch(deleteTripsStart());

        const response = await apis.trip.deleteTrip(trip_id);
        dispatch(deleteTripsSuccess(response));
        navigateBackTwoPages();

    } catch (error) {
        dispatch(deleteTripsFailure(error as string));
    }
};

export const leaveTrip = (trip_id: number): AppThunk => async (dispatch) => {
    try {
        dispatch(leaveTripsStart());
        const response = await apis.trip.leaveTrip(trip_id);
        dispatch(leaveTripsSuccess(response));
        navigateBack();
    } catch (error) {
        dispatch(leaveTripsFailure(error as string));
    }
};

export const fetchTrip = (trip_id: number): AppThunk => async (dispatch) => {
    try {
        dispatch(getTripStart());

        const response = await apis.trip.getTripById(trip_id);
        dispatch(getTripSuccess(response));

    } catch (error) {
        dispatch(getTripFailure(error as string));
    }
};

export const addTrip = (
    trip_name: string,
    trip_datetime_from?: Date,
    trip_datetime_to?: Date,
    trip_destination?: string,
    trip_description?: string,): AppThunk => async (dispatch) => {
    try {
        dispatch(addTripsStart());
        const response = await apis.trip.createTrip(trip_name, trip_datetime_from, trip_datetime_to, trip_destination, trip_description);
        dispatch(addTripsSuccess(response.trip));
        navigate('TripInvite', { trip_id: response.trip.trip_id, trip_name: response.trip.trip_name });
    } catch (error) {
        dispatch(addTripsFailure(error as string));
    }
}

export const fetchTripPartner = (trip_id: number): AppThunk => async (dispatch) => {
    try {
        dispatch(getTripPartnerInvitationStart());
        const response = await apis.trip.getTripPartners(trip_id);
        dispatch(getTripPartnerInvitationSuccess(response));
    } catch (error) {
        dispatch(getTripPartnerInvitationFailure(error as string));
    }
}

export const deleteTripPartner = (trip_partner_id: number): AppThunk => async (dispatch) => {
    try {
        dispatch(deleteTripPartnerStart());
        const response = await apis.trip.deleteTripPartner(trip_partner_id);
        dispatch(deleteTripPartnerSuccess(response));
    } catch (error) {
        dispatch(deleteTripPartnerFailure(error as string));
    }
}

export const addTripInvitation = (trip_id: number, username: string): AppThunk => async (dispatch) => {
    try {
        dispatch(addTripInvitationStart());
        const response = await apis.trip.sendTripInvitation(trip_id, username);
        dispatch(addTripInvitationSuccess(response));
    } catch (error) {
        dispatch(addTripInvitationFailure(error as string));
    }
}

export const deleteTripInvitation = (trip_invitation_id: number): AppThunk => async (dispatch) => {
    try {
        dispatch(deleteTripInvitationStart());
        const response = await apis.trip.removeTripInvitation(trip_invitation_id);
        dispatch(deleteTripInvitationSuccess(response));
    } catch (error) {
        dispatch(deleteTripInvitationFailure(error as string));
    }
}

export const addTripPartner = (trip_id: number): AppThunk => async (dispatch) => {
    try {
        dispatch(addTripPartnerStart());
        const response = await apis.trip.addTripPartner(trip_id);
        dispatch(addTripPartnerSuccess());
        if(response){
            dispatch(fetchTrips());
        }
    } catch (error) {
        dispatch(addTripPartnerFailure(error as string));
    }
}

export const updateTrip = (
    trip_id: number,
    trip_name: string,
    trip_datetime_from?: Date,
    trip_datetime_to?: Date,
    trip_destination?: string,
    trip_description?: string,): AppThunk => async (dispatch) => {
    try {
        dispatch(updateTripStart());
        const response = await apis.trip.updateTrip(trip_id, trip_name, trip_datetime_from, trip_datetime_to, trip_destination, trip_description);
        dispatch(updateTripSuccess(response));
        navigateBack();
    } catch (error) {
        dispatch(updateTripFailure(error as string));
    }
}