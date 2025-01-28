import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import Index from './(tabs)/index';  // Your main screen
import AuthNavigator from './(tabs)/AuthNavigator';
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AuthNavigator /> 
    </NavigationContainer>
  );
};

export default App;