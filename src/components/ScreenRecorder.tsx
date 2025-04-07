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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4 dark:border-gray-700">Opciones de Grabación</h3>
            
            <div>
              <label htmlFor="filename" className="block mb-2 text-sm font-medium">
                Nombre del archivo
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="filename"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  className="w-full pl-3 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  disabled={recording}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  .{selectedFormat === 'video/webm' ? 'webm' : 'mp4'}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="format" className="block mb-2 text-sm font-medium">
                  Formato de video
                </label>
                <select
                  id="format"
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  disabled={recording}
                >
                  <option value="video/webm">WebM (Ligero)</option>
                  <option value="video/mp4">MP4 (Compatible)</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="fps" className="block mb-2 text-sm font-medium">
                  Cuadros por segundo
                </label>
                <select
                  id="fps"
                  value={frameRate}
                  onChange={(e) => setFrameRate(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  disabled={recording}
                >
                  <option value="15">15 FPS (Más ligero)</option>
                  <option value="30">30 FPS (Estándar)</option>
                  <option value="60">60 FPS (Alta calidad)</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="quality" className="flex justify-between mb-2 text-sm font-medium">
                <span>Calidad de video</span>
                <span className="text-blue-600 dark:text-blue-400">{Math.round(videoBitsPerSecond / 1000000 * 10) / 10} Mbps</span>
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
              <div className="flex justify-between text-xs mt-1 text-gray-500 dark:text-gray-400">
                <span>Más ligero</span>
                <span>Alta calidad</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2 mb-4 dark:border-gray-700">Control de Grabación</h3>
              
              <div className="flex flex-col items-center">
                {!recording && !videoBlob && (
                  <button
                    onClick={startRecording}
                    className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Iniciar Grabación
                  </button>
                )}
                
                {recording && (
                  <button
                    onClick={stopRecording}
                    className="w-full md:w-auto px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                    </svg>
                    Detener Grabación
                  </button>
                )}
                
                {videoBlob && (
                  <div className="space-y-4 w-full text-center">
                    <p className="text-gray-600 dark:text-gray-300 mb-2">¡Grabación completada!</p>
                    <a
                      href={downloadLink}
                      download={`${filename}.${selectedFormat === 'video/webm' ? 'webm' : 'mp4'}`}
                      className="inline-block w-full md:w-auto px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Descargar Grabación
                    </a>
                    <button
                      onClick={() => {
                        setVideoBlob(null);
                        setDownloadLink("");
                      }}
                      className="inline-block w-full mt-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
                    >
                      Nueva grabación
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Información y ayuda */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm text-blue-800 dark:text-blue-200 mt-4">
              <p className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  El navegador le pedirá que seleccione la pantalla, ventana o pestaña que desea grabar. También puede grabar audio si lo desea.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {(stream || videoBlob) && (
        <div className="w-full aspect-video bg-gray-100 dark:bg-gray-900 overflow-hidden mt-4 relative">
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
          ) : null}
          
          {recording && (
            <div className="absolute top-4 right-4 flex items-center bg-black/60 text-white text-sm px-3 py-1 rounded-full">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
              <span>Grabando...</span>
            </div>
          )}
        </div>
      )}
      
      {!stream && !videoBlob && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 mb-4 mx-auto text-gray-300 dark:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Configure las opciones y presione "Iniciar Grabación"</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">La vista previa aparecerá aquí después de iniciar la grabación</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScreenRecorder; 