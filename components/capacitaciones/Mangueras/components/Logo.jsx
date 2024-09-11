import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function Logo({ source }) {
  return (
    <View style={styles.containerLogo}>
      <Image
        style={styles.imagenServicio}
        source={source}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerLogo: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
  },
  imagenServicio: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
