import { View, Text, Image, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Sonal_singh = ({ navigation }) => {
  const handleEmailPress = () => {
    Linking.openURL('https://in.linkedin.com/in/sonalsingh11');
  };
  const handleGetInTouchPress = () => {
    Linking.openURL('mailto:sonal.singh@ddn.upes.ac.in');
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
            <Image source={require('../assets/images/sonal_singh.png')} resizeMode='contain' style={{ height: 190, width: 190, borderRadius: 999, borderColor: '#242760', borderWidth: 2, marginTop: -120 }} />
            <Text style={{ fontSize: 26, color: '#242760', marginVertical: 8 }}>Sonal Singh</Text>
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
              Professor Sonal Singh is a highly skilled and seasoned multidisciplinary designer with over 10 years of industrial design experience. Her expertise spans various industries, including consumer appliances, lighting, lifestyle, and interior design. The diverse range of experiences has endowed her with a broad perspective on design, enabling her to approach projects from multiple vantage points and craft solutions that are not only impactful but also infused with innovation and purpose.
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
              Before joining UPES, Prof. Sonal was the Industrial Design lead for Kohler India and led the Faucet category and CMF. She also worked for Whirlpool of India, as Design Manager leading the Direct Cool -Single door category.
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
              Indian Aesthetics, Design in India, Craft innovation
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
              Prof. Sonal teaches both skill-based and knowledge-based courses. Her expertise extends to teaching essential disciplines such as Form Studies, Elements of Design, Product Styling, and Computer Applications. Additionally, she shares her passion for design through elective courses that delve into fascinating areas such as Packaging Design, Toy Design, and Wearables.
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
                <Text style={styles.summaryHText}>Teaching Philosophy</Text>
                <Ionicons name={'chevron-up-outline'} size={24} color="black" />
              </View>
              <Text style={styles.summaryText}>
              Prof. Sonal’s teaching philosophy revolves around incorporating real-life experiences into the classroom. Having worked extensively in the industry, she brings practical knowledge involved in designing products for mass production to the classroom, preparing students for professional challenges.

</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={toggleExpandScholarly} style={styles.summaryContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.summaryHText}>Teaching Philosophy</Text>
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

export default Sonal_singh;
