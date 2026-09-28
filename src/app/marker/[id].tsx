import useMarkers from "@/hooks/useMarkers";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function MarkerDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getMarkerById } = useMarkers();
  const marker = getMarkerById(id);

  return (
    <>
      <Stack.Screen options={{ title: marker?.name }} />
      <Text>{id}</Text>
    </>
  );
}
