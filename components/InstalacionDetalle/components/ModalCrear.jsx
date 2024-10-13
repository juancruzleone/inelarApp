import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Animated } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import FormularioCrear from './FormularioCrear';


const ModalCrear = ({ isVisible, onClose, onSubmit }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));

  const handleSubmit = async (device) => {
    setIsCreating(true);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    await onSubmit(device);

    setIsCreating(false);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {isCreating ? 'Creando dispositivo' : 'Crear dispositivo'}
          </Text>
          {isCreating ? (
            <View style={styles.loaderContainer}>
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#C75F00" />
              </View>
     
            </View>
          ) : (
            <Animated.View style={{ opacity: fadeAnim }}>
              <FormularioCrear onSubmit={handleSubmit} onClose={onClose} />
            </Animated.View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#1b1b1b',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center'
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    marginTop: 20,
  },
  creatingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ModalCrear;