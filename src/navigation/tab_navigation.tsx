import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TripStackNavigation } from './stack_navigations/trip_stack_navigation';
import LinearGradient from 'react-native-linear-gradient';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import g_THEME from '../theme/theme';
import { screenHeight, screenWidth } from '../constants/screen_dimension';
import CustomHeader from '../components/molecules/header';

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
        header: ({ navigation }) => {
          const title = getName(route.name);

          return <CustomHeader title={title}>
            {title == 'Note' && 
            <MaterialIcons 
              name="bookmark-border"
              color= {g_THEME.colors.secondary}
              size={30}
            />}
          </CustomHeader>;
        },
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
        tabBarShowIcon: true,
        tabBarLabel: getName(route.name),
        tabBarIcon: ({ color }) => {
          let iconName = getIcon(route.name);
          return (
            <MaterialIcons
              name={iconName}
              color={color}
              size={30}
            />
          );
        },
      })}
      initialRouteName="TripStack"
    >
        <Tab.Screen name="TripStack" component={TripStackNavigation} ></Tab.Screen>
        <Tab.Screen name="NoteStack" component={TripStackNavigation}></Tab.Screen>
        <Tab.Screen name="AddTrip" component={TripStackNavigation}></Tab.Screen>
        <Tab.Screen name="Notification" component={TripStackNavigation}></Tab.Screen>
        <Tab.Screen name="AccountStack" component={TripStackNavigation}></Tab.Screen>
      </Tab.Navigator></LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  Icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontSize: 12,
    color: "#16247d"
  },
});

function getIcon(name: string): string {
  switch (name) {
    case 'TripStack':
      return 'card-travel';
    case 'NoteStack':
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
    case 'NoteStack':
      return 'Note';
    case 'AddTrip':
      return 'Add';
    case 'Notification':
      return 'Notifications';
    case 'AccountStack':
      return 'Account';
    default:
      return '';
  }
}

