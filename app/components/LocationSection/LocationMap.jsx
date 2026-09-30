"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./LocationSection.module.scss";

const location = [6.4351, 3.4559];

const markerIcon = L.divIcon({
  className: styles.location__marker,
  html: "<span></span>",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

export default function LocationMap() {
  return (
    <MapContainer
      center={location}
      zoom={14}
      scrollWheelZoom={false}
      className={styles.location__mapCanvas}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={location} icon={markerIcon}>
        <Popup>Lindon</Popup>
      </Marker>
    </MapContainer>
  );
}