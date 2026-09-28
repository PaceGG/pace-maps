import { colors } from "@/constants/colors";
import { rem } from "@/constants/styles";
import { MarkerData } from "@/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, Text, View } from "react-native";
import Button from "../UI/Button";

interface MarkerModalProps {
  marker: MarkerData;
}

export default function MarkerModal({ marker }: MarkerModalProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{marker.id}</Text>
      <Button
        variant="outlined"
        color={colors.error}
        icon={{ icon: <MaterialIcons name="delete" /> }}
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
