import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { db } from '../firebase';

const Announcement = () => {
  const [announcementText, setAnnouncementText] = useState('');
  const [announcements, setAnnouncements] = useState([]);

  // Fetch announcements from Firebase database on component mount
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const snapshot = await db.ref('announcements').once('value');
        const announcementsData = snapshot.val();
        if (announcementsData) {
          const announcementsArray = Object.values(announcementsData);
          setAnnouncements(announcementsArray);
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleUploadAnnouncement = async () => {
    try {
      if (!announcementText.trim()) {
        Alert.alert('Error', 'Please enter announcement text');
        return;
      }
  
      await db.ref('announcements').push({
        text: announcementText.trim(),
        timestamp: new Date().toISOString()
      });
  
      setAnnouncementText('');
      Alert.alert('Success', 'Announcement uploaded successfully');
    } catch (error) {
      console.error('Error uploading announcement:', error);
      Alert.alert('Error', 'Failed to upload announcement. Please try again.');
    }
  };
  
  
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, padding: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <AntDesign name="pushpin" size={24} color="#7289DA" style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#7289DA' }}>Announcements</Text>
        </View>
        <TextInput
          style={{ borderWidth: 1, borderColor: '#7289DA', padding: 10, marginBottom: 20, borderRadius: 5 }}
          placeholder="Enter announcement text"
          value={announcementText}
          onChangeText={text => setAnnouncementText(text)}
        />
        <TouchableOpacity
          style={{ backgroundColor: '#7289DA', padding: 12, borderRadius: 5, alignItems: 'center' }}
          onPress={handleUploadAnnouncement}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Post Announcement</Text>
        </TouchableOpacity>
        {/* Render posted announcements */}
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Posted Announcements:</Text>
          {announcements.map((announcement, index) => (
            <Text key={index} style={{ marginBottom: 5 }}>{announcement.text}</Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Announcement;
