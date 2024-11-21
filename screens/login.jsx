import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useLogin } from '../components/login/hooks/useLogin.jsx';
import Logo from '../components/login/components/Logo.jsx';
import FormularioLogin from '../components/login/components/FormularioLogin.jsx';
import { SuccessModal } from '../components/login/components/ModalExito.jsx';

const Login = ({ navigation }) => {
  const {
    username,
    password,
    errors,
    formTouched,
    showPassword,
    togglePasswordVisibility,
    loginModalVisible,
    handleChange,
    handleSubmit,
  } = useLogin(navigation);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Logo />
      <FormularioLogin
        username={username}
        password={password}
        handleChange={handleChange}
        showPassword={showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
        handleSubmit={handleSubmit}
        errors={errors}
        formTouched={formTouched}
        navigation={navigation}
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

