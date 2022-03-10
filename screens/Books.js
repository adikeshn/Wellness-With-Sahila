import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ImageEditor, StatusBar } from 'react-native';

import React from "react"


export default function Books({ navigation }) {

  let containerStyle = function (options) {
    return {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'column',
      marginTop: StatusBar.currentHeight
    }
  }

  return (
    <View style={containerStyle()}>
      <View style={styles.banner}>
        <TouchableOpacity onPress={() => { navigation.navigate('Videos') }}><Text style={styles.button}>Videos</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('Podcasts') }}><Text style={styles.button}>Podcasts</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('Books') }}><Text style={styles.button}>Books</Text></TouchableOpacity>
      </View>
      <View style={styles.content}>
        <ScrollView>
          <View>

          </View>
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <View>
          <TouchableOpacity onPress={() => { navigation.navigate('Home') }}><Text style={styles.label}>Wellness With Sahila</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('Login') }}><Text style={{ marginLeft: 10 }}>Logout</Text></TouchableOpacity>
        </View>
        <Image source={require("../assets/logo.png")} style={styles.pic} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  banner: {
    flex: 0.1,
    backgroundColor: '#E94747',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    fontSize: 25,
    fontFamily: 'normal'
  },
  label: {
    fontSize: 20,
    marginLeft: 10
  },
  bottom: {
    flex: 0.1,
    backgroundColor: '#E94747',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    padding: 25,
    flex: 0.8,
    backgroundColor: 'white',
    alignItems: 'center'

  },
  pic: {
    width: 100,
    height: 100
  },
});

