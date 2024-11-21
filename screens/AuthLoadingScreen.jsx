import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const checkToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userData');
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        
        // Siempre navega a PantallaCarga primero
        navigation.replace('PantallaCarga', {
          nextScreen: userToken && isLoggedIn === 'true' ? 'Inicio' : 'Login'
        });
      } catch (error) {
        console.error('Error al verificar el token:', error);
        navigation.replace('PantallaCarga', { nextScreen: 'Login' });
      }
    };

    checkToken();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#C75F00" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d1d1d',
  },
});

export default AuthLoadingScreen;
