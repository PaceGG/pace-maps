import { colors } from "@/constants/colors";
import { rem } from "@/constants/styles";
import { useDatabase } from "@/contexts/DatabaseContext";
import { MarkerData } from "@/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../UI/Button";
import ShortImagesList from "../images/ShortImagesList";

interface MarkerModalProps {
  marker: MarkerData;
  onDelete: (id: number) => void;
}

export default function MarkerModal({ marker, onDelete }: MarkerModalProps) {
  const { getMarkerImages } = useDatabase();
  const [images, setImages] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadImages = async () => {
        if (!marker.id) return;
        // const savedImages = await ImageStorage.getImagesForMarker(marker.id);
        const savedImages = await getMarkerImages(marker.id);
        const savedImagesUri = savedImages.map((img) => img.uri);
        if (isActive) {
          setImages(savedImagesUri);
        }
      };

      loadImages();

      return () => {
        isActive = false;
      };
    }, [marker.id]),
  );

  const handleImageAdded = (newUri: string) => {
    console.log(newUri);
    setImages((prev) => [...prev, newUri]);
  };

  const handleDeleteClick = () => {
    if (marker.id) onDelete(marker.id);
  };

  return (
    <View style={styles.container}>
      <ShortImagesList
        markerId={marker.id}
        images={images.toReversed()}
        handleImageAdded={handleImageAdded}
      />
      <Button
        variant="outlined"
        color={colors.error}
        icon={{ icon: <MaterialIcons name="delete" /> }}
        onPress={handleDeleteClick}
      >
        Удалить маркер
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: rem(1), gap: rem(1) },
  text: { color: colors.foreground },
});
