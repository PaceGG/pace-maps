import * as SQLite from "expo-sqlite";

export const initDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("markers.db");
    await db.execAsync("PRAGMA forein_keys = ON;");
    return db;
  } catch (error) {
    console.error("Ошибка при инициализации базы данных:", error);
    throw error;
  }
};
