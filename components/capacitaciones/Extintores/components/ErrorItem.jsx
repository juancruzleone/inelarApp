import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ErrorItem({ error, expandedError, toggleError }) {
  return (
    <View style={styles.errorContainer}>
      <TouchableOpacity style={styles.errorHeader} onPress={() => toggleError(error.id)}>
        <Text style={styles.errorTitle}>{error.title}</Text>
        <Feather name={expandedError === error.id ? 'chevron-up' : 'chevron-down'} size={24} color="white" />
      </TouchableOpacity>
      {expandedError === error.id && (
        <View style={styles.errorDetails}>
          <Text style={styles.errorProblemTitle}>Problema:</Text>
          <Text style={styles.errorProblem}>{error.problem}</Text>
          
          <Text style={styles.errorSolutionTitle}>Solución:</Text>
          <Text style={styles.errorSolution}>{error.solution}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  errorDetails: {
    marginTop: 10,
  },
  errorProblemTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  errorProblem: {
    fontSize: 16,
    color: 'white',
  },
  errorSolutionTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  errorSolution: {
    fontSize: 16,
    color: 'white',
  },
});
