import { View, Text } from 'react-native'
import React from 'react'
import { createNavigationContainerRef } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import ListProfile from './homeScreens/ListProfile'
import MyProfile from './homeScreens/MyProfile'
import Groups from './homeScreens/Groups'
export default function Home(props) {
  const currentId=props.route.params.currentid;
    const tab=createMaterialBottomTabNavigator();
  return (
    <tab.Navigator>
        <tab.Screen name='ListProfile' component={ListProfile} ></tab.Screen>
        <tab.Screen name='Groups' component={Groups} ></tab.Screen>
        <tab.Screen name='MyProfile' component={MyProfile} initialParams={currentId} ></tab.Screen>
    </tab.Navigator>
  )
}