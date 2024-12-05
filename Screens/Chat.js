import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableHighlight,
  ImageBackground,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import firebase from "../config";
import { Alert } from "react-native";

const database = firebase.database();
const ref_lesdiscussions = database.ref("lesdiscussions");

export default function Chat(props) {
  const currentid = props.route.params.currentid;
  const secondid = props.route.params.secondid;
  const iddisc = [currentid, secondid].sort().join("");
  const ref_une_disc = ref_lesdiscussions.child(iddisc);

  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const listener = ref_une_disc.on("value", (snapshot) => {
      const messages = [];
      snapshot.forEach((unmsg) => {
        const message = unmsg.val();
        if (
          message &&
          message.receiver === currentid &&
          message.status !== "seen"
        ) {
          ref_une_disc.child(unmsg.key).set({
            ...message,
            status: "seen",
          });
        }
        messages.push(unmsg.val());
      });
      setData(messages);
    });

    return () => {
      ref_une_disc.off("value", listener);
    };
  }, [ref_une_disc]);

  const sendMessage = () => {
    if (message.trim()) {
      const key = ref_une_disc.push().key;
      const ref_un_msg = ref_une_disc.child(key);
      ref_un_msg.set({
        body: message,
        time: new Date().toLocaleString(),
        sender: currentid,
        receiver: secondid,
        status: "sent",
      });
      setMessage("");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/back.jpg")}
      style={styles.container}
    >
      <StatusBar style="light" />
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          const isCurrentUserSender = item.sender === currentid;
          const isLastMessage = index === data.length - 1;
          return (
            <View
              style={[
                styles.messageContainer,
                isCurrentUserSender
                  ? styles.sentMessageContainer
                  : styles.receivedMessageContainer,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  isCurrentUserSender
                    ? styles.sentMessage
                    : styles.receivedMessage,
                ]}
              >
                {item.body}
              </Text>

              <Text
                style={
                  isCurrentUserSender
                    ? styles.timeText
                    : styles.timeTextReceive
                }
              >
                {item.time}
              </Text>

              {isLastMessage && isCurrentUserSender && (
                <Text style={styles.timeText}>{item.status}</Text>
              )}
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        style={styles.chatList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setMessage}
          value={message}
          placeholder="Type your message"
          placeholderTextColor="#fff"
          style={styles.textInput}
        />
        <TouchableHighlight
          onPress={sendMessage}
          underlayColor="#DDDDDD"
          style={styles.sendButton}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableHighlight>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  chatList: {
    flex: 1,
    width: "95%",
    alignSelf: "center",
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  sentMessageContainer: {
    backgroundColor: "#055",
    alignSelf: "flex-end",
  },
  receivedMessageContainer: {
    backgroundColor: "beige",
    alignSelf: "flex-start",
  },
  sentMessage: {
    color: "white",
  },
  receivedMessage: {
    color: "black",
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  timeText: {
    fontSize: 12,
    color: "white",
    textAlign: "right",
  },
  timeTextReceive: {
    fontSize: 12,
    color: "black",
    textAlign: "right",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#0004",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#0004",
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#08f",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
