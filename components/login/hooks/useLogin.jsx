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

    // Validar los campos del formulario
    const validationError = validateLoginFields(username, password); 
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      // Llamar a la API para iniciar sesión
      const data = await loginUser(username, password);
      
      // Guardar el nombre de usuario en AsyncStorage
      await AsyncStorage.setItem('userName', username);

      // Mostrar el modal de éxito
      setLoginModalVisible(true); 

      // Después de 1.5 segundos, ocultar el modal y redirigir al inicio
      setTimeout(() => {
        setLoginModalVisible(false);

        // Reiniciar la pila de navegación para que no se pueda volver a "Login"
        navigation.reset({
          index: 0,
          routes: [{ name: 'Inicio' }],
        });
      }, 1500); 
    } catch (err) {
      // Mostrar un error si ocurre
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
