import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Keyboard, Animated as RNAnimated, TouchableWithoutFeedback } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { encode } from 'base-64';
import { db } from '../../firebase'; // Import db from firebase.js
import { get, ref, set } from 'firebase/database';
import RNPickerSelect from 'react-native-picker-select';

export default function SignupScreen() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showNotification1, setShowNotification1] = useState(false);
    const [notificationMessage1, setNotificationMessage1] = useState('');

    const [focusedInput, setFocusedInput] = useState(null);
    const [inputLayout, setInputLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

    const departmentOptions = [
        { label: 'SOAE', value: 'SOAE' },
        { label: 'SOB', value: 'SOB' },
        { label: 'SOCS', value: 'SOCS' },
        { label: 'SOD', value: 'SOD' },
        { label: 'SOHS', value: 'SOHS' },
        { label: 'SOLA', value: 'SOLA' },
        { label: 'SOLI', value: 'SOLI' },
        { label: 'SOLS', value: 'SOLS' },
    ];

    const [department, setDepartment] = useState('');

    const Notification = ({ message }) => (
        <View style={styles.notification}>
            <Text style={styles.notificationText}>{message}</Text>
        </View>
    );

    const dataAddon = () => {
        if (!name || !email || !password || !department) {
            console.log('Fields are empty. Showing notification...');
            setNotificationMessage1('Please fill in all fields');
            setShowNotification1(true);
            setTimeout(() => setShowNotification1(false), 3000);
            return;
        }

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            console.log('Invalid email. Showing notification...');
            setNotificationMessage1('Please enter a valid email address');
            setShowNotification1(true);
            setTimeout(() => setShowNotification1(false), 3000);
            return;
        }

        const normalizedEmail = email.toLowerCase(); // Convert email to lowercase
        const encodedEmail = encode(normalizedEmail); // Encode the normalized email
        const userRef = ref(db, `users/${encodedEmail}`);

        get(userRef, 'value')
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.log('Email already exists. Showing notification...');
                    setNotificationMessage1('Email already exists');
                    setShowNotification1(true);
                    setTimeout(() => setShowNotification1(false), 3000);
                } else {
                    set(userRef, {
                        name,
                        email: normalizedEmail, // Save the normalized email
                        password,
                        department,
                    })
                    .then(() => {
                        setName('');
                        setEmail('');
                        setPassword('');
                        setDepartment('');
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
    };

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
                                <Animated.Text entering={FadeInUp.duration(1000).springify()} style={styles.title}>Signup</Animated.Text>
                            </View>
                            <View style={styles.formContainer}>
                                <Animated.View
                                    entering={FadeInDown.duration(1000).springify()}
                                    style={[styles.inputContainer, focusedInput === 'name' && styles.inputFocused]}
                                    onLayout={event => focusedInput === 'name' && setInputLayout(event.nativeEvent.layout)}
                                >
                                    <TextInput
                                        placeholder="Name"
                                        placeholderTextColor={'gray'}
                                        value={name}
                                        onChangeText={text => setName(text)}
                                        onFocus={() => setFocusedInput('name')}
                                        onBlur={() => setFocusedInput(null)}
                                        style={styles.textInput}
                                    />
                                </Animated.View>
                                <Animated.View
                                    entering={FadeInDown.duration(1000).springify()}
                                    style={[styles.inputContainer, focusedInput === 'email' && styles.inputFocused]}
                                    onLayout={event => focusedInput === 'email' && setInputLayout(event.nativeEvent.layout)}
                                >
                                    <TextInput
                                        placeholder="Email"
                                        placeholderTextColor={'gray'}
                                        value={email}
                                        onChangeText={text => setEmail(text)}
                                        onFocus={() => setFocusedInput('email')}
                                        onBlur={() => setFocusedInput(null)}
                                        style={styles.textInput}
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
                                        value={password}
                                        onChangeText={text => setPassword(text)}
                                        secureTextEntry={true}
                                        onFocus={() => setFocusedInput('password')}
                                        onBlur={() => setFocusedInput(null)}
                                        style={styles.textInput}
                                    />
                                </Animated.View>
                                <Animated.View entering={FadeInDown.duration(1000).springify()} style={styles.inputContainer}>
                                    <RNPickerSelect
                                        onValueChange={(value) => setDepartment(value)}
                                        items={departmentOptions}
                                        placeholder={{ label: "Select Department", value: null }}
                                        style={styles}
                                        value={department}
                                    />
                                </Animated.View>
                                <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
                                    <TouchableOpacity onPress={dataAddon} style={styles.signupButton}>
                                        <Text style={styles.signupButtonText}>SignUp</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                                <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} style={styles.loginContainer}>
                                    <Text>Already have an account?</Text>
                                    <TouchableOpacity onPress={() => navigation.push('LoginScreen')}>
                                        <Text style={styles.loginText}>Login</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                                {showNotification && <Notification message="Account added successfully" />}
                                {showNotification1 && <Notification message={notificationMessage1} />}
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
        backgroundColor: 'white',
        height: '100%',
        width: '100%'
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    lightsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        position: 'absolute'
    },
    light1: {
        height: 225,
        width: 90,
    },
    light2: {
        height: 160,
        width: 65,
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
        marginTop: 160
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40
    },
    formContainer: {
        marginTop: 40
    },
    signupButton: {
        backgroundColor: 'rgb(22, 132, 199)',
        padding: 15,
        borderRadius: 30,
        marginBottom: 15
    },
    signupButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    loginText: {
        color: 'rgb(22, 132, 199)'
    },
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
    inputContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        padding: 10,
        borderRadius: 20,
        marginBottom: 15
    },
    inputFocused: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderColor:'purple',
        borderWidth: 1,
        
    },
    textInput: {
        color: 'black'
    },
    inputIOS: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        zIndex: 1
    },
    spotlight: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        zIndex: 2,
        borderRadius: 10
    }
});
