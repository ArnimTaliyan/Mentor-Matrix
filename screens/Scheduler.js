// Import the necessary modules
import React, { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icon library

// Define the Scheduler component
export default function Scheduler() {
  // Define state variables for document and uploading status
  const [document, setDocument] = useState(null);
  const [document1, setDocument1] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileIsUploading, setFileIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to pick a PDF document
  const pickDocument = async () => {
    // No permissions request is necessary for launching the image library
    let result = await DocumentPicker.getDocumentAsync({});

    if (!result.canceled) {
      setDocument(result.assets[0].uri);
      setDocument1(result.assets[0].name);
    }
  };

  // Function to upload the selected document
  const uploadDocument = async () => {
    setUploading(true);

    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', document, true); // Use document directly instead of document.substring(document.lastIndexOf('/') + 1)
        xhr.send(null);
      });

      const ref = firebase.storage().ref().child(document1); // Use document1 directly as filename
      await ref.put(blob);
      setUploading(false);
      Alert.alert('Document Uploaded!');
      setDocument(null);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // Function to clear the picked document
  const clearDocument = () => {
    setDocument(null);
    setDocument1(null);
  };

  // Render the component UI
  return (
    <View style={styles.container}>
      <Button title="Select a document" onPress={pickDocument} />
      {document && (
        <View style={styles.documentContainer}>
          <Text style={styles.document}>{document1}</Text>
          <TouchableOpacity onPress={clearDocument}>
            <AntDesign name="closecircle" size={20} color="grey" />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.uploadButton} onPress={uploadDocument} disabled={!document}>
        <Text style={styles.buttonText}>Upload Document</Text>
      </TouchableOpacity>
    </View>
  );
}

// Define component styles using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  documentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  document: {
    marginVertical: 10,
    marginRight: 10,
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
