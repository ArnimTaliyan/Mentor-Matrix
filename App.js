import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import HomeScreen, { Scheduler } from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SettingScreen from './screens/SettingScreen'; // Correct import
import SignupScreen from './screens/SignupScreen';
import { db } from './firebase'; // Import db from firebase.js
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import Timetable from './screens/Timetable';
import Announcement from './screens/Announcement';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
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
    background: "#fff"
  }
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Adjusted screen structure based on user authentication */}
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Timetable" component={Timetable} options={{ headerShown: true }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Scheduler" component={Scheduler} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainTabScreen() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ focused }) => (
        <AntDesign name="home" size={24} color="black" />
      ) }} />
      <Tab.Screen name="Scheduler" component={Scheduler} options={{ tabBarIcon: ({ focused }) => (
        <MaterialCommunityIcons name="timetable" size={24} color="black" />
      ) }} />
      <Tab.Screen name="TimeTable" component={Timetable} options={{ tabBarIcon: ({ focused }) => (
        <Ionicons name="calendar-outline" size={24} color="black" />
        ) }} />
        <Tab.Screen name="Announcement" component={Announcement} options={{ tabBarIcon: ({ focused }) => (
          <Ionicons name="megaphone-outline" size={24} color="black" />
         ) }} />
      <Tab.Screen name="Settings" component={SettingScreen} options={{ tabBarIcon: ({ focused }) => (
        <Ionicons name="settings-outline" size={24} color="black" />
      ) }} />
    </Tab.Navigator>
  );
}

export default App;
