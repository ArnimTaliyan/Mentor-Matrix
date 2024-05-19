import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { db } from '../firebase'; // Import db from firebase.js
import { ref, onValue } from 'firebase/database';
import { Avatar } from 'react-native-elements';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('SOAE'); // Default department

  // Dummy department options
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
    // Fetch user data from Firebase
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const userList = data ? Object.values(data).map(user => ({ id: user.id, name: user.name, avatar: user.avatar, department: user.department })) : [];
      setUserData(userList);
      setFilteredData(userList.filter(user => user.department === selectedDepartment));
    });
  }, [selectedDepartment]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filtered = userData.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(userData.filter(user => user.department === selectedDepartment));
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Avatar
        rounded
        source={{ uri: item.avatar }}
        size="medium"
      />
      <Text style={styles.userName}>{item.name}</Text>
    </View>
  );

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
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
          // Set text color
          color="black"
        />
        {/* You can add a search icon here if needed */}
      </View>
      <View style={{ flex: 0 }}>
        <ScrollView horizontal={true} contentContainerStyle={styles.departmentScrollView}>
          <View style={{ flexDirection: 'row' }}>
            {departmentOptions.map((dept, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.cardContainer, { backgroundColor: selectedDepartment === dept.value ? 'lightblue' : 'white' }]}
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
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
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
    marginBottom: 5, // Reduced marginBottom from 10 to 5
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10, // Reduced paddingVertical from 15 to 10
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContainer: {
    margin: 10,
    width: 60,
    height: 30,
    backgroundColor: '',
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
    
  }
});
