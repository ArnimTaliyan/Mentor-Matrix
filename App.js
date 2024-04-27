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
import Profile from './screens/amar_jindal';
import Profile1 from './screens/amar_jindal';
import Profile2 from './screens/amrendra_tripathi';
import Profile3 from './screens/milly_singh';
import Profile4 from './screens/monika_yadav';
import Profile5 from './screens/ranjan_mishra';
import Profile6 from './screens/atul_rawat';
import Profile7 from './screens/sonal_singh';
import Profile8 from './screens/alok_negi';
import Profile9 from './screens/hitesh';

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
        <Stack.Screen name="Profile6" component={Profile6} options={{ headerShown: false }} />
        <Stack.Screen name="Profile9" component={Profile9} options={{ headerShown: false }} />
        <Stack.Screen name="Profile8" component={Profile8} options={{ headerShown: false }} />
        <Stack.Screen name="Profile7" component={Profile7} options={{ headerShown: false }} />
        <Stack.Screen name="Profile5" component={Profile5} options={{ headerShown: false }} />
        <Stack.Screen name="Profile4" component={Profile4} options={{ headerShown: false }} />
        <Stack.Screen name="Profile3" component={Profile3} options={{ headerShown: false }} />
        <Stack.Screen name="Profile2" component={Profile2} options={{ headerShown: false }} />
        <Stack.Screen name="Profile1" component={Profile1} options={{ headerShown: false }} />
        
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
