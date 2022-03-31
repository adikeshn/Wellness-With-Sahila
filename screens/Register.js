import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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
import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

export default function Register({navigation}) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setConf] = useState("");
  const [passworderrer, seterror] = useState(false);
  const [errorText, setErrortext] = useState("");
  
  const checkValid = () => {
      if(password.localeCompare(passwordConf) != 0){
          seterror(true);
          setErrortext("Password Not Matching Conformation");
          return false;
      }
      else if(!password || !passwordConf || !email){
        seterror(true)
        setErrortext("Feilds Missing");
        return false;
      }
      else if (password.length < 6){
        seterror(true)
        setErrortext("password must be at least 6 characters")
        return false;
      }

      return true;
  }
  const handleRegister = () => {
    if (checkValid()){
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        seterror(true);
        setErrortext("successfully created user");
        const user = userCredential.user;
      })
      .catch((error) => {
        seterror(true);
        setErrortext(error.message + " " + error.code);
      });
    }
    return true;
  }

  return (
    <View style={styles.container}>
        <View style = {styles.banner}>
        </View>
        <View style={styles.login}>
            <Image style={styles.image} source={require("../assets/logo.png")} />

            <StatusBar style="auto" />
            <View style={styles.inputView}>
                <TextInput
                style={styles.TextInput}
                placeholder="Email."
                placeholderTextColor="#003f5c"
                onChangeText={(GetEmail) => setEmail(GetEmail)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                style={styles.TextInput}
                placeholder="Password"
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={(Getpassword) => setPassword(Getpassword)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                style={styles.TextInput}
                placeholder="Confirm Password"
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={(Conformation) => setConf(Conformation)}
                />
            </View>

            {
                passworderrer ? (
                    <Text style = {styles.error}>{errorText}</Text>
                ) : null
            }

            <TouchableOpacity onPress={() => {
              navigation.navigate("Login");
            }}>
                <Text style={styles.forgot_button}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={() => {
                handleRegister()
            }}>
                <Text style={styles.loginText}>REGISTER</Text>
            </TouchableOpacity>
        </View>
        <View style = {styles.banner}>
        </View>
    </View>
  );
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