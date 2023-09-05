import { MediaModal } from '../models/media';
import APIs from './api';

class MediaApi {
    private media: APIs;

    constructor(trip: APIs) {
        this.media = trip;
    }

    getScheduleMedia = async ( schedule_id: number ): Promise<MediaModal[]> => {
        return new Promise(async (resolve, reject) => {
            try {

                await this.media.api.get('/media/schedule/1')// + schedule_id)
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
}

export default MediaApi;