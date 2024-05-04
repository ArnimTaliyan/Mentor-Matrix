import { StyleSheet, View, Text, Linking, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { ScrollView } from 'react-native';

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
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>Announcements</Text>
                {todoData.map((item, index) => {
                    return (
                        <View key={index} style={styles.bubble}>
                            <Text style={styles.Htext}>"{item.ProjectName} "{'\n'}</Text>
                            <Text style={styles.text}>
                                I want {item.Number} Students for {item.Role} {'\n'}
                            </Text>
                            
                            <Text
                                style={[styles.documentLink]}
                                onPress={() => { Linking.openURL(item.documentURL);
                                }}>
                                Project Details
                            </Text>
                           
                            <View style={styles.publisherContainer}>
                                <Text style={styles.publisherText}>
                                    Published By:{item.Publisher}
                                </Text>
                            </View>
                            <View style={styles.contactContainer}>
                                
                                <Text
                                style={[styles.contactLink, styles.underline]}
                                onPress={() => {
                                    Linking.openURL(`mailto:${item.UserEmail}`);
                                }}>
                                Contact
                            </Text>
                            </View>
                          
                        </View>
                    );
                })}
                  <TouchableOpacity>
  <Text style={{ fontSize: 80, color: 'white' }}>hi</Text>
</TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default FetchData;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'bold',
    },
    Htext: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 5,
        fontWeight:'bold'
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 5,
    },
    bubble: {
        backgroundColor: '#e3e3e3',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        width: '80%',
    },
    publisherContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end', // Align "Published by" to the right
        marginTop: 10,
    },
    publisherText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'right',
    },
    contactContainer: {
        marginTop: 5,
        alignSelf: 'flex-end',
    },
    contactLink: {
        fontSize: 16,
        color: '#007bff',
        textDecorationLine: 'underline',
    },
    documentLink: {
        fontSize: 16,
        color: '#007bff',
        alignSelf:'center'
        
    },
    underline: {
        textDecorationLine: 'underline',
    },
});
