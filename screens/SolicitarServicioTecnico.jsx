import React from 'react';
import { View, StatusBar, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Nav from '../components/nav.jsx'; 
import Footer from '../components/footer';
import FormularioServicioTecnico from '../components/solicitudServicios/ServicioTecnico/components/FormularioServicioTecnico.jsx';
import ModalExito from '../components/solicitudServicios/ServicioTecnico/components/ModalExito.jsx';
import { useSolicitudServicioTecnico } from '../components/solicitudServicios/ServicioTecnico/hooks/useSolicitudServicioTecnico.jsx';

export default function SolicitarServicioTecnico() {
  const {
    formData,
    setFormData,
    products,
    formErrors,
    modalVisible,
    setModalVisible,
    handleSolicitud,
    handleDateChange,
    handleChange,
  } = useSolicitudServicioTecnico();

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <Nav />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FormularioServicioTecnico
          formData={formData}
          setFormData={setFormData}
          products={products}
          formErrors={formErrors}
          handleDateChange={handleDateChange}
          handleSolicitud={handleSolicitud}
          handleChange={handleChange}
        />
      </ScrollView>
      {modalVisible && (
        <ModalExito
          modalVisible={modalVisible}
          setModalVisible={handleCloseModal}
        />
      )}
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#333',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20, 
  },
});