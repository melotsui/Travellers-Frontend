import apis from '../api/api_service';
import { getNotificationStart, getNotificationSuccess, getNotificationFailure, respondNotificationStart, respondNotificationSuccess, respondNotificationFailure } from '../slices/notification_slice';
import { AppThunk } from '../store/store';
import { fetchTrips } from './trip_actions';

export const fetchNotification = (): AppThunk => async (dispatch) => {
    try {
        dispatch(getNotificationStart());

        const response = await apis.notification.getNotifications();
        dispatch(getNotificationSuccess(response));

    } catch (error) {
        dispatch(getNotificationFailure(error as string));
    }
};

export const respondNotification = (trip_invitation_id: number, reponse: boolean, notification_id: number): AppThunk => async (dispatch) => {
    try {
        dispatch(respondNotificationStart());
        await apis.trip.respondTripInvitation(trip_invitation_id, reponse, notification_id);
        const response = await apis.notification.getNotifications();
        dispatch(fetchTrips());
        dispatch(respondNotificationSuccess(response));

    } catch (error) {
        dispatch(respondNotificationFailure(error as string));
    }
};
