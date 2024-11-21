import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Nav from '../components/nav';
import BotonAgregarInstalacion from '../components/inicio/components/BotonAgregarInstalacion.jsx';
import CajaServicios from '../components/inicio/components/CajaServicios.jsx';
import ContenedorBienvenida from '../components/inicio/components/ContenedorBienvenida.jsx';
import { useUserName } from '../components/inicio/hooks/useUserName.jsx';
import ModalCrear from '../components/inicio/components/ModalCrear.jsx';
import ModalExito from '../components/inicio/components/ModalExito.jsx';
import useInstalaciones from '../components/inicio/hooks/useInstalaciones.jsx';
import { useIsAdmin } from '../components/inicio/hooks/useIsAdmin.jsx';

export default function Inicio() {
  const navigation = useNavigation();
  const userName = useUserName();
  const isAdmin = useIsAdmin();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalExitoVisible, setModalExitoVisible] = useState(false);
  const {
    newInstallation,
    errors,
    isLoading,
    isSuccess,
    handleInputChange,
    handleSubmit,
    setIsSuccess,
    setErrors,
    resetSuccess
  } = useInstalaciones();

  const handlePressServicios = () => navigation.navigate('Servicios');
  const handlePressCapacitaciones = () => navigation.navigate('Capacitaciones');
  const handlePressInstalaciones = () => navigation.navigate('Instalaciones');
  
  const handlePressAgregarInstalacion = () => setModalVisible(true);

  const handleCloseModal = () => {
    setModalVisible(false);
    if (isSuccess) {
      setModalExitoVisible(true);
      resetSuccess();
    }
  };

  const handleCloseModalExito = () => {
    setModalExitoVisible(false);
  };

  useEffect(() => {
    if (isSuccess) {
      handleCloseModal();
    }
  }, [isSuccess]);

  return (
    <View style={styles.container}>
      <Nav />
      <StatusBar style="auto" translucent={true} />
      <ContenedorBienvenida userName={userName} />
      <View style={styles.contenedorServiciosHome}>
        <CajaServicios 
          onPress={handlePressServicios} 
          text="Servicios" 
          image={require('../assets/servicios.png')} 
        />
        <CajaServicios 
          onPress={handlePressCapacitaciones} 
          text="Manuales" 
          image={require('../assets/libro.png')} 
        />
      </View>
      {isAdmin && (
        <View style={styles.contenedorInstalaciones}>
          <CajaServicios 
            onPress={handlePressInstalaciones} 
            text="Instalaciones" 
            image={require('../assets/instalaciones.png')} 
          />
        </View>
      )}
      {isAdmin && <BotonAgregarInstalacion onPress={handlePressAgregarInstalacion} />}

      <ModalCrear 
        isOpen={modalVisible}
        onClose={handleCloseModal}
        newInstallation={newInstallation}
        errors={errors}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        setErrors={setErrors}
      />

      <ModalExito 
        isOpen={modalExitoVisible}
        onClose={handleCloseModalExito}
        message="Instalación creada exitosamente"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d1d',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  contenedorServiciosHome: {
    flexDirection: 'row',
    margin: 0,
    justifyContent: 'space-between',
    width: '90%',
  },
  contenedorInstalaciones: {
    alignItems: 'center',
  },
});