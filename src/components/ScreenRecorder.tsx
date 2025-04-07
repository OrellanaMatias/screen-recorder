"use client";

import { useState, useRef, useEffect } from "react";

type RecordingOptions = {
  mimeType: string;
  videoBitsPerSecond: number;
  frameRate?: number;
};

const ScreenRecorder = () => {
  const [recording, setRecording] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [downloadLink, setDownloadLink] = useState<string>("");
  const [filename, setFilename] = useState<string>("grabacion-pantalla");
  const [selectedFormat, setSelectedFormat] = useState<string>("video/webm");
  const [frameRate, setFrameRate] = useState<number>(30);
  const [videoBitsPerSecond, setVideoBitsPerSecond] = useState<number>(2500000); // 2.5 Mbps por defecto
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    chunksRef.current = [];
    
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          frameRate: frameRate,
        },
        audio: true,
      });
      
      setStream(displayStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = displayStream;
      }
      
      const options: RecordingOptions = {
        mimeType: selectedFormat,
        videoBitsPerSecond: videoBitsPerSecond,
        frameRate: frameRate,
      };
      
      const mediaRecorder = new MediaRecorder(displayStream, options);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: selectedFormat });
        setVideoBlob(blob);
        
        const url = URL.createObjectURL(blob);
        setDownloadLink(url);
        
        displayStream.getTracks().forEach((track) => track.stop());
        setStream(null);
      };
      
      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error("Error al iniciar la grabación:", error);
      alert("No se pudo iniciar la grabación. Asegúrate de permitir el acceso a la pantalla.");
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };
  
  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (downloadLink) {
        URL.revokeObjectURL(downloadLink);
      }
    };
  }, [stream, downloadLink]);
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
      <div className="mb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex-1">
            <label htmlFor="filename" className="block mb-2 text-sm font-medium">
              Nombre del archivo:
            </label>
            <input
              type="text"
              id="filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              disabled={recording}
            />
          </div>
          
          <div className="flex-1">
            <label htmlFor="format" className="block mb-2 text-sm font-medium">
              Formato:
            </label>
            <select
              id="format"
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              disabled={recording}
            >
              <option value="video/webm">WebM (Ligero)</option>
              <option value="video/mp4">MP4</option>
            </select>
          </div>
          
          <div className="flex-1">
            <label htmlFor="fps" className="block mb-2 text-sm font-medium">
              Cuadros por segundo:
            </label>
            <select
              id="fps"
              value={frameRate}
              onChange={(e) => setFrameRate(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              disabled={recording}
            >
              <option value="15">15 FPS (Más ligero)</option>
              <option value="30">30 FPS (Estándar)</option>
              <option value="60">60 FPS (Alta calidad)</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="quality" className="block mb-2 text-sm font-medium">
            Calidad de video: {Math.round(videoBitsPerSecond / 1000000 * 10) / 10} Mbps
          </label>
          <input
            type="range"
            id="quality"
            min="500000"
            max="8000000"
            step="500000"
            value={videoBitsPerSecond}
            onChange={(e) => setVideoBitsPerSecond(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            disabled={recording}
          />
          <div className="flex justify-between text-xs mt-1">
            <span>Ligero</span>
            <span>Alta calidad</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mb-6">
        {!recording && !videoBlob && (
          <button
            onClick={startRecording}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Iniciar Grabación
          </button>
        )}
        
        {recording && (
          <button
            onClick={stopRecording}
            className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Detener Grabación
          </button>
        )}
      </div>
      
      <div className="w-full aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden mb-6">
        {stream ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full h-full object-contain"
          />
        ) : videoBlob ? (
          <video
            src={downloadLink}
            controls
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">La vista previa de la grabación aparecerá aquí</p>
          </div>
        )}
      </div>
      
      {downloadLink && (
        <div className="flex justify-center">
          <a
            href={downloadLink}
            download={`${filename}.${selectedFormat === 'video/webm' ? 'webm' : 'mp4'}`}
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Descargar Grabación
          </a>
        </div>
      )}
    </div>
  );
};

export default ScreenRecorder; 