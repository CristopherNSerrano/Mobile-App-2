import React, { useEffect, useRef, useContext } from 'react';
import { Animated, Text, StyleSheet, Dimensions } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

interface ToastProps {
  message: string;
  onHide: () => void;
}

const { width } = Dimensions.get('window');

const Toast: React.FC<ToastProps> = ({ message, onHide }) => {
  const { theme } = useContext(ThemeContext);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Fade out after 2 seconds
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => onHide());
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity, backgroundColor: theme.secondary }]}>
      <Text style={[styles.text, { color: theme.background }]}>{message}</Text>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: width * 0.1,
    width: width * 0.8,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    zIndex: 1000,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
});
