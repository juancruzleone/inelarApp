import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Image, Alert, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false); 
  const menuWidth = Dimensions.get('window').width - 100;
  const menuTranslateX = new Animated.Value(-menuWidth);
  const navigation = useNavigation();

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

  const handleScanPress = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        Alert.alert('Photo taken!', 'You have taken a photo.');
      }
    } else {
      Alert.alert('Permission denied', 'Camera permission is required to use this feature.');
    }
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

      <Modal
        visible={logoutModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Sesión cerrada exitosamente</Text>
            <Ionicons name="checkmark-circle-outline" size={60} color="#4CAF50" style={styles.modalIcon} />
          </View>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1b1b1b',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  modalIcon: {
    marginBottom: 10,
    marginTop: 10,
  },
  /*
  modalButton: {
    backgroundColor: '#C75F00',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  */
});

export default Nav;
