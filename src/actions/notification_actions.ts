import apis from '../api/api_service';
import { getNotificationStart, getNotificationSuccess, getNotificationFailure, respondNotificationStart, respondNotificationSuccess, respondNotificationFailure } from '../slices/notification_slice';
import { AppThunk } from '../store/store';

export const fetchNotification = (): AppThunk => async (dispatch) => {
    try {
        dispatch(getNotificationStart());

        const response = await apis.notification.getNotifications();
        dispatch(getNotificationSuccess(response));

    } catch (error) {
        dispatch(getNotificationFailure(error as string));
    }
};

export const respondNotification = (trip_invitation_id: number, reponse: boolean): AppThunk => async (dispatch) => {
    try {
        dispatch(respondNotificationStart());
        await apis.trip.respondTripInvitation(trip_invitation_id, reponse);
        const response = await apis.notification.getNotifications();
        dispatch(respondNotificationSuccess(response));

    } catch (error) {
        dispatch(respondNotificationFailure(error as string));
    }
};
