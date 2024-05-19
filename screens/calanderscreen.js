import React, { useState, useEffect } from 'react';
import { View, Modal, Text,TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import { ref, set, onValue } from 'firebase/database';
import { db } from '../firebase'; // Import your Firebase configuration
import { useNavigation } from '@react-navigation/native';
import { encode } from 'base-64';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CalendarScreen({ route }) {
  const navigation = useNavigation();
  const { userEmail } = route.params; // Get the userEmail from the route params
  const encodedEmail = encode(userEmail);
  const eventsRef = ref(db, `users/${encodedEmail}/events`);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    startTime: new Date(), // Set default start time
    endTime: new Date(),   // Set default end time
    location: '',
    Teacher: ''
  });
  const [events, setEvents] = useState([]);
  const [commonDate, setCommonDate] = useState(''); // State for common date
  const [showStartTimePicker, setShowStartTimePicker] = useState(false); // State for showing start time picker
  const [showEndTimePicker, setShowEndTimePicker] = useState(false); // State for showing end time picker

  useEffect(() => {
    // Fetch events from Firebase when the component mounts
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const eventsArray = Object.values(data).map(event => ({
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

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setModalVisible(true);
  };

  const handleSaveEvent = () => {
    const startDateTime = new Date(`${commonDate}T${newEvent.startTime.getHours()}:${newEvent.startTime.getMinutes()}`);
    const endDateTime = new Date(`${commonDate}T${newEvent.endTime.getHours()}:${newEvent.endTime.getMinutes()}`);

    if (isNaN(startDateTime) || isNaN(endDateTime)) {
      console.error('Invalid date format. Please use a valid date format.');
      return;
    }

    const eventToSave = {
      ...newEvent,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString()
    };

    const newEventRef = ref(db, `users/${encodedEmail}/events/${new Date().getTime()}`);
    set(newEventRef, eventToSave)
      .then(() => {
        setModalVisible(false);
        setNewEvent({
          title: '',
          startTime: new Date(),
          endTime: new Date(),
          location: '',
          Teacher: ''
        });
      })
      .catch((error) => {
        console.error('Error saving event:', error);
      });
  };

  const handleStartTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || newEvent.startTime;
    setShowStartTimePicker(Platform.OS === 'ios');
    setNewEvent({ ...newEvent, startTime: currentTime });
  };

  const handleEndTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || newEvent.endTime;
    setShowEndTimePicker(Platform.OS === 'ios');
    setNewEvent({ ...newEvent, endTime: currentTime });
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
            {selectedEvent ? (
              <>
                <Text style={styles.detailText}>Subject Name: {selectedEvent.title}</Text>
                <Text style={styles.detailText}>ClassRoom: {selectedEvent.location}</Text>
                <Text style={styles.detailText}>Teacher: {selectedEvent.Teacher}</Text>
              </>
            ) : (
              <>
                <TextInput
                  placeholder="Subject" 
                  placeholderTextColor="darkgrey"               
                  value={newEvent.title}
                  onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Location"
                  placeholderTextColor="darkgrey"
                  value={newEvent.location}
                  onChangeText={(text) => setNewEvent({ ...newEvent, location: text })}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Teacher"
                  placeholderTextColor="darkgrey"
                  value={newEvent.Teacher}
                  onChangeText={(text) => setNewEvent({ ...newEvent, Teacher: text })}
                  style={styles.input}
                />
                <TextInput
                  placeholder="(e.g., 2024-05-18)"
                  placeholderTextColor="darkgrey"
                  value={commonDate}
                  onChangeText={(text) => setCommonDate(text)}
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
                  <Text style={{ color: 'blue' }}>Select Start Time</Text>
                  {showStartTimePicker && (
        <DateTimePicker
          value={newEvent.startTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleStartTimeChange}
        />
      )}
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
                  <Text style={{ color: 'blue' }}>Select End Time</Text>
                  {showEndTimePicker && (
        <DateTimePicker
          value={newEvent.endTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleEndTimeChange}
        />
      )}
                </TouchableOpacity>


                
                <TouchableOpacity onPress={handleSaveEvent}>
                  <Text style={{ color: 'blue' }}>Save Event</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: 'red', textAlign: 'right' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      
      <TouchableOpacity onPress={handleAddEvent} style={styles.uploadButton}>
        <Text style={{ color: 'white' }}>Add Event</Text>
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
  detailText: {
    marginBottom: 10,
    fontSize: 16,
    justifyContent: 'center',
  },
});


