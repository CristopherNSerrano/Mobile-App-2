import { View, Text, StyleSheet, Button, Alert} from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BizLink</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone number, username, or email"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput 
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />

      {/* We would need the onPress function to pass fetched data from backend to go in app */}
      <Button title="Log in"/>
      {/* This is backend to implement third party login */}
      
      <View style={styles.centered}>
        <Text style={styles.info1}>OR</Text>
        <Text style={styles.info2}>Forgot Password?</Text>
        <Text style={styles.info3}>Don't have an account? <Text style={styles.Signup}>Sign up</Text></Text>
        <Text style={styles.info4}>@2025 Our Demo UI App</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    },
    title: {
        fontSize: 50,
        textAlign: 'center',
    },
    input: {
        height: 50,
        marginTop: 10,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 6,
    },
    Signup: {
        color: 'blue',
    },
    info1: {
        marginTop: 20,
        textAlign: 'center',
        marginBottom: 100,
    },
    info2: {
        marginBottom: 30,
        textAlign: 'center',
    },
    info3: {
        marginBottom: 30,
        textAlign: "center",
    },
    info4: {
        marginTop: 150,
        textAlign: 'center',
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default LoginPage