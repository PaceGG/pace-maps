import { colors } from "@/constants/colors";
import { rem } from "@/constants/styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import AddImageButton from "./AddImageButton";
import ImageButton from "./ImageButton";

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
  const router = useRouter();

  const handleRedirect = () => {
    router.push({ pathname: "/marker/[id]", params: { id: markerId } });
  };

  return (
    <View style={styles.container}>
      <AddImageButton markerId={markerId} onImageAdded={handleImageAdded} />
      {images.slice(0, 2).map((uri, index) => (
        <Image
          key={index}
          source={{ uri }}
          style={{ flex: 1, aspectRatio: 1, borderRadius: rem(1) }}
        />
      ))}
      <ImageButton onPress={handleRedirect} backgroundImage={images.at(-1)}>
        <MaterialCommunityIcons
          name="dots-grid"
          size={rem(3)}
          color={colors.foreground}
        />
      </ImageButton>
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
