import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from '../firebase'; // Import Firebase database
import { ref as databaseRef, update } from 'firebase/database';
import { encode } from 'base-64';

export default function EditProfile() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userEmail, userName, userDepartment } = route.params;

  const [designation, setDesignation] = useState('');
  const [linkedin, setLinkedin] = useState('');

  const encodedEmail = encode(userEmail);
  const userRef = databaseRef(db, `users/${encodedEmail}/userdata`);

  const handleSaveChanges = async () => {
    try {
      await update(userRef, {
        designation,
        linkedin,
      });
      Alert.alert('Profile updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back-outline" size={24} color="#FFA726" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Designation</Text>
          <TextInput
            style={styles.input}
            value={designation}
            onChangeText={setDesignation}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Linkedin</Text>
          <TextInput
            style={styles.input}
            value={linkedin}
            onChangeText={setLinkedin}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    justifyContent: 'center', // Centers the children horizontally within the container
    position: 'relative', // Allows for absolute positioning within this container
  },
  backButton: {
    position: 'absolute', // Keeps the back button at its place
    left: 0, // Aligns it to the left
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute', // Allows for absolute positioning
    left: '50%', // Starts positioning from the center of the container
    transform: [{ translateX: -50 }], // Shifts the element back by half its width to center it exactly
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
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
  inputContainer: {
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#FFA726',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
