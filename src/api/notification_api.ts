import APIs from './api';
import messaging from '@react-native-firebase/messaging';

class NotificationApi {
    private notification: APIs;

    constructor(notification: APIs) {
        this.notification = notification;
    }

    addFCMToken = async (): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                const fcm_token: string = await messaging().getToken();

                const json = {
                    fcm_token: fcm_token
                };

                await this.notification.api.post('/notifications/addFcmToken', json)
                    .then((response) => {
                        const result = response.data;
                        console.log(result.data.fcm_token)
                        resolve(result.data.fcm_token);
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

export default NotificationApi;