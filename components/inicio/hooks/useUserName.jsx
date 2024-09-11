import { useEffect, useState } from 'react';
import { getUserName } from '../../../components/inicio/services/FetchServicio.jsx';

export const useUserName = () => {
  const [userName, setUserName] = useState('Usuario');

  useEffect(() => {
    const fetchUserName = async () => {
      const storedUserName = await getUserName();
      if (storedUserName) {
        setUserName(storedUserName);
      }
    };

    fetchUserName();
  }, []);

  return userName;
};
