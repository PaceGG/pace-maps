import { StyleSheet, View } from "react-native";
import MapScreen from "./components/MapScreen";

export default function Index() {
  return (
    <View style={styles.container}>
      <MapScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
