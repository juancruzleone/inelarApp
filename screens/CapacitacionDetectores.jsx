import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import Nav from '../components/nav';
import Footer from '../components/footer';
import Logo from '../components/capacitaciones/Detectores/components/Logo.jsx';
import ErrorItem from '../components/capacitaciones/Detectores/components/ErrorItem';
import { useErrorList } from '../components/capacitaciones/Detectores/hooks/useErrorList';

export default function CapacitacionDetectores() {
  const { errors, expandedError, toggleError } = useErrorList();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.navContainer}>
        <Nav />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Logo source={require('../assets/detector.png')} />
        
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
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1d1d1d',
  },
  navContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 20,
  },
  faqContainer: {
    width: '90%',
    marginTop: 20,
    paddingBottom: 100, 
  },
});

