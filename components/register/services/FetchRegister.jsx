import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerUser = async (username, email, password) => {
  try {
    const response = await fetch("https://inelarweb-back.onrender.com/api/cuenta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: username, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || "Error en la solicitud");
    }

    const data = await response.json();

    console.log("Respuesta del servidor:", data);

    // No guardamos los datos del usuario aquí porque aún no ha iniciado sesión

    return data;
  } catch (error) {
    console.error("Error during registration:", error.message);
    throw error;
  }
};

