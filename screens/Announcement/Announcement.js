import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Button, SafeAreaView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import { AntDesign } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native'; 
import { encode } from 'base-64';
import { ref, set } from 'firebase/database';
import { db } from '../../firebase';
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
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

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
                                setNotificationMessage('Announcement posted successfully!');
                                setShowNotification(true);
                                setTimeout(() => setShowNotification(false), 3000);
                               
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
                setNotificationMessage('Announcement posted successfully!');
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 3000);
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

    return (<SafeAreaView>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {/* Render back button */}
            {!uploading && (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 40, left: 20, zIndex: 999 }}>
                    <Ionicons name="chevron-back-outline" size={24} color="#242760" />
                </TouchableOpacity>
            )}

            <View style={styles.container}>
            <View style={styles.centeredAnnouncements}>
  <View style={styles.announcementsContainer}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
      <AntDesign name="pushpin" size={24} color='rgb(22, 132, 199)' style={{ marginRight: 10 }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold', color:'rgb(22, 132, 199)' }}>Announcements</Text>
    </View>
  </View>
</View>


                <View style={styles.cardContainer}>
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
    <View style={styles.documentRow}>
      <Text style={styles.document}>{document1}</Text>
      <TouchableOpacity onPress={() => setDocument(null)} disabled={uploading}>
        <AntDesign name="closecircle" size={18} color="grey" />
      </TouchableOpacity>
    </View>
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
                    disabled={!ProjectName || !Role || !Number } // Disable button when uploading or fields are empty
                >
                    <Text style={styles.buttonText}>Post Announcement</Text>
                </TouchableOpacity>
                </View>

                {showLoadingAnimation && (
  <View style={styles.centeredAnimation}>
    <LottieView
      source={require('../../assets/animations/post.json')}
      autoPlay
      loop
      style={{ width: 100, height: 100 }}
    />
  </View>
)}

                {/* Render progress percentage */}
                {uploading && (
                    <Text style={styles.progressText}>{uploadProgress.toFixed(2)}% </Text>
                )}
                 {showNotification && (
                    <View style={styles.notificationContainer}>
                        <View style={styles.notification}>
                            <AntDesign name="checkcircle" size={24} color="green" />
                            <Text style={styles.notificationText}>{notificationMessage}</Text>
                        </View>
                    </View>
                )}


            </View>
        </ScrollView></SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 150,
        justifyContent: 'center',
        
        backgroundColor: '#FFFFFF',
    },
    centeredAnnouncements: {
        flex: 1, // Make the container take up all available space
        justifyContent: 'center', // Center the content horizontally
        alignItems: 'center', // Center the content vertically
      },
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        padding: 20,
        marginBottom: 20,
        
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    placeholder: {
        position: 'absolute',
        left: 10,
        fontSize: 16,
        color: '#9E9E9E',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 5,
    },
    input: {
        height: 40,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: 'black',
        paddingLeft: 10,
    },
    button: {
        
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    uploadbuttonText: {
        color: 'rgb(22, 132, 199)',
        fontSize: 16,
    },
    postButton: {
        backgroundColor: 'rgb(22, 132, 199)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    documentContainer: {
        alignItems: 'center',
      },
      documentRow: {
        flexDirection: 'row', // This makes elements appear side-by-side
        alignItems: 'center', // Aligns icon and text vertically
        justifyContent:'space-evenly'
      },
      document: {
        flex: 1,
        fontSize: 16,
        color: 'black',
        marginRight: 0, // Remove margin to avoid gap
      },
    centeredAnimation: {
        flex: 1, // Make the container take up all available space
        justifyContent: 'center', // Center the content horizontally
        alignItems: 'center', // Center the content vertically
      },
    progressText: {
        fontSize: 16,
        marginTop: 10,
        textAlign:'center'
        
    },
    notificationContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    notification: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#CFF3E0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    notificationText: {
        marginLeft: 10,
        color: '#007E33',
        fontSize: 16,
    },
});

