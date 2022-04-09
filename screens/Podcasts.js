import { StyleSheet, Dimensions, Text, View, TouchableOpacity, Image, StatusBar, FlatList, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import React, { Component } from "react"
import Pod from '../components/Pod';
import * as rssParser from 'react-native-rss-parser';
import SeekBar from '../components/Seekbar';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Audio } from 'expo-av';
import { auth } from "../firebase-config";

const width_proportion = Dimensions.get('window').width;
const height_proportion = Dimensions.get('window').height;
const fontSize = width_proportion * 0.035;
const playFlex = 0.25

export default class Podcasts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      feed: {},
      playing: null,
      tracks: [],
      isPlaying: false,
      playbackInstance: null,
      volume: 1.0,
      isBuffering: false,
      playbackStatus: null,
      durationMillis: null,
      positionMillis: null,
      seekBarVal: null,
      newloaded: false
    }
  }

  async componentDidMount() {
    await this.fetchRSSFeed();
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
      })
      await this.loadAudio();
    } catch (e) {
      console.log(e);
    }
  }

  async loadAudio() {
    const { isPlaying, volume } = this.state

    try {
      const playbackInstances = new Audio.Sound()
      const source = {
        uri: this.state.playing.enclosures[0].url
      }
      const status = {
        shouldPlay: isPlaying,
        volume
      }

      playbackInstances.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
      await playbackInstances.loadAsync(source, status, false)
      this.setState({
        playbackInstance: playbackInstances,
        seekBarVal: this.state.positionMillis / this.state.durationMillis,
        isLoading: false
      })
    } catch (e) {
      console.log(e)
    }
  }

  onPlaybackStatusUpdate = status => {
    this.setState({
      isBuffering: status.isBuffering,
      durationMillis: status.durationMillis,
      positionMillis: status.positionMillis,
    })
  }

  handlePlayPause = async () => {
    const { isPlaying, playbackInstance, isLoading } = this.state
    isPlaying && !isLoading ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

    this.setState({
      isPlaying: !isPlaying
    })
  }

  newTrack = async () => {
    let { playbackInstance } = this.state
    this.setState({
      positionMillis: 0,
      seekBarVal: 0,
    })
    this.state.newloaded = true
    this.state.isPlaying = false;
    if (playbackInstance) {
      await playbackInstance.unloadAsync()
      await this.loadAudio()
      this.state.newloaded = false
    }
  }

  containerStyle = function (options) {
    return {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'column',
      marginTop: StatusBar.currentHeight
    }
  }

  fetchRSSFeed = () => {
    return fetch('https://anchor.fm/s/3eb96b38/podcast/rss')
      .then((response) => response.text())
      .then((responseData) => rssParser.parse(responseData))
      .then((rss) => {
        console.log(rss.items[0].itunes.duration);
        if (this.state.playing == null) {
          this.setState({
            playing: rss.items[0]
          })
        }
        this.setState({
          feed: rss,
        });
      });
  }

  async componentWillUnmount() {
    if (this.state.playbackInstance) {
      await this.state.playbackInstance.pauseAsync()
      await this.state.playbackInstance.unloadAsync()
    }
  }

  pause = async () => {
    const { playbackInstance } = this.state;
    await playbackInstance.pauseAsync();

    this.setState({
      isPlaying: false
    })
  }

  skip = async (time) => {
    const { playbackInstance } = this.state;
    await this.state.playbackInstance.setStatusAsync({ positionMillis: time })
    await playbackInstance.playAsync();

    this.setState({
      isPlaying: true
    })
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <SafeAreaView style={this.containerStyle()}>
          <View style={styles.banner}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Videos') }}><Text style={styles.button}>Videos</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Podcasts') }}><Text style={styles.button}>Podcasts</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Books') }}><Text style={styles.button}>Books</Text></TouchableOpacity>
          </View>

          <View style={styles.play}>
            <Image source={{ uri: this.state.playing.itunes.image }} style={{
              flex: 0.5
            }}></Image>
            <View style={{ justifyContent: 'center', flex: 0.75 }}>
              <Text style={styles.TextView}>{this.state.playing.title}</Text>
              <Text style={styles.sub}>Wellness With Sahila</Text>
              <Text style={{
                fontSize: fontSize * 0.85,
                color: '#686868',
                maxWidth: 220,
                marginLeft: 16
              }}>{this.state.playing.published}</Text>
              {!this.state.newloaded ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>

                  <SeekBar
                    durationMillis={this.state.durationMillis}
                    positionMillis={this.state.positionMillis}
                    sliderValue={this.state.sliderValue}
                    callBack={this.skip}
                    callBack2={this.pause}
                  />
                  <TouchableOpacity onPress={this.handlePlayPause}>
                    {this.state.isPlaying ? (
                      <Ionicons name='ios-pause' size={30} style={{ marginLeft: 5 }} color='tomato' />
                    ) : (
                      <Ionicons name="play" size={30} style={{ marginLeft: 5 }} color='tomato' />
                    )}
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginLeft: 8, paddingTop: 10 }}>
                  <ActivityIndicator size="large" color="tomato" />
                </View>
              )}
            </View>
          </View>
          <View style={styles.content}>
            <FlatList
              data={this.state.feed.items}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => {
                  this.setState({
                    playing: item
                  })
                  this.newTrack();
                }}><Pod
                    title={item.title}
                    image={item.itunes.image}
                    date={item.published}
                    audio={item.enclosures[0].url}
                    duration={item.itunes.duration}
                  /></TouchableOpacity>
              )}
            />
          </View>
          <View style={styles.bottom}>
            <View>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('Home') }}><Text style={styles.label}>Wellness With Sahila</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => { auth.signOut(); this.props.navigation.navigate('Login') }}><Text style={{ marginLeft: 10 }}>Logout</Text></TouchableOpacity>
            </View>
            <Image source={require("../assets/logo.png")} style={styles.pic} />
          </View>
        </SafeAreaView>
      )
    }
    else {
      return (
        <SafeAreaView style={this.containerStyle()}>
          <View style={styles.banner}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Videos') }}><Text style={styles.button}>Videos</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Podcasts') }}><Text style={styles.button}>Podcasts</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Books') }}><Text style={styles.button}>Books</Text></TouchableOpacity>
          </View>
          <View style={{ flex: 0.8, padding: 5, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="tomato" />
          </View>
          <View style={styles.bottom}>
            <View>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('Home') }}><Text style={styles.label}>Wellness With Sahila</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => { auth.signOut(); this.props.navigation.navigate('Login') }}><Text style={{ marginLeft: 10 }}>Logout</Text></TouchableOpacity>
            </View>
            <Image source={require("../assets/logo.png")} style={styles.pic} />
          </View>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  sub: {
    marginTop: 10,
    fontSize: fontSize * 0.85,
    color: '#686868',
    maxWidth: 220,
    marginLeft: 16
  },
  play: {
    backgroundColor: "#E3E3E3",
    flex: playFlex,
    flexDirection: 'row',
    width: width_proportion
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
  TextView: {
    marginLeft: 15,
    marginTop: 15,
    maxWidth: width_proportion * 0.7,
    fontSize: fontSize
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
    flex: 0.6,
    backgroundColor: 'white',
    alignItems: 'center',
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