import { StatusBar } from "expo-status-bar";
import React, { useState, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Modal
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

export default class Register extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      passwordConf: "",
      passworderrer: false,
      errorText: ""
    }
  }

  checkValid = () => {
    if (this.state.password.localeCompare(this.state.passwordConf) != 0) {
      this.setState({
        passworderrer: true,
        errorText: "password not matching conformation"
      })
      return false;
    }
    else if (!this.state.password || !this.state.passwordConf || !this.state.email) {
      this.setState({
        passworderrer: true,
        errorText: "fields missing"
      })
      return false;
    }
    else if (this.state.password.length < 6) {
      this.setState({
        passworderrer: true,
        errorText: "password must be at least 6 characters"
      })
      return false;
    }

    return true;
  }
  handleRegister = async () => {
    if (this.checkValid()) {
      await createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
        .then((userCredential) => {
          this.setState({
            passworderrer: true
          })
          auth.signOut();
          this.props.navigation.navigate("Login");
          const user = userCredential.user;
        })
        .catch((error) => {
          this.setState({
            passworderrer: true
          })
          error.code == "auth/email-already-in-use" ? this.setState({ errorText: "email already in use" }) :
            error.code == "auth/invalid-email" ? this.setState({ errorText: "invalid email" }) : this.setState({ errorText: error.message });
        });
    }
    return true;
  }
  render() {
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
              onChangeText={(GetEmail) => this.setState({ email: GetEmail })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(Getpassword) => this.setState({ password: Getpassword })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Confirm Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(Conformation) => this.setState({ passwordConf: Conformation })}
            />
          </View>

          {
            this.state.passworderrer ? (
              <Text style={styles.error}>{this.state.errorText}</Text>
            ) : null
          }

          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate("Login");
          }}>
            <Text style={styles.forgot_button}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} onPress={() => {
            if (this.checkValid()) {
              this.handleRegister();
            }
          }}>
            <Text style={styles.loginText}>REGISTER</Text>
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
  },
  image: {
    width: 250,
    height: 190,
    flex: 0.9
  },

  inputView: {
    backgroundColor: "#E94747",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
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
    marginTop: 20,
    backgroundColor: "#E94747",
  },

  error: {
    color: "red",
    fontWeight: 'bold',
    marginBottom: 15,
    fontSize: 15

  }
});