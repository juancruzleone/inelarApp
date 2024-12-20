import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function BotonAgregarInstalacion({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.boton}>
      <Text style={styles.texto}>Crear instalación</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#C75F00',
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 25,
  },
  texto: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
