import { LatLng } from "react-native-maps";

export interface MarkerData {
  id: number;
  coordinate: LatLng;
  name: string;
  createdAt: string;
}

export interface CreateMarkerRequest {
  coordinate: LatLng;
  name: string;
}

export interface MarkerImageData {
  id: number;
  markerId: number;
  uri: string;
  createdAt: string;
}

export interface DatabaseContextType {
  markers: MarkerData[];

  // Операции с базой данных
  addMarker: (
    latitude: number,
    longitude: number,
    name: string,
  ) => Promise<number>;
  deleteMarker: (id: number) => Promise<void>;
  getMarkers: () => Promise<MarkerData[]>;
  getMarkerById: (id: number) => MarkerData | undefined;
  addImage: (markerId: number, uri: string) => Promise<string>;
  deleteImage: (id: number) => Promise<void>;
  getMarkerImages: (markerId: number) => Promise<MarkerImageData[]>;
  renameMarker: (id: number, newName: string) => Promise<void>;

  // Статусы
  isLoading: boolean;
  error: Error | null;
}
