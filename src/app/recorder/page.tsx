"use client";

import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import ScreenRecorder from '../../components/ScreenRecorder';

export default function RecorderPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header con navegación */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            <span>Volver a Inicio</span>
          </Link>
        </div>
        
        {/* Título de la página */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Grabador de Pantalla</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Configure las opciones de grabación y presione el botón "Iniciar Grabación" para comenzar.
          </p>
        </div>
        
        {/* Componente de grabación */}
        <ScreenRecorder />
      </div>
    </main>
  );
} 