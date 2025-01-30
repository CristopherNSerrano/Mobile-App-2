// File: MobileApp2/app.tsx

import React from 'react';
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    // The SafeAreaProvider ensures content is laid out correctly 
    // on devices with notches or special status bar areas.
    <SafeAreaProvider>
      {/* The Slot is where Expo Router will render the appropriate route. */}
      <Slot />
      
      {/* Optionally display the system status bar at the top of the screen. */}
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
