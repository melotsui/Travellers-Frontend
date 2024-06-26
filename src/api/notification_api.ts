import Notification from '../models/notification';
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

    getNotifications = async (): Promise<Notification[]> => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.notification.api.get('/notifications')
                    .then((response) => {
                        const result = response.data;
                        const notification = result.data.notifications;
                        const notifications: Notification[] = notification.map((notification: any) => {
                            return new Notification(
                                notification.notification_id,
                                notification.user_id,
                                notification.notification_type,
                                notification.parameters,
                                notification.is_responded,
                                notification.created_by,
                                notification.created_at,
                                notification.updated_at,
                                notification.is_read,
                                notification.deleted_at,
                                notification.notification_title,
                                notification.notification_body
                            );
                        });
                        resolve(notifications);
                    })
                    .catch((error) => {
                        console.log("here");
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