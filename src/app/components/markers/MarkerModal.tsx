import { colors } from "@/constants/colors";
import { rem } from "@/constants/styles";
import { MarkerData } from "@/types";
import { StyleSheet, Text, View } from "react-native";

interface MarkerModalProps {
  marker: MarkerData;
}

export default function MarkerModal({ marker }: MarkerModalProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Marker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: rem(1) },
  text: { color: colors.foreground },
});
