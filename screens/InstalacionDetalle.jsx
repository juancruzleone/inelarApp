import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDevices } from '../components/InstalacionDetalle/hooks/useDevices.jsx';
import Nav from '../components/nav';
import Footer from '../components/footer';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';  // Importación de iconos
import { printQR } from '../components/InstalacionDetalle/services/DeviceActions';  // Acción para imprimir dispositivos

export default function InstalacionDetalles() {
  const route = useRoute();
  const { installation } = route.params;
  const { devices, loading, error } = useDevices(installation._id);
  const [search, setSearch] = useState('');
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [selectedQR, setSelectedQR] = useState(null);

  const filteredDevices = devices.filter(device => 
    device.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddDevice = () => {
    // Acción para agregar dispositivo
  };

  const openQRModal = (qrCode) => {
    setSelectedQR(qrCode);
    setQrModalVisible(true);
  };

  const closeQRModal = () => {
    setQrModalVisible(false);
    setSelectedQR(null);
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
        <TouchableOpacity>
          <MaterialIcons name="edit" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="delete" size={30} color="white" />
        </TouchableOpacity>
        {/* Botón de planilla */}
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

      {/* Buscador de dispositivos */}
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar dispositivo"
        placeholderTextColor="gray"
        value={search}
        onChangeText={setSearch}
      />

      {/* Botón para agregar dispositivo */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddDevice}>
        <Text style={styles.addButtonText}>Agregar Dispositivo</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredDevices}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />

      {/* Modal para mostrar e imprimir el código QR */}
      <Modal visible={qrModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Código QR</Text>
            {selectedQR && (
              <Image 
                style={styles.qrCodeImageLarge} 
                source={{ uri: `https://api.qrserver.com/v1/create-qr-code/?data=${selectedQR}&size=200x200` }} 
              />
            )}
            <TouchableOpacity onPress={() => printQR(selectedQR)}>
              <Text style={styles.modalButton}>Imprimir Código QR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeQRModal}>
              <Text style={styles.modalButton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
    color: 'gray',
    fontSize: 14,
  },
  deviceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  qrCodeImageLarge: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  modalButton: {
    color: '#4CAF50',
    fontSize: 16,
    marginTop: 10,
  },
});
