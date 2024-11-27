import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import Nav from '../components/nav';
import Footer from '../components/footer';
import Logo from '../components/capacitaciones/Alarmas/components/Logo.jsx';
import ErrorItem from '../components/capacitaciones/Alarmas/components/ErrorItem';
import { useErrorList } from '../components/capacitaciones/Alarmas/hooks/useErrorList';
import { useTheme } from '../components/theme/ThemeContext';

export default function CapacitacionAlarmas() {
  const { errors, expandedError, toggleError } = useErrorList();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.navContainer}>
        <Nav />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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

