import { Asset } from 'react-native-image-picker';
import { MediaLocalUrl, MediaModal } from '../models/media';
import APIs from './api';

class MediaApi {
    private media: APIs;

    constructor(trip: APIs) {
        this.media = trip;
    }

    getScheduleMedia = async ( schedule_id: number ): Promise<MediaModal[]> => {
        return new Promise(async (resolve, reject) => {
            try {

                await this.media.api.get('/media/schedule/'+ schedule_id)
                    .then((response) => {
                        const result = response.data;
                        const mediaList: MediaModal[] = result.data.map((media: MediaModal) => { return new MediaModal(media.media, media.media_local_url ?? null); });
                        resolve(mediaList);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    uploadScheduleMedia = async ( media: Asset, schedule_id: number ): Promise<Schedule> => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("asset ", media);
                console.log("schedule_id ", schedule_id);
                const formData = new FormData();
                formData.append('media', {
                    uri: media.uri,
                    type: media.type,
                    name: media.fileName,
                } 
                );
                formData.append('schedule_id', schedule_id);

                await this.media.api.post('/media/schedule', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                    .then((response) => {
                        const result = response.data;
                        const schedule: Schedule = result.data;
                        resolve(schedule);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    addLocalMedia = async ( media_id: number, media_local_url: string ): Promise<MediaLocalUrl> => {
        return new Promise(async (resolve, reject) => {
            try {
                const json = {
                    "media_id": media_id,
                    "media_local_url": media_local_url,
                }

                await this.media.api.post('/media_local_url', json)
                    .then((response) => {
                        const result = response.data;
                        const localUrl: MediaLocalUrl = result.data;
                        resolve(localUrl);
                    })
                    .catch((error) => {
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default MediaApi;