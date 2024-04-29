import { View, Text, Image, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Madhuben_sharma = ({ navigation }) => {
  const handleEmailPress = () => {
    Linking.openURL('https://in.linkedin.com/in/madhuben-sharma-57431b24');
  };
  const handleGetInTouchPress = () => {
    Linking.openURL('mailto:mbsharma@ddn.upes.ac.in');
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
            <Image source={require('../../assets/images/madhuben_sharma.png')}  style={{ height: 190, width: 190, borderRadius: 999, borderColor: '#242760', borderWidth: 2, marginTop: -120 }} />
            <Text style={{ fontSize: 26, color: '#242760', marginVertical: 8 }}>Dr. Madhuben Sharma</Text>
            <Text style={{ fontSize: 14, color: 'grey' }}>Assistant Professor (SG)</Text>
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
              Dr. Madhuben Sharma holds a doctorate in Surface water assessment of major water bodies in the Himalayan region from TERI School of Advanced Studies, New Delhi. Dr. Sharma boasts more than 20 years of teaching and research experience, with her primary area of research focusing on the application of statistical techniques in water resources engineering, the development of water quality index, and water quality modeling. Her research primarily revolves around the comprehensive assessment and analysis of the water quality of major water bodies in Uttarakhand State, such as River Ganga & Yamuna and Nainital Lake, through primary sampling, monitoring, and pollution source apportionment. Her research findings have been published in leading national and international journals, with a particular focus on Himalayan water bodies. Currently, she is the Principal Investigator for a UCOST-funded project titled “Water quality assessment of river Yamuna, Uttarakhand and its exposure assessment concerning water-borne diseases among the nearby community of River.” 
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
              Before joining UPES in 2012, Dr. Ranjan Mishra worked at the ICFAI University, Dehradun, Mody University, Laxmangarh – Rajasthan, and the National Institute of Science and Technology, Berhampur, Orissa. He was associated with the International Centre for Radio Science and ISRO Jodhpur as a research intern. In his previous workplace, he was involved in teaching and administrative work and coordinated many positions.

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
              Microstrip antenna | Cellular communication | Frequency-selective Surface.

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
              Dr. Ranjan Mishra teaches Analog and Digital Communication, Communication Systems, Satellite Communication, Wireless Communication, Data Communication and Networking, Cellular and Mobile Communication, Information theory and Coding, Microwave Engineering, Analog electronics, Antenna, and wave propagation in the undergraduate program. He is an active member of the course curriculum designing of the program.

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
              In addition to supervising multiple PhD students, Dr. Mishra boasts a prolific academic record, with over 50 Scopus-indexed publications and 10 SCI/SCIE indexed articles since obtaining his doctorate in 2016. He has also authored two textbooks and is a certified instructor for the university's Cisco networking course.

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

export default Madhuben_sharma;
