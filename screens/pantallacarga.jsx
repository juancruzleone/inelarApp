import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const PantallaCarga = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace('Login');
      });
    }, 3000); // Tiempo de espera en milisegundos (3 segundos en este ejemplo)

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
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
  logo: {
    width: 100,
    height: 160,
  },
  loadingContainer: {
    marginTop: 20,
  },
});

export default PantallaCarga;