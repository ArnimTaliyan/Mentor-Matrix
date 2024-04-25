import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import LoginScreen from './screens/LoginScreen'; 
import HomeScreen, { Scheduler } from './screens/HomeScreen'; 
import WelcomeScreen from './screens/WelcomeScreen';
import ProfileScreen from './screens/ProfileScreen'; 
import SettingScreen from './screens/SettingScreen'; // Correct import
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native-web';
import SignupScreen from './screens/SignupScreen';
import 'firebase/compat/database';
import { getDatabase } from 'firebase/database';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const screenOptions = {
  tabBarShowLabel:false,
  headerShown:false,
  tabBarStyle:{
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
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCwu3H0Xsktux9AQuhrwpx-2u5dZiwA-8k",
    authDomain: "mentor-matrix-4204b.firebaseapp.com",
    databaseURL: "https://mentor-matrix-4204b-default-rtdb.firebaseio.com",
    projectId: "mentor-matrix-4204b",
    storageBucket: "mentor-matrix-4204b.appspot.com",
    messagingSenderId: "1072171754165",
    appId: "1:1072171754165:web:20071f758a1064031294fc"
  };

  // Initialize Firebase
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      setCurrentUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Main" component={MainTabScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Scheduler" component={Scheduler} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Scheduler" component={Scheduler} options={{ headerShown: true }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainTabScreen() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({focused}) => (
        <AntDesign name="home" size={24} color="black" />
      ) }} />
      <Tab.Screen name="TimeTable" component={Scheduler} options={{ tabBarIcon: ({focused}) => (
        <MaterialCommunityIcons name="timetable" size={24} color="black" />
      ) }} />
      <Tab.Screen name="Settings" component={SettingScreen} options={{ tabBarIcon: ({focused}) => (
        <Ionicons name="settings-outline" size={24} color="black" />
      ) }} />
    </Tab.Navigator>
  );
}

export default App;
