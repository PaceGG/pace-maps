import ImageStorage from "@/app/storage/images";
import { colors } from "@/constants/colors";
import { rem } from "@/constants/styles";
import { MarkerData } from "@/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../UI/Button";
import AddImageButton from "../images/AddImageButton";

interface MarkerModalProps {
  marker: MarkerData;
  onDelete: (id: string) => void;
}

export default function MarkerModal({ marker, onDelete }: MarkerModalProps) {
  if (!marker.id) return;

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      if (!marker.id) return;
      const savedImages = await ImageStorage.getImagesForMarker(marker.id);
      setImages(savedImages);
    };
    loadImages();
  }, [marker.id]);

  const handleImageAdded = (newUri: string) => {
    console.log(newUri);
    setImages((prev) => [...prev, newUri]);
  };

  const handleDeleteClick = () => {
    if (marker.id) onDelete(marker.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{marker.id}</Text>
      <AddImageButton markerId={marker.id} onImageAdded={handleImageAdded} />
      {images.map((uri, index) => (
        <Image
          key={index}
          source={{ uri }}
          style={{ width: 200, height: 200, borderRadius: rem(1) }}
        />
      ))}
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
  container: { padding: rem(1) },
  text: { color: colors.foreground },
});
