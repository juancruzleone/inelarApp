import React from 'react';
import { View, StyleSheet } from 'react-native';
import Nav from '../components/nav';
import Footer from '../components/footer';
import Logo from '../components/capacitaciones/Alarmas/components/Logo.jsx';
import ErrorItem from '../components/capacitaciones/Alarmas/components/ErrorItem';
import { useErrorList } from '../components/capacitaciones/Alarmas/hooks/useErrorList';

export default function CapacitacionAlarmas() {
  const { errors, expandedError, toggleError } = useErrorList();

  return (
    <View style={styles.container}>
      <Nav />
      <Logo source={require('../assets/central.png')} />
      
      <View style={styles.faqContainer}>
        {errors.map((error) => (
          <ErrorItem
            key={error.id}
            error={error}
            expandedError={expandedError}
            toggleError={toggleError}
          />
        ))}
      </View>
      
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#1d1d1d',
  },
  faqContainer: {
    width: '90%',
    marginTop: 20,
  },
});
