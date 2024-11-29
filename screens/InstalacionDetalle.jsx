import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useDevices } from '../components/InstalacionDetalle/hooks/useDevices.jsx';
import Nav from '../components/nav';
import Footer from '../components/footer';
import ModalCrear from '../components/InstalacionDetalle/components/ModalCrear.jsx';
import ModalEditar from '../components/InstalacionDetalle/components/ModalEditar.jsx';
import ModalEliminar from '../components/InstalacionDetalle/components/ModalEliminar.jsx';
import ModalImprimir from '../components/InstalacionDetalle/components/ModalImprimir.jsx';
import ModalExito from '../components/InstalacionDetalle/components/ModalExito.jsx';
import { getLastMaintenanceForDevice } from '../components/InstalacionDetalle/services/FetchDispositivos.jsx';
import { useTheme } from '../components/theme/ThemeContext';

export default function InstalacionDetalle() {
  const route = useRoute();
  const { installation } = route.params;
  const { devices, loading, error, addDevice, updateDevice, deleteDevice, refreshDevices } = useDevices(installation._id);
  const [search, setSearch] = useState('');
  const [printModalVisible, setPrintModalVisible] = useState(false);
  const [selectedQR, setSelectedQR] = useState(null);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { theme } = useTheme();

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

  const openPrintModal = (qrCode) => {
    setSelectedQR(qrCode);
    setPrintModalVisible(true);
  };

  const closePrintModal = () => {
    setPrintModalVisible(false);
    setSelectedQR(null);
  };

  const handleMaintenanceInfo = async (device) => {
    try {
      const maintenance = await getLastMaintenanceForDevice(installation._id, device._id);
      if (maintenance && maintenance.pdfUrl) {
        const supported = await Linking.canOpenURL(maintenance.pdfUrl);
        if (supported) {
          await Linking.openURL(maintenance.pdfUrl);
        } else {
          console.error("No se puede abrir el URL:", maintenance.pdfUrl);
        }
      } else {
        console.log("No hay mantenimiento registrado para este dispositivo");
      }
    } catch (error) {
      console.error('Error al obtener o abrir el último mantenimiento:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.deviceItem, { backgroundColor: theme.menuBackground }]}>
      <Text style={[styles.deviceName, { color: theme.text }]}>{item.nombre || 'Sin nombre'}</Text>
      <View style={styles.contenidoDispositivo}>
        <Text style={[styles.deviceLocation, { color: theme.text }]}>{item.ubicacion || 'Sin ubicación'}</Text>
        <Text style={[styles.deviceCategory, { color: theme.text }]}>{item.categoria || 'Sin categoría'}</Text>
      </View>

      <View style={styles.deviceActions}>
        {item.codigoQR && (
          <TouchableOpacity onPress={() => openPrintModal(item.codigoQR)}>
            <Ionicons name="print" size={30} color={theme.text} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => handleEditDevice(item)}>
          <MaterialIcons name="edit" size={30} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteDevice(item)}>
          <MaterialIcons name="delete" size={30} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleMaintenanceInfo(item)}>
          <MaterialIcons name="build" size={30} color={theme.text} />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.buttonBackground} />
        <Text style={[styles.loadingText, { color: theme.text }]}>Cargando dispositivos...</Text>
      </View>
    );
  }

  if (error) {
    return <Text style={[styles.errorText, { color: theme.error }]}>Error: {error}</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Nav />
      <Text style={[styles.installationName, { color: theme.title }]}>{installation.company || 'Instalación sin nombre'}</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchBar, { backgroundColor: theme.menuBackground, color: theme.text }]}
          placeholder="Buscar dispositivo"
          placeholderTextColor={theme.text}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.buttonBackground }]} onPress={handleAddDevice}>
        <Text style={[styles.addButtonText, { color: theme.buttonText }]}>Agregar Dispositivo</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredDevices}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        ListFooterComponent={<View style={{ height: 80 }} />}
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

      <ModalImprimir
        isVisible={printModalVisible}
        onClose={closePrintModal}
        qrCode={selectedQR}
      />

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  installationName: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
  },
  searchContainer: {
    margin: 20,
  },
  searchBar: {
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  addButton: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  addButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  deviceItem: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  deviceName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  deviceLocation: {
    fontSize: 14,
  },
  deviceCategory: {
    fontSize: 14,
    marginBottom: 10,
  },
  deviceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
  },
  contenidoDispositivo: {
    marginTop: 10
  }
});

