import * as React from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import RegisterScreen from '../screens/auth/register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmailVerificationScreen from '../screens/auth/email_verification';
import LoginScreen from '../screens/auth/login';
import TabNavigation from './tab_navigation';
import ForgetPasswordScreen from '../screens/auth/forget_password';
import ResetPasswordScreen from '../screens/auth/reset_password';
import { RootStackParamList } from './screen_navigation_props';
import { addDeepLinkListener, getInitialURL } from '../helpers/linking';
import { navigateAndReset, setNavigationRef } from './navigation_service';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { userSelector } from '../slices/user_slice';
import { removeData, retrieveData } from '../utils/local_storage';
import { useEffect, useState } from 'react';
import LoadingScreen from '../screens/loading';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = (): JSX.Element => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchIsLogin = async () => {
      //removeData('isLogin'); // Remove isLogin data to prevent user from being stuck in loading screen
      try {
        const isLoginData = await retrieveData('isLogin');
        setIsLogin(!!isLoginData); // Convert to boolean
      } catch (error) {
        console.error('Error retrieving isLogin data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIsLogin();
  }, []);

  const linking = {
    prefixes: ['http://travellers.com', 'https://travellers.com', 'travellers://'],
  };

  getInitialURL();
  const navigationRef = React.useRef<NavigationContainerRef<RootStackParamList> | null>(null)
  return <NavigationContainer linking={linking} ref={navigationRef} onReady={() => setNavigationRef(navigationRef.current)}>
    {isLoading ?
      <LoadingScreen /> :
      <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: 'white' }, headerShown: false }} initialRouteName={isLogin ? 'HomeBottomBarNavigation' : 'Login'}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ contentStyle: { backgroundColor: 'white' } }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="HomeBottomBarNavigation" component={TabNavigation} />
      </Stack.Navigator>}
  </NavigationContainer>
};

export default StackNavigation;