import { rem } from "@/constants/styles";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import AddImageButton from "./AddImageButton";

interface ShortImagesListProps {
  markerId: string;
  images: string[]; // uri
  handleImageAdded: (imageUri: string) => void;
}

export default function ShortImagesList({
  markerId,
  images,
  handleImageAdded,
}: ShortImagesListProps) {
  return (
    <View style={styles.container}>
      <AddImageButton markerId={markerId} onImageAdded={handleImageAdded} />
      {images
        .toReversed()
        .slice(0, 2)
        .map((uri, index) => (
          <Image
            key={index}
            source={{ uri }}
            style={{ flex: 1, aspectRatio: 1, borderRadius: rem(1) }}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: rem(0.5),
  },
});
