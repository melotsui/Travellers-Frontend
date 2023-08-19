import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmailVerification from '../screens/auth/email_verification';

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    EmailVerification: undefined;
  };
  
  const Stack = createNativeStackNavigator<RootStackParamList>();
  
  const StackNavigation = () : JSX.Element  => {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ contentStyle: {backgroundColor: 'white'}, headerShown: false}}>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="EmailVerification" component={EmailVerification}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

export default StackNavigation;