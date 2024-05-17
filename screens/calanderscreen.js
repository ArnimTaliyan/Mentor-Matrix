import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, SafeAreaView, TextInput, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import { updateEvents, getEvents } from './events'; // Import events data

export default function CalendarScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
    location: '',
    Teacher: '',
    day: ''
  });
  const [events, setEvents] = useState(getEvents());

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const handleAddEvent = () => {
    // Show the form modal
    setModalVisible(true);
  };

  const handleSaveEvent = () => {
    // Save the new event to the events state
    updateEvents(newEvent);
    setEvents(getEvents());
    setModalVisible(false);
    // Reset the new event state
    setNewEvent({
      title: '',
      start: new Date(),
      end: new Date(),
      location: '',
      Teacher: '',
      day: ''
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Calendar
        events={events}
        height={600}
        onPressEvent={handleEventPress} // Handle event click
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
            <TextInput
              placeholder="Title"
              value={newEvent.title}
              onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Location"
              value={newEvent.location}
              onChangeText={(text) => setNewEvent({ ...newEvent, location: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Teacher"
              value={newEvent.Teacher}
              onChangeText={(text) => setNewEvent({ ...newEvent, Teacher: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Day (e.g., Monday)"
              value={newEvent.day}
              onChangeText={(text) => setNewEvent({ ...newEvent, day: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Start Time (e.g., 10:00 AM)"
              value={newEvent.start}
              onChangeText={(text) => setNewEvent({ ...newEvent, start: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="End Time (e.g., 11:00 AM)"
              value={newEvent.end}
              onChangeText={(text) => setNewEvent({ ...newEvent, end: text })}
              style={styles.input}
            />
            {/* You can add more input fields for start and end time */}
            <TouchableOpacity onPress={handleSaveEvent}>
              <Text style={{ color: 'blue' }}>Save Event</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: 'red' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={handleAddEvent} style={styles.uploadButton}>
        <Text style={{ color: 'white' }}>Upload Event</Text>
      </TouchableOpacity>
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
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    
  },
  uploadButton: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    backgroundColor: '#4299E1',
    padding: 10,
    borderRadius: 5,
  },
});