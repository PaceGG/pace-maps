import useMarkers from "@/hooks/useMarkers";
import { MarkerData } from "@/types";
import { Pressable, Text } from "react-native";
import { Callout, Marker } from "react-native-maps";

export interface MarkerProps {
  marker: MarkerData;
}

export default function CustomMarker({ marker }: MarkerProps) {
  const { markers, deleteMarker } = useMarkers();

  const handleDeletePress = () => {
    if (!marker.id) return;
    deleteMarker(marker.id);
  };

  return (
    <Marker coordinate={marker.coordinate}>
      <Callout>
        <Pressable onPress={handleDeletePress}>
          <Text>Удалить</Text>
        </Pressable>
      </Callout>
    </Marker>
  );
}
