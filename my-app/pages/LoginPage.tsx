import React from 'react'
import { View } from 'react-native';
import Form from './FormForm';
import { useAuth } from '../components/Context';
type Props = {}

const Home = (props: Props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Form/>
    </View>
    
  )
}

export default Home