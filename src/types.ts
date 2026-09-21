import { LatLng } from "react-native-maps";

export interface MarkerData {
  id?: string;
  coordinate: LatLng;
  name: string;
}
