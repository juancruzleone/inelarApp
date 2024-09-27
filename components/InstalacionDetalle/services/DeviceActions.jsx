import { Alert } from 'react-native';

export const printQR = (codigoQR) => {
  Alert.alert('Imprimir Código QR', `Se ha generado el código QR para: ${codigoQR}`);
  // Lógica para imprimir el código QR
};

export const deleteDevice = (deviceId) => {
  Alert.alert('Eliminar Dispositivo', `Se eliminará el dispositivo con ID: ${deviceId}`, [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Eliminar', onPress: () => {
      // Lógica para eliminar el dispositivo desde el backend
      console.log(`Dispositivo ${deviceId} eliminado.`);
    }},
  ]);
};

export const editDevice = (deviceId) => {
  Alert.alert('Editar Dispositivo', `Se va a editar el dispositivo con ID: ${deviceId}`);
  // Lógica para navegar al formulario de edición de dispositivo
};
