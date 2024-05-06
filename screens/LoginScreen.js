import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, get } from 'firebase/database';
import { db } from '../firebase';
import { encode } from 'base-64';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function LoginScreen() {
    const navigation = useNavigation();

    const [values, setValues] = useState({
        email: "",
        pwd: ""
    });

    function handleChange(text, eventName) {
        setValues(prev => ({
            ...prev,
            [eventName]: text
        }));
    }

    function Login() {
        const { email, pwd } = values;
        const encodedEmail = encode(email);
        const userRef = ref(db, `users/${encodedEmail}`);
    
        get(userRef, 'value')
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    console.log("User Data:", userData);
                    if (userData.password === pwd) {
                        navigation.navigate('Main', { screen: 'Home', params: { userName: userData.name,userEmail: email } });
                    } else {
                        alert("Invalid password");
                    }
                } else {
                    alert("User not found");
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }
    
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white', height: '100%', width: '100%' }} behavior='padding'>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <StatusBar style="light" />
                    <Image style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }} source={require('../assets/images/background.png')} />

                    {/* Lights */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', position: 'absolute' }}>
                        <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} style={{ height: 225, width: 90 }} source={require('../assets/images/light.png')} />
                        <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} style={{ height: 160, width: 65 }} source={require('../assets/images/light.png')} />
                    </View>

                    {/* Title and form */}
                    <View style={{ height: '100%', width: '100%', justifyContent: 'space-around', paddingTop: 40, paddingBottom: 10 }}>
                        {/* Title */}
                        <View style={{ alignItems: 'center', marginTop: 110 }}>
                            <Animated.Text entering={FadeInUp.duration(1000).springify()}  style={{ color: 'white', fontWeight: 'bold', fontSize: 40 }}>Login</Animated.Text>
                        </View>

                        {/* Form for login */}
                        <View style={{ marginTop: 40 }}>
                            <Animated.View entering={FadeInDown.duration(1000).springify()} style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: 10, borderRadius: 20, marginBottom: 15 }}>
                                <TextInput placeholder="Email" placeholderTextColor={'gray'} onChangeText={text => handleChange(text, "email")} />
                            </Animated.View>
                            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: 10, borderRadius: 20, marginBottom: 15 }}>
                                <TextInput placeholder="Password" placeholderTextColor={'gray'} onChangeText={text => handleChange(text, "pwd")} secureTextEntry={true} />
                            </Animated.View>
                            <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
                                <TouchableOpacity onPress={Login} style={{ backgroundColor: 'rgb(22, 132, 199)', padding: 15, borderRadius: 30, marginBottom: 15 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Login</Text>
                                </TouchableOpacity>
                            </Animated.View>
                            <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Text>Don't have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
                                    <Text style={{ color: '#4299E1' }}>Signup</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
