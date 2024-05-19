import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, FlatList, StyleSheet, Image } from 'react-native';
import { db } from '../firebase'; // Import db from firebase.js
import { ref, onValue } from 'firebase/database';
import { Avatar } from 'react-native-elements';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch user data from Firebase
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const userList = data ? Object.values(data).map(user => ({ name: user.name, avatar: user.avatar })) : [];
      setUserData(userList);
      setFilteredData(userList);
    });
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filtered = userData.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(userData);
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

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    marginLeft: 10,
    fontSize: 18,
  },
});
