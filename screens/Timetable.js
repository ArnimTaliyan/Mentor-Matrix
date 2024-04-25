// Import necessary modules
import React from 'react';
import { SafeAreaView, StyleSheet, View, Alert } from 'react-native';
import TimeTableView, { genTimeBlock } from 'react-native-timetable';


// Your events data
const events_data = [
    {
      title: "Math",
      startTime: genTimeBlock("MON", 9),
      endTime: genTimeBlock("MON", 10, 50),
      location: "Classroom 403",
      extra_descriptions: ["Kim", "Lee"],
    },
    {
      title: "AD",
      startTime: genTimeBlock("WED", 9,0),
      endTime: genTimeBlock("WED", 10, 50),
      location: "Room no. 11114",
      extra_descriptions: ["Mitali Chugh"],
    },
    {
      title: "Physics",
      startTime: genTimeBlock("MON", 11),
      endTime: genTimeBlock("MON", 11, 50),
      location: "Lab 404",
      extra_descriptions: ["Einstein"],
    },
    {
      title: "Physics",
      startTime: genTimeBlock("WED", 11),
      endTime: genTimeBlock("WED", 11, 50),
      location: "Lab 404",
      extra_descriptions: ["Einstein"],
    },
    {
      title: "Mandarin",
      startTime: genTimeBlock("TUE", 9),
      endTime: genTimeBlock("TUE", 10, 50),
      location: "Language Center",
      extra_descriptions: ["Chen"],
    },
    {
      title: "Japanese",
      startTime: genTimeBlock("FRI", 9),
      endTime: genTimeBlock("FRI", 10, 50),
      location: "Language Center",
      extra_descriptions: ["Nakamura"],
    },
    {
      title: "Club Activity",
      startTime: genTimeBlock("THU", 9),
      endTime: genTimeBlock("THU", 10, 50),
      location: "Activity Center",
    },
    {
      title: "Club Activity",
      startTime: genTimeBlock("FRI", 13, 30),
      endTime: genTimeBlock("FRI", 14, 50),
      location: "Activity Center",
    },
    {
        title: "sex",
        startTime: genTimeBlock("TUE", 13, 0),
        endTime: genTimeBlock("TUE", 14, 60),
        location: "Activity Center",
      },
  ];

// Your Timetable component
const Timetable = () => {
  // Define the number of days and pivot date
  const numOfDays = 5;
  const pivotDate = genTimeBlock('mon');

  // Function to handle event press
  const handleEventPress = (event) => {
    Alert.alert("onEventPress", JSON.stringify(event));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* TimeTableView component */}
        <TimeTableView
          events={events_data}
          pivotTime={9} // Set pivot time to 9:00 AM (as a number)
          pivotDate={pivotDate}
          numberOfDays={numOfDays}
          onEventPress={handleEventPress}
          headerStyle={styles.headerStyle}
          formatDateHeader="dddd" // Change to "dddd" for English full day names
          locale="en" // Set locale to English
          nDays={numOfDays}
          formatTimeLabel={(time) => `${time.hour}:${time.minute < 10 ? '0' : ''}${time.minute} ${time.isAM ? 'AM' : 'PM'}`} // Format time with AM/PM
        />
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'blue'
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
});

export default Timetable;
