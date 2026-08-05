'use client';

import { useEffect, useRef, useState } from 'react';
import { GhostButton, GoldButton } from './ui';

interface Props {
  label: string;
  onCapture: (file: File) => void;
  /** 'user' opens the front-facing camera (selfies); 'environment' opens the back camera. */
  facingMode?: 'user' | 'environment';
}

// Uses getUserMedia directly (rather than an <input capture> file picker) so
// this reliably opens a live camera preview on both laptops and phones —
// the capture attribute is mobile-only and inconsistently supported.
export function CameraCapture({ label, onCapture, facingMode = 'user' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [active, setActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captured, setCaptured] = useState<string | null>(null);

  useEffect(() => () => stop(), []);

  const start = async () => {
    setError(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Camera access is not available in this browser.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setActive(true);
    } catch {
      setError('Could not access the camera — check your browser/device permissions and try again.');
    }
  };

  const stop = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setActive(false);
  };

  const capture = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
        setCaptured(URL.createObjectURL(blob));
        onCapture(file);
        stop();
      },
      'image/jpeg',
      0.9
    );
  };

  const retake = () => {
    setCaptured(null);
    start();
  };

  return (
    <div className="mb-5">
      <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-mu">{label}</label>

      {captured ? (
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={captured} alt="Captured" className="mb-2 w-full rounded-md border border-suBorder" />
          <GhostButton onClick={retake}>Retake</GhostButton>
        </div>
      ) : active ? (
        <div>
          <video ref={videoRef} className="mb-2 w-full rounded-md border border-ln" muted playsInline />
          <div className="flex gap-2">
            <GoldButton onClick={capture}>Capture</GoldButton>
            <GhostButton onClick={stop}>Cancel</GhostButton>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={start}
          className="w-full rounded-md border border-dashed border-ln px-4 py-8 text-center font-sans text-sm text-mu"
        >
          📷 Open camera
        </button>
      )}

      {error && <p className="mt-1 font-sans text-xs text-da">{error}</p>}
    </div>
  );
}
