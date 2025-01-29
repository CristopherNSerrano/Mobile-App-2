import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../navigation/RootNavigator';
// import * as SecureStore from 'expo-secure-store'; 

const ProfileScreen = () => {
  const { setIsAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('authToken');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error removing auth token:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {/* Add any profile-related information here */}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
});

export default ProfileScreen;
