// navigation/Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserListScreen from './Sceens/UserListScreen';
import UserPostsScreen from './Sceens/UserPostScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
     <Stack.Navigator>
      <Stack.Screen
        name="UserList"
        component={UserListScreen}
        options={{
          title: 'Users',
          headerStyle: {
            backgroundColor: '#f4511e',

          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
          headerTitleAlign: 'center', // Center the header title
        }}
      />
      <Stack.Screen
        name="UserPosts"
        component={UserPostsScreen}
        options={{
          title: 'Posts',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
