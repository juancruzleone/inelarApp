import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
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
    setShowDatePicker,
    handleSolicitud,
  } = useSolicitudInstalacion();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Nav />
      <FormularioInstalacion
        formData={formData}
        setFormData={setFormData}
        products={products}
        formErrors={formErrors}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        handleSolicitud={handleSolicitud}
      />
      <ModalExito
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
