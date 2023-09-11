import { Asset } from 'react-native-image-picker';
import apis from '../api/api_service';
import { getMediaStart, getMediaSuccess, getMediaFailure, addMediaStart, addMediaFailure, addMediaSuccess, downloadMediaStart, downloadMediaFailure, downloadMediaSuccess, deleteMediaFailure, deleteMediaStart, deleteMediaSuccess } from '../slices/media_slice';
import { AppThunk } from '../store/store';
import { MediaMediaLocalUrl } from '../models/media_media_local_url';
import { navigateBack } from '../navigation/navigation_service';

export const fetchMedia = (schedule_id: number): AppThunk => async (dispatch) => {
    try {
        dispatch(getMediaStart());

        const response = await apis.media.getScheduleMedia(schedule_id);
        dispatch(getMediaSuccess(response));

    } catch (error) {
        dispatch(getMediaFailure(error as string));
    }
};

export const addMedia = (media: Asset, schedule_id: number): AppThunk => async (dispatch) => {
    try {
        dispatch(addMediaStart());

        const rMedia = await apis.media.uploadScheduleMedia(media, schedule_id);
        console.log(rMedia);
        const rMediaLocalUrl = await apis.media.addLocalMedia(rMedia.media_id, media.uri ?? "");
        const response = new MediaMediaLocalUrl(rMedia, rMediaLocalUrl);

        dispatch(addMediaSuccess(response));
        navigateBack();

    } catch (error) {
        dispatch(addMediaFailure(error as string));
    }
};

export const deleteMedia = (media_id: number, isEdit: boolean): AppThunk => async (dispatch) => {
    try {
        dispatch(deleteMediaStart());
        const response = await apis.media.deleteScheduleMedia(media_id);
        dispatch(deleteMediaSuccess(response));
        
        if(!isEdit) navigateBack();

    } catch (error) {
        dispatch(deleteMediaFailure(error as string));
    }
};

export const downloadMedia = (media_id: number): AppThunk => async (dispatch) => {
    try {
        dispatch(downloadMediaStart());

        const response = await apis.media.downloadScheduleMedia(media_id);
        const rMediaLocalUrl = await apis.media.addLocalMedia(media_id, response);

        dispatch(downloadMediaSuccess(rMediaLocalUrl));

    } catch (error) {
        dispatch(downloadMediaFailure(error as string));
    }
};

