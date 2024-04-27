import { View, Text, Image, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Alok_negi = ({ navigation }) => {
  const handleEmailPress = () => {
    Linking.openURL('https://in.linkedin.com/in/alok-negi-a0633513');
  };
  const handleGetInTouchPress = () => {
    Linking.openURL('mailto:alok.negi@ddn.upes.ac.in');
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
          <Image source={require('../assets/images/upes.jpeg')} resizeMode='cover' style={{ marginTop: -60, height: 268, width: "120%", }} />
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={require('../assets/images/alok_negi.png')}  style={{ height: 190, width: 190, borderRadius: 999, borderColor: '#242760', borderWidth: 2, marginTop: -120 }} />
            <Text style={{ fontSize: 26, color: '#242760', marginVertical: 8 }}>Alok Negi</Text>
            <Text style={{ fontSize: 14, color: 'grey' }}>Assistant Professor</Text>
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
              Professor Alok Negi is a highly-accomplished technologist and educationist specializing in Artificial Intelligence, Machine Learning, Data Analytics, and IBM Mainframe Technology. His deep understanding of these areas enables him to stay at the forefront of industry advancements and incorporate cutting-edge knowledge into his teaching methodologies. With a strong educational background, including a B. Tech in Information Technology, M.Tech in Computer Science & Engineering, and a Ph.D. (CSE) from NIT Uttarakhand, he brings extensive knowledge and expertise to his teaching and research endeavours. Passionate about both research and teaching, Professor Negi possesses exceptional educational, analytical, and technical skills. His commitment to excellence is evident in his ability to effectively deliver theory and lab courses, develop comprehensive course material, and assess student performance through quizzes, tests, and examinations. With a keen focus on leveraging technology and innovative teaching methodologies, Professor Negi ensures that his students receive a comprehensive and industry-relevant education. By integrating real-world examples and practical applications into his teaching, he equips students with the necessary skills and knowledge to excel in their future careers.

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
              Before joining UPES, Prof. Negi has worked as IBM Program Training Consultant at Edunet Foundation, Gurgaon in alliance with IBM and Directorate General of Training, Ministry of Skill Development and Entrepreneurship at National Skill Training Institute, Dehradun, where he trained students in the IBM Program and delivered master classes in AI/ML domains. He also worked with IMS Unison University, Quantum University and DBS as an Assistant Professor. His industry experience includes working as a Software Engineer at NIIT Technologies Ltd, where he successfully coordinated with clients and onsite teams for software development.

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
              Artificial Intelligence I Machine Learning I Deep Learning I Computer Vision I Evolutionary Algorithms I Biomedical I Image and Video processing I Cloud Computing I Data Analytics

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
              Prof. Alok possesses strong technical skills, including proficiency in Python, data analytics, MYSQL, ORACLE, IBM Mainframe Technology, object-oriented programming, and various tools and utilities. He is experienced in working with platforms like Anaconda, Google Colab, MongoDB, and IBM Cloud, etc. His teaching interests encompass a wide range of subjects, such as artificial intelligence, machine learning, deep learning, business analytics, DBMS, operating systems, data structures and algorithms, and software engineering.

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
                <Text style={styles.summaryHText}>Teaching Philosophy
</Text>
                <Ionicons name={'chevron-up-outline'} size={24} color="black" />
              </View>
              <Text style={styles.summaryText}>
              Prof. Alok’s teaching philosophy revolves around creating an engaging and student-centered learning environment that fosters critical thinking, creativity, and a passion for lifelong learning. He believes that education is a transformative journey that goes beyond the transmission of information; it is about empowering students to become independent thinkers, problem solvers, and active contributors to society.

</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={toggleExpandScholarly} style={styles.summaryContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.summaryHText}>Teaching Philosophy
</Text>
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

export default Alok_negi;
