import { colors } from "@/constants/colors";
import { MarkerData } from "@/types";
import { StyleSheet, Text, View } from "react-native";
import { Marker } from "react-native-maps";

export interface MarkerProps {
  marker: MarkerData;
  onPress: () => void;
}

export default function CustomMarker({ marker, onPress }: MarkerProps) {
  return (
    <Marker coordinate={marker.coordinate} onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{marker.name}</Text>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.marker, padding: 6, borderRadius: 16 },
  text: { color: colors.foreground, fontWeight: "bold" },
});
