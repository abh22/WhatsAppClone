import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileCard = ({ nom, prenom, telephone, uriImage }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: uriImage}} style={styles.photo} />
      <View style={styles.info}>
        <Text style={styles.name}>{nom} {prenom}</Text>
        <Text style={styles.phone}>{telephone}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  phone: {
    color: 'gray',
    fontSize: 14,
  },
});

export default ProfileCard;