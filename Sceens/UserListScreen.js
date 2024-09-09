import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
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
    <TouchableOpacity onPress={() => navigation.navigate('UserPosts', { userId: item.id })} style={{elevation:1}}>
      <View style={{ padding: 16, borderWidth:1 ,borderRadius:10,marginVertical:5,marginHorizontal:15,}}>
        <Text>{item.firstName} {item.lastName}</Text>
        <Text>{item.email}</Text>
        <Text>{item.company.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:"white" }}>
        <StatusBar backgroundColor={"black"}/>
    
        
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

export default UserListScreen;
