import { rem } from "@/constants/styles";
import { Image, ImageSource } from "expo-image";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../UI/Button";

interface ImageButtonProps {
  onPress: () => void;
  backgroundImage?: ImageSource | string | number;
  children: ReactNode;
}

export default function ImageButton({
  onPress,
  backgroundImage = require("@/assets/images/image-mock.jpg"),
  children,
}: ImageButtonProps) {
  return (
    <View style={styles.container}>
      <Image
        source={backgroundImage}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        blurRadius={5}
      />
      <Button onPress={onPress}>{children}</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: rem(1),
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});
