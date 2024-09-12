import React from 'react';
import { View, StatusBar, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Nav from '../components/nav.jsx'; 
import Footer from '../components/footer';
import FormularioInstalacion from '../components/solicitudServicios/Instalacion/components/FormularioInstalacion.jsx';
import ModalExito from '../components/solicitudServicios/Instalacion/components/ModalExito.jsx';
import { useSolicitudInstalacion } from '../components/solicitudServicios/Instalacion/hooks/useSolicitudInstalacion.jsx';

export default function SolicitarInstalacion() {
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
  } = useSolicitudInstalacion();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.navContainer}>
        <Nav />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FormularioInstalacion
          formData={formData}
          setFormData={setFormData}
          products={products}
          formErrors={formErrors}
          showDatePicker={showDatePicker}
          datePickerMode={datePickerMode}
          handleDateChange={handleDateChange}
          handleDatePress={handleDatePress}
          handleSolicitud={handleSolicitud}
        />
      </ScrollView>
      <ModalExito
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#333',
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
});
