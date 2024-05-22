import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Linking, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ref as databaseRef, get, onValue } from 'firebase/database';
import { useNavigation, useRoute } from '@react-navigation/native';
import { encode } from 'base-64';
import { storage, db } from '../firebase';

export default function Profile() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userEmail } = route.params;

  const [userName, setUserName] = useState('');
  const [userDepartment, setUserDepartment] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [userData, setUserData] = useState({});
  const [currentEventLocation, setCurrentEventLocation] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const encodedEmail = useMemo(() => encode(userEmail), [userEmail]);
  const userRef = useMemo(() => databaseRef(db, `users/${encodedEmail}`), [encodedEmail]);

  const subscriptionRef = useRef(null);

  const fetchUserData = useCallback(async () => {
    try {
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        setUserName(snapshot.child('name').val());
        setUserDepartment(snapshot.child('department').val());

        const userDataSnapshot = await get(databaseRef(db, `users/${encodedEmail}/userdata`));
        if (userDataSnapshot.exists()) {
          const userDataVal = userDataSnapshot.val();
          setUserData(userDataVal);
          if (userDataSnapshot.child('profileImageUrl').exists()) {
            setProfileImageUrl(userDataSnapshot.child('profileImageUrl').val());
          }
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [encodedEmail, userRef]);

  const fetchCurrentEventLocation = useCallback(async () => {
    const eventsRef = databaseRef(db, `users/${encodedEmail}/events`);
    try {
      const snapshot = await get(eventsRef);
      if (snapshot.exists()) {
        const events = snapshot.val();
        const now = new Date();
        for (const eventId in events) {
          const event = events[eventId];
          const eventStart = new Date(event.start);
          const eventEnd = new Date(event.end);
          if (now >= eventStart && now <= eventEnd) {
            setCurrentEventLocation(event.location);
            return;
          }
        }
      }
      setCurrentEventLocation('');
    } catch (error) {
      console.error('Error fetching current event location:', error);
    }
  }, [encodedEmail]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([fetchUserData(), fetchCurrentEventLocation()])
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  }, [fetchUserData, fetchCurrentEventLocation]);

  useEffect(() => {
    fetchUserData();
    fetchCurrentEventLocation();

    subscriptionRef.current = onValue(userRef, () => {
      fetchUserData();
      fetchCurrentEventLocation();
    });

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current();
        subscriptionRef.current = null;
      }
    };
  }, [fetchUserData, fetchCurrentEventLocation, userRef]);

  const openEmailInOutlook = () => {
    const emailUrl = `mailto:${userEmail}`;
    Linking.openURL(emailUrl).catch(err => console.error('Error opening email client:', err));
  };

  const openLinkedInProfile = () => {
    const linkedinUrl = `https://www.linkedin.com/in/${userData.linkedin}`;
    Linking.openURL(linkedinUrl).catch(err => console.error('Error opening LinkedIn profile:', err));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Text style={styles.profileTitle}>Profile</Text>

        <View style={styles.profileImageContainer}>
          <Image
            source={
              profileImageUrl
                ? { uri: profileImageUrl }
                : require('../assets/images/default_profile.jpg')
            }
            style={styles.profileImage}
          />
        </View>

        <Text style={styles.profileName}>{userName}</Text>
        <Text style={styles.profileSubtitle}>{userData.designation || '...'}</Text>
        <Text style={styles.profileActiveSince}>{userDepartment}</Text>

        <View style={styles.personalInfoContainer}>
          <Text style={styles.sectionTitle}>Personal Info</Text>

          <TouchableOpacity onPress={openEmailInOutlook}>
            <View style={styles.infoItem}>
              <Ionicons name="mail-outline" size={24} color="#FFA726" />
              <Text style={styles.infoText}>{userEmail}</Text>
            </View>
          </TouchableOpacity>

          {userData.linkedin && userData.linkedin.length > 3 ? (
            <TouchableOpacity onPress={openLinkedInProfile}>
              <View style={styles.infoItem}>
                <Ionicons name="logo-linkedin" size={24} color="#FFA726" />
                <Text style={styles.infoText}>{userData.linkedin}</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.infoItem}>
              <Ionicons name="logo-linkedin" size={24} color="#FFA726" />
              <Text style={styles.infoText}>...</Text>
            </View>
          )}

          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={24} color="#FFA726" />
            <Text style={styles.infoText}>
              {currentEventLocation || userData.room || '...'}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.goBack()}>
          <Text style={styles.logoutButtonText}>Go Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingBottom: 50,
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FFA726',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginVertical: 5,
  },
  profileActiveSince: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 20,
  },
  personalInfoContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#424242',
  },
  logoutButton: {
    backgroundColor: '#FFA726',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

