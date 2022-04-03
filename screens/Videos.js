import React from 'react';
import { Linking, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ImageEditor, StatusBar, SafeAreaView } from 'react-native';
import Video from '../components/Video';
import { auth } from "../firebase-config";


export default function Videos({ navigation }) {
  let containerStyle = function (options) {
    return {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'column',
      marginTop: StatusBar.currentHeight
    }
  }
  return (
    <SafeAreaView style={containerStyle()}>
      <View style={styles.banner}>
        <TouchableOpacity onPress={() => { navigation.navigate('Videos') }}><Text style={styles.button}>Videos</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('Podcasts') }}><Text style={styles.button}>Podcasts</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('Books') }}><Text style={styles.button}>Books</Text></TouchableOpacity>
      </View>
      <View style={styles.content}>
        <ScrollView>
          <View>
            <Video text={"https://www.youtube.com/watch?v=jsVfke6K2NU&t=56s"} image={require("../assets/thumbnail1.jpg")} />
            <Video text={"https://www.youtube.com/watch?v=vJLZDFNA24c"} image={require("../assets/thumbnail2.jpg")} />
            <Video text={"https://www.youtube.com/watch?v=5BPpe5YUUvQ"} image={require("../assets/thumbnail3.jpg")} />
            <Video text={"https://www.youtube.com/watch?v=utyv8tYgAxQ"} image={require("../assets/thumbnail4.jpg")} />
            <Video text={"https://www.youtube.com/watch?v=8XowxCIedRQ"} image={require("../assets/thumbnail5.jpg")} />
          </View>

        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <View>
          <TouchableOpacity onPress={() => { navigation.navigate('Home') }}><Text style={styles.label}>Wellness With Sahila</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { auth.signOut(); navigation.navigate('Login') }}><Text style={{ marginLeft: 10 }}>Logout</Text></TouchableOpacity>
        </View>
        <Image source={require("../assets/logo.png")} style={styles.pic} />
      </View>
    </SafeAreaView>
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

