import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Nav from '../components/nav';
import Footer from '../components/footer';

export default function MantenimientoScreen() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleSolicitud = () => {
    // Lógica para enviar la solicitud de mantenimiento
    console.log('Solicitando mantenimiento');
    console.log('Nombre: ' + nombre);
    console.log('Teléfono: ' + telefono);
    console.log('Dirección: ' + direccion);
  };

  return (
    <View style={styles.container}>
      <Nav />
      <StatusBar style="auto" translucent={true} />
      <View style={styles.contenido}>
        <Text style={styles.titulo}>Solicitud de Mantenimiento</Text>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu nombre"
          value={nombre}
          onChangeText={text => setNombre(text)}
        />
        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu teléfono"
          value={telefono}
          onChangeText={text => setTelefono(text)}
        />
        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu dirección"
          value={direccion}
          onChangeText={text => setDireccion(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSolicitud}
        >
          <Text style={styles.buttonText}>Solicitar Mantenimiento</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d1d',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  contenido: {
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    color: 'white',
    marginBottom: 40,
    marginTop: 60
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  input: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 10,
    marginBottom: 15,
    width: 340,
    height: 40
  },
  button: {
    backgroundColor: '#f57600',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    width: 250,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

