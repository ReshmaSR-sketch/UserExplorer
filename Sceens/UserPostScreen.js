import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const UserPostsScreen = ({ route }) => {
  const { userId } = route.params;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://dummyjson.com/users/${userId}/posts?limit=10&skip=${(page - 1) * 10}`);
      setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const renderPostItem = ({ item }) => (
    <View style={{ padding: 16, borderBottomWidth: 1,backgroundColor:"white" ,margin:20}}>
      <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
      <Text>{item.body}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && <ActivityIndicator />}
      />
    </View>
  );
};

export default UserPostsScreen;
