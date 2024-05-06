import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { encode } from 'base-64';
import { db } from '../firebase'; // Import db from firebase.js
import { get, ref, set } from 'firebase/database';
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
        const userRef = ref(db, `users/${encodedEmail}`);

        // Fetch the data for the specified email
        get(userRef, 'value')
            .then((snapshot) => {
                if (snapshot.exists()) {
                    // If the snapshot exists, it means the email already exists in the database
                    console.log('Email already exists. Showing notification...');
                    setNotificationMessage1('Email already exists');
                    setShowNotification1(true);
                    setTimeout(() => setShowNotification1(false), 3000);
                } else {
                    // If the snapshot doesn't exist, it means the email is unique, proceed to add data to the database
                    // Set data in the database with the encoded email as part of the path
                    set(ref(db, `users/${encodedEmail}`), {
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
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    return (
        
        <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
            <StatusBar style="light" />
            <Image style={{ flex: 1, width: '100%', height: '100%', position: 'absolute' }} source={require('../assets/images/background.png')} />
             {/* Lights */}
             <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', position: 'absolute' }}>
                <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} style={{ height: 225, width: 90 }} source={require('../assets/images/light.png')} />
                <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} style={{ height: 160, width: 65 }} source={require('../assets/images/light.png')} />
            </View>
            
            {/* title and form */}
            <View style={{ height: '100%', width: '100%', justifyContent: 'space-around', paddingTop: 40, paddingBottom: 10 }}>
                {/*title*/}
                <View style={{ alignItems: 'center', marginTop: 160 }}>
                    <Animated.Text entering={FadeInUp.duration(1000).springify()}  style={{ color: 'white', fontWeight: 'bold', fontSize: 40 }}>Signup</Animated.Text>
                </View>

                {/*form for signup */}
                <View style={{ marginTop: 40 }}>
                    <Animated.View entering={FadeInDown.duration(1000).springify()}  style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: 10, borderRadius: 20, marginBottom: 15 }} >
                        <TextInput placeholder="Name" placeholderTextColor={'gray'} value={name} onChangeText={text => setName(text)} />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.duration(1000).springify()}  style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: 10, borderRadius: 20, marginBottom: 15 }}>
                        <TextInput placeholder="Email" placeholderTextColor={'gray'} value={email} onChangeText={text => setEmail(text)}  />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()}  style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: 10, borderRadius: 20, marginBottom: 15 }}>
                        <TextInput placeholder="Password" placeholderTextColor={'gray'} value={password} onChangeText={text => setPassword(text)} secureTextEntry={true}  />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
                        <TouchableOpacity onPress={dataAddon} style={{  backgroundColor: 'rgb(22, 132, 199)', padding: 15, borderRadius: 30, marginBottom: 15 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>SignUp</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.push('LoginScreen')}>
                            <Text style={{ color: 'rgb(22, 132, 199)' }}>Login</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    {showNotification && <Notification message="Account added successfully" />}
                    {showNotification1 && <Notification message={notificationMessage1} />}
                </View>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    notification: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        position: 'absolute',
        top: -50,
        zIndex: 999,
    },
    notificationText: {
        color: 'white',
    },
});
