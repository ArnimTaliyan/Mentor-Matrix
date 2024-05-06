import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';



export default function WelcomeScreen() {
    const navigation= useNavigation();
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Image style={styles.image} source={require('../assets/images/background.png')}/>

            {/*Lights */}
            <View style={styles.lightsContainer}>
                <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} style={{height: 225,width: 90}} source={require('../assets/images/light.png')}/>
                <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()}  style={{height: 160,width: 65}}  source={require('../assets/images/light.png')}/>
            </View>
            
            {/* title and form */}
            <View style={styles.titleFormContainer}>
                {/*title*/}
                <View style={styles.titleContainer}>
                    <Animated.Text entering={FadeInUp.duration(1000).springify()}  style={styles.titleText}>
                        Mentor Matrix
                    </Animated.Text>
                </View>

                {/*form for login */}
                <View style={styles.formContainer}>
                    <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} style={styles.buttonContainer}>
                        <TouchableOpacity onPress={()=> navigation.push('LoginScreen')} style={styles.button}>
                            <Text style={styles.buttonText}>
                                Welcome
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%'
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    lightsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        position: 'absolute',
        marginTop: -20
    },
    titleFormContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        paddingTop: 40,
        paddingBottom: 10
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 55
    },
    titleText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40
    },
    formContainer: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 12,
        marginRight: 12,
        marginTop: 16,
        marginBottom: 16,
        flexDirection: 'column'
    },
    buttonContainer: {
        width: '100%'
    },
    button: {
        width: '100%',
        backgroundColor: 'rgb(22, 132, 199)',
        padding: 12,
        borderRadius: 24,
        marginBottom: 12
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    }
});