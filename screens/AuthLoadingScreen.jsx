import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../components/theme/ThemeContext';

const AuthLoadingScreen = ({ navigation }) => {
  const { theme } = useTheme();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        
        if (userData) {
          // User data exists, navigate to PantallaCarga and then to Inicio
          navigation.replace('PantallaCarga', { nextScreen: 'Inicio' });
        } else {
          // No user data, navigate directly to Login
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Error al verificar el token:', error);
        navigation.replace('Login');
      }
    };

    checkToken();
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ActivityIndicator size="large" color="#C75F00" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthLoadingScreen;

