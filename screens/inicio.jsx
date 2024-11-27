import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Animated, Image, Alert, Modal, Linking, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsAdmin } from '../components/inicio/hooks/useIsAdmin.jsx';
import { StatusBar } from 'expo-status-bar';
import BotonAgregarInstalacion from '../components/inicio/components/BotonAgregarInstalacion.jsx';
import CajaServicios from '../components/inicio/components/CajaServicios.jsx';
import ContenedorBienvenida from '../components/inicio/components/ContenedorBienvenida.jsx';
import { useUserName } from '../components/inicio/hooks/useUserName.jsx';
import ModalCrear from '../components/inicio/components/ModalCrear.jsx';
import ModalExito from '../components/inicio/components/ModalExito.jsx';
import useInstalaciones from '../components/inicio/hooks/useInstalaciones.jsx';
import Nav from '../components/nav';
import { useTheme } from '../components/theme/ThemeContext';

export default function Inicio() {
  const { theme } = useTheme();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResultModalVisible, setScanResultModalVisible] = useState(false);
  const navigation = useNavigation();
  const isAdmin = useIsAdmin();
  const userName = useUserName();
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

  const handleScanPress = () => {
    if (!permission?.granted) {
      requestPermission();
    } else {
      setIsScanning(true);
    }
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScannedData(data);
    setIsScanning(false);
    
    if (data.startsWith('http://') || data.startsWith('https://')) {
      Linking.openURL(data).catch(() => {});
    } else {
      setScanResultModalVisible(true);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userName');
      await AsyncStorage.removeItem('userRole');
      await AsyncStorage.removeItem('isLoggedIn');
      setLogoutModalVisible(true);

      setTimeout(() => {
        setLogoutModalVisible(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }, 1500);
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error);
      Alert.alert('Error', 'Ocurrió un error al cerrar sesión. Por favor, intenta de nuevo.');
    }
  };

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
    <View style={[styles.container, { backgroundColor: theme.background }]}>
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

      <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
        <Image source={require('../assets/escanear.png')} style={styles.scanIcon} />
      </TouchableOpacity>

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

      <ModalExito 
        isOpen={logoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        message="¡Cierre de sesión exitoso!"
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={scanResultModalVisible}
        onRequestClose={() => setScanResultModalVisible(false)}
      >
        <View style={[styles.modalBackground, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
          <View style={[styles.modalContainer, styles.scanResultModalContainer, { backgroundColor: theme.menuBackground }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Código QR escaneado</Text>
            <Text style={[styles.modalData, { color: theme.text }]}>{scannedData}</Text>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: theme.buttonBackground }]}
              onPress={() => setScanResultModalVisible(false)}
            >
              <Text style={[styles.modalButtonText, { color: theme.buttonText }]}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isScanning}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsScanning(false)}
      >
        <View style={styles.scannerContainer}>
          {permission?.granted && (
            <CameraView
              onBarcodeScanned={handleBarCodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ["qr"],
              }}
              style={StyleSheet.absoluteFillObject}
            />
          )}
          <TouchableOpacity 
            style={[styles.closeScannerButton, { backgroundColor: theme.buttonBackground }]} 
            onPress={() => setIsScanning(false)}
          >
            <Text style={[styles.closeScannerText, { color: theme.buttonText }]}>Cerrar Escáner</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scanButton: {
    padding: 8,
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  scanIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginTop: 10
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  scanResultModalContainer: {
    height: 200, 
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalData: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 10,
  },
  modalButtonText: {
    fontSize: 16,
  },
  scannerContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  closeScannerButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    borderRadius: 10,
  },
  closeScannerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

