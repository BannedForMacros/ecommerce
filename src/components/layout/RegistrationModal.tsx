// src/components/layout/RegistrationModal.tsx
'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Heart, Package, Smile, Key, Facebook, Mail as MailIcon } from 'lucide-react';
import Image from 'next/image';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: Props) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50" onClose={onClose}>
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl">
              {/* Botón cerrar flotando */}
              <button
                onClick={onClose}
                className="absolute -top-3 -right-3 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                {/* IZQUIERDA */}
                <div className="space-y-6 text-center lg:text-left">
                  <h2 className="text-3xl font-bold">Regístrate</h2>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center gap-3 justify-center lg:justify-start">
                      <Heart className="w-6 h-6 text-green-500" />
                      Guarda tus productos favoritos
                    </li>
                    <li className="flex items-center gap-3 justify-center lg:justify-start">
                      <Package className="w-6 h-6 text-green-500" />
                      Sigue el recorrido de tu pedido
                    </li>
                    <li className="flex items-center gap-3 justify-center lg:justify-start">
                      <Smile className="w-6 h-6 text-green-500" />
                      Entérate de nuestras promociones
                    </li>
                  </ul>
                  <div className="mt-4 flex justify-center lg:justify-start">
                    <Image
                      src="/categories/abarrotes.png"
                      alt="Abarrotes"
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                </div>

                    {/* DERECHA */}
                    <div className="flex flex-col gap-4 items-center lg:items-start">
                    {/* Contenedor con ancho fijo en lg */}
                    <div className="w-full lg:max-w-[360px] flex flex-col gap-4">
                        <button className="w-full flex items-center justify-center sm:justify-start gap-3 bg-gray-800 hover:bg-gray-900 text-white py-4 px-6 rounded-lg transition">
                        <Key className="w-5 h-5" />
                        <span className="block w-px h-6 bg-white" />
                        <span>RECIBIR CLAVE TEMPORAL POR MAIL</span>
                        </button>

                        <button className="w-full flex items-center justify-center sm:justify-start gap-3 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg transition">
                        <Facebook className="w-5 h-5" />
                        <span className="block w-px h-6 bg-white" />
                        <span>INGRESAR CON FACEBOOK</span>
                        </button>

                        <button className="w-full flex items-center justify-center sm:justify-start gap-3 bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-lg transition">
                        <MailIcon className="w-5 h-5" />
                        <span className="block w-px h-6 bg-white" />
                        <span>INGRESAR CON GOOGLE</span>
                        </button>

                        <button className="w-full flex items-center justify-center sm:justify-start gap-3 bg-yellow-500 hover:bg-yellow-600 text-white py-4 px-6 rounded-lg transition">
                        <MailIcon className="w-5 h-5" />
                        <span className="block w-px h-6 bg-white" />
                        <span>INGRESAR CON MAIL Y CONTRASEÑA</span>
                        </button>
                    </div>
                    </div>

              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
