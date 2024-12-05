import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';

const ProfileCard = ({item,currentid,navigation,lastMessage, lastMessageTime} ) => {
  // const chatId = currentid > item.id ? `${currentid}${item.id}` : `${item.id}${currentid}`; // Consistent chat ID
  const chatId = [currentid, item.id].sort().join('');
  console.log(chatId);
  const handlePress = () => {
    navigation.navigate('Chat', {
      chatId,
      currentid: currentid,
      secondid: item.id,
      nom: item.nom // You might want to pass other relevant information
    });
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
    <Image source={{ uri: item.uriImage }} style={styles.photo} />
    <View style={styles.info}>
      <Text style={styles.name}>{item.nom} {item.prenom}</Text>
      <Text style={styles.phone}>{item.numero}</Text>
      {lastMessage && (
          <>
            <Text style={styles.lastMessage} numberOfLines={1}>
              {lastMessage}
            </Text>
            <Text style={styles.lastMessageTime}>
              {lastMessageTime}
            </Text>
          </>
        )}
    </View>
  </TouchableOpacity>
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