import { colors } from "@/constants/colors";
import { rem } from "@/constants/styles";
import { useDatabase } from "@/contexts/DatabaseContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import ImageButton from "./ImageButton";

interface AddImageButtonProps {
  markerId: number;
  onImageAdded: (newUri: string) => void;
}

export default function AddImageButton({
  markerId,
  onImageAdded,
}: AddImageButtonProps) {
  const { addImage } = useDatabase();

  const handleAddImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const tempUri = result.assets[0].uri;

        // const permanentUri = await ImageStorage.saveImageForMarker(
        //   markerId,
        //   tempUri,
        // );
        const permanentUri = await addImage(markerId, tempUri);

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
        size={rem(3)}
        color={colors.foreground}
      />
    </ImageButton>
  );
}
