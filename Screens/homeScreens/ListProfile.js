import { FlatList, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState,useEffect } from "react";
import { Image, ImageBackground, StyleSheet, Text } from "react-native";
import ProfileCard from "./ProfileCard";

import firebase from "../../config";
const database =firebase.database();
const ref_listprofile=database.ref("ListProfile");


export default function ListProfile(props) {
  const [data, setdata] = useState();
  useEffect(() => {
    ref_listprofile.on("value",(snapshot)=>{
      var d =[];
      snapshot.forEach((un_profile)=>{
        d.push(un_profile.val());
      });
      setdata(d);
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
          nom={item.nom}
          prenom={item.prenom}
          telephone={item.numero}
         uriImage={item.uriImage}
          onPress={() => navigation.navigate('Chat', { nom: item.nom })}
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
