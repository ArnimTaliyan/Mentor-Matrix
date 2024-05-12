import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, StatusBar, StyleSheet } from 'react-native';
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
                    const storedPassword = userData.password.trim(); // Trim stored password
                    const enteredPassword = pwd.trim(); // Trim entered password
                    console.log("Stored Password:", storedPassword);
                    console.log("Entered Password:", enteredPassword);
                    if (storedPassword === enteredPassword) {
                        navigation.navigate('Main', { screen: 'Home', params: { userName: userData.name, userEmail: email } });
                    } else {
                        alert("Invalid password");
                    }
                } else {
                    alert("User not found");
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                alert("An error occurred while fetching user data");
            });
    }
    
    
    
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Image style={styles.backgroundImage} source={require('../assets/images/background.png')} />

            {/* Lights */}
            <View style={styles.lightsContainer}>
                <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} style={styles.light1} source={require('../assets/images/light.png')} />
                <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} style={styles.light2} source={require('../assets/images/light.png')} />
            </View>

            {/* Title and form */}
            <View style={styles.titleAndFormContainer}>
                {/* Title */}
                <View style={styles.titleContainer}>
                    <Animated.Text entering={FadeInUp.duration(1000).springify()}  style={styles.title}>Login</Animated.Text>
                </View>

                {/* Form for login */}
                <KeyboardAvoidingView behavior='padding'>
                    <View style={styles.formContainer}>
                        <Animated.View entering={FadeInDown.duration(1000).springify()} style={styles.inputContainer}>
                            <TextInput placeholder="Email" placeholderTextColor={'gray'} onChangeText={text => handleChange(text, "email")} />
                        </Animated.View>
                        <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} style={styles.inputContainer}>
                            <TextInput placeholder="Password" placeholderTextColor={'gray'} onChangeText={text => handleChange(text, "pwd")} secureTextEntry={true} />
                        </Animated.View>
                        <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
                            <TouchableOpacity onPress={Login} style={styles.loginButton}>
                                <Text style={styles.loginButtonText}>Login</Text>
                            </TouchableOpacity>
                        </Animated.View>
                        <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} style={styles.signupContainer}>
                            <Text>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
                                <Text style={styles.signupText}>Signup</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white', 
        height: '100%', 
        width: '100%'
    },
    innerContainer: {
        flex: 1
    },
    backgroundImage: {
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        zIndex: -1
    },
    lightsContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        width: '100%', 
        position: 'absolute'
    },
    light1: {
        height: 225, 
        width: 90
    },
    light2: {
        height: 160, 
        width: 65
    },
    titleAndFormContainer: {
        height: '100%', 
        width: '100%', 
        justifyContent: 'space-around', 
        paddingTop: 40, 
        paddingBottom: 10
    },
    titleContainer: {
        alignItems: 'center', 
        marginTop: 110
    },
    title: {
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 40
    },
    formContainer: {
        marginTop: 40
    },
    inputContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)', 
        padding: 10, 
        borderRadius: 20, 
        marginBottom: 15
    },
    loginButton: {
        backgroundColor: 'rgb(22, 132, 199)', 
        padding: 15, 
        borderRadius: 30, 
        marginBottom: 15
    },
    loginButtonText: {
        fontSize: 20, 
        fontWeight: 'bold', 
        color: 'white', 
        textAlign: 'center'
    },
    signupContainer: {
        flexDirection: 'row', 
        justifyContent: 'center'
    },
    signupText: {
        color: '#4299E1'
    }
});
