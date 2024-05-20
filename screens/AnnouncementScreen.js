import { StyleSheet, View, Text, Linking, TouchableOpacity, Image, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
const FetchData = () => {
    const [todoData, setTodoData] = useState([]);
    useEffect(() => {
        const starCountRef = ref(db, 'announcement/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            const newPosts = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));

            setTodoData(newPosts);
        });
    }, []);

    return (
        <SafeAreaView style={[styles.safeArea, Platform.OS =='android'&& {paddingBottom:38}]}>
            <ScrollView style={[ Platform.OS === 'android' && {paddingBottom:30 }]}>
                <View style={styles.container}>
                    {todoData.map((item, index) => {
                        return (
                            <View key={index} style={styles.postContainer}>
                                <View style={styles.headerContainer}>
                                    <Image
                                        style={styles.avatar}
                                        source={ require ('../assets/images/upes.jpeg')} // Replace with actual avatar URL or a default one
                                    />
                                    <Text style={styles.publisherText}>{item.Publisher}</Text>
                                </View>
                                <View style={styles.contentContainer}>
                                    <Text style={styles.Htext}>{item.ProjectName}</Text>
                                    <Text style={styles.text}>
                                        Role: {item.Role}
                                    </Text>
                                    <Text style={styles.text}>
                                        Number of Student Required: {item.Number}
                                    </Text>
                                    <Text style={styles.documentLink} onPress={() => { Linking.openURL(item.documentURL); }}>
                                        Project Details
                                    </Text>
                                </View>
                                <View style={styles.actionContainer}>
                                    
                                <TouchableOpacity style={styles.contactLink} onPress={() => {Linking.openURL(`mailto:${item.UserEmail}`);}}>
                                    <Ionicons name="paper-plane-outline" size={32} color="#4299E1" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default FetchData;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 10,
    },
    postContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        width: '90%',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    publisherText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    contentContainer: {
        marginBottom: 10,
    },
    Htext: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        marginTop: 5,
    },
    actionContainer: {
        borderTopWidth: 1,
        borderTopColor: '#e3e3e3',
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    documentLink: {
        fontSize: 16,
        color: '#007bff',
    },
    contactLink: {
        fontSize: 16,
        color: '#4299E1',
        
    },
});
