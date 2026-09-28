import { useBottomModal } from "@/hooks/useBottomModal";
import useMarkers from "@/hooks/useMarkers";
import { MarkerData } from "@/types";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { LatLng, LongPressEvent } from "react-native-maps";

import { colors } from "@/constants/colors";
import CreateMarkerModal from "./markers/CreateMarkerModal";
import CustomMarker from "./markers/CustomMarker";
import MarkerModal from "./markers/MarkerModal";
import MarkerTitle from "./markers/MarkerModalTitle";

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const { markers, addMarker, deleteMarker, renameMarker } = useMarkers();
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [tempCoordinate, setTempCoordinate] = useState<LatLng | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const { BottomModal, open, close } = useBottomModal();

  const initialRegion = {
    latitude: 58.0105,
    longitude: 56.2502,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const goToMyLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Ошибка", "Отказано в доступе к геолокации.");
        setIsLoadingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const userRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };

      mapRef.current?.animateToRegion(userRegion, 1000);
    } catch (error) {
      console.error("Ошибка при получении геолокации: ", error);
      Alert.alert("Ошибка", "Не удалось определить местоположение.");
    } finally {
      setIsLoadingLocation(false);
    }
  };

  useEffect(() => {
    goToMyLocation();
  }, []);

  const handleLongPress = (event: LongPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedMarker(null);
    setTempCoordinate({ latitude, longitude });
    open();
  };

  const handleMarkerPress = (marker: MarkerData) => {
    setTempCoordinate(null);
    setSelectedMarker(marker);
    open();
  };

  const handleSaveNewMarker = (name: string, coordinate: LatLng) => {
    addMarker({ coordinate, name });
    closeModal();
  };

  const closeModal = () => {
    close();
    setTempCoordinate(null);
    setSelectedMarker(null);
  };

  const handleRenameMarker = (markerId: string, newName: string) => {
    renameMarker(markerId, newName);
  };

  return (
    <>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          initialRegion={initialRegion}
          showsUserLocation={true}
          showsMyLocationButton={false}
          onLongPress={handleLongPress}
          style={styles.map}
          toolbarEnabled={false}
        >
          {markers.map((marker) => (
            <CustomMarker
              key={marker.id}
              marker={marker}
              onPress={() => handleMarkerPress(marker)}
            />
          ))}
        </MapView>

        <TouchableOpacity
          style={styles.locationButton}
          onPress={goToMyLocation}
          activeOpacity={0.7}
        >
          {isLoadingLocation ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <MaterialIcons
              name="my-location"
              size={24}
              color={colors.primary}
            />
          )}
        </TouchableOpacity>
      </View>

      <BottomModal
        title={
          tempCoordinate ? (
            "Добавление маркера"
          ) : selectedMarker ? (
            <MarkerTitle
              marker={selectedMarker}
              onRename={handleRenameMarker}
            />
          ) : (
            "Управление маркером"
          )
        }
        onClose={closeModal}
      >
        {tempCoordinate ? (
          <CreateMarkerModal
            coordinate={tempCoordinate}
            onSave={handleSaveNewMarker}
            onCancel={closeModal}
          />
        ) : (
          selectedMarker && (
            <MarkerModal
              marker={selectedMarker}
              onDelete={(id) => {
                deleteMarker(id);
                closeModal();
              }}
            />
          )
        )}
      </BottomModal>
    </>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: "100%",
    width: "100%",
  },
  map: {
    ...StyleSheet.absoluteFill,
  },
  locationButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: colors.foreground,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
