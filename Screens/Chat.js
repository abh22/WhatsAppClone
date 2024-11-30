import { View, Text } from 'react-native'
import React from 'react'

export default function Chat() {
  const currentid=props.route.params.currentid;
  const secondid=props.route.params.secondid;
  const iddisc=currentid> secondid? currentid + secondid : secondid+currentid;
  const ref_une_disc=ref_lesdiscussions.child(iddisc);
  return (
    <View>
      <Text>chat</Text>
    </View>
  )
}