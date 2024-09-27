import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

export default function CajaServicios({ onPress, text, image }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.caja}>
        <Text style={styles.texto}>{text}</Text>
        <Image style={styles.imagen} source={image} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  caja: {
    backgroundColor: '#121212',
    padding: 30,
    paddingTop: 20,
    height: 140,
    borderRadius: 20,
    margin: 10,
    alignItems: 'center',
    flexBasis: 150,
  },
  texto: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  imagen: {
    width: 60,
    height: 60,
  },
});
