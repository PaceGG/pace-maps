import { colors } from "@/constants/colors";
import { rem } from "@/constants/styles";
import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import AddImageButton from "./AddImageButton";

interface ImagesListProps {
  markerId: string;
  images: string[]; // uri
  handleImageAdded: (imageUri: string) => void;
  handleImageDeleted: (imageUri: string) => void;
}

export default function ImagesList({
  markerId,
  images,
  handleImageAdded,
  handleImageDeleted,
}: ImagesListProps) {
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);

  const data = [
    { type: "add" },
    ...images.map((uri) => ({ type: "image", uri })),
  ];

  const handleImagePress = (itemUri: string) => {
    setSelectedImageUri(selectedImageUri === itemUri ? null : itemUri);
  };

  const handleDeletePress = (itemUri: string) => {
    handleImageDeleted(itemUri);
    setSelectedImageUri(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={3}
        keyExtractor={(_, i) => String(i)}
        columnWrapperStyle={{ gap: rem(0.5) }}
        contentContainerStyle={{ gap: rem(0.5) }}
        renderItem={({ item }) =>
          item.type === "add" ? (
            <AddImageButton
              markerId={markerId}
              onImageAdded={handleImageAdded}
            />
          ) : (
            <Pressable
              style={styles.imageContainer}
              onPress={() => handleImagePress(item.uri)}
            >
              <Image
                source={{ uri: item.uri }}
                style={[
                  styles.image,
                  selectedImageUri === item.uri && styles.imageSelected,
                ]}
              />

              {selectedImageUri === item.uri && (
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => handleDeletePress(item.uri)}
                >
                  <Entypo
                    name="cross"
                    size={rem(1.5)}
                    color={colors.foreground}
                  />
                </Pressable>
              )}
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
  imageContainer: {
    width: "31.9%",
    position: "relative",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: rem(1),
  },
  imageSelected: {
    borderWidth: rem(0.25),
    borderColor: colors.error,
  },
  deleteButton: {
    position: "absolute",
    top: rem(0.5),
    right: rem(0.5),
    backgroundColor: colors.error,
    width: rem(2),
    height: rem(2),
    borderRadius: rem(1),
    justifyContent: "center",
    alignItems: "center",
  },
});
