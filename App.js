import { View, Text } from "react-native";
import React from "react";
import Auth from "./Screens/Auth";
import NewUser from "./Screens/NewUser";
import Chat from "./Screens/Chat";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import { Header } from "react-native/Libraries/NewAppScreen";

const stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{ headerShown: false }}>
        <stack.Screen name="Auth" component={Auth}></stack.Screen>
        <stack.Screen
          name="NewUser"
          component={NewUser}
          options={{ headerShown: true }}
        ></stack.Screen>
        <stack.Screen name="Home" component={Home}></stack.Screen>
        
        <stack.Screen name="Chat" component={Chat}></stack.Screen>
      </stack.Navigator>
    </NavigationContainer>
  );
}
