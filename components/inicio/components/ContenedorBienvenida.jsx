import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ContenedorBienvenida({ userName }) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.texto}>¡Hola {userName}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    paddingHorizontal: 100,
    borderRadius: 20,
    backgroundColor: '#121212',
    padding: 20,
    marginTop: 20,
    marginBottom: 20
  },
  texto: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
