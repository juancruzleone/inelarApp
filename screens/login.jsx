import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false); 
  const validateLoginFields = (username, password) => {
    if (!username || !password) {
      return "Ingrese ambos campos para iniciar sesión.";
    }
    return null;
  };

  const loginUser = async (username, password) => {
    const response = await fetch("https://inelarweb-back.onrender.com/api/cuenta/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || "Error en la solicitud");
    }

    return await response.json();
  };

  const handleSubmit = async () => {
    setError('');

    const validationError = validateLoginFields(username, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const data = await loginUser(username, password);
      console.log('Login successful:', data);

  
      await AsyncStorage.setItem('userName', username);

      setLoginModalVisible(true); 
      setTimeout(() => {
        setLoginModalVisible(false);
        navigation.navigate('Inicio');
      }, 1500); 
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message === "Validation error" ? "Usuario o contraseña incorrectos." : `Error en la solicitud: ${err.message}`);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userName');
      setLogoutModalVisible(true);
      setTimeout(() => {
        setLogoutModalVisible(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }, 1000); 
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Ocurrió un error al cerrar sesión. Inténtelo de nuevo.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoContainer}
          source={require('../assets/logo.png')}
        />
      </View>
      <View style={styles.containerLogin}>
        <Text style={styles.title}>Inicia sesión</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu usuario"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Ingresa tu contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#C75F00" />
            </TouchableOpacity>
          </View>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          Si no tienes una cuenta,{' '}
          <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
            regístrate
          </Text>
        </Text>
      </View>


      <Modal
        animationType="fade"
        transparent={true}
        visible={loginModalVisible}
        onRequestClose={() => setLoginModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Sesión iniciada exitosamente</Text>
            <Ionicons name="checkmark-circle-outline" size={60} color="#4CAF50" style={styles.modalIcon} />
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1d1d1d',
  },
  logoContainer: {
    marginTop: 120,
    marginBottom: 40,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  containerLogin: {
    backgroundColor: '#121212',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: '#C75F00',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  registerText: {
    color: '#fff',
    marginTop: 20,
  },
  registerLink: {
    color: '#C75F00',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#1b1b1b',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalIcon: {
    marginBottom: 10,
    marginTop: 10
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default LoginScreen;
