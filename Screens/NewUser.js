import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native";
import firebase from "../config";
const auth = firebase.auth();
export default function Newuser({navigation,props}) {
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  // const [confirmPassword, setConfirmPassword] = useState();
  var email,password,confirmPassword;
  const [error, setError] = useState('');
  const handleSubmit = () => {
    if (password == confirmPassword) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          const currentid = auth.currentUser.uid;
          setError('');
          navigation.navigate('Home', { currentid: currentid });
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("verifier password");
    }}
  return (
    <ImageBackground
      source={require("../assets/back.jpg")}
      style={styles.container}
    >
      <View
        style={{
          backgroundColor: "#0005",
          height: 300,
          width: "98%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            fontStyle: "italic",
            color: "#055",
            marginBottom: 20,
          }}
        >
          Bienvenu!
        </Text>
        <TextInput
          keyboardType="email-address"
          placeholder="email"
          style={styles.textInputStyle}
          onChangeText={(txt) => (email = txt)}
        ></TextInput>
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          style={styles.textInputStyle}
          onChangeText={(txt) => (password = txt)}
        ></TextInput>
        <TextInput
          placeholder="Confirm password"
          secureTextEntry={true}
          style={styles.textInputStyle}
          onChangeText={(txt) => (confirmPassword = txt)}
        ></TextInput>
        <View
          style={{
            flexDirection: "row",
            gap: 15,
            padding: 10,
          }}
        >
          <Button
            color="#055"
            title="Submit"
            onPress={
              handleSubmit
            }
          ></Button>

          <Button
            onPress={() => navigation.goBack()}
            color="#055"
            title="Back"
          ></Button>
        </View>

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  textInputStyle: {
    height: 50,
    width: "90%",
    backgroundColor: "beige",
    marginBottom: 10,
    padding: 5,
  },
  buttonStyle: {
    color: "#055",
  },
});
