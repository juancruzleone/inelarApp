import { useState, useEffect } from 'react';
import { fetchDevicesFromInstallation, addDeviceToInstallation, updateDeviceInInstallation, deleteDeviceFromInstallation } from '../services/FetchDispositivos';

export const useDevices = (installationId) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDevices = async () => {
    try {
      const data = await fetchDevicesFromInstallation(installationId);
      setDevices(data);
      setError(null);
    } catch (err) {
      setError(`Error fetching devices: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [installationId]);

  const refreshDevices = () => {
    fetchDevices();
  };

  const addDevice = async (device) => {
    try {
      const result = await addDeviceToInstallation(installationId, device);
      if (result.success) {
        setDevices([...devices, result.data]);
        return { success: true, message: 'Dispositivo agregado exitosamente' };
      } else {
        return { success: false, error: result.message };
      }
    } catch (err) {
      return { success: false, error: `Error adding device: ${err.message}` };
    }
  };

  const updateDevice = async (deviceId, updatedDevice) => {
    try {
      const result = await updateDeviceInInstallation(installationId, deviceId, updatedDevice);
      if (result.success) {
        setDevices(devices.map(device => (device._id === deviceId ? result.data : device)));
        return { success: true };
      } else {
        return { success: false, error: result.message };
      }
    } catch (err) {
      return { success: false, error: `Error updating device: ${err.message}` };
    }
  };

  const deleteDevice = async (deviceId) => {
    try {
      const result = await deleteDeviceFromInstallation(installationId, deviceId);
      if (result.success) {
        setDevices(devices.filter(device => device._id !== deviceId));
        return { success: true };
      } else {
        return { success: false, error: result.message };
      }
    } catch (err) {
      return { success: false, error: `Error deleting device: ${err.message}` };
    }
  };

  return {
    devices,
    loading,
    error,
    addDevice,
    updateDevice,
    deleteDevice,
    refreshDevices, 
  };
};
