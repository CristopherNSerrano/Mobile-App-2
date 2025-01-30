// File: MobileApp2/app/signup/business.tsx
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

export default function BusinessSignUpScreen() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleBusinessSignUp = () => {
    console.log('Business Sign Up =>', businessName, email, password);
    // No backend yet, just test
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Business Sign Up</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Business Name"
        onChangeText={setBusinessName}
        value={businessName}
      />

      <TextInput
        style={styles.input}
        placeholder="Business Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={handleBusinessSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16,
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#fcfcfc',
  },
  title: {
    fontSize: 22,
    marginBottom: 24,
  },
  input: {
    width: '80%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#ffd500',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 16,
  },
  backText: {
    marginTop: 12,
    fontSize: 14,
    color: '#555',
    textDecorationLine: 'underline',
  },
});
