import PushNotification, { ChannelObject } from 'react-native-push-notification';

class NotificationManager {
  static configure() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log("TOKEN:", token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log("NOTIFICATION:", notification);
        // process the notification
      },
      
      // Should the initial notification be popped automatically
      popInitialNotification: true,

      // Define user interactions in notifications (e.g., buttons)
      requestPermissions: true,
    });
  }

  static createNotificationChannel(channel: ChannelObject) {
    PushNotification.createChannel(channel, (created) => 
      console.log(`createChannel returned '${created}'`)
    );
  }

  static showNotification(channelId: string, title: string, message: string) {
    PushNotification.localNotification({
    channelId: channelId,
      title: title,
      message: message,
      bigText: message,
      subText: title,
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'default',
      // ... other properties
    });
  }
}

export default NotificationManager;
