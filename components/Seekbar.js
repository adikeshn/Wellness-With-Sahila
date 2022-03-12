import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ImageEditor, Linking, Dimensions } from 'react-native';
import React, { Component } from "react"
import Slider from '@react-native-community/slider';
const width_proportion = Dimensions.get('window').width;

export default class SeekBar extends Component {

  render() {
    let sliderValue = this.props.positionMillis / this.props.durationMillis;
    if (isNaN(sliderValue)) {
      sliderValue = 0
    }
    return (
      <Slider
        style={{ width: width_proportion * 0.42, marginTop: 5 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor='tomato'
        thumbTintColor='gray'
        onSlidingComplete={value => { this.props.callBack(value * this.props.durationMillis) }}
        onValueChange={value => { this.props.callBack2(); sliderValue = -1 }}
        value={sliderValue}
      />
    );
  }
};

