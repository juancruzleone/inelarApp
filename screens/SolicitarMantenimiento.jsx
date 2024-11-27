import React from 'react';
import { View, StatusBar, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Nav from '../components/nav.jsx'; 
import Footer from '../components/footer';
import FormularioMantenimiento from '../components/solicitudServicios/Mantenimiento/components/FormularioMantenimiento.jsx';
import ModalExito from '../components/solicitudServicios/Mantenimiento/components/ModalExito.jsx';
import { useSolicitudMantenimiento } from '../components/solicitudServicios/Mantenimiento/hooks/useSolicitudMantenimiento.jsx';
import { useTheme } from '../components/theme/ThemeContext';

export default function SolicitarMantenimiento() {
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
  } = useSolicitudMantenimiento();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
      <View style={styles.navContainer}>
        <Nav />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FormularioMantenimiento
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

