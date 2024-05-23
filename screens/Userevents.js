import React, { useState, useEffect } from 'react';
import { View, Modal, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase'; // Import your Firebase configuration
import { encode } from 'base-64';

export default function Userevents({ route }) {
  const { userEmail } = route.params; // Get the userEmail from the route params
  const encodedEmail = encode(userEmail);
  const eventsRef = ref(db, `users/${encodedEmail}/events`);

  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Fetch events from Firebase when the component mounts
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const eventsArray = Object.entries(data).map(([id, event]) => ({
          id,
          ...event,
          start: new Date(event.start),
          end: new Date(event.end)
        }));
        setEvents(eventsArray);
      } else {
        setEvents([]);
      }
    });
  }, []);

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Calendar
        events={events}
        height={600}
        onPressEvent={handleEventPress}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedEvent && (
              <>
                <Text style={styles.detailText}>Subject Name: {selectedEvent.title}</Text>
                <Text style={styles.detailText}>ClassRoom: {selectedEvent.location}</Text>
                <Text style={styles.detailText}>Teacher: {selectedEvent.Teacher}</Text>
                
              </>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: 'red', textAlign: 'right' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  detailText: {
    marginBottom: 10,
    fontSize: 16,
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});
