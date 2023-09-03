import * as React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import RegisterScreen from '../screens/auth/register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmailVerificationScreen from '../screens/auth/email_verification';
import LoginScreen from '../screens/auth/login';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import TabNavigation from './tab_navigation';
import ForgetPasswordScreen from '../screens/auth/forget_password';
import ResetPasswordScreen from '../screens/auth/reset_password';

type ScreenNavigationProp<
  T extends keyof RootStackParamList
> = StackNavigationProp<RootStackParamList, T>;

type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

type RootProps<T extends keyof RootStackParamList> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  EmailVerification: undefined;
  ForgetPassword: undefined;
  ResetPassword: undefined;
  HomeBottomBarNavigation: undefined;
};

export type {RootProps, RootStackParamList};
  
  const Stack = createNativeStackNavigator<RootStackParamList>();
  
  const StackNavigation = () : JSX.Element  => {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ contentStyle: {backgroundColor: 'white'}, headerShown: false}} initialRouteName='Login'>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Register" component={RegisterScreen}/>
          <Stack.Screen name="EmailVerification" component={EmailVerificationScreen}/>
          <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen}/>
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}/>
          <Stack.Screen name="HomeBottomBarNavigation" component={TabNavigation}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

export default StackNavigation;