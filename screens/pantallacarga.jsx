import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Logo from '../assets/logo.svg';

const PantallaCarga = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Inicia la animación inmediatamente
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Navega a la pantalla de Login después de 3 segundos
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Logo width={100} height={160} />
      </Animated.View>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C75F00" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d1d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    marginTop: 20,
  },
});

export default PantallaCarga;