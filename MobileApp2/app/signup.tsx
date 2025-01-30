// File: MobileApp2/app/signup.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';

export default function SignUpPromptScreen() {
  const router = useRouter();

  const handleBusinessOwner = () => {
    // Navigate to business sign-up
    router.push('/signup/business');
  };

  const handleUserSignUp = () => {
    // Navigate to regular user sign-up
    router.push('/signup/user');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you a business owner?</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleBusinessOwner}>
        <Text style={styles.buttonText}>Yes</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={handleUserSignUp}>
        <Text style={styles.buttonText}>No</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fcfcfc',
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  title: {
    fontSize: 20,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#ffd500',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
    minWidth: 120,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '500',
  },
});
