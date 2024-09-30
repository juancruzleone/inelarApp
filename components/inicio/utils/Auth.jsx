import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      const { token } = JSON.parse(userData);
      return token;
    }
  } catch (error) {
    console.error('Error retrieving token:', error);
  }
  return null;
};