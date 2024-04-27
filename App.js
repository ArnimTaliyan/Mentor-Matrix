import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialCommunityIcons,MaterialIcons, Ionicons } from '@expo/vector-icons';
import HomeScreen, { Scheduler } from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SettingScreen from './screens/SettingScreen'; // Correct import
import SignupScreen from './screens/SignupScreen';
import { db } from './firebase'; // Import db from firebase.js
import LoginScreen from './screens/LoginScreen';
import Timetable from './screens/Timetable';
import Announcement from './screens/Announcement';
import SOCS from './screens/SOCS';
import AnnouncementScreen from './screens/AnnouncementScreen';
import FetchData from './screens/AnnouncementScreen';
import AnnouncementScheduler from './screens/Announcement';

import Amar_jindal from './screens/amar_jindal';
import Alok_negi from './screens/alok_negi';
import Amrendra_tripathi from './screens/amrendra_tripathi';
import Atul_rawat from './screens/atul_rawat';
import Hitesh from './screens/hitesh';
import Milly_singh from './screens/milly_singh';
import Monika_yadav from './screens/monika_yadav';
import Ranjan_mishra from './screens/ranjan_mishra';
import Sonal_singh from './screens/sonal_singh';


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
        <Stack.Screen name="Scheduler" component={Scheduler} options={{ headerShown: true }} />
        <Stack.Screen name="AnnouncementScheduler" component={AnnouncementScheduler} options={{ headerShown: true }} />
        <Stack.Screen name="FetchData" component={FetchData} options={{ headerShown: true }} />


        {/*profilescreens */}
        <Stack.Screen name="amar_jindal" component={Amar_jindal} options={{ headerShown: false }} />
        <Stack.Screen name="alok_negi" component={Alok_negi} options={{ headerShown: false }} />
        <Stack.Screen name="amrendra_tripathi" component={Amrendra_tripathi} options={{ headerShown: false }} />
        <Stack.Screen name="atul_rawat" component={Atul_rawat} options={{ headerShown: false }} />
        <Stack.Screen name="hitesh" component={Hitesh} options={{ headerShown: false }} />
        <Stack.Screen name="milly_singh" component={Milly_singh} options={{ headerShown: false }} />
        <Stack.Screen name="monika_yadav" component={Monika_yadav} options={{ headerShown: false }} />
        <Stack.Screen name="ranjan_mishra" component={Ranjan_mishra} options={{ headerShown: false }} />
        <Stack.Screen name="sonal_singh" component={Sonal_singh} options={{ headerShown: false }} />
        
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
        <Tab.Screen name="FetchData" component={FetchData} options={{ tabBarIcon: ({ focused }) => (
          <Ionicons name="notifications-outline" size={35} color="black" />
         ) }} />
      <Tab.Screen name="Settings" component={SettingScreen} options={{ tabBarIcon: ({ focused }) => (
        <Ionicons name="settings-outline" size={24} color="black" />
      ) }} />
    </Tab.Navigator>
  );
}

export default App;
