import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Image, Alert, Modal, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsAdmin } from '../components/inicio/hooks/useIsAdmin.jsx';
import { useTheme } from '../components/theme/ThemeContext.jsx';

export default function Component() {
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
  const { isDarkMode, toggleTheme, theme } = useTheme();

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
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('userName');
      await AsyncStorage.removeItem('userRole');
      closeMenu();
      setLogoutModalVisible(true);

      setTimeout(() => {
        setLogoutModalVisible(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'AuthLoading' }],
        });
      }, 1500);
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error);
      Alert.alert('Error', 'Ocurrió un error al cerrar sesión. Por favor, intenta de nuevo.');
    }
  };

  return (
    <View style={[styles.container, styles.containerHeight, { backgroundColor: theme.navBackground }]}>
      <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
        <Feather name={showMenu ? 'x' : 'menu'} size={24} color={theme.text} style={styles.botonMenuHamburguesa} />
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
              backgroundColor: theme.menuBackground,
            },
          ]}
        >
          <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
            <Feather name="x" size={24} color={theme.text} />
          </TouchableOpacity>
          <View style={styles.menuItemsContainer}>
            <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
              <Feather 
                name={isDarkMode ? 'sun' : 'moon'} 
                size={24} 
                color={theme.text} 
              />
              <Text style={[styles.themeToggleText, { color: theme.text }]}>
                {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Inicio')}>
              <Text style={[styles.menuItemText, { color: theme.text }]}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Servicios')}>
              <Text style={[styles.menuItemText, { color: theme.text }]}>Servicios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Capacitaciones')}>
              <Text style={[styles.menuItemText, { color: theme.text }]}>Manuales</Text>
            </TouchableOpacity>
            {isAdmin && (
              <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Instalaciones')}>
                <Text style={[styles.menuItemText, { color: theme.text }]}>Instalaciones</Text>
              </TouchableOpacity>
            )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginTop: 20,
  },
  scanButton: {
    padding: 8,
  },
  scanIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginTop: 20,
  },
  botonMenuHamburguesa: {
    marginTop: 20,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  scanner: {
    flex: 1,
  },
  scannerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
  scannerCorner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#C75F00',
    borderWidth: 3,
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
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  themeToggleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

const ModalExito = ({ modalVisible, setModalVisible }) => {
  const { theme } = useTheme();
  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={[styles.modalContainer, { backgroundColor: theme.menuBackground }]}>
          <Text style={[styles.modalTitle, { color: theme.text }]}>¡Cierre de sesión exitoso!</Text>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: theme.buttonBackground }]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={[styles.modalButtonText, { color: theme.buttonText }]}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

