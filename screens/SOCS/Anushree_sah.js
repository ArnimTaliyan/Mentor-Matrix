import { View, Text, Image, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Anushree_sah = ({ navigation }) => {
  const handleEmailPress = () => {
    Linking.openURL('https://in.linkedin.com/in/anushree-sah-a5bba112a');
  };
  const handleGetInTouchPress = () => {
    Linking.openURL('mailto:asah@ddn.upes.ac.in');
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
            <Image source={require('../../assets/images/Anushree_sah.png')} resizeMode='contain' style={{ height: 190, width: 190, borderRadius: 999, borderColor: '#242760', borderWidth: 2, marginTop: -120 }} />
            <Text style={{ fontSize: 26, color: '#242760', marginVertical: 8 }}>Anushree Sah
</Text>
            <Text style={{ fontSize: 14, color: 'grey' }}>Assistant Professor (Selection Grade)</Text>
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
              Anushree Sah is an Assistant Professor (Selection Grade) in the School of Computer Science. She earned her Bachelor of Technology in Computer Science, her Master of Science in Web Technology, and her PhD in Computer Science Engineering. She is equipped with strong analytical, problem-solving, and communication skills, she excels in leveraging her expertise to drive organizational growth.

She specializes in Programming Languages, Web Technologies, Building Enterprise Application, Service Oriented Computing and Cloud Computing. She has several research papers and conference proceedings in reputed journals. In addition to her academic interests, she has mentored and taught students throughout her career in a variety of areas.
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
              Dr. Ahuja has had over 24+ years of experience in academics, with over 17+ years being at UPES. Her experience span, teaching computer science courses, both at postgraduate and undergraduate levels. She had started her career in Andhra Pradesh as a Systems Associate in the software development domain, working there for a little over two years, before moving on to academics.
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
              AI and ML-based applications, AI applications in Education and Health care, Intelligent Tutoring Systems, Blockchain Technology, and Object-Oriented Development.
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
              Professor Neelu Ahuja teaches Artificial Intelligence, Operating Systems, Object Oriented Analysis and Design, Object Oriented Programming, Cloud Computing Fundamentals and Virtualization Basics. Under Cloud Fundamentals course, she also teaches different cloud delivery and deployment models further deepening into cloud workload suitability concepts. Under virtualization basics, she teaches different types of virtualizations.
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
              She has successfully delivered R&D Projects sponsored by the Department of Science and Technology (DST), in the capacity of Principal Investigator, under various schemes such as TIDE (Technology Interventions for Disabled and Elderly), CSRI (Cognitive Science Research Initiative), SEED (Science for Equity, Empowerment and Development, TSP, etc. The total grant across six R&D projects is about 1.5 crores. She has published 70+ papers in reputed journals and conferences at international and national levels. Some of the journals, that she has published are Journal of Human-Computer Interaction, Medical and Biological Engineering and Computing, Journal of Computing in Higher Education, Disability and Rehabilitation: Assistive Technology, Journal of Network and Computer Applications, IEEE Access. She is a member of professional societies such as IEEE, ACM, and ACM-Women. She is IRCA & CQI Certified ISO-27001:2013 Lead Auditor (from BSI).

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

export default Anushree_sah;
