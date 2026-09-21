import { MarkerData } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@markers";

const MarkerStorage = {
  async getMarkers(): Promise<MarkerData[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Ошибка чтения из хранилища:", error);
      return [];
    }
  },

  async saveMarkers(markers: MarkerData[]) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(markers));
    } catch (error) {
      console.error("Ошибка записи в хранилище:", error);
    }
  },
};

export default MarkerStorage;
