
import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native";
import firebase  from "../config";
const auth=firebase.auth();
export default function Auth(props) {
    var email,password
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
          onChangeText={(txt) => (email=txt)}
        ></TextInput>
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          style={styles.textInputStyle}
          onChangeText={(txt) => (password=txt)}
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
            title="submit"
            onPress={() =>{ 
              auth.signInWithEmailAndPassword(email, password)
                .then(() =>{ props.navigation.navigate("Home");})
                .catch((error) => {alert(error);});
              }}  
          ></Button>
          <Button color="#055" title="Exit"></Button>
        </View>
        <Text
        onPress={()=>props.navigation.navigate("NewUser")}
          style={{
            width:"100%",
            textAlign: "right",
            paddingRight: 20,
            color: "white",
            fontStyle: "italic",
            fontWeight: "bold",
          }}
          
        >
          Create new user
        </Text>
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

  
