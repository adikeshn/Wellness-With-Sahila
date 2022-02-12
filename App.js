import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ImageEditor } from 'react-native';
import Home from './screens/Home';
import Videos from './screens/Videos';
import Podcasts from './screens/Podcasts';
import Books from './screens/Books';
import Login from './screens/Login'
import Register from './screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default class App extends Component{

// Initialize Firebase
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false, animation: 'none' } } />
          <Stack.Screen name="Videos" component={Videos} options={{ headerShown: false, animation: 'none' } } />
          <Stack.Screen name="Podcasts" component={Podcasts} options={{ headerShown: false, animation: 'none' } } />
          <Stack.Screen name="Books" component={Books} options={{ headerShown: false, animation: 'none' } } />
          <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

