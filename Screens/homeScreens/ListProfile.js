import { FlatList, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState,useEffect } from "react";
import { Image, ImageBackground, StyleSheet, Text } from "react-native";
import ProfileCard from "./ProfileCard";

import firebase from "../../config";
const database =firebase.database();
const ref_listprofile=database.ref("ListProfile");
// Fetch user's existing chats




export default function ListProfile(props) {
  const currentid = props.route.params.currentid;
  const [data, setData] = useState([]);
  useEffect(() => {
    //importer les données
    ref_listprofile.on('value', (snapshot) => {
      const d = [];
      snapshot.forEach((unProfil) => {
        if (unProfil.val().id != currentid) d.push(unProfil.val());
      });
      setData(d);
    });
    return () => {
      ref_listprofile.off();
    };
  }, []);
  return (
    
    <ImageBackground
      source={require("../../assets/back.jpg")}
      style={styles.container}
    >
      <StatusBar style="light" />
      <Text style={styles.textstyle}>List Profils</Text>
      <FlatList
      data={data}
      renderItem={({ item }) => (
        <ProfileCard
        //   nom={item.nom}
        //   prenom={item.prenom}
        //   telephone={item.numero}
        //  uriImage={item.uriImage}
        item={item}
         currentid={currentid} // Pass current user's ID
         navigation={props.navigation} // Pass navigation prop
         lastMessage={item.lastMessage}
         lastMessageTime={item.lastMessageTime}
         // onPress={() => props.navigation.navigate('Chat', { nom: item.nom,currentid: currentid,
          //   secondid: item.id, })}
        />
      )}
      keyExtractor={(item) => item.id} 
     
       style={{ backgroundColor: "0fff8", width: "95%" }}></FlatList>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
