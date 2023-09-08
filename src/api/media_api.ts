import { Asset } from 'react-native-image-picker';
import APIs from './api';
import { MediaLocalUrl } from '../models/media_local_url';
import { MediaMediaLocalUrl } from '../models/media_media_local_url';
import { Media } from '../models/media';
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';

class MediaApi {
    private media: APIs;

    constructor(trip: APIs) {
        this.media = trip;
    }

    getScheduleMedia = async (schedule_id: number): Promise<MediaMediaLocalUrl[]> => {
        return new Promise(async (resolve, reject) => {
            try {

                await this.media.api.get('/media/schedule/' + schedule_id)
                    .then((response) => {
                        const result = response.data;
                        if (result.data.length === 0) {
                            resolve([]);
                        }
                        const mediaList: MediaMediaLocalUrl[] = result.data.map((media: MediaMediaLocalUrl) => { return new MediaMediaLocalUrl(media.media, media.media_local_url ?? null); });
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

    downloadScheduleMedia = async (media_id: number): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.media.api.get('/media/' + media_id, {
                    responseType: 'arraybuffer',  // important for binary data
                    headers: {
                        'Accept': 'application/octet-stream'
                    }
                })
                    .then((response) => {
                        const fileName = response.headers["content-disposition"].split("filename=")[1];
                        
                        // Convert binary data to base64
                        const base64 = Buffer.from(response.data, 'binary').toString('base64');

                        // Define a file path to save on the device
                        const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

                        // Write the file
                        RNFS.writeFile(path, base64, 'base64').then(() => {
                            resolve("file:///" + path)
                        });


                    })
                    .catch((error) => {
                        console.log("uploadScheduleMedia error ", error);
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                console.log("uploadScheduleMedia error ", error);
                reject(error);
            }
        });
    }

    uploadScheduleMedia = async (media: Asset, schedule_id: number): Promise<Media> => {
        return new Promise(async (resolve, reject) => {
            try {
                const formData = new FormData();
                formData.append('media', {
                    uri: media.uri,
                    type: media.type,
                    name: media.fileName,
                }
                );
                formData.append('schedule_id', schedule_id);

                await this.media.api.post('/media/schedule', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                    .then((response) => {
                        const result = response.data;
                        const media: Media = result.data.media;
                        resolve(media);
                    })
                    .catch((error) => {
                        console.log("uploadScheduleMedia error ", error);
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                console.log("uploadScheduleMedia error ", error);
                reject(error);
            }
        });
    }

    deleteScheduleMedia = async (media_id: number): Promise<Media> => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.media.api.delete('/media/' + media_id )
                    .then((response) => {
                        const result = response.data;
                        const media: Media = result.data.media;
                        resolve(media);
                    })
                    .catch((error) => {
                        console.log("uploadScheduleMedia error ", error);
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                console.log("uploadScheduleMedia error ", error);
                reject(error);
            }
        });
    }

    addLocalMedia = async (media_id: number, media_local_url: string): Promise<MediaLocalUrl> => {
        return new Promise(async (resolve, reject) => {
            try {
                const json = {
                    "media_id": media_id,
                    "media_local_url": media_local_url,
                }

                await this.media.api.post('/media_local_url', json)
                    .then((response) => {
                        const result = response.data;
                        const localUrl: MediaLocalUrl = result.data.media_local_url;
                        resolve(localUrl);
                    })
                    .catch((error) => {
                        console.log("addLocalMedia error ", error);
                        const result = error.response.data;
                        reject(result.message);
                    });
            } catch (error) {
                console.log("addLocalMedia error ", error);
                reject(error);
            }
        });
    }
}

export default MediaApi;