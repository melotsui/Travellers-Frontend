import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TripStackNavigation } from './stack_navigations/trip_stack_navigation';
import LinearGradient from 'react-native-linear-gradient';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import g_THEME from '../theme/theme';
import { screenHeight, screenWidth } from '../constants/screen_dimension';
import CustomHeader from '../components/molecules/header';
import { NotesStackNavigation } from './stack_navigations/notes_stack_navigation';
import NotificationsScreen from '../screens/notifications/notifications';
import { AccountStackavigation } from './stack_navigations/account_stack_navigation';
import TripAddScreen from '../screens/trip/trip_add';
import CustomText from '../components/atoms/text';
import g_STYLE from '../styles/styles';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <LinearGradient
      colors={g_THEME.gradient.colors}
      start={{ x: 0, y: 0.92 }}
      end={{ x: 0, y: 1 }}
      locations={g_THEME.gradient.locations}
      style={styles.linearGradient}
    ><Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        cardStyle: { backgroundColor: 'white', opacity: 1},
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          height: screenHeight * 0.08,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#BDBDBD',
        tabBarLabel: ({ focused }) => {
          let color = focused ? 'white' : '#BDBDBD';
          let name = getName(route.name);

          return route.name != 'AddTrip' ? <CustomText color={color} size={14}>{name}</CustomText> : null;
      },
       // tabBarLabel: getName(route.name),
        tabBarIcon: ({ color }) => {
          let iconName = getIcon(route.name);
          if(route.name == "AddTrip")
          return (
        <View style={styles.iconContainer}>
            <MaterialIcons
              name={iconName}
              color={g_THEME.colors.shadowBlue}
              size={70}
              style={styles.icon}
            />
            </View>
          );
          else 
          return (
            <MaterialIcons
              name={iconName}
              color={color}
              size={30}
            />)
        },
      })}
      initialRouteName="TripStack"
    >
        <Tab.Screen name="TripStack" component={TripStackNavigation}></Tab.Screen>
        <Tab.Screen name="NotesStack" component={NotesStackNavigation}></Tab.Screen>
        <Tab.Screen name="AddTrip" component={TripAddScreen}></Tab.Screen>
        <Tab.Screen name="Notification" component={NotificationsScreen}></Tab.Screen>
        <Tab.Screen name="AccountStack" component={AccountStackavigation}></Tab.Screen>
      </Tab.Navigator></LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  iconContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    top: -30,
    width: 70,
    height: 70,
    borderRadius: 80 / 2,
  },
  icon: {
  }
});

function getIcon(name: string): string {
  switch (name) {
    case 'TripStack':
      return 'card-travel';
    case 'NotesStack':
      return 'description';
    case 'AddTrip':
      return 'add-circle';
    case 'Notification':
      return 'notifications';
    case 'AccountStack':
      return 'account-circle';
    default:
      return '';
  }
}

function getName(name: string): string {
  switch (name) {
    case 'TripStack':
      return 'Trip';
    case 'NotesStack':
      return 'Note';
    case 'Notification':
      return 'Notification';
    case 'AccountStack':
      return 'Account';
    default:
      return '';
  }
}

