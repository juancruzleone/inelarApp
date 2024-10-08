import React from 'react';
import { View, StyleSheet } from 'react-native';
import LogoSVG from '../../../assets/logo.svg'; 

const Logo = ({ width, height }) => (
  <View style={styles.logoContainer}>
    <LogoSVG width={width} height={height} style={styles.logo} />
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
    width: 60,
    height: 60
  },
});

export default Logo;
