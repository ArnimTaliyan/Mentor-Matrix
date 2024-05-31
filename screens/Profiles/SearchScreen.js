import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, FlatList, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { db } from '../../firebase';
import { ref, onValue, off } from 'firebase/database';
import { Avatar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('SOAE');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const departmentOptions = [
    { label: 'SOAE', value: 'SOAE' },
    { label: 'SOB', value: 'SOB' },
    { label: 'SOCS', value: 'SOCS' },
    { label: 'SOD', value: 'SOD' },
    { label: 'SOHS', value: 'SOHS' },
    { label: 'SOLA', value: 'SOLA' },
    { label: 'SOLI', value: 'SOLI' },
    { label: 'SOLS', value: 'SOLS' },
  ];

  useEffect(() => {
    const usersRef = ref(db, 'users');

    const handleUserDataChange = (snapshot) => {
      const data = snapshot.val();
      const userList = data
        ? Object.values(data).map(user => ({
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            email: user.email,
            department: user.department,
            profileImageUrl: user.userdata?.profileImageUrl || null,
          }))
        : [];
      setUserData(userList);
      setFilteredData(userList.filter(user => user.department === selectedDepartment));
    };

    // Set up the listener
    onValue(usersRef, handleUserDataChange);

    // Clean up the listener on unmount
    return () => {
      off(usersRef, 'value', handleUserDataChange);
    };
  }, [selectedDepartment]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filtered = userData.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
      setShowSearchResults(true);
    } else {
      setFilteredData(userData.filter(user => user.department === selectedDepartment));
      setShowSearchResults(false);
    }
  };

  const handleCloseSearch = () => {
    setSearchQuery('');
    setFilteredData(userData.filter(user => user.department === selectedDepartment));
    setShowSearchResults(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.userContainer} onPress={() => navigation.navigate('Profile', { userEmail: item.email })}>
      <Avatar
        rounded
        source={
          item.profileImageUrl
            ? { uri: item.profileImageUrl }
            : require('../../assets/images/default_profile.jpg')
        }
        size="medium"
      />
      <View style={styles.userDetails}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userDepartment}>{item.department}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setSearchQuery('');
    setFilteredData(userData.filter(user => user.department === department));
    setShowSearchResults(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="gray"
          color="black"
          onFocus={() => setShowSearchResults(true)}
        />
        {showSearchResults && (
          <TouchableOpacity style={styles.closeIconContainer} onPress={handleCloseSearch}>
            <Ionicons name="close-outline" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ flex: 0 }}>
        <ScrollView horizontal={true} contentContainerStyle={styles.departmentScrollView}>
          <View style={{ flexDirection: 'row' }}>
            {departmentOptions.map((dept) => (
              <TouchableOpacity
                key={dept.value}
                style={[styles.cardContainer, { backgroundColor: selectedDepartment === dept.value ? 'rgb(22, 132, 199)' : 'white' }]}
                onPress={() => handleDepartmentSelect(dept.value)}
              >
                <Text style={[styles.cardText, { color: selectedDepartment === dept.value ? 'white' : 'black' }]}>{dept.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.email}
        renderItem={renderItem}
      />

      {showSearchResults && (
        <View style={[styles.dropdownContainer, Platform.OS === 'android' && { marginTop: -15 }]}>
          {filteredData.length === 0 ? (
            <Text style={styles.noResultsText}>No results found</Text>
          ) : (
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.email}
              renderItem={renderItem}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 5,
    paddingTop: 5,
    
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: 'rgb(22, 132, 199)',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f0f4f9',
  },
  closeIconContainer: {
    position: 'absolute',
    right: 20,
    zIndex: 1,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userDetails: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDepartment: {
    fontSize: 12,
    color: 'darkgray',
  },
  cardContainer: {
    margin: 10,
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  departmentScrollView: {
    flexDirection: 'row',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 1,
    marginTop: 45,
  },
  noResultsText: {
    fontSize: 18,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flex: 1,
    marginTop: 40,
  },
});
