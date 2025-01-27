import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const index = ({}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BizLink</Text>
      <Pressable style={styles.button1} onPress={() => navigation.navigate('LoginPage')}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>
      <Text style={styles.title2}>Don't have an account? </Text>
      <Pressable style={styles.button2}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
      <Text style={styles.title3}>@2025 Our Demo UI App</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16, 
    backgroundColor: '#F5F5F5', 
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 50,
  },
  title2: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  title3: {
    marginTop: 150,
    textAlign: 'center',
  },
  button1: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200, 
  },
  button2: {
    backgroundColor: '#03DAC5',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center', 
    width: 200, 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default index