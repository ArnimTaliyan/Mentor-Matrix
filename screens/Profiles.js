import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../firebase'; // Replace with your Firebase storage configuration
import * as FileSystem from 'expo-file-system';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function ProfilePage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(null); // State to store the uploaded image URL

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus.status !== 'granted' || galleryStatus.status !== 'granted') {
        Alert.alert('Permission denied', 'Please grant camera and gallery permissions to use this feature.');
      }
    })();
  }, []);

  const pickImageFromCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5, // Reduce the quality to prevent memory issues
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
        quality: 0.5, // Reduce the quality to prevent memory issues
      });
      handleImageResult(result);
    } catch (error) {
      console.error('Error picking image from gallery:', error);
    }
  };

  const handleImageResult = (result) => {
    if (!result.canceled) {
      const { uri, fileName } = result.assets[0];
      const imageName = fileName || uri.split('/').pop(); // Use fileName if available, otherwise extract from URI

      setImage(uri);
      setImageName(imageName);
      console.log('Image URI:', uri);
      console.log('Image Name:', imageName);
    }
  };

  const uploadMedia = async () => {
    setUploading(true);

    try {
      const base64Data = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const blob = await (await fetch(`data:image/jpeg;base64,${base64Data}`)).blob();

      const storageRef = ref(storage, imageName);

      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);
      console.log('Download URL:', downloadURL);

      setProfileImageUrl(downloadURL);
      console.log('Profile image URL set:', downloadURL);

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

        <Text style={styles.profileName}>Richard Barnes</Text>
        <Text style={styles.profileSubtitle}>22 year old dev from the Country Side</Text>
        <Text style={styles.profileActiveSince}>Active since - Aug, 2022</Text>

        <View style={styles.personalInfoContainer}>
          <Text style={styles.sectionTitle}>Personal Info</Text>
          <Text style={styles.editText}>Edit</Text>
          <View style={styles.infoItem}>
            <Ionicons name="mail-outline" size={24} color="#FFA726" />
            <Text style={styles.infoText}>richbarnes@gmail.com</Text>
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
                  <TouchableOpacity style={styles.modalButton} onPress={() => setImage(null)}>
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
