"use client";

import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

export interface LatLng {
  lat: number;
  lng: number;
}

interface Props {
  value: LatLng | null;
  onChange: (pos: LatLng) => void;
}

/* FIX DEFAULT ICON ISSUE */
const icon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

/* ✅ Handles map click + drag updates */
function MapEvents({ onChange }: { onChange: (pos: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return null;
}

/* ✅ Handles map recenter */
function MapRecenter({ coords }: { coords: LatLng | null }) {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.flyTo([coords.lat, coords.lng], 16, {
        animate: true,
      });
    }
  }, [coords, map]);

  return null;
}

export default function LocationMap({ value, onChange }: Props) {
  const defaultCenter: LatLng = value || {
    lat: 14.5995,
    lng: 120.9842, // Manila fallback
  };

  return (
    <MapContainer
      center={[defaultCenter.lat, defaultCenter.lng]}
      zoom={15}
      style={{
        height: "300px",
        width: "100%",
        borderRadius: 12,
        zIndex: 0,
      }}
    >
      {/* TILE LAYER */}
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* RECENTER MAP WHEN VALUE CHANGES */}
      <MapRecenter coords={value} />

      {/* CLICK MAP */}
      <MapEvents onChange={onChange} />

      {/* MARKER */}
      {value && (
        <Marker
          position={[value.lat, value.lng]}
          icon={icon}
          draggable
          eventHandlers={{
            dragend: (e) => {
              const marker = e.target;
              const pos = marker.getLatLng();

              onChange({
                lat: pos.lat,
                lng: pos.lng,
              });
            },
          }}
        />
      )}
    </MapContainer>
  );
}