import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = async (username, password) => {
  try {
    const response = await fetch("https://inelarweb-back.onrender.com/api/cuenta/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || "Error en la solicitud");
    }

    const data = await response.json();

    console.log("Respuesta del servidor:", data);

   
    await AsyncStorage.setItem('userData', JSON.stringify(data));


    const userRole = data.cuenta?.role; 
    if (userRole) {
      await AsyncStorage.setItem('userRole', userRole); 
    } else {
      console.warn("El rol no está presente en la respuesta del servidor.");
    }

    return data;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};
