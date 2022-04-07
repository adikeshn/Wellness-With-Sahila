import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passworderrer: false,
      errorText: ""
    }
  }

  checkUser = async () => {
    await signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCreds) => {
        this.reset();
      })
      .catch((error) => {
        this.setState({ password: "", passworderrer: true })
        error.code == "auth/network-request-failed" ? this.setState({ errorText: "No Connection" }) :
          this.setState({
            errorText: "incorrect credentials"
          })
      });
  }

  reset = () => {
    this.setState({
      password: "",
      passworderrer: false,
      errorText: "",
      email: ""
    })
  }


  moniterAuthState = async () => {
    await onAuthStateChanged(auth, user => {
      user != null ? this.props.navigation.navigate("Home") : null;
    })
  }


  render() {
    this.moniterAuthState()
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
        </View>
        <View style={styles.login}>
          <Image style={styles.image} source={require("../assets/logo.png")} />

          <StatusBar style="auto" />
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email."
              placeholderTextColor="#003f5c"
              value={this.state.email}
              onChangeText={(GetEmail) => { this.setState({ email: GetEmail }) }}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={(Getpassword) => { this.setState({ password: Getpassword }) }}
            />
          </View>

          {
            this.state.passworderrer ? (
              <Text style={styles.error}>{this.state.errorText}</Text>
            ) : null
          }

          <TouchableOpacity onPress={() => {
            this.reset();
            this.props.navigation.navigate("Register")
          }}>
            <Text style={styles.forgot_button}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn} onPress={() => {
            this.checkUser();
          }}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.banner}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    backgroundColor: "#E94747",
    flex: 0.1
  },
  login: {
    flex: 0.8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: 'space-around'
  },
  image: {
    width: 250,
    height: 190,
    marginBottom: 10,
    flex: 0.6
  },

  inputView: {
    backgroundColor: "#E94747",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 5,
  },

  TextInput: {
    height: 50,
    flex: 1,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E94747",
  },

  error: {
    color: "red",
    fontWeight: 'bold',
    marginBottom: 15,
    fontSize: 15
  }
});