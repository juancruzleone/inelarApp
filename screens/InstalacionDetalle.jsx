import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Print from 'expo-print';

import { useDevices } from '../components/InstalacionDetalle/hooks/useDevices.jsx';
import Nav from '../components/nav';
import Footer from '../components/footer';
import ModalCrear from '../components/InstalacionDetalle/components/ModalCrear.jsx';
import ModalEditar from '../components/InstalacionDetalle/components/ModalEditar.jsx';
import ModalEliminar from '../components/InstalacionDetalle/components/ModalEliminar.jsx';
import ModalExito from '../components/InstalacionDetalle/components/ModalExito.jsx';

export default function InstalacionDetalle() {
  const route = useRoute();
  const { installation } = route.params;
  const { devices, loading, error, addDevice, updateDevice, deleteDevice, refreshDevices } = useDevices(installation._id); 
  const [search, setSearch] = useState('');
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [selectedQR, setSelectedQR] = useState(null);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const filteredDevices = devices.filter(device => 
    device.nombre && device.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddDevice = () => {
    setCreateModalVisible(true);
  };

  const handleEditDevice = (device) => {
    setSelectedDevice(device);
    setEditModalVisible(true);
  };

  const handleDeleteDevice = (device) => {
    setSelectedDevice(device);
    setDeleteModalVisible(true);
  };

  const handleCreateSubmit = async (newDevice) => {
    const result = await addDevice(newDevice);
    if (result.success) {
      setSuccessMessage('Dispositivo creado exitosamente');
      setSuccessModalVisible(true);
      setCreateModalVisible(false);
    } else {
      console.error(result.error);
    }
  };

  const handleEditSubmit = async (updatedDevice) => {
    const result = await updateDevice(selectedDevice._id, updatedDevice);
    if (result.success) {
      setSuccessMessage('Dispositivo actualizado exitosamente');
      setSuccessModalVisible(true);
      setEditModalVisible(false);
    } else {
      console.error(result.error);
    }
  };

  const handleDeleteConfirm = async () => {
    const result = await deleteDevice(selectedDevice._id);
    if (result.success) {
      setSuccessMessage('Dispositivo eliminado exitosamente');
      setSuccessModalVisible(true);
      setDeleteModalVisible(false);
    } else {
      console.error(result.error);
    }
  };

 
  const handleSuccessModalClose = () => {
    setSuccessModalVisible(false);
    refreshDevices(); 
  };

  const openQRModal = (qrCode) => {
    setSelectedQR(qrCode);
    setQrModalVisible(true);
  };

  const closeQRModal = () => {
    setQrModalVisible(false);
    setSelectedQR(null);
  };

  const handlePrintQR = async (qrCode) => {
    try {
      const html = `
        <html>
          <body>
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
              <img src="https://api.qrserver.com/v1/create-qr-code/?data=${qrCode}&size=200x200" />
            </div>
          </body>
        </html>
      `;
      
      await Print.printAsync({
        html: html,
      });
    } catch (error) {
      console.error('Error al imprimir:', error);
      alert('Hubo un error al intentar imprimir el código QR.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.deviceItem}>
      <Text style={styles.deviceName}>{item.nombre || 'Sin nombre'}</Text>
      <Text style={styles.deviceLocation}>{item.ubicacion || 'Sin ubicación'}</Text>
      <Text style={styles.deviceCategory}>{item.categoria || 'Sin categoría'}</Text>

      <View style={styles.deviceActions}>
        {item.codigoQR && (
          <TouchableOpacity onPress={() => openQRModal(item.codigoQR)}>
            <Ionicons name="print" size={30} color="white" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => handleEditDevice(item)}>
          <MaterialIcons name="edit" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteDevice(item)}>
          <MaterialIcons name="delete" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="document-text" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C75F00" />
        <Text style={styles.loadingText}>Cargando dispositivos...</Text>
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Nav />
      <Text style={styles.installationName}>{installation.company || 'Instalación sin nombre'}</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Buscar dispositivo"
        placeholderTextColor="gray"
        value={search}
        onChangeText={setSearch}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddDevice}>
        <Text style={styles.addButtonText}>Agregar Dispositivo</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredDevices}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />

      <ModalCrear
        isVisible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onSubmit={handleCreateSubmit}
      />

      <ModalEditar
        isVisible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSubmit={handleEditSubmit}
        device={selectedDevice}
      />

      <ModalEliminar
        isVisible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleDeleteConfirm}
        deviceName={selectedDevice?.nombre}
      />

      <ModalExito
        isOpen={successModalVisible}
        onClose={handleSuccessModalClose} 
        message={successMessage}
      />

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d1d',
  },
  installationName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    margin: 20,
  },
  searchBar: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    margin: 20,
    color: 'black',
  },
  addButton: {
    backgroundColor: '#C75F00',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  deviceItem: {
    backgroundColor: '#121212',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  deviceName: {
    color: 'white',
    fontSize: 16,
  },
  deviceLocation: {
    color: 'gray',
    fontSize: 14,
  },
  deviceCategory: {
    color: 'lightgray',
    fontSize: 14,
    marginBottom: 10,
  },
  deviceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qrCodeImageLarge: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d1d1d',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalContent: {
    backgroundColor: '#1d1d1d',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    color: '#C75F00',
    marginTop: 20,
    fontSize: 16,
  },
});
