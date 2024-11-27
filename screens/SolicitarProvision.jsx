import React from 'react';
import { View, StatusBar, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Nav from '../components/nav.jsx'; 
import Footer from '../components/footer';
import FormularioProvision from '../components/solicitudServicios/Provision/components/FormularioProvision.jsx';
import ModalExito from '../components/solicitudServicios/Provision/components/ModalExito.jsx';
import { useSolicitudProvision } from '../components/solicitudServicios/Provision/hooks/useSolicitudProvision.jsx';
import { useTheme } from '../components/theme/ThemeContext';

export default function SolicitarProvision() {
  const { theme } = useTheme();
  const {
    formData,
    setFormData,
    products,
    formErrors,
    modalVisible,
    setModalVisible,
    showDatePicker,
    datePickerMode,
    handleSolicitud,
    handleDateChange,
    handleDatePress,
  } = useSolicitudProvision();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
      <View style={styles.navContainer}>
        <Nav />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FormularioProvision
          formData={formData}
          setFormData={setFormData}
          products={products}
          formErrors={formErrors}
          showDatePicker={showDatePicker}
          datePickerMode={datePickerMode}
          handleDateChange={handleDateChange}
          handleDatePress={handleDatePress}
          handleSolicitud={handleSolicitud}
          theme={theme}
        />
      </ScrollView>
      <ModalExito
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        theme={theme}
      />
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
    paddingBottom: 80,
  },
});

