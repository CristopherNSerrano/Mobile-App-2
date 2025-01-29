import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Index from '../(tabs)/index'; // Assuming 'index.tsx' is your Home Screen
import Explore from '../(tabs)/explore';
import BizScreenUser from '../(tabs)/BizScreenUser';
import { Ionicons } from '@expo/vector-icons'; // Optional: For tab icons

export type AppTabParamList = {
  Home: undefined;
  Explore: undefined;
  Business: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        // Optional: Customize tab icons
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Business') {
            iconName = focused ? 'business' : 'business-outline';
          } else {
            iconName = 'ellipse';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Index} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Business" component={BizScreenUser} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
