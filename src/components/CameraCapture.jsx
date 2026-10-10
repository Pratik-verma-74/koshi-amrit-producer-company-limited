import React, { useRef, useState, useEffect } from 'react';
import { Camera, MapPin, X, FlipHorizontal } from 'lucide-react';

const CameraCapture = ({ onCapture, label = "Capture Live Photo" }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [locationText, setLocationText] = useState('Fetching location...');
  const [facingMode, setFacingMode] = useState('user'); // 'user' or 'environment'

  const startCamera = async (currentFacingMode = facingMode) => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      setIsCameraOpen(true);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: currentFacingMode } 
      });
      setStream(mediaStream);
      
      // Get Location
      if (navigator.geolocation && locationText === 'Fetching location...') {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocationText(`Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`);
          },
          (error) => {
            setLocationText('Location unavailable');
          }
        );
      }
    } catch (err) {
      alert("Error accessing camera. Please ensure permissions are granted.");
      setIsCameraOpen(false);
    }
  };

  const toggleCamera = () => {
    const newMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newMode);
    startCamera(newMode);
  };

  useEffect(() => {
    if (isCameraOpen && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [isCameraOpen, stream]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      
      // Draw video frame
      if (facingMode === 'user') {
        // Mirror the canvas for front camera
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Reset transform before drawing text
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      
      // Add text overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, canvas.height - 60, canvas.width, 60);
      
      ctx.font = '16px Arial';
      ctx.fillStyle = 'white';
      const dateString = new Date().toLocaleString();
      ctx.fillText(`Date: ${dateString}`, 10, canvas.height - 35);
      ctx.fillText(`Loc: ${locationText}`, 10, canvas.height - 15);
      
      const photoData = canvas.toDataURL('image/jpeg');
      onCapture(photoData);
      stopCamera();
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  if (!isCameraOpen) {
    return (
      <button 
        type="button" 
        onClick={() => startCamera(facingMode)}
        className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-brand-green hover:bg-green-50 transition-colors text-gray-600"
      >
        <Camera size={24} />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex flex-col mt-2">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted
        className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
      ></video>
      <canvas ref={canvasRef} className="hidden"></canvas>
      
      <div className="absolute top-2 right-2 flex gap-2">
        <button 
          type="button" 
          onClick={toggleCamera}
          className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          title="Switch Camera"
        >
          <FlipHorizontal size={20} />
        </button>
        <button 
          type="button" 
          onClick={stopCamera}
          className="bg-red-500/80 text-white p-2 rounded-full hover:bg-red-600"
        >
          <X size={20} />
        </button>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <button 
          type="button" 
          onClick={capturePhoto}
          className="bg-white text-brand-green font-bold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 flex items-center gap-2"
        >
          <Camera size={20} /> Capture
        </button>
      </div>
      
      <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
        <MapPin size={12} /> {locationText}
      </div>
    </div>
  );
};

export default CameraCapture;
