// src/components/ui/LocationPicker.tsx
'use client';

import { Fragment, useCallback } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

export default function LocationPicker() {
  const {
    isPickerOpen,
    isMapOpen,
    closeLocationPicker,
    pickLocation,
    openMapPicker,
    closeMapPicker,
    mapAddress,
    mapCoords,
    setMapAddress,
    setMapCoords,
    confirmMapLocation
  } = useLocation();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ['places']
  });

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMapCoords({ lat, lng });
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat, lng } },
      (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          setMapAddress(results[0].formatted_address);
        } else {
          setMapAddress(null);
        }
      }
    );
  }, [setMapCoords, setMapAddress]);

  return (
    <>
      {/* ─── Modal 1: Método de ubicación ─── */}
      <Transition.Root show={isPickerOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50" onClose={closeLocationPicker}>
          <div className="fixed inset-0 bg-black/30" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
            >
              <div className="relative z-10 flex w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Cerrar */}
                <button
                  onClick={closeLocationPicker}
                  className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition"
                >
                  <X size={20} />
                </button>

                {/* Contenido botones */}
                <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
                  <Dialog.Title className="text-xl font-semibold text-center">
                    ¿A dónde llegará tu pedido?
                  </Dialog.Title>
                  <button
                    onClick={pickLocation}
                    className="w-full max-w-[280px] bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition"
                  >
                    Usar mi ubicación actual
                  </button>
                  <span className="text-gray-400">o</span>
                  <button
                    onClick={() => {
                      closeLocationPicker();
                      openMapPicker();
                    }}
                    className="w-full max-w-[280px] bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg transition"
                  >
                    Ingrese su dirección
                  </button>
                </div>

                {/* Imagen (md+) */}
                <div className="hidden md:flex items-center justify-center flex-1">
                  <Image
                    src="/images/ubicacion.png"
                    alt="Icono ubicación"
                    width={600}
                    height={600}
                    placeholder="empty"
                    className="object-contain max-h-80"
                    style={{ background: 'transparent' }}
                  />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* ─── Modal 2: Mapa interactivo ─── */}
      <Transition.Root show={isMapOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50" onClose={closeMapPicker}>
          <div className="fixed inset-0 bg-black/30" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
            >
              <div className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="relative flex items-center justify-center border-b p-4">
                  <Dialog.Title className="text-lg font-semibold">
                    Mueva el mapa para encontrar su ubicación
                  </Dialog.Title>
                  <button
                    onClick={closeMapPicker}
                    className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Dirección + Confirmar */}
                <div className="flex items-center gap-4 p-4 bg-gray-50">
                  <div className="flex-1 flex items-center justify-between bg-white border rounded-lg px-4 py-2">
                    <span className="text-gray-700 text-sm line-clamp-1">
                      {mapAddress || 'Ubicación no disponible'}
                    </span>
                    <button
                      onClick={() => {
                        // reabrir selector de método si quiere cambiar
                        closeMapPicker();
                        openMapPicker();
                      }}
                      className="text-green-600 text-sm font-medium hover:underline"
                    >
                      Cambiar
                    </button>
                  </div>
  <button
    onClick={confirmMapLocation}
    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-semibold transition flex-shrink-0"
  >
    Confirmar mi ubicación
  </button>
                </div>

                {/* Mapa */}
                <div className="h-80 w-full">
                  {isLoaded && (
                    <GoogleMap
                      mapContainerStyle={{ width: '100%', height: '100%' }}
                      center={mapCoords || { lat: -12.0464, lng: -77.0428 }}
                      zoom={15}
                      onClick={onMapClick}
                    >
                      {mapCoords && <Marker position={mapCoords} />}
                    </GoogleMap>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
