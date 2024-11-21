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

export default function Inicio() {
  const [showMenu, setShowMenu] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResultModalVisible, setScanResultModalVisible] = useState(false);
  const menuWidth = Dimensions.get('window').width - 100;
  const menuTranslateX = new Animated.Value(-menuWidth);
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

  useEffect(() => {
    Animated.spring(menuTranslateX, {
      toValue: showMenu ? 0 : -menuWidth,
      useNativeDriver: true,
    }).start();
  }, [showMenu]);

  const handleMenuPress = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleNavigation = (screen) => {
    closeMenu();
    navigation.navigate(screen);
  };

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
      closeMenu();
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
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
        <Feather name={showMenu ? 'x' : 'menu'} size={24} color="white" style={styles.botonMenuHamburguesa} />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo-nav.png')} style={styles.logo} />
      </View>

      <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
        <Image source={require('../assets/escanear.png')} style={styles.scanIcon} />
      </TouchableOpacity>

      {showMenu && (
        <Animated.View
          style={[
            styles.menuContainer,
            {
              transform: [{ translateX: menuTranslateX }],
            },
          ]}
        >
          <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
            <Feather name="x" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.menuItemsContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Inicio')}>
              <Text style={styles.menuItemText}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Servicios')}>
              <Text style={styles.menuItemText}>Servicios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Capacitaciones')}>
              <Text style={styles.menuItemText}>Manuales</Text>
            </TouchableOpacity>
            {isAdmin && (
              <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Instalaciones')}>
                <Text style={styles.menuItemText}>Instalaciones</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.menuItem, styles.botonCerrarSesion]} onPress={handleLogout}>
              <Text style={styles.textoCerrarSesion}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

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
        <View style={styles.modalBackground}>
          <View style={[styles.modalContainer, styles.scanResultModalContainer]}>
            <Text style={styles.modalTitle}>Código QR escaneado</Text>
            <Text style={styles.modalData}>{scannedData}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setScanResultModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
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
          <TouchableOpacity style={styles.closeScannerButton} onPress={() => setIsScanning(false)}>
            <Text style={styles.closeScannerText}>Cerrar Escáner</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  menuButton: {
    padding: 8,
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
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
  botonMenuHamburguesa: {
    marginTop: 15,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#121212',
    paddingVertical: 20,
    paddingHorizontal: 16,
    zIndex: 9999990,
    width: Dimensions.get('window').width - 100,
    height: 1000,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
    borderRadius: 10,
    marginTop: 50,
  },
  menuItemsContainer: {
    marginTop: 40,
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuItemText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonCerrarSesion: {
    backgroundColor: '#C75F00',
    borderRadius: 10,
    padding: 2,
    height: 50,
    width: 180,
    alignItems: 'center',
    marginTop: 15,
  },
  textoCerrarSesion: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#1b1b1b',
    borderRadius: 10,
    alignItems: 'center',
  },
  scanResultModalContainer: {
    height: 200, 
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  modalData: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#121212',
    padding: 10,
    borderRadius: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  scannerContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  closeScannerButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#C75F00',
    padding: 10,
    borderRadius: 10,
  },
  closeScannerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

