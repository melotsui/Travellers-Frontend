import apis from '../api/api_service';
import { navigate, navigateBack } from '../navigation/navigation_service';
import { getTripsStart, getTripsSuccess, getTripsFailure, deleteTripsStart, deleteTripsFailure, deleteTripsSuccess, getTripFailure, getTripStart, getTripSuccess, updateTripFailure, updateTripStart, updateTripSuccess, addTripsFailure, addTripsStart, addTripsSuccess } from '../slices/trip_slice';
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
        navigateBack();

    } catch (error) {
        dispatch(deleteTripsFailure(error as string));
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
        navigate('TripInvite', { trip_id: response.trip.trip_id });
    } catch (error) {
        dispatch(addTripsFailure(error as string));
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