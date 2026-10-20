import { colors } from "@/constants/colors";
import { rem } from "@/constants/styles";
import { useDatabase } from "@/contexts/DatabaseContext";
import { MarkerData } from "@/types";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ImagesList from "../components/images/ImagesList";

export default function MarkerDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // const { getMarkerById } = useMarkers();
  const { getMarkerById, getMarkerImages, deleteImage } = useDatabase();

  const [marker, setMarker] = useState<MarkerData | null>(null);

  useEffect(() => {
    const newMarker = getMarkerById(Number(id));
    if (newMarker) setMarker(newMarker);
  }, [id, getMarkerById]);

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      if (!id) return;

      // const savedImages = await ImageStorage.getImagesForMarker(id);
      const savedImages = await getMarkerImages(Number(id));
      const savedImagesUri = savedImages.map((img) => img.uri);
      setImages(savedImagesUri || []);
    };

    loadImages();
  }, [id]);

  const handleImageAdded = (newUri: string) => {
    setImages((prev) => [...prev, newUri]);
  };

  const handleImageDeleted = async (delUri: string) => {
    setImages((prev) => prev.filter((uri) => uri !== delUri));
    // ImageStorage.deleteImage(id, delUri);
    const markerImages = await getMarkerImages(Number(id));
    const delId = markerImages.find((img) => img.uri === delUri)?.id;
    if (!delId) return;
    deleteImage(delId);
  };

  return (
    <>
      <Stack.Screen options={{ title: marker?.name ?? "Загрузка..." }} />
      <View style={styles.container}>
        <ImagesList
          images={images}
          markerId={id}
          handleImageAdded={handleImageAdded}
          handleImageDeleted={handleImageDeleted}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: rem(0.5),
    backgroundColor: colors.background,
    height: "100%",
  },
});
