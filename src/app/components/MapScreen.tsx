import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);

  const initialRegion = {
    latitude: 58.0105,
    longitude: 56.2502,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={mapRef}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        style={styles.map}
      >
        <Marker
          coordinate={{ latitude: 58.0105, longitude: 56.2502 }}
          title="Точка на карте"
          description="Описание выбранного места"
        />
        <Marker
          coordinate={{ latitude: 58.013, longitude: 56.2502 }}
          title="Точка на карте"
          description="Описание выбранного места"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: { height: "100%" },
  map: { height: "100%", width: "100%" },
});
