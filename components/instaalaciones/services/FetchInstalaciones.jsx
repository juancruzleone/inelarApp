import { getToken } from '../utils/Auth.jsx';

export const obtenerInstalaciones = async () => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const response = await fetch("https://inelarweb-back.onrender.com/api/instalaciones", {
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

    return await response.json();
  } catch (error) {
    console.error("Error obteniendo las instalaciones:", error.message);
    throw error;
  }
};