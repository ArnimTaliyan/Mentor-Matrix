import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import { AntDesign } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native'; 
import { encode } from 'base-64';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';
import Animated from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function AnnouncementScheduler() {
    const route = useRoute(); 
    const navigation = useNavigation(); 
    const userName = route.params?.userName;
    const userEmail = route.params?.userEmail;

    const [ProjectName, setProjectName] = useState(''); 
    const [Role, setRole] = useState('');
    const [Number, setNumber] = useState('');
    const [document, setDocument] = useState(null);
    const [document1, setDocument1] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0); 

    const [isProjectNameFocused, setIsProjectNameFocused] = useState(false);
    const [isRoleFocused, setIsRoleFocused] = useState(false);
    const [isNumberFocused, setIsNumberFocused] = useState(false);
    
    const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);

    const inputRefs = {
        ProjectName: useRef(),
        Role: useRef(),
        Number: useRef(),
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
            default:
                break;
        }
    };

    const trackUploadProgress = (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
    };

    const dataAddon = async () => {
        setShowLoadingAnimation(true);
        const encodedProjectName = encode(ProjectName);
    
        try {
            await set(ref(db, `announcement/${encodedProjectName}`), {
                ProjectName: ProjectName,
                Role: Role,
                Number: Number,
                Publisher: userName,
                UserEmail: userEmail,
            });
    
            if (document) {
                setUploading(true);
                const blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        resolve(xhr.response);
                    };
                    xhr.onerror = (e) => {
                        reject(new TypeError('Network request failed'));
                    };
                    xhr.responseType = 'blob';
                    xhr.open('GET', document, true); 
                    xhr.send(null);
                });
    
                const storageRef = firebase.storage().ref();
                const fileRef = storageRef.child(document1);

                const uploadTask = fileRef.put(blob); 

               
                uploadTask.on('state_changed', 
                    (snapshot) => {
                       
                        trackUploadProgress(snapshot);
                    }, 
                    (error) => {
                        console.error('Error uploading document:', error);
                        setUploading(false);
                        setShowLoadingAnimation(false);
                        Alert.alert('Failed to upload document!');
                    }, 
                    () => {
                       
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                           
                            set(ref(db, `announcement/${encodedProjectName}/documentURL`), downloadURL)
                            .then(() => {
                                setUploading(false);
                                setDocument(null);
                                setUploadProgress(0);
                                setShowLoadingAnimation(false);
                                Alert.alert('Announcement posted successfully!');
                            })
                            .catch((error) => {
                                console.error('Error storing download URL:', error);
                                setUploading(false);
                                setShowLoadingAnimation(false);
                                Alert.alert('Failed to post announcement!');
                            });
                        });
                    }
                );

            } else {
                
                setUploading(false);
                setDocument(null);
                setShowLoadingAnimation(false);
                Alert.alert('Announcement posted successfully!');
            }
    
            setProjectName('');
            setRole('');
            setNumber('');
            setIsProjectNameFocused(false);
            setIsRoleFocused(false);
            setIsNumberFocused(false);

        } catch (error) {
            console.error('Error adding data:', error);
            setUploading(false);
            setShowLoadingAnimation(false);
            Alert.alert('Failed to post announcement!');
        }
    };
    
    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        if (!result.canceled) {
            setDocument(result.assets[0].uri);
            setDocument1(result.assets[0].name);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {/* Render back button */}
            {!uploading && (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 60, left: 20, zIndex: 999 }}>
                    <Ionicons name="chevron-back-outline" size={24} color="#242760" />
                </TouchableOpacity>
            )}

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
                        editable={!uploading} 
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
                        editable={!uploading} // Disable input when uploading
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
                        editable={!uploading} // Disable input when uploading
                    />
                </Animated.View>

                    <TouchableOpacity onPress={pickDocument} disabled={uploading} style={[styles.button, { marginTop: 20 }]}>
        <Text style={styles.uploadbuttonText}>{document ? "Change document" : "Upload Details"}</Text>
    </TouchableOpacity>
                {document && (
                    <View style={styles.documentContainer}>
                        <Text style={styles.document}>{document1}</Text>
                        <TouchableOpacity onPress={() => setDocument(null)} disabled={uploading}>
                            <AntDesign name="closecircle" size={18} color="grey" />
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity
                    style={[styles.postButton, { marginTop: 20 }]}
                    onPress={() => {
                        if (ProjectName && Role && Number) {
                            dataAddon();
                        } else {
                            Alert.alert('Please fill in all fields');
                        }
                    }}
                    disabled={!ProjectName || !Role || !Number || uploading} // Disable button when uploading or fields are empty
                >
                    <Text style={styles.buttonText}>Post Announcement</Text>
                </TouchableOpacity>

                {showLoadingAnimation && (
                    <LottieView
                        source={require('../assets/animations/post.json')}
                        autoPlay
                        loop
                        style={{ width: 100, height: 100 }}
                    />
                )}

                {/* Render progress percentage */}
                {uploading && (
                    <Text style={styles.progressText}>{uploadProgress.toFixed(2)}% </Text>
                )}

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
    postButton: {
        borderRadius: 5,
        width: 200,
        height: 50,
        backgroundColor: '#7289DA',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        borderRadius: 5,
        width: 200,
        height: 50,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadbuttonText: {
        color: '#7289DA',
        fontWeight: 'bold',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    documentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    document: {
        marginVertical: 10,
        marginRight: 10,
        
    },
    progressText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7289DA',
    },
});
