import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Profiles() {
  // Example project data
  const projects = [
    { name: 'Project A', numberOfProjects: 5 },
    { name: 'Project B', numberOfProjects: 3 },
    { name: 'Project C', numberOfProjects: 8 },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
        {/* Cover Image */}
        <Image
            source={require('../assets/images/bg.jpeg')}
            style={styles.coverImage}
          />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          
          
          
          {/* Profile Image */}
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../assets/images/upes.jpeg')}
              style={styles.profileImage}
            />
          </View>

          {/* Main Content Container */}
          <View style={styles.mainContentContainer}>
           

            {/* Projects Container */}
            <View style={styles.projectsContainer}>
                <View style={styles.profileInfoTextContainer}>
                    <Text style={styles.profileInfoText}>John Doe</Text>
                    <Text style={styles.profileInfoTextd}>University of Petroleum and Energy Studies</Text>
                    <Text style={styles.profileInfoTextd}>Software Engineer</Text>
                </View>
                <View style={styles.iconsRow}>
                <Ionicons name="location" size={25} color="#000" style={styles.icon} />
                <Ionicons name="logo-linkedin" size={25} color="#295094" style={styles.icon} />
                <Ionicons name="paper-plane" size={25} color="#000" style={styles.icon} />
              </View>
              <Text style={{ fontWeight: 'bold', fontSize: 30, marginTop: 20 }}>Bio</Text>
              <View style={styles.bioContentContainer}>
                <Text>Bio content goes here...</Text>
              </View>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Projects</Text>
              {projects.map((project, index) => (
                <View key={index} style={styles.projectItem}>
                  <Text style={styles.projectName}>{project.name}</Text>
                </View>
              ))}
            </View>

            {/* Announcement Section */}
            <View style={styles.announcementContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Announcement</Text>
              <Text style={{ marginTop: 10 }}>Your announcement content goes here...</Text>
            </View>
          </View>

          {/* IonIcons on top left */}
          <View style={styles.iconContainer}>
            <Ionicons name="chevron-back-outline" size={30} color="#000" />
          </View>

          {/* IonIcons on top right */}
          <View style={[styles.iconContainer, { right: 20 }]}>
            <Ionicons name="settings-outline" size={30} color="#000" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    zIndex: 2,
    
  },
  scrollContainer: {
    flexGrow: 1,
  },
  coverImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1000,
    resizeMode: 'cover',
  },
  profileImageContainer: {
    position: 'absolute',
    top: 120,
    left: '50%',
    marginLeft: -50,
    zIndex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
  mainContentContainer: {
    marginTop: 240,
    paddingHorizontal: 20,
  },
  profileInfoTextContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  profileInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileInfoTextd: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'grey',
    marginBottom: 5,
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    zIndex: 1,
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  bioContentContainer: {
    marginTop: 10,
  },
  projectsContainer: {
    width: '100%', // Adjust width as needed
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  projectItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  projectName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  announcementContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: 15,
  },
});
