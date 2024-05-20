import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';


export default function Profiles() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const userName = route.params?.userName;
  const userEmail = route.params?.userEmail;
  const userDepartment = route.params?.userDepartment;
  const [profileImage, setProfileImage] = useState(require('../assets/images/default_profile.jpg'));
  const [modalVisible, setModalVisible] = useState(false);

  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera permission is required to take a photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage({ uri: result.uri });
    }
    setModalVisible(false);
  };

  const handleGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Gallery permission is required to select a photo.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage({ uri: result.uri });
    }
    setModalVisible(false);
  };

  const handleRemove = () => {
    setProfileImage(require('../assets/images/default_profile.jpg'));
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.profileTitle}>Your Profile</Text>
        
        <View style={styles.profileImageContainer}>
        <Image
  source={{ uri: profileImage.uri }}
  style={styles.profileImage}
/>

          <TouchableOpacity style={styles.cameraIconContainer} onPress={() => setModalVisible(true)}>
            <Ionicons name="camera-outline" size={20} color="#FFA726" />
          </TouchableOpacity>
        </View>
        {userName ? <Text style={styles.profileName}>{userName}</Text> : null}
        <Text style={styles.profileSubtitle}>Assistant Professor</Text>
        <Text style={styles.profileActiveSince}>{userDepartment}</Text>

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
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Profile Photo</Text>
              <TouchableOpacity style={styles.modalButton} onPress={handleCamera}>
                <Ionicons name="camera-outline" size={24} color="#FFA726" />
                <Text style={styles.modalButtonText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleGallery}>
                <Ionicons name="image-outline" size={24} color="#FFA726" />
                <Text style={styles.modalButtonText}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleRemove}>
                <Ionicons name="trash-outline" size={24} color="#FFA726" />
                <Text style={styles.modalButtonText}>Remove</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.modalCancelButton]} onPress={() => setModalVisible(!modalVisible)}>
                <Ionicons name="close-outline" size={24} color="#FFA726" />
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    width: 120,
    height: 120,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: '#ebebeb',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ebebeb',
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
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 16,
    marginLeft: 10,
  },
  modalCancelButton: {
    marginTop: 20,
  },
});
