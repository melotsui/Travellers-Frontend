import APIs from './api';

class MediaApi {
    private media: APIs;

    constructor(trip: APIs) {
        this.media = trip;
    }

    getScheduleMedia = async ( schedule_id: number ): Promise<MediaModal[]> => {
        return new Promise(async (resolve, reject) => {
            try {

                await this.media.api.get('/media/schedule/' + schedule_id)
                    .then((response) => {
                        const result = response.data;
                        resolve(result.data);
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