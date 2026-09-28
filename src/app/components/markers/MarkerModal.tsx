import { colors } from "@/constants/colors";
import { rem } from "@/constants/styles";
import { MarkerData } from "@/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, Text, View } from "react-native";
import Button from "../UI/Button";

interface MarkerModalProps {
  marker: MarkerData;
  onDelete: (id: string) => void;
}

export default function MarkerModal({ marker, onDelete }: MarkerModalProps) {
  const handleDeleteClick = () => {
    if (marker.id) onDelete(marker.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{marker.id}</Text>
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
