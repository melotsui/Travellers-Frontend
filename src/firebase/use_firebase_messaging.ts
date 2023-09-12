import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import NotificationManager from '../notifications/notification_manager';
import { navigate } from '../navigation/navigation_service';


const useFirebaseMessaging = () => {

  const getFCMToken = async () => {
    const token: string = await messaging().getToken();
    console.log("FCM Token:", token);
  }

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = 
      authStatus === messaging.AuthorizationStatus.AUTHORIZED || 
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFCMToken();
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    // Foreground
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      navigate('Notification');
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      return NotificationManager.showNotification(
        "channel-id",
        remoteMessage.notification?.title!,
        remoteMessage.notification?.body!
      );
    });

    return unsubscribe;
  }, []);

  return {
    requestUserPermission
  }
};

export default useFirebaseMessaging;
