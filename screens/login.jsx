import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://inelar-back-hsxzro0g6-juanleones-projects.vercel.app/api/cuenta/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Manejar el login exitoso, guardar el token, etc.
        navigation.navigate('Inicio');
      } else {
        // Manejar errores
        Alert.alert('Error', data.error.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar al servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.containerLogin}>
        <Text style={styles.title}>Inicia sesión</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d1d',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#fff',
  },
  inputContainer: {
    width: '85%',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 8,
  },
  button: {
    backgroundColor: '#C75F00',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    width: '85%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoContainer: {
    marginBottom: 40,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  containerLogin: {
    backgroundColor: '#121212',
    width: '100%',
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    paddingBottom: 60,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});
