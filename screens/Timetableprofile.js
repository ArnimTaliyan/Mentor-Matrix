import React from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, Alert } from 'react-native';
import TimeTableView, { genTimeBlock } from 'react-native-timetable';

// Your events data
const events_data = [
  {
    title: "S/w Engg Lab",
    startTime: genTimeBlock("TUE", 15),
    endTime: genTimeBlock("TUE", 16, 55),
    location: "Classroom B9-CCC-01",
    extra_descriptions: ["CCVT- B3"],
    },
    {
      title: "S/w Engg",
      startTime: genTimeBlock("WED", 12),
      endTime: genTimeBlock("WED", 13, 55),
      location: "Classroom 4004",
      extra_descriptions: ["CCVT- B5+B6"],
      },
      {
        title: "S/w Engg",
        startTime: genTimeBlock("THU", 12),
        endTime: genTimeBlock("THU", 13, 55),
        location: "Classroom 4004",
        extra_descriptions: ["CCVT- B5+B6"],
        },
        {
          title: "Web Technologies",
          startTime: genTimeBlock("THU", 14),
          endTime: genTimeBlock("THU", 15, 55),
          location: "Classroom 4104",
          extra_descriptions: ["CSF-B5"],
          },
          {
            title: "Web Technologies",
            startTime: genTimeBlock("FRI", 10),
            endTime: genTimeBlock("FRI", 11, 55),
            location: "Classroom 10005",
            extra_descriptions: ["CSF-B5"],
            },
  
  
  
  
];

const Timetableprofile = () => {
  // Define the number of days and pivot date
  const numOfDays = 6;
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