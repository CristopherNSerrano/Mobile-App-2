// File: MobileApp2/app/landing.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';

export default function LandingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bizko</Text>
      <View style={styles.buttonContainer}>
        
        {/* LOG IN BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        {/* SIGN UP BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/signup')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fdfdfd',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    backgroundColor: '#ffd500',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
  },
});
