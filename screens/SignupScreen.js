import React, { useState } from 'react';
import { View,Image, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database'; // Import Realtime Database module
import { getDatabase, ref, set } from 'firebase/database';
import { encode } from 'base-64';
import { Alert } from 'react-native';



export default function SignupScreen() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showNotification1, setShowNotification1] = useState(false);
    const [notificationMessage1, setNotificationMessage1] = useState('');

    const Notification = ({ message }) => (
        <View style={styles.notification}>
          <Text style={styles.notificationText}>{message}</Text>
        </View>
      );

    const dataAddon = () => {
        // Check if any of the fields are empty
    if (!name || !email || !password) {
        console.log('Fields are empty. Showing notification...');
        setNotificationMessage1('Please fill in all fields');
        setShowNotification1(true);
        setTimeout(() => setShowNotification1(false), 3000);
        return;
    }
        // Encode the email to create a valid database path
        const encodedEmail = encode(email);

        // Set data in the database with the encoded email as part of the path
        set(ref(getDatabase(), `users/${encodedEmail}`), {
            name: name,
            email: email,
            password: password,
        })
        .then(() => {
            setName('');
            setEmail('');
            setPassword('');
            console.log('Data added successfully');
            setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
        })
        .catch((error) => {
            console.error('Error adding data:', error);
        });
    }

    return (
        <ScrollView className="bg-white h-full w-full">
            <StatusBar style="light" />
            <Image className="h-full w-full absolute" source={require('../assets/images/background.png')}/>
            <View className="flex-row justify-around w-full absolute">
                {/*Lights */}
                
                    <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className="h-[205] w-[90]" source={require('../assets/images/light.png')} />
                    <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} className="h-[140] w-[65]" source={require('../assets/images/light.png')} />
                
            </View>
            
            {/* title and form */}
            <View className="h-full  w-full flex justify-around pt-48">
                {/*title*/}
                <View className="flex items-center "style={{marginTop: 50}}>
                    <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white  font-bold tracking-wider text-5xl">Signup</Animated.Text>
                </View>

                {/*form for signup */}
                <View className="flex items-center  mx-4 space-y-4"style={{marginTop: 120}}>
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-5  rounded-2xl w-full">
                        <TextInput placeholder="Name" placeholderTextColor={'gray'} value={name} onChangeText={text => setName(text)} />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-5  rounded-2xl w-full">
                        <TextInput placeholder="Email" placeholderTextColor={'gray'} value={email} onChangeText={text => setEmail(text)}  />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-5  rounded-2xl w-full mb-3">
                        <TextInput placeholder="Password" placeholderTextColor={'gray'} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true}  />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="w-full">
                        <TouchableOpacity onPress={dataAddon} className="w-full bg-sky-400 p-3 rounded-3xl mb-0">
                            <Text className="text-2xl font-blod text-white text-center">SignUp</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="flex-row justify-center">
                        <Text>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.push('LoginScreen')}>
                            <Text className="text-sky-600">Login</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    {showNotification && <Notification message="Account added successfully" />}
                    {showNotification1 && <Notification message={notificationMessage1} />}
                </View>
            </View>
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    notification: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
      alignSelf: 'center',
      position: 'absolute',
      bottom: -50,
      zIndex: 999,
    },
    notificationText: {
      color: 'white',
    },
  });
