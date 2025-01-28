import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import Index from './(tabs)/index';  // Your main screen
import LoginPage from './(tabs)/LoginPage'; // Login screen

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NativeViewGestureHandler>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Index">
          <Stack.Screen name='Index' component={Index} />
          <Stack.Screen name='Login' component={LoginPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeViewGestureHandler>
  );
};

export default App;
