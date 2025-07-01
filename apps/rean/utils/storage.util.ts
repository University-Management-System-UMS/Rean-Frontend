import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: unknown) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error storing data:', e);
  }
};

export const getStorageData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error getting data:', e);
    return null;
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing data:', e);
  }
};

export const getUserLoginDetails = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_CONSTANTS.LOGIN_DETAILS);
    return jsonValue!= null? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error getting data:', e);
    return null;
  }
};

export const STORAGE_CONSTANTS = {
  LOGIN_DETAILS: 'loginDetails',
};