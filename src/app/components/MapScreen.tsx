import { useBottomModal } from "@/hooks/useBottomModal";
import useMarkers from "@/hooks/useMarkers";
import { MarkerData } from "@/types";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { LongPressEvent } from "react-native-maps";
import CustomMarker from "./markers/CustomMarker";
import MarkerModal from "./markers/MarkerModal";

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const { markers, addMarker, deleteMarker } = useMarkers();
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const { BottomModal, open, close } = useBottomModal();

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

  const handleMarkerPress = (marker: MarkerData) => {
    setSelectedMarker(marker);
    open();
  };

  const handleDeletePress = () => {
    if (!selectedMarker?.id) return;
    deleteMarker(selectedMarker.id);
    close();
  };

  return (
    <>
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
            <CustomMarker
              key={marker.id}
              marker={marker}
              onPress={() => handleMarkerPress(marker)}
            />
          ))}
        </MapView>
      </View>
      <BottomModal title={selectedMarker?.name || "Управление маркером"}>
        {selectedMarker && <MarkerModal marker={selectedMarker} />}
      </BottomModal>
    </>
  );
}

const styles = StyleSheet.create({
  mapContainer: { height: "100%" },
  map: { height: "100%", width: "100%" },
});
