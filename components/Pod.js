import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ImageEditor, Linking, Dimensions } from 'react-native';
import React from "react"
import { Link, useLinkBuilder } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
const width_proportion = Dimensions.get('window').width * 0.85

const Pod = (props) => {
    let getCurrentTime = (millis) => {
        var minutes = Math.floor(millis / 60);
        var seconds = ((millis % 60)).toFixed(0);
        let formatted = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        return formatted;
    }

    return (
            <View style = {styles.PodView}>
                <Image source={ {uri: props.image} } style={{
                    width: 100,
                    height: 100,
                    borderRadius: 5,
                    marginLeft: 10,
                    alignSelf: 'center'
                }} />
                <View style={styles.TextView}>
                    <Text style={styles.sub2}>{props.title}</Text>
                    <Text style={styles.sub}>Wellness With Sahila: {getCurrentTime(props.duration)}</Text>
                    <Text style={styles.sub}>{props.date}</Text>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    PodView: {
        backgroundColor: '#E3E3E3',
        height: 120,
        width: width_proportion,
        flexDirection: 'row',
        borderRadius: 10,
        marginBottom: 10
    },
    TextView: {
       marginLeft: 15,
       marginTop: 15,
       maxWidth: width_proportion
    },
    sub: {
        marginTop: 5,
        fontSize: 12,
        color: '#686868'
    },
    sub2: {
        fontSize: 13,
        maxWidth: width_proportion * 0.5

    }
});

export default Pod;