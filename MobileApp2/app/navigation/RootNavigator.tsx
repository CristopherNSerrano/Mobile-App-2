import React, { useState, useEffect, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { ActivityIndicator, View } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a Context for Auth State
const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
});

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

const RootNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // TODO: Replace with your actual authentication check
    const checkAuth = async () => {
      // Simulate an async auth check (e.g., token validation)
      setTimeout(() => {
        // For demonstration, we'll assume the user is not authenticated
        setIsAuthenticated(false);
        // If authenticated, set to true
        // setIsAuthenticated(true);
      }, 1000);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Show a loading screen while checking auth status
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!isAuthenticated, setIsAuthenticated }}>
      <NavigationContainer>
        {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default RootNavigator;
