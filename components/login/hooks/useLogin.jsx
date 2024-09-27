import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateLoginFields } from "../utils/Validaciones.jsx"; 
import { loginUser } from '../services/FetchLogin.jsx'; 

export const useLogin = (navigation) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const handleSubmit = async () => {
    setError('');

    const validationError = validateLoginFields(username, password); // Usamos la función correctamente
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const data = await loginUser(username, password);
      await AsyncStorage.setItem('userName', username);

      setLoginModalVisible(true); 
      setTimeout(() => {
        setLoginModalVisible(false);
        navigation.navigate('Inicio');
      }, 1500); 
    } catch (err) {
      setError(err.message === "Validation error" ? "Usuario o contraseña incorrectos." : `Error en la solicitud: ${err.message}`);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    showPassword,
    togglePasswordVisibility,
    loginModalVisible,
    handleSubmit,
  };
};
