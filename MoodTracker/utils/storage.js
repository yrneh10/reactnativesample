import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'MOODS';

export const getMoods = async () => {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
};

export const saveMood = async (mood) => {
  const moods = await getMoods();
  moods.unshift(mood);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(moods));
};
