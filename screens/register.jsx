import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useRegister } from '../components/register/hooks/useRegister.jsx';
import Logo from '../components/register/components/Logo.jsx';
import FormularioRegister from '../components/register/components/FormularioRegister.jsx';
import { SuccessModal } from '../components/register/components/ModalExito.jsx';

const Register = ({ navigation }) => {
  const {
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
  } = useRegister(navigation);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Logo />
      <FormularioRegister
        username={username}
        email={email}
        password={password}
        handleChange={handleChange}
        showPassword={showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
        handleSubmit={handleSubmit}
        errors={errors}
        formTouched={formTouched}
      />
      <SuccessModal isVisible={registerModalVisible} onClose={() => {}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1d1d1d',
  },
});

export default Register;

