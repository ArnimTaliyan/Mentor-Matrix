import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Keyboard, Animated as RNAnimated, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, get } from 'firebase/database';
import { db } from '../../firebase';
import { encode } from 'base-64';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function LoginScreen({ route }) {
    const navigation = useNavigation();
    const [loginError, setLoginError] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);
    const [inputLayout, setInputLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

    const [values, setValues] = useState({
        email: "",
        pwd: ""
    });
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        // Reset email and password values when component receives props
        setValues({
            email: "",
            pwd: ""
        });
    }, [route]);

    // Clear input fields when loginError changes to true
    useEffect(() => {
        if (loginError) {
            setValues({ email: "", pwd: "" });
        }
    }, [loginError]);

    function handleChange(text, eventName) {
        setValues(prev => ({
            ...prev,
            [eventName]: text
        }));
    }

    function clearInputFields() {
        setValues({
            email: "",
            pwd: ""
        });
    }

    function Login() {
        const { email, pwd } = values;

        if (email.trim() === "" || pwd.trim() === "") {
            setLoginErrorMessage('Email and password cannot be empty');
            setLoginError(true);
            setTimeout(() => setLoginError(false), 3000);
            return;
        }

        const encodedEmail = encode(email);
        const userRef = ref(db, `users/${encodedEmail}`);
        
        get(userRef, 'value')
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    
                    const storedPassword = userData.password ? userData.password.trim() : ''; // Trim stored password if it exists
                    const enteredPassword = pwd.trim(); // Trim entered password

                    if (storedPassword === enteredPassword) {
                        setShowNotification(true);
                        setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
                       
                        navigation.navigate('Main', { screen: 'CalendarScreen', params: { userName: userData.name, userEmail: email } });
                        navigation.navigate('Main', { screen: 'FetchData', params: { userName: userData.name, userEmail: email },  });
                        navigation.navigate('Main', { screen: 'UserProfile', params: { userName: userData.name, userEmail: email , userDepartment: userData.department }});
                    } else {
                        setLoginErrorMessage('Invalid password');
                        setLoginError(true);
                        setTimeout(() => setLoginError(false), 3000);
                    }
                } else {
                    setLoginErrorMessage('User not found');
                    setLoginError(true);
                    setTimeout(() => setLoginError(false), 3000);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoginErrorMessage('An error occurred while fetching user data');
                setLoginError(true);
                setTimeout(() => setLoginError(false), 3000);
            })
            .finally(() => {
                clearInputFields(); // Clear input fields after login attempt
            });
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <StatusBar style="light" />
                <Image style={styles.backgroundImage} source={require('../../assets/images/background.png')} />
                <View style={styles.lightsContainer}>
                    <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} style={styles.light1} source={require('../../assets/images/light.png')} />
                    <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} style={styles.light2} source={require('../../assets/images/light.png')} />
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                        <View style={styles.titleAndFormContainer}>
                            <View style={styles.titleContainer}>
                                <Animated.Text entering={FadeInUp.duration(1000).springify()} style={styles.title}>Login</Animated.Text>
                            </View>
                            <View style={styles.formContainer}>
                                <Animated.View
                                    entering={FadeInDown.duration(1000).springify()}
                                    style={[styles.inputContainer, focusedInput === 'email' && styles.inputFocused]}
                                    onLayout={event => focusedInput === 'email' && setInputLayout(event.nativeEvent.layout)}
                                >
                                    <TextInput
                                        placeholder="Email"
                                        placeholderTextColor={'gray'}
                                        onChangeText={text => handleChange(text, "email")}
                                        value={values.email}
                                        onFocus={() => setFocusedInput('email')}
                                        onBlur={() => setFocusedInput(null)}
                                        style={styles.textInput}
                                        autoCorrect={false}
                                        editable={!focusedInput || focusedInput === 'email'}
                                    />
                                </Animated.View>
                                <Animated.View
                                    entering={FadeInDown.delay(200).duration(1000).springify()}
                                    style={[styles.inputContainer, focusedInput === 'password' && styles.inputFocused]}
                                    onLayout={event => focusedInput === 'password' && setInputLayout(event.nativeEvent.layout)}
                                >
                                    <TextInput
                                        placeholder="Password"
                                        placeholderTextColor={'gray'}
                                        value={values.pwd}
                                        onChangeText={text => handleChange(text, "pwd")}
                                        secureTextEntry={true}
                                        onFocus={() => setFocusedInput('password')}
                                        onBlur={() => setFocusedInput(null)}
                                        style={styles.textInput}
                                        editable={!focusedInput || focusedInput === 'password'}
                                    />
                                </Animated.View>
                                <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
                                    <TouchableOpacity onPress={Login} style={styles.loginButton}>
                                        <Text style={styles.loginButtonText}>Login</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                                <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} style={styles.signupContainer}>
                                    <Text>Already have an account?</Text>
                                    <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
                                        <Text style={styles.signupText}>SignUp</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                                {loginError && <View style={styles.notification}>
                                    <Text style={styles.notificationText}>{loginErrorMessage}</Text>
                                </View>}
                            </View>
                        </View>
                    </ScrollView>
                    {focusedInput && (
                        <>
                            <RNAnimated.View style={styles.overlay} />
                            <RNAnimated.View style={[styles.spotlight, { top: inputLayout.y, height: inputLayout.height, width: inputLayout.width, left: inputLayout.x }]} />
                        </>
                    )}
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
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
    textInput: {
        color: 'black'
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
    },
    inputFocused: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderColor:'purple',
        borderWidth: 1,
        
    },
    notification: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 70, // Adjust position as needed
        zIndex: 999,
    },
    notificationText: {
        color: 'white',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        zIndex: 1,
    },
    spotlight: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 20,
        zIndex: 2,
    },
});
