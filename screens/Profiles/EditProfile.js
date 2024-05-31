import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from '../../firebase';
import { ref as databaseRef, update } from 'firebase/database';
import { encode } from 'base-64';

export default function EditProfile() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userEmail, userName, userDepartment, designation: initialDesignation, linkedin: initialLinkedin, room: initialRoom } = route.params;

  const [designation, setDesignation] = useState(initialDesignation || '');
  const [linkedin, setLinkedin] = useState(initialLinkedin || '');
  const [room, setRoom] = useState(initialRoom || '');

  const encodedEmail = encode(userEmail);
  const userRef = databaseRef(db, `users/${encodedEmail}/userdata`);

  const handleSaveChanges = async () => {
    try {
      await update(userRef, {
        designation,
        linkedin,
        room,
      });
      Alert.alert('Upload successful!');
      navigation.navigate('UserProfile', {
        userName,
        userEmail,
        userDepartment
      });
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
            <Ionicons name="arrow-back-outline" size={24} color='rgb(22, 132, 199)' />
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

        <View style={styles.inputContainer}>
          <Text style={styles.label}>FacultyRoom-Desk</Text>
          <TextInput
            placeholder='eg, 10104-D2'
            placeholderTextColor={'gray'}
            style={styles.input}
            value={room}
            onChangeText={setRoom}
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
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(22, 132, 199)',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: 'rgb(22, 132, 199)',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
