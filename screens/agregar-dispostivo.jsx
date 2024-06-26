import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Nav from '../components/nav';
import Footer from '../components/footer';

export default function AgregarDispositivo({ navigation }) {
  const [dispositivo, setDispositivo] = useState('');
  const [cantidad, setCantidad] = useState('');

  const handleAgregarDispositivo = () => {
    // Lógica para agregar un nuevo dispositivo
    console.log('Agregando dispositivo');
    console.log('Dispositivo: ' + dispositivo);
    console.log('Cantidad: ' + cantidad);

    // Puedes agregar aquí la lógica para enviar la información del dispositivo al servidor
    // o almacenarla localmente, según tus necesidades.

    // Después de agregar el dispositivo, puedes navegar a otra pantalla si es necesario.
    // En este caso, volveremos a la pantalla de inicio.
    navigation.navigate('Inicio');
  }

  return (
    <View style={styles.container}>
      <Nav />
      <StatusBar style="auto" translucent={true} />
      <View style={styles.contenido}>
        <Text style={styles.titulo}>Agregar Nuevo Dispositivo</Text>
        <Text style={styles.label}>Nombre del dispositivo</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe el nombre del dispositivo"
          value={dispositivo}
          onChangeText={text => setDispositivo(text)}
        />
        <Text style={styles.label}>Cantidad</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe la cantidad"
          value={cantidad}
          onChangeText={text => setCantidad(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleAgregarDispositivo}
        >
          <Text style={styles.buttonText}>Agregar Dispositivo</Text>
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
    marginTop: 60,
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
    height: 40,
  },
  button: {
    backgroundColor: '#f57600',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    width: 200,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
