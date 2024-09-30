import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import FormularioEditar from './FormularioEditar';

const ModalEditar = ({ 
  isVisible, 
  onClose, 
  onSubmit,
  device,
}) => (
  <Modal
    visible={isVisible}
    animationType="slide"
    transparent={true}
    onRequestClose={onClose}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Editar instalación</Text>
        <FormularioEditar 
          selectedDevice={device} 
          handleSubmit={onSubmit}
          onClose={onClose}
        />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#121212',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'white'
  },
});

export default ModalEditar;