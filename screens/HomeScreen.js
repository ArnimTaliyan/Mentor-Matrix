import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
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

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query) => {
        setSearchQuery(query);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>

                    <View style={{ flex: 1, marginTop: 10 }}>
                        {userName ? <Text style={styles.greetingText}>Hello, {userName}</Text> : null}
                    </View>
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => navigation.push('AnnouncementScheduler', { userName: userName })}>
                        <Ionicons name="megaphone-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={{ paddingHorizontal: 16 }}>
                    <TextInput
                        placeholder='Search'
                        placeholderTextColor={'black'}
                        clearButtonMode='always'
                        style={styles.searchbox}
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={searchQuery}
                        onChangeText={(query) => handleSearch(query)}
                    />
                </View>
                <View style={styles.rowContainer}>
                <View style={styles.bubbleContainer}>
    <TouchableOpacity style={styles.bubble}>
        <Text style={styles.bubbleText}>School of Computer Science</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.bubble}>
        <Text style={styles.bubbleText}>School of Advanced Engineering</Text>
    </TouchableOpacity>
</View>
<View style={styles.bubbleContainer}>
    <TouchableOpacity style={styles.bubble}>
        <Text style={styles.bubbleText}>School of Business</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.bubble}>
        <Text style={styles.bubbleText}>School of Law</Text>
    </TouchableOpacity>
</View>
<View style={styles.bubbleContainer}>
    <TouchableOpacity style={styles.bubble}>
        <Text style={styles.bubbleText}>School of Design</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.bubble}>
        <Text style={styles.bubbleText}>School of Health Science and Technology</Text>
    </TouchableOpacity>
</View>
<View style={styles.bubbleContainer}>
    <TouchableOpacity style={styles.bubble}>
        <Text style={styles.bubbleText}>School of Liberal Studies</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.bubble}>
        <Text style={styles.bubbleText}>School of Life</Text>
    </TouchableOpacity>
</View>

                    
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
    searchbox: {
        marginTop:30,
        paddingVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    rowContainer: {
        flexDirection: 'column',
        marginTop: 20,
        paddingHorizontal: 16,
    },
    bubbleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    bubble: {
        backgroundColor: '#e3e3e3',
        borderRadius: 10,
        padding: 50,
        width: '49%', // Adjust width to fit two containers in one line with spacing
        alignItems: 'center',
    },
    bubbleText: {
        textAlign: 'center', // Align text to the center
        fontSize: 14,
    }
});
