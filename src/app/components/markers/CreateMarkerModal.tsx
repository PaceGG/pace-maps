import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { LatLng } from "react-native-maps";

interface CreateMarkerModalProps {
  coordinate: LatLng;
  onSave: (name: string, coordinate: LatLng) => void;
  onCancel: () => void;
}

export default function CreateMarkerModal({
  coordinate,
  onSave,
  onCancel,
}: CreateMarkerModalProps) {
  const [name, setName] = useState("");

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim(), coordinate);
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Введите название маркера"
        value={name}
        onChangeText={setName}
        autoFocus
      />
      <View style={styles.buttonsRow}>
        <Button title="Отмена" color="red" onPress={onCancel} />
        <Button
          title="Сохранить"
          disabled={!name.trim()}
          onPress={handleSave}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
