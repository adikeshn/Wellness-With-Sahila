import { StyleSheet, Button, Text, View, TextInput, TouchableOpacity, Image, StatusBar, Dimensions, SafeAreaView } from 'react-native';
import React, { Component } from "react"
import Ionicons from 'react-native-vector-icons/Ionicons'
const width_proportion = Dimensions.get('window').width * 0.87;
const smallProportions = Dimensions.get('window').width * 0.4;


export default class Contact extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      message: "",
      status: 0,
      statusText: ""
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

  sendMail = async function () {
    const { name, message } = this.state;
    const user = global.user
    const data = { name, message, user }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    console.log(name, message)
    await fetch("http://localhost:4000/nodemailer", options)
      .then((response) => {
        this.setState({
          status: 300,
          statusText: "Email Sent",
          name: "",
          message: ""
        })
        console.log(this.state.status)
      }).catch((error) => {
        this.setState({
          status: 400,
          statusText: "An Error Occurred: " + error
        })
        console.log(this.state.status)
      })
  }

  render() {
    return (
      <SafeAreaView style={this.containerStyle()}>
        <View style={styles.bottom}>
          <View>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Home') }}><Text style={styles.label}>Wellness With Sahila</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => { auth.signOut(); this.props.navigation.navigate('Login') }}><Text style={{ marginLeft: 10 }}>Logout</Text></TouchableOpacity>
          </View>
          <Image source={require("../assets/logo.png")} style={styles.pic} />
        </View>
        <View style={styles.content}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Name"
              placeholderTextColor="#003f5c"
              value={this.state.name}
              onChangeText={(Name) => { this.setState({ name: Name }) }}
            />
          </View>
          <View style={styles.inputView2}>
            <TextInput
              style={styles.TextInput}
              placeholder="Message"
              placeholderTextColor="#003f5c"
              value={this.state.message}
              onChangeText={(Message) => { this.setState({ message: Message }) }}
              multiline={true}
            />
          </View>
          <Button
            title="SUBMIT"
            color="tomato"
            onPress={() => { this.sendMail() }} />
          {
            this.state.status == 400 ? (
              <Text style={styles.error}>{this.state.statusText}</Text>
            ) : null
          }
          {
            this.state.status == 300 ? (
              <Text style={styles.success}>{this.state.statusText}</Text>
            ) : null
          }
        </View>
        <View style={styles.banner}>
          <TouchableOpacity style={styles.b} onPress={() => { this.props.navigation.navigate('Videos') }}>
            <Ionicons name='videocam-outline' size={35} style={{ marginBottom: -5 }} color='white' />
            <Text style={styles.button}>Videos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.b} onPress={() => { this.props.navigation.navigate('Podcasts') }}>
            <Ionicons name='mic-outline' size={35} style={{ marginBottom: -3 }} color='white' />
            <Text style={styles.button}>Podcasts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.b} onPress={() => { this.props.navigation.navigate('Books') }}>
            <Ionicons name='book-outline' size={35} style={{ marginBottom: -5 }} color='white' />
            <Text style={styles.button}>Books</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  button1: {
    color: '#E94747'
  },
  inputView2: {
    backgroundColor: "white",
    width: "100%",
    borderWidth: 3,
    borderColor: "tomato",
    height: 190,
    marginBottom: 20,
  },
  TextInput: {
    padding: 10,
    fontSize: 18
  },
  inputView: {
    backgroundColor: "white",
    width: "100%",
    borderWidth: 3,
    borderColor: "tomato",
    height: 60,
    marginBottom: 10,
  },
  b: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  banner: {
    flex: 0.1,
    backgroundColor: '#E94747',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    marginBottom: 5,
    fontSize: 12.5,
    fontFamily: 'monospace'
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
  error: {
    color: "red",
    fontWeight: 'bold',
    marginTop: 35,
    fontSize: 17
  },
  success: {
    color: "green",
    fontWeight: 'bold',
    marginTop: 35,
    fontSize: 20
  },
  pic: {
    width: 100,
    height: 100
  },
});
