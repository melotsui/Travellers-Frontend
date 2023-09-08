/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import StackNavigation from './src/navigation/stack_navigation';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { BottomSheetProvider } from './src/context/bottom_sheet_context';
import useFirebaseMessaging from './src/firebase/use_firebase_messaging';  
import NotificationManager from './src/notifications/notification_manager';
const App = () => {

  const { requestUserPermission } = useFirebaseMessaging();

  useEffect(() => {
    requestUserPermission(); 
    NotificationManager.configure();
    NotificationManager.createNotificationChannel({
      channelId: "channel-id",
      channelName: "My channel",
      channelDescription: "A channel to categorise your notifications",
      soundName: "default",
      importance: 4,
      vibrate: true,
    });
  }, []);

  return (
    <Provider store={store}>
      <BottomSheetProvider>
        <StackNavigation />
      </BottomSheetProvider>
    </Provider>)
}

export default App;
