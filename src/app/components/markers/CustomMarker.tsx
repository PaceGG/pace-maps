import useMarkers from "@/hooks/useMarkers";
import { MarkerData } from "@/types";
import { Marker } from "react-native-maps";

export interface MarkerProps {
  marker: MarkerData;
  onPress: () => void;
}

export default function CustomMarker({ marker, onPress }: MarkerProps) {
  const { markers, deleteMarker } = useMarkers();

  const handleDeletePress = () => {
    if (!marker.id) return;
    deleteMarker(marker.id);
  };

  return <Marker coordinate={marker.coordinate} onPress={onPress} />;
}
