import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Linking, TouchableOpacity, Image, Platform, RefreshControl } from 'react-native';
import { db } from '../../firebase';
import { ref, onValue, get } from 'firebase/database';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation,useRoute } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { encode } from 'base-64';

const FetchData = () => {
  const navigation = useNavigation();
  const route = useRoute();
    const userName = route.params?.userName;
    const userEmail = route.params?.userEmail;
  const [todoData, setTodoData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const fetchProfileImage = async (email) => {
        try {
          const encodedEmail = encode(email);
          const userDataSnapshot = await get(ref(db, `users/${encodedEmail}/userdata`));
          if (userDataSnapshot.exists()) {
            const userDataVal = userDataSnapshot.val();
            if (userDataSnapshot.child('profileImageUrl').exists()) {
              return userDataSnapshot.child('profileImageUrl').val();
            }
          }
          return null;
        } catch (error) {
          console.error("Error fetching profile image:", error);
          return null;
        }
      };
  
      const starCountRef = ref(db, 'announcement/');
      onValue(starCountRef, async (snapshot) => {
        const data = snapshot.val();
        const newPosts = data
          ? await Promise.all(Object.keys(data).map(async (key) => {
              const profileImageUrl = await fetchProfileImage(data[key].UserEmail);
              return {
                id: key,
                profileImageUrl,
                ...data[key],
              };
            }))
          : [];
        setTodoData(newPosts);
        setRefreshing(false);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setRefreshing(false);
    }
  };
  

  const onRefresh = () => {
    fetchData();
  };

  const navigateToUserProfile = (email) => {
    navigation.navigate('Profile', { userEmail: email });
  };

  return (
    <SafeAreaView style={[styles.safeArea, Platform.OS === 'android' && { paddingBottom: 38 }]}>
      <ScrollView style={[Platform.OS === 'android' && { paddingBottom: 30 }]}  refreshControl={  <RefreshControl  refreshing={refreshing}  onRefresh={onRefresh}  />} >
      <View style={styles.Hcontainer}>
                    <View style={{ flex: 1, marginTop: 10}}>
                        {userName ? <Text style={styles.greetingText}>Hello, {userName}</Text> : null}
                    </View>
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={() => navigation.push('AnnouncementScheduler', { userName: userName,  userEmail: userEmail })}>
                        <Ionicons name="megaphone-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
        <View style={styles.container}>
          {todoData.map((item, index) => (
            <View key={index} style={styles.postContainer}>
              <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigateToUserProfile(item.UserEmail)}>
                  <Avatar
                    rounded
                    source={item.profileImageUrl ? { uri: item.profileImageUrl } : require('../../assets/images/default_profile.jpg')}
                    size="medium"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateToUserProfile(item.UserEmail)}>
                  <Text style={styles.publisherText}>{item.Publisher}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.Htext}>{item.ProjectName}</Text>
                <Text style={styles.text}>Role: {item.Role}</Text>
                <Text style={styles.text}>Number of Student Required: {item.Number}</Text>
                <Text style={styles.documentLink} onPress={() => Linking.openURL(item.documentURL)}>
                  Project Details
                </Text>
              </View>
              <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.contactLink} onPress={() => Linking.openURL(`mailto:${item.UserEmail}`)}>
                  <Ionicons name="paper-plane-outline" size={32} color="#4299E1" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FetchData;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  Hcontainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
},
greetingText: {
  fontSize: 30,
  color:'rgb(22, 132, 199)' ,
  fontWeight: 'bold',
  marginBottom: 8,
},
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  publisherText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10, // Added margin to separate the text from the avatar
  },
  contentContainer: {
    marginBottom: 10,
  },
  Htext: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginTop: 5,
  },
  actionContainer: {
    borderTopWidth: 1,
    borderTopColor: '#e3e3e3',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  documentLink: {
    fontSize: 16,
    color: '#007bff',
  },
  contactLink: {
    fontSize: 16,
    color: '#4299E1',
  },
});
