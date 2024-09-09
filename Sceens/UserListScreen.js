import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://dummyjson.com/users?limit=10&skip=${(page - 1) * 10}`);
      setUsers((prevUsers) => [...prevUsers, ...response.data.users]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const loadMoreUsers = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('UserPosts', { userId: item.id })} 
      style={styles.userContainer}
    >
      <View style={styles.userDetails}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.userImage} 
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            <Text style={styles.heading}>Name: </Text> {item.firstName} {item.lastName}
          </Text>
          <Text style={styles.userEmail}>
            <Text style={styles.heading}>Email: </Text> {item.email}
          </Text>
          <Text style={styles.userCompany}>
            <Text style={styles.heading}>Company: </Text> {item.company.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" />
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMoreUsers}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && <ActivityIndicator />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  userContainer: {
    elevation: 1,
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius:10,
    backgroundColor: '#f4511e',
    paddingBottom:2
   
  },
  userDetails: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor:"white",
    borderColor: '#ccc', // Border color
    flexDirection: 'row', // Arrange image and text horizontally
    alignItems: 'center', // Center items vertically
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10, // Space between image and text
  },
  userInfo: {
    flex: 1, // Take up the remaining space
  },
  userName: {
    color: 'black',
    fontWeight: '400',
    fontSize: 14,
  },
  userEmail: {
    color: 'black',
    fontWeight: '400',
    fontSize: 14,
  },
  userCompany: {
    color: 'black',
    fontWeight: '400',
    fontSize: 14,
  },
  heading: {
    fontWeight: '600',
    fontSize: 16,
    color: 'black',
  },
});

export default UserListScreen;
