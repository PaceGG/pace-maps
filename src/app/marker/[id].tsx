import { rem } from "@/constants/styles";
import useMarkers from "@/hooks/useMarkers";
import { MarkerData } from "@/types";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ImagesList from "../components/images/ImagesList";
import ImageStorage from "../storage/images";

export default function MarkerDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getMarkerById } = useMarkers();

  const [marker, setMarker] = useState<MarkerData | null>(null);

  useEffect(() => {
    const newMarker = getMarkerById(id);
    if (newMarker) setMarker(newMarker);
  }, [id, getMarkerById]);

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      if (!id) return;

      const savedImages = await ImageStorage.getImagesForMarker(id);
      setImages(savedImages || []);
    };

    loadImages();
  }, [id]);

  const handleImageAdded = (newUri: string) => {
    setImages((prev) => [...prev, newUri]);
  };

  return (
    <>
      <Stack.Screen options={{ title: marker?.name ?? "Загрузка..." }} />
      <Text>{id}</Text>
      <View style={styles.container}>
        <ImagesList
          images={images}
          markerId={id}
          handleImageAdded={handleImageAdded}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", padding: rem(0.5) },
});
