import MarkerStorage from "@/app/storage/markers";
import { MarkerData } from "@/types";
import { useEffect, useState } from "react";

export default function useMarkers() {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    MarkerStorage.getMarkers().then((savedMarkers) => {
      setMarkers(savedMarkers);
      setIsLoading(false);
    });
  }, []);

  const addMarker = (marker: MarkerData) => {
    const newMarker = {
      ...marker,
      id: Date.now().toString(),
    };

    const updatedMarkers = [...markers, newMarker];

    setMarkers(updatedMarkers);
    MarkerStorage.saveMarkers(updatedMarkers);
  };

  const deleteMarker = (id: string) => {
    const updatedMarkers = markers.filter((marker) => marker.id !== id);
    setMarkers(updatedMarkers);
    MarkerStorage.saveMarkers(updatedMarkers);
    console.log("del");
  };

  return { markers, addMarker, deleteMarker };
}
