import { colors } from "@/constants/colors";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            color: colors.foreground,
          },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="index" options={{ title: "Pace Maps" }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
