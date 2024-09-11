import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function BotonAgregarDispositivo({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.boton}>
      <Text style={styles.texto}>Agregar nuevo dispositivo</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#C75F00',
    padding: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 80,
  },
  texto: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
