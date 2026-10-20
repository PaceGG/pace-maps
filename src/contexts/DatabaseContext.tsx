import { dbOperations } from "@/database/operations";
import { initDatabase } from "@/database/schema";
import { DatabaseContextType, MarkerData, MarkerImageData } from "@/types";
import * as SQLite from "expo-sqlite";
import React, { createContext, useContext, useEffect, useState } from "react";

const DatabaseContext = createContext<DatabaseContextType | undefined>(
  undefined,
);

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let databaseInstance: SQLite.SQLiteDatabase | null = null;

    const setup = async () => {
      try {
        setIsLoading(true);
        databaseInstance = await initDatabase();
        setDb(databaseInstance);

        const initialMarkers = await dbOperations.getMarkers(databaseInstance);
        setMarkers(initialMarkers);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Ошибка инициализации БД"),
        );
      } finally {
        setIsLoading(false);
      }
    };

    setup();

    return () => {
      if (databaseInstance) {
        databaseInstance.closeAsync();
      }
    };
  }, []);

  const ensureDb = (): SQLite.SQLiteDatabase => {
    if (!db) {
      throw new Error("База данных еще не инициализирована");
    }
    return db;
  };

  const getMarkers = async (): Promise<MarkerData[]> => {
    try {
      setError(null);
      const data = await dbOperations.getMarkers(ensureDb());
      setMarkers(data);
      return data;
    } catch (err) {
      const dbError =
        err instanceof Error ? err : new Error("Ошибка загрузки маркеров");
      setError(dbError);
      throw dbError;
    }
  };

  const addMarker = async (
    latitude: number,
    longitude: number,
    name: string,
  ): Promise<number> => {
    try {
      setError(null);
      const newId = await dbOperations.addMarker(
        ensureDb(),
        latitude,
        longitude,
        name,
      );
      await getMarkers();
      return newId;
    } catch (err) {
      const dbError =
        err instanceof Error ? err : new Error("Ошибка создания маркера");
      setError(dbError);
      throw dbError;
    }
  };

  const renameMarker = async (
    markerId: number,
    newName: string,
  ): Promise<void> => {
    try {
      setError(null);
      await dbOperations.renameMarker(ensureDb(), markerId, newName);
      await getMarkers();
    } catch (err) {
      const dbError =
        err instanceof Error ? err : new Error("Ошибка переименования маркера");
      setError(dbError);
      throw dbError;
    }
  };

  const deleteMarker = async (id: number): Promise<void> => {
    try {
      setError(null);
      await dbOperations.deleteMarker(ensureDb(), id);
      await getMarkers();
    } catch (err) {
      const dbError =
        err instanceof Error ? err : new Error("Ошибка удаления маркера");
      setError(dbError);
      throw dbError;
    }
  };

  const addImage = async (markerId: number, uri: string): Promise<string> => {
    try {
      setError(null);
      const permanentUri = await dbOperations.addImage(
        ensureDb(),
        markerId,
        uri,
      );
      return permanentUri;
    } catch (err) {
      const dbError =
        err instanceof Error ? err : new Error("Ошибка добавления фото");
      setError(dbError);
      throw dbError;
    }
  };

  const deleteImage = async (id: number): Promise<void> => {
    try {
      setError(null);
      await dbOperations.deleteImage(ensureDb(), id);
    } catch (err) {
      const dbError =
        err instanceof Error ? err : new Error("Ошибка удаления фото");
      setError(dbError);
      throw dbError;
    }
  };

  const getMarkerImages = async (
    markerId: number,
  ): Promise<MarkerImageData[]> => {
    try {
      setError(null);
      return await dbOperations.getMarkerImages(ensureDb(), markerId);
    } catch (err) {
      const dbError =
        err instanceof Error ? err : new Error("Ошибка получения фото маркера");
      setError(dbError);
      throw dbError;
    }
  };

  const getMarkerById = (id: number): MarkerData | undefined => {
    return markers.find((m) => m.id === id);
  };

  return (
    <DatabaseContext.Provider
      value={{
        markers,
        addMarker,
        deleteMarker,
        getMarkers,
        addImage,
        deleteImage,
        getMarkerImages,
        renameMarker,
        getMarkerById,
        isLoading,
        error,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error(
      "useDatabase должен использоваться внутри DatabaseProvider",
    );
  }
  return context;
};
