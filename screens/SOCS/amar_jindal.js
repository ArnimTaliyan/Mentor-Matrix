import { View, Text, Image, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Amar_jindal = ({ navigation }) => {
  const handleEmailPress = () => {
    Linking.openURL('https://in.linkedin.com/in/amarjindalnitp');
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
            <Image source={require('../../assets/images/amar_jindal.jpg')} resizeMode='contain' style={{ height: 190, width: 190, borderRadius: 999, borderColor: '#242760', borderWidth: 2, marginTop: -120 }} />
            <Text style={{ fontSize: 26, color: '#242760', marginVertical: 8 }}>Amar Jindal</Text>
            <Text style={{ fontSize: 14, color: 'grey' }}>Assistant Professor</Text>
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
                Amar Jindal submitted his Ph.D. thesis to National Institute of Technology Patna (NITP) in May 2023. The title of his Ph.D. thesis is ‘Offline Handwritten Text Recognition in Ancient Documents in Indian Scripts’. He has completed (2018-2020) his M.Tech-IT from NITP and B.Tech-IT (2011-2015) from Guru Gobind Singh Indraprastha University, Delhi.
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={toggleExpandSummary} style={styles.summaryContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.summaryHText}>Profile Summary </Text>
                <Ionicons name={'chevron-down-outline'} size={24} color="black" />
              </View>
            </TouchableOpacity>
          )}

          {isExpandedExperience ? (
            <TouchableOpacity onPress={toggleExpandExperience} style={styles.summaryContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.summaryHText}>Work Experience</Text>
                <Ionicons name={'chevron-up-outline'} size={24} color="black" />
              </View>
              <Text style={styles.summaryText}>
                Amar Jindal has industrial work experience as a Senior Analyst at Capgemini Pune from March 2016 – November 2017. Besides creating documents, test cases, test scripts, test suits, and plans, he was in charge of lab infrastructure for deployment and troubleshooting.
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={toggleExpandExperience} style={styles.summaryContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.summaryHText}>Work Experience </Text>
                <Ionicons name={'chevron-down-outline'} size={24} color="black" />
              </View>
            </TouchableOpacity>
          )}

          {isExpandedResearch ? (
            <TouchableOpacity onPress={toggleExpandResearch} style={styles.summaryContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.summaryHText}>Research Interests</Text>
                <Ionicons name={'chevron-up-outline'} size={24} color="black" />
              </View>
              <Text style={styles.summaryText}>
                Computer Vision | Machine Learning | Deep Learning
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={toggleExpandResearch} style={styles.summaryContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.summaryHText}>Research Interests</Text>
                <Ionicons name={'chevron-down-outline'} size={24} color="black" />
              </View>
            </TouchableOpacity>
          )}

          {isExpandedCourses ? (
            <TouchableOpacity onPress={toggleExpandCourses} style={styles.summaryContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.summaryHText}>Courses Taught</Text>
                <Ionicons name={'chevron-up-outline'} size={24} color="black" />
              </View>
              <Text style={styles.summaryText}>
              Amar Jindal teaches Software Engineering, Programming with C, and Machine Learning.
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={toggleExpandCourses} style={styles.summaryContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.summaryHText}>Courses Taught</Text>
                <Ionicons name={'chevron-down-outline'} size={24} color="black" />
              </View>
            </TouchableOpacity>
          )}

{isExpandedScholarly ? (
            <TouchableOpacity onPress={toggleExpandScholarly} style={styles.summaryContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.summaryHText}>Scholarly Activities</Text>
                <Ionicons name={'chevron-up-outline'} size={24} color="black" />
              </View>
              <Text style={styles.summaryText}>
              Amar Jindal has published research articles in reputed journals. He has been associated with IEEE membership. Amar Jindal has delivered 9 hours of lecture on ‘Introduction to Machine Learning’ during the workshop on ‘Applications of Artificial Intelligence in Healthcare’ at Sikkim Manipal University. He has also delivered 27 hours of expert lectures as a chief resource person on various topics during the ‘AI & Healthcare Workshop’ at KIIT School of Public Health.
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={toggleExpandScholarly} style={styles.summaryContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.summaryHText}>Scholarly Activities</Text>
                <Ionicons name={'chevron-down-outline'} size={24} color="black" />
              </View>
            </TouchableOpacity>
          )}

{isExpandedMentoring ? (
            <TouchableOpacity onPress={toggleExpandMentoring} style={styles.summaryContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.summaryHText}>Projects Mentoring</Text>
                <Ionicons name={'chevron-up-outline'} size={24} color="black" />
              </View>
              <Text style={styles.summaryText}>
                Mentor Matrix | EchoSense | Session based song recommendation
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={toggleExpandMentoring} style={styles.summaryContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.summaryHText}>Projects Mentoring</Text>
                <Ionicons name={'chevron-down-outline'} size={24} color="black" />
              </View>
            </TouchableOpacity>
          )}
           <TouchableOpacity onPress={handleGetInTouchPress} style={styles.getInTouchButton}>
            <Text style={styles.getInTouchButtonText}>Get in Touch</Text>
          </TouchableOpacity>
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

export default Amar_jindal;
