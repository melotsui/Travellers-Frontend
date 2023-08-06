import { StyleSheet, View } from 'react-native';
import React from 'react'
import { HomeScreen, PricesScreen, PortfolioScreen, SettingsScreen, TransactrionScreen } from "../screens";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const bottomBarStyles = StyleSheet.create({
    Icon: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    Text: {
      fontSize: 12,
      color: "#16247d"
    }
  });

  
const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 0,
      height: 60,
      bckground: "#fff"
    }
  }
  
export default function TabNavigation() {
    return (<Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={bottomBarStyles.Icon}>
                  <FontAwesome name="home" size={24} color={focused ? "#16247d" : "#111"} />
                </View>
              )
            }
          }}
        />
        <Tab.Screen name="Search" component={PricesScreen} 
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={bottomBarStyles.Icon}>
                  <FontAwesome name="search" size={24} color={focused ? "#16247d" : "#111"} />
                </View>
              )
            }
          }}/>
        <Tab.Screen name="Tran" component={TransactrionScreen} 
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={bottomBarStyles.Icon}>
                  <FontAwesome name="home" size={24} color={focused ? "#16247d" : "#111"} />
                </View>
              )
            }
          }}/>
        <Tab.Screen name="Notification" component={PortfolioScreen} 
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={bottomBarStyles.Icon}>
                  <Ionicons name="notifications-circle-outline" size={24} color={focused ? "#16247d" : "#111"} />
                </View>
              )
            }
          }}/>
        <Tab.Screen name="Profile" component={SettingsScreen} 
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={bottomBarStyles.Icon}>
                  <AntDesign name="profile" size={24} color={focused ? "#16247d" : "#111"} />
                </View>
              )
            }
          }}/>
      </Tab.Navigator>
    );
}