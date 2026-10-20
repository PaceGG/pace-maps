import { MarkerData, MarkerImageData } from "@/types";
import * as FileSystem from "expo-file-system/legacy";
import * as SQLite from "expo-sqlite";

export const dbOperations = {
  async getMarkers(db: SQLite.SQLiteDatabase): Promise<MarkerData[]> {
    return await db.getAllAsync<MarkerData>(
      "SELECT * FROM markers ORDER BY created_at DESC;",
    );
  },

  async addMarker(
    db: SQLite.SQLiteDatabase,
    latitude: number,
    longitude: number,
    name: string,
  ): Promise<number> {
    const result = await db.runAsync(
      "INSERT INTO markers (latitude, longitude, name) VALUES (?, ?, ?);",
      [latitude, longitude, name],
    );
    return result.lastInsertRowId;
  },

  async renameMarker(
    db: SQLite.SQLiteDatabase,
    markerId: number,
    newName: string,
  ): Promise<void> {
    await db.runAsync("UPDATE markers SET name = ? WHERE id = ?;", [
      newName,
      markerId,
    ]);
  },

  async deleteMarker(db: SQLite.SQLiteDatabase, id: number): Promise<void> {
    const images = await this.getMarkerImages(db, id);

    await db.withTransactionAsync(async () => {
      await db.runAsync("DELETE FROM markers WHERE id = ?;", [id]);
    });

    await Promise.all(
      images.map((img) =>
        FileSystem.deleteAsync(img.uri, { idempotent: true }),
      ),
    );
  },

  async getMarkerImages(
    db: SQLite.SQLiteDatabase,
    markerId: number,
  ): Promise<MarkerImageData[]> {
    return await db.getAllAsync<MarkerImageData>(
      "SELECT * FROM marker_images WHERE marker_id = ? ORDER BY created_at DESC;",
      [markerId],
    );
  },

  async addImage(
    db: SQLite.SQLiteDatabase,
    markerId: number,
    sourceUri: string,
  ): Promise<string> {
    const fileName = `${markerId}_${Date.now()}.jpg`;
    const permanentUri = `${FileSystem.documentDirectory}${fileName}`;

    await FileSystem.copyAsync({
      from: sourceUri,
      to: permanentUri,
    });

    await db.runAsync(
      "INSERT INTO marker_images (marker_id, uri) VALUES (?, ?);",
      [markerId, permanentUri],
    );

    return permanentUri;
  },

  async deleteImage(db: SQLite.SQLiteDatabase, imageId: number): Promise<void> {
    const image = await db.getFirstAsync<MarkerImageData>(
      "SELECT * FROM marker_images WHERE id = ?;",
      [imageId],
    );

    await db.runAsync("DELETE FROM marker_images WHERE id = ?;", [imageId]);

    if (image?.uri) {
      await FileSystem.deleteAsync(image.uri, { idempotent: true });
    }
  },
};
