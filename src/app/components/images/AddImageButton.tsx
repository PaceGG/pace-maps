import { colors } from "@/constants/colors";
import { rem } from "@/constants/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import Button from "../UI/Button";

export default function AddImageButton() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/image-mock.jpg")}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        blurRadius={20}
      />
      <Button>
        <MaterialCommunityIcons
          name="file-image-plus"
          size={rem(4)}
          color={colors.foreground}
        />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    borderRadius: rem(1),
    overflow: "hidden",
    justifyContent: "center",
  },
  containerBackgroundImage: {
    borderRadius: rem(1),
    filter: "",
  },
});
