import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from './Context';
import LogoutForm from './LogoutForm';
import Form from '../pages/FormForm';
import Profile from '../pages/Profile';
import { View, Text } from 'react-native';

type Props = {};

const Tab = createBottomTabNavigator();


const AuthenticatedScreen = () => (
  <View style={{ flex: 1 }}>
    <LogoutForm />
  </View>
);

const TabNavigator = (props: Props) => {
  const { userInfo } = useAuth();
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={userInfo ? AuthenticatedScreen : Form} 
      />
      {userInfo && (
        <Tab.Screen 
          name="Profile" 
          component={Profile} 
        />
      )}
    </Tab.Navigator>
  );
};

export default TabNavigator;
