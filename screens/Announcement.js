import React, { useState,useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';
import { encode } from 'base-64';
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';

export default function AnnouncementScheduler() {
    const route = useRoute(); 
    const userName = route.params?.userName;
    const userEmail = route.params?.userEmail;

    const [ProjectName, setProjectName] = useState(''); 
    const [Role, setRole] = useState('');
    const [Number, setNumber] = useState('');
    const [ProjectDetail, setProjectDetail] = useState('');

    const [isProjectNameFocused, setIsProjectNameFocused] = useState(false);
    const [isRoleFocused, setIsRoleFocused] = useState(false);
    const [isNumberFocused, setIsNumberFocused] = useState(false);
    const [isProjectDetailFocused, setIsProjectDetailFocused] = useState(false);

    const inputRefs = {
        ProjectName: useRef(),
        Role: useRef(),
        Number: useRef(),
        ProjectDetail: useRef(),
    };

    const handleFocus = (field) => {
        switch (field) {
            case 'ProjectName':
                setIsProjectNameFocused(true);
                break;
            case 'Role':
                setIsRoleFocused(true);
                break;
            case 'Number':
                setIsNumberFocused(true);
                break;
            case 'ProjectDetail':
                setIsProjectDetailFocused(true);
                break;
            default:
                break;
        }
    };

    const handleBlur = (field) => {
        switch (field) {
            case 'ProjectName':
                setIsProjectNameFocused(ProjectName !== '');
                break;
            case 'Role':
                setIsRoleFocused(Role !== '');
                break;
            case 'Number':
                setIsNumberFocused(Number !== '');
                break;
            case 'ProjectDetail':
                setIsProjectDetailFocused(ProjectDetail !== '');
                break;
            default:
                break;
        }
    };

    const dataAddon = async () => {
        const encodedProjectName = encode(ProjectName);
    
        try {
            await set(ref(db, `announcement/${encodedProjectName}`), {
                ProjectName: ProjectName,
                Role: Role,
                Number: Number,
                ProjectDetail: ProjectDetail,
                Publisher: userName, // Store the username as the publisher
                MailTo: userEmail, // Store the user email as mailto
            });
            setProjectName('');
            setRole('');
            setNumber('');
            setProjectDetail('');
            setIsProjectNameFocused(false);
            setIsRoleFocused(false);
            setIsNumberFocused(false);
            setIsProjectDetailFocused(false);
            Alert.alert('Announcement posted successfully!');
        } catch (error) {
            console.error('Error adding data:', error);
            Alert.alert('Failed to post announcement!');
        }
    };
    
    

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                    <AntDesign name="pushpin" size={24} color="#7289DA" style={{ marginRight: 10 }} />
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#7289DA' }}>Announcements</Text>
                </View>

                <Animated.View style={[styles.inputContainer, { borderBottomColor: isProjectNameFocused ? '#7289DA' : 'black' }]}>
                    <Text style={[styles.placeholder, { top: ProjectName !== '' || isProjectNameFocused ? -20 : 12 }]}>Project Name</Text>
                    <TextInput
                        ref={inputRefs.ProjectName}
                        style={styles.input}
                        value={ProjectName}
                        onChangeText={(text) => setProjectName(text)}
                        onFocus={() => handleFocus('ProjectName')}
                        onBlur={() => handleBlur('ProjectName')}
                    />
                </Animated.View>

                <Animated.View style={[styles.inputContainer, { borderBottomColor: isRoleFocused ? '#7289DA' : 'black' }]}>
                    <Text style={[styles.placeholder, { top: Role !== '' || isRoleFocused ? -20 : 12 }]}>Role Needed</Text>
                    <TextInput
                        ref={inputRefs.Role}
                        style={styles.input}
                        value={Role}
                        onChangeText={(text) => setRole(text)}
                        onFocus={() => handleFocus('Role')}
                        onBlur={() => handleBlur('Role')}
                    />
                </Animated.View>

                <Animated.View style={[styles.inputContainer, { borderBottomColor: isNumberFocused ? '#7289DA' : 'black' }]}>
                    <Text style={[styles.placeholder, { top: Number !== '' || isNumberFocused ? -20 : 12 }]}>No. Of Students Required</Text>
                    <TextInput
                        ref={inputRefs.Number}
                        style={styles.input}
                        value={Number}
                        onChangeText={(text) => setNumber(text)}
                        onFocus={() => handleFocus('Number')}
                        onBlur={() => handleBlur('Number')}
                    />
                </Animated.View>

                <Animated.View style={[styles.inputContainer, { borderBottomColor: isProjectDetailFocused ? '#7289DA' : 'black' }]}>
                    <Text style={[styles.placeholder, { top: ProjectDetail !== '' || isProjectDetailFocused ? -20 : 12 }]}>Project Detail</Text>
                    <TextInput
                        ref={inputRefs.ProjectDetail}
                        style={styles.input}
                        value={ProjectDetail}
                        onChangeText={(text) => setProjectDetail(text)}
                        onFocus={() => handleFocus('ProjectDetail')}
                        onBlur={() => handleBlur('ProjectDetail')}
                    />
                </Animated.View>

                <TouchableOpacity
                    style={[styles.uploadButton, { marginTop: 20 }]}
                    onPress={() => {
                        if (ProjectName && Role && Number && ProjectDetail) {
                            // Pass the username to dataAddon
                            dataAddon();
                        } else {
                            Alert.alert('Please fill in all fields');
                        }
                    }}
                    disabled={!ProjectName || !Role || !Number || !ProjectDetail}
                >
                    <Text style={styles.buttonText}>Post Announcement</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#7289DA',
        borderRadius: 5,
        marginBottom: 20,
    },
    input: {
        height: 40,
        fontSize: 16,
        paddingLeft: 10,
    },
    placeholder: {
        position: 'absolute',
        left: 10,
        fontSize: 16,
        color: 'gray',
    },
    uploadButton: {
        borderRadius: 5,
        width: 200,
        height: 50,
        backgroundColor: '#7289DA',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
