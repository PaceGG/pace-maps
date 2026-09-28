import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system/legacy";

const IMAGES_STORAGE_KEY = "@marker_images";

type MarkerImagesMap = Record<string, string[]>;

const ImageStorage = {
  async _getImagesMap(): Promise<MarkerImagesMap> {
    try {
      const data = await AsyncStorage.getItem(IMAGES_STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error("Ошибка чтения изображений:", error);
      return {};
    }
  },

  async _saveImagesMap(map: MarkerImagesMap): Promise<void> {
    try {
      await AsyncStorage.setItem(IMAGES_STORAGE_KEY, JSON.stringify(map));
    } catch (error) {
      console.error("Ошибка записи изображений:", error);
    }
  },

  async getImagesForMarker(markerId: string): Promise<string[]> {
    const map = await this._getImagesMap();
    return map[markerId] || [];
  },

  async saveImageForMarker(
    markerId: string,
    sourceUri: string,
  ): Promise<string | null> {
    try {
      const fileName = `${markerId}_${Date.now()}.jpg`;
      const permanentUri = `${FileSystem.documentDirectory}${fileName}`;

      await FileSystem.copyAsync({
        from: sourceUri,
        to: permanentUri,
      });

      const map = await this._getImagesMap();
      const markerImages = map[markerId] || [];
      markerImages.push(permanentUri);
      map[markerId] = markerImages;

      await this._saveImagesMap(map);

      return permanentUri;
    } catch (error) {
      console.error("Ошибка сохранения изображения:", error);
      return null;
    }
  },

  async deleteImage(markerId: string, fileUri: string): Promise<void> {
    try {
      await FileSystem.deleteAsync(fileUri, { idempotent: true });

      const map = await this._getImagesMap();
      if (map[markerId]) {
        map[markerId] = map[markerId].filter((uri) => uri !== fileUri);
        await this._saveImagesMap(map);
      }
    } catch (error) {
      console.error("Ошибка удаления изображения:", error);
    }
  },

  async deleteAllImagesForMarker(markerId: string): Promise<void> {
    try {
      const images = await this.getImagesForMarker(markerId);

      await Promise.all(
        images.map((uri) => FileSystem.deleteAsync(uri, { idempotent: true })),
      );

      const map = await this._getImagesMap();
      delete map[markerId];
      await this._saveImagesMap(map);
    } catch (error) {
      console.error("Ошибка удаления всех изображений маркера:", error);
    }
  },
};

export default ImageStorage;
