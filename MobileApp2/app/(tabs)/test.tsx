import React, { useRef, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Animated, 
  TouchableOpacity 
} from 'react-native';

export default function App() {
  // Animation refs
  const colorAnim = useRef(new Animated.Value(0)).current;  // For background color
  const scaleAnim = useRef(new Animated.Value(1)).current;   // For bouncing effect

  // Keep track of toggle state for color
  const [toggled, setToggled] = useState(false);

  // Trigger background color animation
  const toggleBackground = () => {
    setToggled(!toggled);
    Animated.timing(colorAnim, {
      toValue: toggled ? 0 : 1,
      duration: 1000,
      useNativeDriver: false,  // color interpolation doesn't use native driver
    }).start();
  };

  // Trigger bounce animation
  const bounce = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 3,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Interpolate colorAnim from 0 -> 1 into two different colors
  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ff9a9e', '#a18cd1'] // from pinkish to lavender
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Animated.View 
        style={[
          styles.box, 
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        <Text style={styles.boxText}>Bounce Me!</Text>
      </Animated.View>

      <TouchableOpacity style={styles.button} onPress={bounce}>
        <Text style={styles.buttonText}>Bounce</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={toggleBackground}>
        <Text style={styles.buttonText}>Toggle Background</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  boxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
