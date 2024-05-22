import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity,StyleSheet, ScrollView, Modal, TouchableWithoutFeedback, Alert, ActivityIndicator, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { storage, db } from '../firebase';
import * as FileSystem from 'expo-file-system';
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { ref as databaseRef, set, get, child, remove as removeDatabaseData, onValue } from 'firebase/database';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { encode } from 'base-64';

export default function UserProfile() {
  const navigation = useNavigation();
  const route = useRoute();
  const [userName, setUserName] = useState(route.params?.userName);
  const [userEmail, setUserEmail] = useState(route.params?.userEmail);
  const [userDepartment, setUserDepartment] = useState(route.params?.userDepartment);

  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [userData, setUserData] = useState({});

  const encodedEmail = useMemo(() => encode(userEmail), [userEmail]);
  const userRef = useMemo(() => databaseRef(db, `users/${encodedEmail}/userdata`), [encodedEmail]);
  const profileImageRef = useMemo(() => child(userRef, 'profileImageUrl'), [userRef]);

  const fetchUserData = useCallback(async () => {
    try {
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        setUserData(snapshot.val());
        if (snapshot.child('profileImageUrl').exists()) {
          setProfileImageUrl(snapshot.child('profileImageUrl').val());
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [userRef]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [fetchUserData])
  );

  useEffect(() => {
    const unsubscribe = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        setUserData(snapshot.val());
        if (snapshot.child('profileImageUrl').exists()) {
          setProfileImageUrl(snapshot.child('profileImageUrl').val());
        } else {
          setProfileImageUrl(null);
        }
        if (snapshot.child('name').exists()) {
          setUserName(snapshot.child('name').val());
        }
        if (snapshot.child('department').exists()) {
          setUserDepartment(snapshot.child('department').val());
        }
      }
    });

    return () => unsubscribe();
  }, [userRef]);

  const pickImageFromCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
      handleImageResult(result);
    } catch (error) {
      console.error('Error picking image from camera:', error);
    }
  };

  const pickImageFromGallery = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
      handleImageResult(result);
    } catch (error) {
      console.error('Error picking image from gallery:', error);
    }
  };

  const handleImageResult = (result) => {
    if (!result.canceled) {
      const { uri, fileName } = result.assets[0];
      const imageName = fileName || uri.split('/').pop();

      setImage(uri);
      setImageName(imageName);
    }
  };

  const uploadMedia = async () => {
    setUploading(true);

    try {
      const base64Data = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const blob = await (await fetch(`data:image/jpeg;base64,${base64Data}`)).blob();

      const storageReference = storageRef(storage, `profileImages/${imageName}`);
      await uploadBytes(storageReference, blob);

      const downloadURL = await getDownloadURL(storageReference);

      await set(profileImageRef, downloadURL);
      await set(child(userRef, 'profileImageName'), imageName);

      setProfileImageUrl(downloadURL);

      setUploading(false);
      Alert.alert('Photo Uploaded!');
      setModalVisible(false);
      setImage(null);
      setImageName('');
    } catch (error) {
      console.error('Error uploading media:', error);
      setUploading(false);
      Alert.alert('Upload failed', error.message);
    }
  };

  const handleRemoveProfileImage = async () => {
    try {
      const imageNameSnapshot = await get(child(userRef, 'profileImageName'));
      if (imageNameSnapshot.exists()) {
        const storedImageName = imageNameSnapshot.val();

        if (profileImageUrl) {
          const imageRef = storageRef(storage, `profileImages/${storedImageName}`);
          await deleteObject(imageRef);
        }

        await removeDatabaseData(profileImageRef);
        await removeDatabaseData(child(userRef, 'profileImageName'));

        setProfileImageUrl(null);
        setModalVisible(false);
      } else {
        throw new Error('No profile image found in database');
      }
    } catch (error) {
      console.error('Error removing profile image:', error);
      Alert.alert('Error', 'Failed to remove profile image');
    }
  };

  const handleLogout = () => {
    navigation.navigate('LoginScreen');
  };

  const openEmailInOutlook = () => {
    const emailUrl = `mailto:${userEmail}`;
    Linking.openURL(emailUrl).catch(err => console.error('Error opening email client:', err));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.profileTitle}>Your Profile</Text>

        <View style={styles.profileImageContainer}>
          <Image
            source={profileImageUrl ? { uri: profileImageUrl } : require('../assets/images/default_profile.jpg')}
            style={styles.profileImage}
          />
          <TouchableOpacity 
            style={styles.cameraIconContainer}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="camera" size={20} color="#FFA726" />
          </TouchableOpacity>
        </View>

        <Text style={styles.profileName}>{userName}</Text>
        <Text style={styles.profileSubtitle}>{userData.designation || '...'}</Text>
        <Text style={styles.profileActiveSince}>{userDepartment}</Text>

        <View style={styles.personalInfoContainer}>
          <Text style={styles.sectionTitle}>Personal Info</Text>

          <TouchableOpacity onPress={() => navigation.push('EditProfile', {
            userName: userData.name,
            userEmail: userEmail,
            userDepartment: userData.department,
            designation: userData.designation,
            linkedin: userData.linkedin,
            room: userData.room
          })}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={openEmailInOutlook}>
            <View style={styles.infoItem}>
              <Ionicons name="mail-outline" size={24} color="#FFA726" />
              <Text style={styles.infoText}>{userEmail}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.infoItem}>
            <Ionicons name="logo-linkedin" size={24} color="#FFA726" />
            <Text style={styles.infoText}>{userData.linkedin || '...'}</Text>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={24} color="#FFA726" />
            <Text style={styles.infoText}>{userData.room || '...'}</Text>
          </View>
        </View>

        <View style={styles.utilitiesContainer}>
          <TouchableOpacity style={styles.utilityItem}>
            <Text style={styles.sectionTitle}>Field Of Interest</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="#B0B0B0" />
          </TouchableOpacity>
        </View>

        <View style={styles.utilitiesContainer}>
          <TouchableOpacity style={styles.utilityItem}>
            <Text style={styles.sectionTitle}>Projects</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="#B0B0B0" />
          </TouchableOpacity>
        </View>

        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Choose an option</Text>
                  <TouchableOpacity style={styles.modalButton} onPress={pickImageFromCamera}>
                    <Ionicons name="camera-outline" size={24} color="#FFA726" />
                    <Text style={styles.modalButtonText}>Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalButton} onPress={pickImageFromGallery}>
                    <Ionicons name="image-outline" size={24} color="#FFA726" />
                    <Text style={styles.modalButtonText}>Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalButton} onPress={handleRemoveProfileImage}>
                    <Ionicons name="trash-outline" size={24} color="#FFA726" />
                    <Text style={styles.modalButtonText}>Remove</Text>
                  </TouchableOpacity>
                  {image && (
                    <TouchableOpacity style={styles.modalButton} onPress={uploadMedia} disabled={uploading}>
                      {uploading ? (
                        <ActivityIndicator size="small" color="#FFA726" />
                      ) : (
                        <>
                          <Ionicons name="cloud-upload-outline" size={24} color="#FFA726" />
                          <Text style={styles.modalButtonText}>Upload</Text>
                        </>
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}








const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FFA726',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 5,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginVertical: 5,
  },
  profileActiveSince: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 20,
  },
  personalInfoContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editText: {
    position: 'absolute',
    right: 10,
    top: -30,
    fontSize: 14,
    color: '#FFA726',
    fontWeight: 'bold',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
  },
  utilitiesContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  utilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  utilityText: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
  },
  modalButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: '#FFA726',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
