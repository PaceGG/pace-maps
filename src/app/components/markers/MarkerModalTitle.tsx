// components/MarkerTitle.tsx
import { colors } from "@/constants/colors";
import { rem } from "@/constants/styles";
import { MarkerData } from "@/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface MarkerTitleProps {
  marker: MarkerData;
  onRename: (markerId: string, newName: string) => void;
}

export default function MarkerTitle({ marker, onRename }: MarkerTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(marker.name ?? "");

  useEffect(() => {
    setName(marker.name ?? "");
    setIsEditing(false);
  }, [marker.id, marker.name]);

  const handleSave = () => {
    const trimmed = name.trim();
    if (trimmed && trimmed !== marker.name) {
      onRename(marker.id, trimmed);
      setName(trimmed);
    } else {
      setName(marker.name ?? "");
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          autoFocus
          onSubmitEditing={handleSave}
          placeholder="Название маркера"
          placeholderTextColor={colors.foreground + "80"}
        />
        <TouchableOpacity onPress={handleSave} style={styles.iconButton}>
          <MaterialIcons name="check" size={22} color={colors.foreground} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <Text style={styles.title} numberOfLines={1}>
        {name}
      </Text>
      <TouchableOpacity
        onPress={() => setIsEditing(true)}
        style={styles.iconButton}
      >
        <MaterialIcons name="edit" size={20} color={colors.foreground} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: rem(0.5),
    width: "90%",
  },
  title: { color: colors.foreground, fontSize: rem(1.1), flexShrink: 1 },
  input: {
    flex: 1,
    minWidth: rem(6),
    color: colors.foreground,
    fontSize: rem(1.1),
    borderBottomWidth: 1,
    borderBottomColor: colors.foreground + "40",
    paddingVertical: rem(0.25),
  },
  iconButton: { padding: rem(0.25) },
});
