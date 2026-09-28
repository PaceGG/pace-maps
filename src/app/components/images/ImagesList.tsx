import { rem } from "@/constants/styles";
import { Image } from "expo-image";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import AddImageButton from "./AddImageButton";

interface ImagesListProps {
  markerId: string;
  images: string[]; // uri
  handleImageAdded: (imageUri: string) => void;
}

export default function ImagesList({
  markerId,
  images,
  handleImageAdded,
}: ImagesListProps) {
  const data = [
    { type: "add" },
    ...images.map((uri) => ({ type: "image", uri })),
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={3}
        keyExtractor={(_, i) => String(i)}
        columnWrapperStyle={{ gap: rem(0.5) }}
        contentContainerStyle={{ gap: rem(0.5) }}
        style={{ width: 100 }}
        renderItem={({ item }) =>
          item.type === "add" ? (
            <AddImageButton
              markerId={markerId}
              onImageAdded={handleImageAdded}
            />
          ) : (
            <Pressable style={{ width: "32%" }}>
              <Image
                source={{ uri: item.uri }}
                style={{ width: "100%", aspectRatio: 1, borderRadius: rem(1) }}
              />
            </Pressable>
          )
        }
      />
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
