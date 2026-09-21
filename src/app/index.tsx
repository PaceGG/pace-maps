import { StyleSheet, View } from "react-native";
import MapView from "./components/MapView";

export default function Index() {
  return (
    <View style={styles.container}>
      <MapView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
