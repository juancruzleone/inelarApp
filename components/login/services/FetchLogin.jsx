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

    // Store the entire user data object
    await AsyncStorage.setItem('userData', JSON.stringify(data));

    return data;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
}