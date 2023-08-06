import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react'
import { HomeScreen, PricesScreen, PortfolioScreen, SettingsScreen, TransactrionScreen } from "./screens";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import TabNavigation  from './navigation/TabNavigation';


export default function App() {
  return (
    <NavigationContainer>
      <TabNavigation></TabNavigation>
    </NavigationContainer>

  );
}
