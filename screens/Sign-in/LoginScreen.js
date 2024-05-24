import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text, KeyboardAvoidingView, StatusBar, StyleSheet, LayoutAnimation } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, get } from 'firebase/database';
import { db } from '../../firebase';
import { encode } from 'base-64';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';

const MemoizedTextInput = React.memo(({ placeholder, onChangeText, value }) => (
    <TextInput placeholder={placeholder} placeholderTextColor={'gray'} onChangeText={onChangeText} value={value} />
));

export default function LoginScreen({ route }) {
    const navigation = useNavigation();
    const [loginError, setLoginError] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const [values, setValues] = useState({
        email: "",
        pwd: ""
    });

    useEffect(() => {
        // Reset email and password values when component receives props
        setValues({
            email: "",
            pwd: ""
        });
    }, [route]);

    const handleChange = useCallback((text, eventName) => {
        setValues(prev => ({
            ...prev,
            [eventName]: text
        }));
    }, []);

    const clearInputFields = useCallback(() => {
        setValues({
            email: "",
            pwd: ""
        });
    }, []);

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
        <View style={styles.container}>
            <StatusBar style="light" />
            <Image style={styles.backgroundImage} source={require('../../assets/images/background.png')} />

            {/* Lights */}
            <View style={styles.lightsContainer}>
                <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} style={styles.light1} source={require('../../assets/images/light.png')} />
                <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} style={styles.light2} source={require('../../assets/images/light.png')} />
            </View>

            {/* Title and form */}
            <View style={styles.titleAndFormContainer}>
                {/* Title */}
                <View style={styles.titleContainer}>
                    <Animated.Text entering={FadeInUp.duration(1000).springify()}  style={styles.title}>Login</Animated.Text>
                </View>
                {/* Form for login */}
                <KeyboardAvoidingView behavior='padding' style={styles.formContainer} >
                <Animated.View entering={FadeInDown.duration(1000).springify()} style={styles.inputContainer}>
                    <MemoizedTextInput
                        placeholder="Email"
                        onChangeText={text => handleChange(text, "email")}
                        value={values.email}
                    />
                </Animated.View>
                <Animated.View entering={FadeInDown.duration(1000).springify()} style={styles.inputContainer}>
                    <MemoizedTextInput
                        placeholder="Password"
                        onChangeText={text => handleChange(text, "pwd")}
                        secureTextEntry={true}
                        value={values.pwd}
                    />
                </Animated.View>
                    <TouchableOpacity onPress={Login} style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                    <View style={styles.signupContainer}>
                        <Text>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
                            <Text style={styles.signupText}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
            {loginError && <View style={styles.notification}>
                <Text style={styles.notificationText}>{loginErrorMessage}</Text>
            </View>}
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
        marginTop: 40,
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
});
