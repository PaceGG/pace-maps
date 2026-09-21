import { MarkerData } from "@/types";
import { Marker } from "react-native-maps";

export interface MarkerProps {
  marker: MarkerData;
  onPress: () => void;
}

export default function CustomMarker({ marker, onPress }: MarkerProps) {
  return <Marker coordinate={marker.coordinate} onPress={onPress} />;
}
