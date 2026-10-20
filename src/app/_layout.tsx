import { colors } from "@/constants/colors";
import { DatabaseProvider } from "@/contexts/DatabaseContext";
import { initDatabase } from "@/database/schema";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    const prepareDB = async () => {
      try {
        await initDatabase();
        console.log("База данных успешно загружена");
      } catch (error) {
        console.error("Ошибка при инициализации БД:", error);
      }
    };

    prepareDB();
  }, []);

  return (
    <DatabaseProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            color: colors.foreground,
          },
          headerTitleAlign: "center",
          headerTintColor: colors.foreground,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </DatabaseProvider>
  );
}
