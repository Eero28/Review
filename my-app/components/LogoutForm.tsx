import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from './Context';

const LogoutForm = () => {
  const { userInfo, logout } = useAuth();
  return (
    <View>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default LogoutForm;