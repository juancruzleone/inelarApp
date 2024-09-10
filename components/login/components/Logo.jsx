import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const Logo = () => (
  <View style={styles.logoContainer}>
    <Image
      style={styles.logo}
      source={require('../../../assets/logo.png')}
    />
  </View>
);

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: 120,
    marginBottom: 40,
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1, 
  },
  logo: {
    width: 100,
    height: 160,
  },
});

export default Logo;