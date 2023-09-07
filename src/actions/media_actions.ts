import apis from '../api/api_service';
import { getMediaStart, getMediaSuccess, getMediaFailure } from '../slices/media_slice';
import { AppThunk } from '../store/store';

export const fetchMedia = ( schedule_id: number ): AppThunk => async (dispatch) => {
    try {
        dispatch(getMediaStart());

        const response = await apis.media.getScheduleMedia(schedule_id);
        dispatch(getMediaSuccess(response));

    } catch (error) {
        dispatch(getMediaFailure(error as string));
    }
};