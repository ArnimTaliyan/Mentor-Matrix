import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialCommunityIcons,MaterialIcons, Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SettingScreen from './screens/SettingScreen'; // Correct import
import SignupScreen from './screens/SignupScreen';
import { db } from './firebase'; // Import db from firebase.js
import LoginScreen from './screens/LoginScreen';
import Timetable from './screens/Timetable';
import FetchData from './screens/AnnouncementScreen';
import AnnouncementScheduler from './screens/Announcement';
import Timetableprofile from './screens/Timetableprofile';
import CalendarScreen from './screens/calanderscreen';







//School of Design
import Milly_singh from './screens/SOD/milly_singh';
import Sonal_singh from './screens/SOD/sonal_singh';

//School of Advanced Engineering
import Monika_yadav from './screens/SOAE/monika_yadav';
import Ranjan_mishra from './screens/SOAE/ranjan_mishra';
import Piyush_kuchhal from './screens/SOAE/piyush_kuchhal';
import Leena_kapoor from './screens/SOAE/leena_kapoor';
import Srinivasa_reddy_devarapu from './screens/SOAE/srinivasa_reddy_devarapu';
import Geetanjali_raghav from './screens/SOAE/geetanjali_raghav';
import Ashish_karn from './screens/SOAE/ashish_karn';
import Madhuben_sharma from './screens/SOAE/madhuben_sharma';
import Abhishek_nandan from './screens/SOAE/abhishek_nandan';



//School of Business
import Alok_negi from './screens/SOB/alok_negi';
import Atul_rawat from './screens/SOB/atul_rawat';
import Rahul_nainwal from './screens/SOB/Rahul_nainwal';
import Niraj_shirish_mankad from './screens/SOB/Niraj_shirish_mankad';
import Anita_sengar from './screens/SOB/Anita_sengar';
import Inder_singh from './screens/SOB/Inder_singh';
import Anil_kumar from './screens/SOB/Anil_kumar';

//School of Computer Science
import Amrendra_tripathi from './screens/SOCS/amrendra_tripathi';
import Hitesh from './screens/SOCS/hitesh';
import Amar_jindal from './screens/SOCS/amar_jindal';
import Ravi_s_iyer from './screens/SOCS/Ravi_s_iyer';
import Aanchal_sharma from './screens/SOB/Aanchal_sharma';
import Deepika_koundal from './screens/SOCS/deepika_koundal';
import Neelu_jyothi_ahuja from './screens/SOCS/neelu_jyothi_ahuja';
import Akashdeep_bhardwaj from './screens/SOCS/akashdeep_bhardwaj';
import Anushree_sah from './screens/SOCS/Anushree_sah';
import Alind from './screens/SOCS/Alind';
import Dhirendra_kumar_sharma from './screens/SOCS/Dhirendra_kumar_sharma';
import SearchScreen from './screens/SearchScreen';
import Profiles from './screens/Profiles';








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
        
        <Stack.Screen name="AnnouncementScheduler" component={AnnouncementScheduler} options={{ headerShown: false }} />
        <Stack.Screen name="FetchData" component={FetchData} options={{ headerShown: true }} />
        <Stack.Screen name="Schedule" component={Timetableprofile} options={{ headerShown: true }} />


        {/*profilescreens */}
        {/*SOAE */}
        <Stack.Screen name="monika_yadav" component={Monika_yadav} options={{ headerShown: false }} />
        <Stack.Screen name="ranjan_mishra" component={Ranjan_mishra} options={{ headerShown: false }} />
        <Stack.Screen name="piyush_kuchhal" component={Piyush_kuchhal} options={{ headerShown: false }} />
        <Stack.Screen name="srinivasa_reddy_devarapu" component={Srinivasa_reddy_devarapu} options={{ headerShown: false }} />
        <Stack.Screen name="leena_kapoor" component={Leena_kapoor} options={{ headerShown: false }} />
        <Stack.Screen name="geetanjali_raghav" component={Geetanjali_raghav} options={{ headerShown: false }} />
        <Stack.Screen name="ashish_karn" component={Ashish_karn} options={{ headerShown: false }} />
        <Stack.Screen name="madhuben_sharma" component={Madhuben_sharma} options={{ headerShown: false }} />
        <Stack.Screen name="abhishek_nandan" component={Abhishek_nandan} options={{ headerShown: false }} />
        



        {/*SOB */}
        <Stack.Screen name="alok_negi" component={Alok_negi} options={{ headerShown: false }} />
        <Stack.Screen name="atul_rawat" component={Atul_rawat} options={{ headerShown: false }} />
        <Stack.Screen name="Rahul_nainwal" component={Rahul_nainwal} options={{ headerShown: false }} />
        <Stack.Screen name="Niraj_shirish_mankad" component={Niraj_shirish_mankad} options={{ headerShown: false }} />
        <Stack.Screen name="Anita_sengar" component={Anita_sengar} options={{ headerShown: false }} />
        <Stack.Screen name="Inder_singh" component={Inder_singh} options={{ headerShown: false }} />
        <Stack.Screen name="Anil_kumar" component={Anil_kumar} options={{ headerShown: false }} />
        <Stack.Screen name="Aanchal_sharma" component={Aanchal_sharma} options={{ headerShown: false }} />




        {/*SOCS */}
        <Stack.Screen name="amar_jindal" component={Amar_jindal} options={{ headerShown: false }} />
        <Stack.Screen name="hitesh" component={Hitesh} options={{ headerShown: false }} />
        <Stack.Screen name="amrendra_tripathi" component={Amrendra_tripathi} options={{ headerShown: false }} />
        <Stack.Screen name="Ravi_s_iyer" component={Ravi_s_iyer} options={{ headerShown: false }} />
        <Stack.Screen name="Deepika_koundal" component={Deepika_koundal} options={{ headerShown: false }} />
        <Stack.Screen name="Neelu_jyothi_ahuja" component={Neelu_jyothi_ahuja} options={{ headerShown: false }} />
        <Stack.Screen name="Akashdeep_bhardwaj" component={Akashdeep_bhardwaj} options={{ headerShown: false }} />
        <Stack.Screen name="Anushree_sah" component={Anushree_sah} options={{ headerShown: false }} />
        <Stack.Screen name="Alind" component={Alind} options={{ headerShown: false }} />
        <Stack.Screen name="Dhirendra_kumar_sharma" component={Dhirendra_kumar_sharma} options={{ headerShown: false }} />
        
        




        {/*SOD */}      
        <Stack.Screen name="milly_singh" component={Milly_singh} options={{ headerShown: false }} />
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
      
      <Tab.Screen name="CalendarScreen" component={CalendarScreen} options={{ tabBarIcon: ({ focused }) => (
        <Ionicons name="calendar-outline" size={24} color="black" />
        ) }} />
        <Tab.Screen name="SearchScreen" component={SearchScreen} options={{ tabBarIcon: ({ focused }) => (
        <Ionicons name="search-outline" size={24} color="black" />
        ) }} />
        <Tab.Screen name="FetchData" component={FetchData} options={{ tabBarIcon: ({ focused }) => (
          <Ionicons name="notifications-outline" size={24} color="black" />
         ) }} />
      <Tab.Screen name="Settings" component={SettingScreen} options={{ tabBarIcon: ({ focused }) => (
        <Ionicons name="settings-outline" size={24} color="black" />
      ) }} />
      <Tab.Screen name="Profiles" component={Profiles} options={{ tabBarIcon: ({ focused }) => (
        <Ionicons name="person-sharp" size={24} color="black" />
      ) }} />
    </Tab.Navigator>
  );
}

export default App;
