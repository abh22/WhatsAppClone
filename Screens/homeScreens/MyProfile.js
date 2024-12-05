import { StatusBar } from "expo-status-bar";
import React, { useState,useEffect } from "react";
import {
  Image,
  ImageBackground,
  RefreshControlBase,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
} from "react-native";
import firebase from "firebase/compat/app";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../config";
import { Alert } from "react-native";

export default function MyProfile(props) {
  const currentid = props.route.params.currentid;
  const [nom, setNom] = useState();
  const [prenom, setPrenom] = useState();
  const [numero, setNumero] = useState();
  const [isDefaultImage, setisDefaultImage] = useState(true);
  const [uriLocalImage, seturiLocalImage] = useState();
  const [localImage, setlocalImage] = useState();
  const [existingProfile, setExistingProfile] = useState(null);

  const db = firebase.database();
  const ref_lesprofiles = db.ref("ListProfile");
  const profileQuery = ref_lesprofiles.orderByChild('id').equalTo(currentid);
    

  // Fetch existing profile when component mounts
  useEffect(() => {
   
    profileQuery.once('value', (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const profileData = childSnapshot.val();
          setExistingProfile({
            key: childSnapshot.key,
            ...profileData
          });
           // Populate existing data
           setNom(profileData.nom || '');
           setPrenom(profileData.prenom || '');
           setNumero(profileData.numero || '');
           
           // If existing image URL, set it
           if (profileData.uriImage) {
             seturiLocalImage(profileData.uriImage);
             setisDefaultImage(false);
           }
         });
       }
     });
   }, [currentid]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setisDefaultImage(false);
      seturiLocalImage(result.assets[0].uri);
      setlocalImage(result.assets[0].fileName);
    }
  };

  const uploadImageToStorage = async () => {
    const res = await fetch(uriLocalImage);
    const blob = await res.blob();
    const arraybuffer = await new Response(blob).arrayBuffer();

    await supabase.storage
      .from("profileImage")
      .upload(currentid, arraybuffer, {
        upsert: true,
      });

    const { data} = supabase.storage
      .from("profileImage")
      .getPublicUrl(currentid);
    return data.publicUrl;
  };
  const saveProfile = async () => {
    // Validate inputs
    if (!nom || !prenom || !numero) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
  
    try {
      // Upload image (or use existing)
      const uriImage = await uploadImageToStorage();
  
      // Remove all existing profiles for this user
      const snapshot = await profileQuery.once('value');
      
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          ref_lesprofiles.child(childSnapshot.key).update(
            { id: currentid, 
       
              nom,
              prenom,
              numero,
              uriImage, // Update the image
            }
          );
        });
      }else{

  
      // Create a new profile
      const ref_unprofil = ref_lesprofiles.push();
      await ref_unprofil.set({
        id: currentid, 
        nom, 
        prenom, 
        numero, 
        uriImage 
      });
    }
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  return (
    <ImageBackground
      source={require("../../assets/back.jpg")}
      style={styles.container}
    >
      <StatusBar style="light" />
      <Text style={styles.textstyle}>My Account</Text>

      <TouchableHighlight onPress={() => pickImage()}>
        <Image
          source={
            isDefaultImage
               ? require("../../assets/icon.png")
               : { uri: uriLocalImage }
              
          }
          style={{
            height: 200,
            width: 200,
          }}
        />
      </TouchableHighlight>
      <TextInput
        onChangeText={(text) => {
          setNom(text);
        }}
        value={nom}
        textAlign="center"
        placeholderTextColor="#fff"
        placeholder="Nom"
        keyboardType="name-phone-pad"
        style={styles.textinputstyle}
      ></TextInput>
      <TextInput
        onChangeText={(text) => {
          setPrenom(text);
        }}
        value={prenom}
        textAlign="center"
        placeholderTextColor="#fff"
        placeholder="Pseudo"
        keyboardType="name-phone-pad"
        style={styles.textinputstyle}
      ></TextInput>
      <TextInput
        onChangeText={(text) => {
          setNumero(text);
        }}
        value={numero}
        placeholderTextColor="#fff"
        textAlign="center"
        placeholder="Numero"
        style={styles.textinputstyle}
      ></TextInput>
      <TouchableHighlight
        // onPress={async () => {
        //   const uriImage = await uploadImageToStorage();

        //   const ref_lesprofiles = db.ref("ListProfile");
        //   const key = ref_lesprofiles.push().key;
        //   const ref_unprofil = ref_lesprofiles.child("un_profile" + key);
        //   ref_unprofil.set({id: currentid, nom, prenom, numero, uriImage });
        // }}
        onPress={saveProfile}
        activeOpacity={0.5}
        underlayColor="#DDDDDD"
        style={{
          marginBottom: 10,
          borderColor: "#00f",
          borderWidth: 2,
          backgroundColor: "#08f6",
          textstyle: "italic",
          fontSize: 24,
          height: 60,
          width: "50%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "#FFF",
            fontSize: 24,
          }}
        >
          Save
        </Text>
      </TouchableHighlight>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  textinputstyle: {
    fontWeight: "bold",
    backgroundColor: "#0004",
    fontSize: 20,
    color: "#fff",
    width: "75%",
    height: 50,
    borderRadius: 10,
    margin: 5,
  },
  textstyle: {
    fontSize: 40,
    fontFamily: "serif",
    color: "#07f",
    fontWeight: "bold",
  },
  container: {
    color: "blue",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});