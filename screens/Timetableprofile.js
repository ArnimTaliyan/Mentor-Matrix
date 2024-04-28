import React from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, Alert } from 'react-native';
import TimeTableView, { genTimeBlock } from 'react-native-timetable';

// Your events data
const events_data = [
  {
    title: "System Provisioning and Config.",
    startTime: genTimeBlock("MON", 10),
    endTime: genTimeBlock("MON", 11, 60),
    location: "Classroom 11112",
    extra_descriptions: ["Hitesh"],
    },
  {
      title: "Applied Devops",
      startTime: genTimeBlock("MON", 13),
      endTime: genTimeBlock("MON", 14, 50),
      location: "Classroom 11114",
      extra_descriptions: ["Mitali", "chugh"],
    },
  {
      title: "Test Automation Lab",
      startTime: genTimeBlock("MON", 15),
      endTime: genTimeBlock("MON", 16, 50),
      location: "Classroom 10004",
      extra_descriptions: ["Divya", "Rose"],
    },
  {
      title: "Applied Devops",
      startTime: genTimeBlock("TUE", 13),
      endTime: genTimeBlock("TUE", 14, 50),
      location: "Classroom 11112",
      extra_descriptions: ["Mitali", "chugh"],
    },
  {
      title: "System Monitoring",
      startTime: genTimeBlock("TUE", 15),
      endTime: genTimeBlock("TUE", 16, 50),
      location: "Classroom 11112",
      extra_descriptions: ["Mitali", "chugh"],
    },
  {
      title: "System Monitoring Lab",
      startTime: genTimeBlock("WED", 13),
      endTime: genTimeBlock("WED", 14, 50),
      location: "Classroom 9208",
      extra_descriptions: ["Hitesh"],
    },
  {
      title: "System Monitoring",
      startTime: genTimeBlock("THU", 13),
      endTime: genTimeBlock("THU", 14, 50),
      location: "Classroom 11112",
      extra_descriptions: ["Hitesh"],
    },
  {
      title: "Test Automation",
      startTime: genTimeBlock("THU", 15),
      endTime: genTimeBlock("THU", 16, 50),
      location: "Classroom 11112",
      extra_descriptions: ["Alind"],
    },
  {
      title: "System Provisioning and Config.",
      startTime: genTimeBlock("FRI", 10),
      endTime: genTimeBlock("FRI", 11, 50),
      location: "Classroom 11112",
      extra_descriptions: ["Hitesh"],
      },
  {
     title: "EDGE",
     startTime: genTimeBlock("FRI", 12),
     endTime: genTimeBlock("FRI", 13, 50),
     location: "Classroom 11112",
     extra_descriptions: ["Sumit"],
      },
  {
     title: "Test Automation",
     startTime: genTimeBlock("FRI", 14),
     endTime: genTimeBlock("FRI", 15, 50),
     location: "Classroom 11112",
     extra_descriptions: ["Alind"],
        },
];

const Timetableprofile = () => {
  // Define the number of days and pivot date
  const numOfDays = 5;
  const pivotDate = genTimeBlock('mon');

  // Function to handle event press
  const handleEventPress = (event) => {
    Alert.alert("onEventPress", JSON.stringify(event));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView horizontal={true}>
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
            formatTimeLabel={(time) => `${time.hour}:${time.minute < 10 ? '0' : ''}${time.minute} ${time.isAM ? 'AM' : 'PM'}`} // Corrected syntax
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'blue'
  },
  container: {
    flexDirection: 'row', // Ensure horizontal layout
    width: 400,
    height: 1000, // Corrected typo
    backgroundColor: '#F8F8F8',
  },
});

export default Timetableprofile;