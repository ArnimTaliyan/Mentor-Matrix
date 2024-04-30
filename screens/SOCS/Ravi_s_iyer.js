import { View, Text, Image, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Ravi_s_iyer = ({ navigation }) => {
  const handleEmailPress = () => {
    Linking.openURL('https://in.linkedin.com/in/ravi-s-iyer-13a55310');
  };
  const handleGetInTouchPress = () => {
    Linking.openURL('mailto:amar.jindal@ddn.upes.ac.in');
  };


  const [isExpandedSummary, setIsExpandedSummary] = useState(false);
  const [isExpandedExperience, setIsExpandedExperience] = useState(false);
  const [isExpandedResearch, setIsExpandedResearch] = useState(false);
  const [isExpandedCourses, setIsExpandedCourses] = useState(false);
  const [isExpandedScholarly, setIsExpandedScholarly] = useState(false);
  const [isExpandedMentoring, setIsExpandedMentoring] = useState(false);

  const toggleExpandSummary = () => {
    setIsExpandedSummary(!isExpandedSummary);
    setIsExpandedExperience(false);
    setIsExpandedResearch(false);
    setIsExpandedCourses(false);
    setIsExpandedScholarly(false); // Close Scholarly Activities container
    setIsExpandedMentoring(false);
  };

  const toggleExpandExperience = () => {
    setIsExpandedExperience(!isExpandedExperience);
    setIsExpandedSummary(false);
    setIsExpandedResearch(false);
    setIsExpandedCourses(false);
    setIsExpandedScholarly(false); // Close Scholarly Activities container
    setIsExpandedMentoring(false);
  };

  const toggleExpandResearch = () => {
    setIsExpandedResearch(!isExpandedResearch);
    setIsExpandedSummary(false);
    setIsExpandedExperience(false);
    setIsExpandedCourses(false);
    setIsExpandedScholarly(false); // Close Scholarly Activities container
    setIsExpandedMentoring(false);
  };

  const toggleExpandCourses = () => {
    setIsExpandedCourses(!isExpandedCourses);
    setIsExpandedSummary(false);
    setIsExpandedExperience(false);
    setIsExpandedResearch(false);
    setIsExpandedScholarly(false); // Close Scholarly Activities container
    setIsExpandedMentoring(false);
  };

  const toggleExpandScholarly = () => { // New function
    setIsExpandedScholarly(!isExpandedScholarly);
    setIsExpandedSummary(false);
    setIsExpandedExperience(false);
    setIsExpandedResearch(false);
    setIsExpandedCourses(false);
    setIsExpandedMentoring(false);
  };
  const toggleExpandMentoring = () => { // Added function for Mentoring
    setIsExpandedMentoring(!isExpandedMentoring);
    setIsExpandedSummary(false);
    setIsExpandedExperience(false);
    setIsExpandedResearch(false);
    setIsExpandedCourses(false);
    setIsExpandedScholarly(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar backgroundColor='rgba(36, 39, 96, 0.05)' />
      <View style={{ position: 'relative', width: '100%', height: '100%' }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 20, left: 20, zIndex: 999 }}>
          <Ionicons name="chevron-back-outline" size={24} color="#242760" />
        </TouchableOpacity>
        <ScrollView>
          <Image source={require('../../assets/images/upes.jpeg')} resizeMode='cover' style={{ marginTop: -60, height: 268, width: "120%", }} />
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={require('../../assets/images/Ravi_s_iyer.png')} resizeMode='contain' style={{ height: 190, width: 190, borderRadius: 999, borderColor: '#242760', borderWidth: 2, marginTop: -120 }} />
            <Text style={{ fontSize: 26, color: '#242760', marginVertical: 8 }}>Dr Ravi S Iyer</Text>
            <Text style={{ fontSize: 14, color: 'grey' }}>Dean, School of Computer Science</Text>
            <TouchableOpacity onPress={() => navigation.push('Schedule')} style={{ flexDirection: "row", marginVertical: 6, alignItems: 'center' }}>
  <Ionicons name='calendar-outline' size={20} color={'grey'} />
  <Text style={{ fontSize: 14, marginLeft: 4, color: 'grey' }}>10108</Text>
</TouchableOpacity>
            <TouchableOpacity onPress={handleEmailPress} style={{ flexDirection: "row", marginVertical: 6, alignItems: 'center' }}>
  <Ionicons name='logo-linkedin' size={24} color={'grey'} />
  <Text style={{ fontSize: 14, marginLeft: 4, color: 'grey' }}>LinkedIn</Text>
</TouchableOpacity>

          </View>
          {isExpandedSummary ? (
            <TouchableOpacity onPress={toggleExpandSummary} style={styles.summaryContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.summaryHText}>Profile Summary</Text>
                <Ionicons name={'chevron-up-outline'} size={24} color="black" />
              </View>
              <Text style={styles.summaryText}>
              Dr. Ravi Shankar brings over 30 years of global experience in transforming ideas into viable and scalable products and businesses. He joins us as the Dean, of the School of Computer Science. He is an expert in conceptualising, designing, developing, and managing large-scale and complex distribution systems, Artificial Intelligence, and leveraging technologies for operational efficiencies and resilience.

He graduated from IIT Madras in 1985 and completed his MS and Ph.D. from the Indian Institute of Science in 1989 and 1993 respectively.

Prior to this, he was associated with Siemens, Motorola, and Conexant, leading product development and management teams across four continents, and multiple market and sectors (telecom, healthcare, and fintech). He has managed revenue streams of more than USD 100 Million and created award-winning products (e.g., TMC magazine’s internet telephony product of the year 2002). Dr. Shankar has also founded or mentored over 30 start-ups.

Dr. Ravi Shankar is the inventor of PoMA (Proof-of-Match Adaptive), a fast, fair, and quantum-resistant leader-election mechanism for high-speed distributed systems (e.g., high-speed blockchain).              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={toggleExpandSummary} style={styles.summaryContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.summaryHText}>Profile Summary </Text>
                <Ionicons name={'chevron-down-outline'} size={24} color="black" />
              </View>
            </TouchableOpacity>
          )}


        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  summaryContainer: {
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 10,
    marginVertical: 4,
    paddingHorizontal: 15,
  },
  summaryText: {
    fontSize: 18,
    color: 'white',
  },
  summaryHText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  getInTouchButton: {
    backgroundColor: '#4E4E9C',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 20,
    alignSelf: 'center',
  },
  getInTouchButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Ravi_s_iyer;
