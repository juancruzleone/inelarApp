import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Image, Alert, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResultModalVisible, setScanResultModalVisible] = useState(false);
  const menuWidth = Dimensions.get('window').width - 100;
  const menuTranslateX = new Animated.Value(-menuWidth);
  const navigation = useNavigation();

  useEffect(() => {
    Animated.spring(menuTranslateX, {
      toValue: showMenu ? 0 : -menuWidth,
      useNativeDriver: true,
    }).start();
  }, [showMenu]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

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
    if (hasPermission === null) {
      return;
    }

    if (hasPermission === false) {
      Alert.alert('No access to camera', 'Please grant camera permission to use this feature.');
      return;
    }

    setIsScanning(true);
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScannedData(data);
    setScanResultModalVisible(true);
    setIsScanning(false);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userName');
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
      console.error('Error during logout:', error);
      Alert.alert('Error', 'An error occurred while logging out. Please try again.');
    }
  };

  return (
    <View style={[styles.container, styles.containerHeight]}>
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
            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('AgregarDispositivo')}>
              <Text style={styles.menuItemText}>Dispositivos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuItem, styles.botonCerrarSesion]} onPress={handleLogout}>
              <Text style={styles.textoCerrarSesion}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      <ModalExito modalVisible={logoutModalVisible} setModalVisible={setLogoutModalVisible} />

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
          {hasPermission && (
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
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
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    zIndex: 9999990,
  },
  containerHeight: {
    paddingVertical: 32,
  },
  menuButton: {
    padding: 8,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
    marginTop: 15,
  },
  scanButton: {
    padding: 8,
  },
  scanIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginTop: 15,
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
    height: 40,
    width: 180,
    alignItems: 'center',
    marginTop: 15,
  },
  textoCerrarSesion: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
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

const ModalExito = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>¡Cierre de sesión exitoso!</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Nav;
