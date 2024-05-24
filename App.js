import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialCommunityIcons,MaterialIcons, Ionicons } from '@expo/vector-icons';
import WelcomeScreen from './screens/Sign-in/WelcomeScreen';
import SignupScreen from './screens/Sign-in/SignupScreen';
import { db } from './firebase'; // Import db from firebase.js
import LoginScreen from './screens/Sign-in/LoginScreen';
import FetchData from './screens/Announcement/AnnouncementScreen';
import AnnouncementScheduler from './screens/Announcement/Announcement';
import CalendarScreen from './screens//Events/calanderscreen';
import SearchScreen from './screens/Profiles/SearchScreen';
import UserProfile from './screens/Profiles/UserProfile';
import EditProfile from './screens/Profiles/EditProfile';
import Profile from './screens/Profiles/profile';
import Userevents from './screens/Events/Userevents';




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
        
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AnnouncementScheduler" component={AnnouncementScheduler} options={{ headerShown: false }} />
        <Stack.Screen name="FetchData" component={FetchData} options={{ headerShown: true }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="Userevents" component={Userevents} options={{ headerShown: false }} />      

      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainTabScreen() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      
      <Tab.Screen name="CalendarScreen" component={CalendarScreen} options={{ tabBarIcon: ({ focused }) => (
        <Ionicons name="calendar-outline" size={24} color="black" />
        ) }} />
        <Tab.Screen name="SearchScreen" component={SearchScreen} options={{ tabBarIcon: ({ focused }) => (
        <Ionicons name="search-outline" size={24} color="black" />
        ) }} />
        <Tab.Screen name="FetchData" component={FetchData} options={{ tabBarIcon: ({ focused }) => (
          <Ionicons name="notifications-outline" size={24} color="black" />
         ) }} />
      
      <Tab.Screen name="UserProfile" component={UserProfile} options={{ tabBarIcon: ({ focused }) => (
        <Ionicons name="person-outline" size={24} color="black" />
      ) }} />
    </Tab.Navigator>
  );
}

export default App;
