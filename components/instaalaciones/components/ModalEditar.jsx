import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import FormularioEditar from './FormularioEditar';

const ModalEditar = ({ 
  isOpen, 
  handleClose, 
  selectedInstallation, 
  errors, 
  handleSubmit, 
  handleEditInputChange,
  handleFileChange,
  setErrors,
  categories
}) => (
  <Modal
    visible={isOpen}
    animationType="slide"
    transparent={true}
    onRequestClose={handleClose}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Editar instalación</Text>
        <FormularioEditar 
          selectedInstallation={selectedInstallation} 
          errors={errors} 
          handleSubmit={handleSubmit}
          onClose={handleClose}
          handleEditInputChange={handleEditInputChange}
          setErrors={setErrors}
          categories={categories}
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