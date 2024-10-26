
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import MyPage from './pages/myPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();

function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Stack.Screen options={{ title: 'Overviewee' }} name="Home" component={Home} />
        <Stack.Screen name="myPage" component={MyPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;