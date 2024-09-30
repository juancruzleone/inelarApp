import { Alert } from 'react-native';
import * as Print from 'expo-print';

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
