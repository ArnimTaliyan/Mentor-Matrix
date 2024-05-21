import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { storage, db } from '../firebase'; // Import Firebase storage and database
import * as FileSystem from 'expo-file-system';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as databaseRef, set, get, child } from 'firebase/database';
import { useNavigation , useRoute} from '@react-navigation/native';
import { encode } from 'base-64';
import { remove } from 'firebase/database';



export default function Profiles() {
  const navigation = useNavigation();
  const route = useRoute();
  const userName = route.params?.userName;
  const userEmail = route.params?.userEmail;
  const userDepartment = route.params?.userDepartment;


  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [userData, setUserData] = useState({});

  
  const encodedEmail = encode(userEmail);
  const userRef = databaseRef(db, `users/${encodedEmail}`);
  const profileImageRef = child(userRef, 'userdata/profileImageUrl');

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus.status !== 'granted' || galleryStatus.status !== 'granted') {
        Alert.alert('Permission denied', 'Please grant camera and gallery permissions to use this feature.');
      }
    })();

    // Fetch user data from Firebase Realtime Database
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
          if (snapshot.child('userdata/profileImageUrl').exists()) {
            setProfileImageUrl(snapshot.child('userdata/profileImageUrl').val());
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

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

      const storageReference = storageRef(storage, imageName);

      await uploadBytes(storageReference, blob);

      const downloadURL = await getDownloadURL(storageReference);

      // Save the download URL to Firebase Realtime Database
      await set(profileImageRef, downloadURL);

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
  const handleRemoveProfileImage = () => {
    // Remove profile image from Firebase Realtime Database
    remove(profileImageRef)
      .then(() => {
        // Update state to display default profile image
        setProfileImageUrl(null);
        setModalVisible(false);
      })
      .catch((error) => {
        console.error('Error removing profile image:', error);
      });
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
        <Text style={styles.profileSubtitle}>Assistant Professor</Text>
        <Text style={styles.profileActiveSince}>{userDepartment}</Text>

        <View style={styles.personalInfoContainer}>
          <Text style={styles.sectionTitle}>Personal Info</Text>
          <Text style={styles.editText}>Edit</Text>
          <View style={styles.infoItem}>
            <Ionicons name="mail-outline" size={24} color="#FFA726" />
            <Text style={styles.infoText}>{userEmail}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="call-outline" size={24} color="#FFA726" />
            <Text style={styles.infoText}>+71138474930</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={24} color="#FFA726" />
            <Text style={styles.infoText}>Country Side</Text>
          </View>
        </View>

        <View style={styles.utilitiesContainer}>
          <Text style={styles.sectionTitle}>Utilities</Text>
          <TouchableOpacity style={styles.utilityItem}>
            <Ionicons name="download-outline" size={24} color="#FFA726" />
            <Text style={styles.utilityText}>Downloads</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="#B0B0B0" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.utilityItem}>
            <Ionicons name="help-outline" size={24} color="#FFA726" />
            <Text style={styles.utilityText}>Help</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="#B0B0B0" />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Profile Photo</Text>
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
    right: 20,
    top: 20,
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
});
