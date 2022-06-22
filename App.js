import React, { Component } from 'react';
import Home from './screens/Home';
import Videos from './screens/Videos';
import Podcasts from './screens/Podcasts';
import Books from './screens/Books';
import Login from './screens/Login'
import CustomDrawer from './components/CustomDrawer';
import Register from './screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Contact from './screens/Contact';
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeComponent = () => {
  return (
      <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{
        tabBarStyle: { display: "none" },
        headerShown: false
      }}>
          <Drawer.Screen name="Home" component={Home} options={{drawerItemStyle: { height: 0 }}}/>
          <Drawer.Screen name="Contact" component={Contact} />
          <Drawer.Screen name="Videos" component={Videos} options={{drawerItemStyle: { height: 0 }}} />
          <Drawer.Screen name="Podcasts" component={Podcasts} options={{drawerItemStyle: { height: 0 }}} />
          <Drawer.Screen name="Books" component={Books} options={{drawerItemStyle: { height: 0 }}} />
          <Drawer.Screen name="Custom" component={CustomDrawer} options={{drawerItemStyle: {height: 0}}} />
      </Drawer.Navigator>
  );
};
export default class App extends Component {

  // Initialize Firebase
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="HomeScreen" component={HomeComponent}  />
          <Stack.Screen name="Register" component={Register}  />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
