// File: MobileApp2/app/login.tsx
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

export default function LoginScreen() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Mock login function (no real backend)
  const handleLogin = () => {
    console.log('Logging in with email:', email);
    // For now, just navigate somewhere or console.log
    // router.push('/some-dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(txt) => setEmail(txt)}
        value={email}
        keyboardType="email-address"
      />

      {/* Password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(txt) => setPassword(txt)}
        value={password}
      />

      {/* Log In button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Back link (just to demonstrate going back) */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backText}>Back to Landing</Text>
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
    fontSize: 24,
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
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  backText: {
    fontSize: 14,
    color: '#555',
    marginTop: 12,
    textDecorationLine: 'underline',
  },
});
