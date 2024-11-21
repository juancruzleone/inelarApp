import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateUsername, validateEmail, validatePassword } from "../utils/Validaciones.jsx";
import { registerUser } from '../services/FetchRegister.jsx';

export const useRegister = (navigation) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: null,
    email: null,
    password: null
  });
  const [formTouched, setFormTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  const validateField = useCallback((field, value) => {
    let error = null;
    switch (field) {
      case 'username':
        error = validateUsername(value);
        break;
      case 'email':
        error = validateEmail(value);
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
      email: validateField('email', email),
      password: validateField('password', password)
    };
    setErrors(newErrors);
  }, [username, email, password, validateField]);

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
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
  };

  const handleSubmit = async () => {
    setFormTouched(true);
    validateForm();

    if (Object.values(errors).some(error => error !== null)) {
      return;
    }

    try {
      const data = await registerUser(username, email, password);
      await AsyncStorage.setItem('userName', username);
      setRegisterModalVisible(true);
      setTimeout(() => {
        setRegisterModalVisible(false);
        navigation.navigate('Login');
      }, 1500);
    } catch (err) {
      setErrors(prev => ({ ...prev, general: err.message || "Error en el registro" }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    username,
    email,
    password,
    errors,
    formTouched,
    showPassword,
    togglePasswordVisibility,
    registerModalVisible,
    handleChange,
    handleSubmit,
  };
};

