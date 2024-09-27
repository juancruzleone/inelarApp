import { useState, useEffect } from 'react';
import { obtenerInstalaciones } from '../services/FetchInstalaciones';

export const useInstallations = () => {
  const [installations, setInstallations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInstallations = async () => {
      try {
        const data = await obtenerInstalaciones();
        setInstallations(data);
      } catch (err) {
        setError(`Error fetching installations: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    getInstallations();
  }, []);

  return { installations, loading, error };
};