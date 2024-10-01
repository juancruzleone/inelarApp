import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Print from 'expo-print';

export default function ModalImprimir({ isVisible, onClose, qrCode }) {
  const handlePrint = async () => {
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

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Código QR del Dispositivo</Text>
          <Image
            source={{ uri: `https://api.qrserver.com/v1/create-qr-code/?data=${qrCode}&size=200x200` }}
            style={styles.qrImage}
          />
          <TouchableOpacity style={styles.printButton} onPress={handlePrint}>
            <Text style={styles.printButtonText}>Imprimir</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

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
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center'
  },
  qrImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  printButton: {
    backgroundColor: '#C75F00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  printButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});