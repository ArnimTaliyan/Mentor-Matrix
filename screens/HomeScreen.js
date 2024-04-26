import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import SettingScreen from './SettingScreen';
import Scheduler from './Scheduler';
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export {
    SettingScreen,
    Scheduler
}

export default function HomeScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const userName = route.params?.userName;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    
                    <View style={{ flex: 1 , marginTop:10}}>
                        {userName ? <Text style={styles.greetingText}>Hello, {userName}</Text> : null}
                    </View>
                    <TouchableOpacity 
    style={styles.iconContainer} 
    onPress={() => navigation.push('AnnouncementScheduler', { userName: userName })}>
    <Ionicons name="megaphone-outline" size={24} color="black" />
</TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    iconContainer: {
        marginRight: 10,
    },
    greetingText: {
        fontSize: 30,
        color: '#0B646B',
        fontWeight: 'bold',
        marginBottom: 8,
    },
});
