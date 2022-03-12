import { Linking, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ImageEditor, StatusBar, Dimensions, SafeAreaView } from 'react-native';
import React, { Component } from "react"
const width_proportion = Dimensions.get('window').width * 0.87;
const smallProportions = Dimensions.get('window').width * 0.4;
export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  containerStyle = function (options) {
    return {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'column',
      marginTop: StatusBar.currentHeight
    }
  }

  render() {
    return (
      <SafeAreaView style={this.containerStyle()}>
        <View style={styles.banner}>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('Videos') }}><Text style={styles.button}>Videos</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('Podcasts') }}><Text style={styles.button}>Podcasts</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('Books') }}><Text style={styles.button}>Books</Text></TouchableOpacity>
        </View>
        <View style={styles.content}>
          <ScrollView>
            <Image source={require('../assets/sdsd.jpg')} style={styles.image1} />
            <View style={{ marginTop: 20 }}>
              <Image source={require('../assets/VPB_6854.jpg')} style={styles.image2}>
              </Image>
              <View style={styles.image3}><Text style={styles.mission}>
                My mission is to help everyone live a disease free
                life to their fullest potential through my wholesome approach
                that teaches how to balance body and mind.</Text>
              </View>
            </View>
            <View style={styles.other}>
              <View>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/c/WellnessWithSahila/videos')}><Image
                  style={styles.youtube} source={require('../assets/1.jpg')} /></TouchableOpacity>

                <Image style={styles.image4} source={require('../assets/youtubeLogo.png')} />
              </View>
              <View>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/WellnessWithSahila')}>
                  <Image style={styles.youtube} source={require('../assets/facebook.jpg')} /></TouchableOpacity>
                <Image source={require('../assets/FacebookLogo.jpg')} style={styles.image5} />
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.bottom}>
          <View>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Home') }}><Text style={styles.label}>Wellness With Sahila</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Login') }}><Text style={{ marginLeft: 10 }}>Logout</Text></TouchableOpacity>
          </View>
          <Image source={require("../assets/logo.png")} style={styles.pic} />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  image5: {
    width: 40,
    height: 40,
    borderRadius: 50,
    position: 'absolute',
    marginLeft: 10,
    marginTop: 13
  },
  image4: {
    width: 40,
    height: 40,
    borderRadius: 50,
    position: 'absolute',
    marginLeft: 7,
    marginTop: 13
  },
  image3: {
    backgroundColor: '#E94747',
    position: 'absolute',
    height: 120,
    width: 240,
    paddingTop: 20,
    marginTop: 15,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image2: {
    borderRadius: 3,
    width: width_proportion,
    height: 150
  },
  image1: {
    width: width_proportion,
    height: 210,
    borderRadius: 3,
    resizeMode: 'contain',
    position: 'relative'
  },
  other: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 20
  },
  youtube: {
    width: smallProportions,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 10
  },
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


  },
  world: {
    fontSize: 40
  },
  pic: {
    width: 100,
    height: 100
  },
  mission: {
    position: 'absolute',
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    padding: 15,
    width: 255,
    paddingTop: 20,
  }
});
