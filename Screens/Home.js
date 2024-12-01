import { View, Text } from 'react-native'
import React from 'react'
import { createNavigationContainerRef } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import ListProfile from './homeScreens/ListProfile'
import MyProfile from './homeScreens/MyProfile'
import Groups from './homeScreens/Groups'
import Chat from './Chat.js'

export default function Home(props) {
  const currentid=props.route.params.currentid;
  const tab=createMaterialBottomTabNavigator();
  return (
    <tab.Navigator>
        <tab.Screen name='ListProfile' component={ListProfile}  initialParams={{ currentid: currentid }} ></tab.Screen>
        <tab.Screen name='Groups' component={Groups} ></tab.Screen>
        <tab.Screen name="Chat" component={Chat} initialParams={{ currentid: currentid }}></tab.Screen>
        <tab.Screen name='MyProfile' component={MyProfile}  initialParams={{ currentid: currentid }} ></tab.Screen>
    </tab.Navigator>
  )
}