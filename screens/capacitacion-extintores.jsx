import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Nav from '../components/nav';
import Footer from '../components/footer';

export default function ErrorPage() {
  const [expandedError, setExpandedError] = useState(null);

  const errors = [
    { id: 'error1', title: 'Error 1', solution: 'Solución para el Error 1: Verifique las conexiones del detector.' },
    { id: 'error2', title: 'Error 2', solution: 'Solución para el Error 2: Reemplace la batería del detector.' },
    { id: 'error3', title: 'Error 3', solution: 'Solución para el Error 3: Limpie el detector para eliminar polvo.' },
    // Add more errors as needed
  ];

  const toggleError = (id) => {
    setExpandedError(expandedError === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <Nav />
      <View style={styles.containerLogo}>
        <Image
          style={styles.imagenServicio}
          source={require('../assets/extintor.png')}
        />
      </View>
      
      <View style={styles.faqContainer}>
        {errors.map((error) => (
          <View key={error.id} style={styles.errorContainer}>
            <TouchableOpacity style={styles.errorHeader} onPress={() => toggleError(error.id)}>
              <Text style={styles.errorTitle}>{error.title}</Text>
              <Feather name={expandedError === error.id ? 'chevron-up' : 'chevron-down'} size={24} color="white" />
            </TouchableOpacity>
            {expandedError === error.id && (
              <Text style={styles.errorSolution}>{error.solution}</Text>
            )}
          </View>
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
  containerLogo: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
  },
  imagenServicio: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  faqContainer: {
    width: '90%',
    marginTop: 20,
  },
  errorContainer: {
    backgroundColor: '#121212',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  errorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 18,
    color: 'white',
  },
  errorSolution: {
    fontSize: 16,
    color: '#00FF00', // Green color for solution text
    marginTop: 10,
  },
});
