import useMarkers from "@/hooks/useMarkers";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { LongPressEvent } from "react-native-maps";
import CustomMarker from "./markers/Marker";

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const { markers, addMarker } = useMarkers();

  const initialRegion = {
    latitude: 58.0105,
    longitude: 56.2502,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const handleLongPress = (event: LongPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    addMarker({ coordinate: { latitude, longitude }, name: "new" });
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={mapRef}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onLongPress={handleLongPress}
        style={styles.map}
      >
        {markers.map((marker) => (
          <CustomMarker key={marker.id} marker={marker} />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: { height: "100%" },
  map: { height: "100%", width: "100%" },
});
