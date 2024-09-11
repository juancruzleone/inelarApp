import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserName = async () => {
  try {
    const storedUserName = await AsyncStorage.getItem('userName');
    return storedUserName || 'Usuario';
  } catch (error) {
    console.error('Error loading username:', error);
    return 'Usuario';
  }
};
