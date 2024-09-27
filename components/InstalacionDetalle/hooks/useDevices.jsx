import { useState, useEffect } from 'react';
import { fetchDevicesFromInstallation } from '../services/FetchDispositivos';

export const useDevices = (installationId) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDevices = async () => {
      try {
        const data = await fetchDevicesFromInstallation(installationId);
        setDevices(data);
      } catch (err) {
        setError(`Error fetching devices: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    getDevices();
  }, [installationId]);

  return { devices, loading, error };
};
