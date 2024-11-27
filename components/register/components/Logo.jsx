import React from 'react';
import { View, StyleSheet } from 'react-native';
import LogoSVG from '../../../assets/logo4.svg'; 

const Logo = ({ width, height }) => (
  <View style={styles.logoContainer}>
    <LogoSVG width={width} height={height} style={styles.logo} />
  </View>
);

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: 40,
    marginBottom: 20,
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

