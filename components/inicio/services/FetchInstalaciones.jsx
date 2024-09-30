import { getToken } from '../utils/Auth';
const API_URL = 'https://inelarweb-back.onrender.com/api/instalaciones';

export const fetchInstallations = async () => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error al obtener las instalaciones');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};


export const createInstallation = async (instalacion) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }

    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(instalacion),
    });
    if (!response.ok) {
      throw new Error('Error al crear la instalación');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

