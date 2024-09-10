import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useLogin } from '../components/login/hooks/useLogin.jsx';
import Logo from '../components/login/components/Logo.jsx';
import FormularioLogin from '../components/login/components/FormularioLogin.jsx';
import { SuccessModal } from '../components/login/components/ModalExito.jsx';

const Login = ({ navigation }) => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    showPassword,
    togglePasswordVisibility,
    loginModalVisible,
    handleSubmit,
  } = useLogin(navigation);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Logo />
      <FormularioLogin
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        showPassword={showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
        handleSubmit={handleSubmit}
        error={error}
      />
      <SuccessModal isVisible={loginModalVisible} onClose={() => {}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1d1d1d',
  },
});

export default Login;
