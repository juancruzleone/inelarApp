import React from 'react';
import { View, StatusBar, StyleSheet, ScrollView } from 'react-native';
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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Nav />
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
          handleSolicitud={handleSolicitud} // Se pasa la función handleSolicitud aquí
        />
      </ScrollView>
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
  },
  scrollContainer: {
    alignItems: 'center',
  },
});