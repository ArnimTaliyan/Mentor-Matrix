import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import { events } from './events'; // Import events data

export default function CalendarScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            {selectedEvent && (
              <>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{selectedEvent.title}</Text>
                <Text>{selectedEvent.location}</Text>
                <Text>{selectedEvent.Teacher}</Text>
                {/* You can add more event details here */}
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={{ marginTop: 10, alignSelf: 'flex-end' }}
                >
                  <Text style={{ color: 'blue' }}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
