import ImageStorage from "@/app/storage/images";
import { colors } from "@/constants/colors";
import { rem } from "@/constants/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import ImageButton from "./ImageButton";

interface AddImageButtonProps {
  markerId: string;
  onImageAdded: (newUri: string) => void;
}

export default function AddImageButton({
  markerId,
  onImageAdded,
}: AddImageButtonProps) {
  const handleAddImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const tempUri = result.assets[0].uri;

        const permanentUri = await ImageStorage.saveImageForMarker(
          markerId,
          tempUri,
        );

        if (permanentUri && onImageAdded) {
          onImageAdded(permanentUri);
        }
      }
    } catch (error) {
      console.error("Ошибка при выборе/сохранении изображения:", error);
      Alert.alert("Ошибка", "Не удалось загрузить изображение");
    }
  };

  return (
    <ImageButton onPress={handleAddImage}>
      <MaterialCommunityIcons
        name="file-image-plus"
        size={rem(4)}
        color={colors.foreground}
      />
    </ImageButton>
  );
}
