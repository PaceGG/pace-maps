import * as SQLite from "expo-sqlite";

export const initDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("markers.db");
    await db.execAsync("PRAGMA foreign_keys = ON;");

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS markers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS marker_images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        marker_id INTEGER NOT NULL,
        uri TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (marker_id) REFERENCES markers (id) ON DELETE CASCADE
      );
    `);

    const markers = await db.getAllAsync(
      "SELECT * FROM markers ORDER BY id LIMIT 10",
    );
    console.log("Первые маркеры:", markers);

    return db;
  } catch (error) {
    console.error("Ошибка при инициализации базы данных:", error);
    throw error;
  }
};
