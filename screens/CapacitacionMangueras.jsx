import React from 'react';
import { View, StyleSheet } from 'react-native';
import Nav from '../components/nav';
import Footer from '../components/footer';
import Logo from '../components/capacitaciones/Mangueras/components/Logo.jsx';
import ErrorItem from '../components/capacitaciones/Mangueras/components/ErrorItem.jsx';
import { useErrorList } from '../components/capacitaciones/Mangueras/hooks/useErrorList.jsx';

export default function CapacitacionMangueras() {
  const { errors, expandedError, toggleError } = useErrorList();

  return (
    <View style={styles.container}>
      <Nav />
      <Logo source={require('../assets/manguera.png')} />
      
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
