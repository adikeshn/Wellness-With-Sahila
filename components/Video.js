import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ImageEditor, Linking, Dimensions } from 'react-native';
import React from "react"
import { Link, useLinkBuilder } from '@react-navigation/native';
const width_proportion = Dimensions.get('window').width * 0.85
const Video = (props) => {
    const imageWidthProportion = Dimensions.get('window').width * 0.75
    return (
        <View style={styles.videoView}>
            <TouchableOpacity onPress={() => { Linking.openURL(props.text) }}><Image source={props.image} style={{
                height: 120,
                width: imageWidthProportion,
                borderRadius: 10
            }} /></TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    videoView: {
        backgroundColor: '#E94747',
        height: 160,
        width: width_proportion,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 10
    },
});

export default Video;