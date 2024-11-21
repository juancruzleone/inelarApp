import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateUsername, validatePassword } from "../utils/Validaciones.jsx";
import { loginUser } from '../services/FetchLogin.jsx';

export const useLogin = (navigation) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: null,
    password: null,
    general: null
  });
  const [formTouched, setFormTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const validateField = useCallback((field, value) => {
    let error = null;
    switch (field) {
      case 'username':
        error = validateUsername(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
    }
    return error;
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {
      username: validateField('username', username),
      password: validateField('password', password),
      general: null
    };
    setErrors(newErrors);
  }, [username, password, validateField]);

  useEffect(() => {
    if (formTouched) {
      validateForm();
    }
  }, [formTouched, validateForm]);

  const handleChange = (field, value) => {
    if (!formTouched) {
      setFormTouched(true);
    }
    switch (field) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
  };

  const handleSubmit = async () => {
    setFormTouched(true);
    validateForm();

    if (errors.username || errors.password) {
      return;
    }

    try {
      const data = await loginUser(username, password);
      await AsyncStorage.setItem('userName', username);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setLoginModalVisible(true);
      setTimeout(() => {
        setLoginModalVisible(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Inicio' }],
        });
      }, 1500);
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        general: err.message === "Validation error" ? "Usuario o contraseña incorrectos." : `Error en la solicitud: ${err.message}`
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    username,
    password,
    errors,
    formTouched,
    showPassword,
    loginModalVisible,
    togglePasswordVisibility,
    handleChange,
    handleSubmit,
    setLoginModalVisible,
  };
};

