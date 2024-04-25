import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, StyleSheet,Image, TouchableOpacity } from 'react-native';
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
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    profileButton: {
        position: 'absolute',
        top: 25,
        right: 20,
        width: 45,
        height: 45,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0B646B',
        zIndex: 1, // Ensure the TouchableOpacity is above other views
    },
    overlayContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 20, // Adjust as needed
        paddingLeft: 20, // Adjust as needed
        zIndex: 0,
        backgroundColor: '#FFF' // Set a lower zIndex for the overlayContainer to ensure it's below the TouchableOpacity
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
    }
});
