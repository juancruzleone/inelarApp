import { getToken } from '../utils/Auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://inelarweb-back.onrender.com/api/instalaciones';

export const fetchDevicesFromInstallation = async (installationId) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const response = await fetch(`${API_URL}/${installationId}/dispositivos`, {
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

export const addDeviceToInstallation = async (installationId, device) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const response = await fetch(`${API_URL}/${installationId}/dispositivos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(device),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || "Error al agregar el dispositivo");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error agregando el dispositivo:", error.message);
    return { success: false, error: error.message };
  }
};

export const updateDeviceInInstallation = async (installationId, deviceId, device) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const response = await fetch(`${API_URL}/${installationId}/dispositivos/${deviceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(device),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || "Error al actualizar el dispositivo");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error actualizando el dispositivo:", error.message);
    return { success: false, error: error.message };
  }
};

export const deleteDeviceFromInstallation = async (installationId, deviceId) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const response = await fetch(`${API_URL}/${installationId}/dispositivos/${deviceId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || "Error al eliminar el dispositivo");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error eliminando el dispositivo:", error.message);
    return { success: false, error: error.message };
  }
};

export const getLastMaintenanceForDevice = async (installationId, deviceId) => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const response = await fetch(`${API_URL}/${installationId}/dispositivos/${deviceId}/ultimo-mantenimiento`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || "Error al obtener el último mantenimiento");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error obteniendo el último mantenimiento:", error.message);
    throw error;
  }
};