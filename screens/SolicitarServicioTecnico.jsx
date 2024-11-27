import React from 'react';
import { View, StatusBar, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Nav from '../components/nav.jsx'; 
import Footer from '../components/footer';
import FormularioServicioTecnico from '../components/solicitudServicios/ServicioTecnico/components/FormularioServicioTecnico.jsx';
import ModalExito from '../components/solicitudServicios/ServicioTecnico/components/ModalExito.jsx';
import { useSolicitudServicioTecnico } from '../components/solicitudServicios/ServicioTecnico/hooks/useSolicitudServicioTecnico.jsx';
import { useTheme } from '../components/theme/ThemeContext';

export default function SolicitarServicioTecnico() {
  const { theme } = useTheme();
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
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
      <View style={styles.navContainer}>
        <Nav />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FormularioServicioTecnico
          formData={formData}
          setFormData={setFormData}
          products={products}
          formErrors={formErrors}
          handleDateChange={handleDateChange}
          handleSolicitud={handleSolicitud}
          handleChange={handleChange}
          theme={theme}
        />
      </ScrollView>
      {modalVisible && (
        <ModalExito
          modalVisible={modalVisible}
          setModalVisible={handleCloseModal}
          theme={theme}
        />
      )}
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

