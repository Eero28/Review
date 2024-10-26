import React from 'react'
import { View, Text, Button } from 'react-native'

type Props = {}

const Home = (props: Props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => {}} title='to other'></Button>
    </View>
    
  )
}

export default Home