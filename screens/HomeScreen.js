import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { storage } from '../firebase'; // Import the storage from your firebase.js file
import SettingScreen from './SettingScreen';
import Scheduler from './Scheduler';
import SearchBar from '../Components/Searchbar';

export {
  SettingScreen,
  Scheduler
}

export default function HomeScreen({ navigation }) {
    const route = useRoute();
    const userName = route.params?.userName;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // You can perform any other actions here
        setLoading(false);
    }, []); // Run this effect only once on component mount

    const navigateToNextScreen = (imageName) => {
        // Navigate to the next screen, passing the image name as a parameter
        navigation.navigate('NextScreen', { imageName });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.overlayContainer}>
                    <View style={{ paddingHorizontal: 16 }}>
                        {userName ? <Text style={styles.greetingText}>Hello, {userName}</Text> : null}
                    </View>
                </View>
                <View style={styles.overlayContainer}></View>
                <View style={styles.BG}>
                    <SearchBar></SearchBar>
                </View>
            
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigateToNextScreen('Image1')}>
                    <Image source={require('../assets/images/socs.jpeg')} style={styles.image} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigateToNextScreen('Image2')}>
                    <Image source={require('../assets/images/SOHS.jpeg')} style={styles.image} />
                </TouchableOpacity>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    overlayContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 20, // Adjust as needed
        paddingLeft: 20, // Adjust as needed
        zIndex: 0,
        backgroundColor: '#FFF'
    },
    greetingText: {
        fontSize: 30,
        color: '#0B646B',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    nameText: {
        fontSize: 26,
        color: '#527283',
        fontWeight: 'bold',
    },
    BG: {
        backgroundColor: '#FFF',
        flex: 1
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 200,
    }
});
