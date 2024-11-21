import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LoginForm = ({
  username,
  password,
  handleChange,
  showPassword,
  togglePasswordVisibility,
  handleSubmit,
  errors,
  formTouched,
  navigation
}) => {
  return (
    <View style={styles.containerLogin}>
      <Text style={styles.title}>Inicia sesión</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu usuario"
          value={username}
          onChangeText={(text) => handleChange('username', text)}
          autoCapitalize="none"
        />
        {formTouched && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Ingresa tu contraseña"
            value={password}
            onChangeText={(text) => handleChange('password', text)}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#C75F00" />
          </TouchableOpacity>
        </View>
        {formTouched && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>
      {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>¿No tienes una cuenta?</Text>
        <TouchableOpacity onPress={() => navigation && navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Regístrate aquí</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: '#121212',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: '#fff',
    fontSize: 14,
  },
  registerLink: {
    color: '#C75F00',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default LoginForm;

