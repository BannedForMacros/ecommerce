'use client';

import React, { createContext, useContext, useState } from 'react';

export interface LocationContextType {
  // Dirección definitiva
  location: string | null;

  // Modal de "elige método"
  isPickerOpen: boolean;
  openLocationPicker(): void;
  closeLocationPicker(): void;
  pickLocation(): void;

  // Modal de "pinchar en mapa"
  isMapOpen: boolean;
  openMapPicker(): void;
  closeMapPicker(): void;

  // Estados intermedios para el mapa
  mapAddress: string | null;
  mapCoords: { lat: number; lng: number } | null;
  setMapAddress(addr: string | null): void;
  setMapCoords(coords: { lat: number; lng: number }): void;

  // Confirmar la ubicación del mapa como final
  confirmMapLocation(): void;
}

const LocationContext = createContext<LocationContextType | null>(null);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<string | null>(null);

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const [mapAddress, _setMapAddress] = useState<string | null>(null);
  const [mapCoords, _setMapCoords] = useState<{ lat: number; lng: number } | null>(null);

  const openLocationPicker = () => setIsPickerOpen(true);
  const closeLocationPicker = () => setIsPickerOpen(false);

  const openMapPicker = () => setIsMapOpen(true);
  const closeMapPicker = () => setIsMapOpen(false);

  const setMapAddress = (addr: string | null) => _setMapAddress(addr);
  const setMapCoords = (coords: { lat: number; lng: number }) => _setMapCoords(coords);

  // 1️⃣ Detectar coords y hacer reverse-geocoding con la API de Google
  const pickLocation = () => {
    if (!navigator.geolocation) {
      alert('Tu navegador no soporta geolocalización');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const lat = coords.latitude;
        const lng = coords.longitude;
        setMapCoords({ lat, lng });

        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
          );
          const data = await res.json();
          const addr = data.results?.[0]?.formatted_address || null;
          setMapAddress(addr);
        } catch {
          setMapAddress(null);
        }

        closeLocationPicker();
        openMapPicker();
      },
      () => {
        // permiso denegado: abrimos mapa vacío
        closeLocationPicker();
        openMapPicker();
      }
    );
  };

  // 2️⃣ Confirmar lo seleccionado en el mapa
  const confirmMapLocation = () => {
    if (mapAddress) setLocation(mapAddress);
    closeMapPicker();
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        isPickerOpen,
        openLocationPicker,
        closeLocationPicker,
        pickLocation,
        isMapOpen,
        openMapPicker,
        closeMapPicker,
        mapAddress,
        mapCoords,
        setMapAddress,
        setMapCoords,
        confirmMapLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error('useLocation debe usarse dentro de LocationProvider');
  return ctx;
}
