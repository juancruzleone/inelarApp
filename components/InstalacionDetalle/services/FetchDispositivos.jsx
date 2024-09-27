import { getToken } from '../utils/Auth.jsx';

export const fetchDevicesFromInstallation = async (installationId) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const response = await fetch(`https://inelarweb-back.onrender.com/api/instalaciones/${installationId}/dispositivos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || "Error en la solicitud");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error obteniendo los dispositivos:", error.message);
    throw error;
  }
};
