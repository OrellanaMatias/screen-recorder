"use client";

import { useState, useRef } from "react";
import ScreenRecorder from "../components/ScreenRecorder";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Grabador de Pantalla Web</h1>
        <p className="mb-8 text-center">
          Graba tu pantalla sin necesidad de registrarte o descargar software adicional.
        </p>
        
        <ScreenRecorder />
      </div>
    </main>
  );
}
