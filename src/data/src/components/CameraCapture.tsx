'use client';

import { useEffect, useRef, useState } from 'react';
import { GhostButton, GoldButton } from './ui';

interface Props {
  label: string;
  onSubmit: (file: File) => void;
  /** 'user' opens the front-facing camera (selfies); 'environment' opens the back camera. */
  facingMode?: 'user' | 'environment';
}

// Uses getUserMedia directly (rather than an <input capture> file picker) so
// this reliably opens a live camera preview on both laptops and phones —
// the capture attribute is mobile-only and inconsistently supported.
export function CameraCapture({ label, onSubmit, facingMode = 'user' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [active, setActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Only stop tracks on unmount here — attaching the stream to the <video>
  // element happens in the effect below, once the element actually exists.
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // The <video> element only mounts once `active` is true, so the stream
  // can't be attached in the same handler that requests it — the ref is
  // still null at that point. Attaching it here, keyed on `active`, runs
  // after React has actually put the element in the DOM.
  useEffect(() => {
    if (!active || !videoRef.current || !streamRef.current) return;
    const video = videoRef.current;
    video.srcObject = streamRef.current;
    video.play().catch(() => setError('Could not start the camera preview — try again.'));
  }, [active]);

  const start = async () => {
    setError(null);
    setSubmitted(false);
    if (typeof window !== 'undefined' && !window.isSecureContext) {
      setError('Camera access requires a secure (https://) connection. Reload this page over HTTPS and try again.');
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Camera access is not available in this browser. Try Chrome, Safari, or Edge.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
      streamRef.current = stream;
      setActive(true);
    } catch (err) {
      console.error('getUserMedia failed:', err);
      const name = err instanceof DOMException ? err.name : '';
      if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
        setError('Camera permission was denied. Check your browser\'s site settings (and your OS camera permissions) and allow camera access for this site, then try again.');
      } else if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
        setError('No camera was found on this device.');
      } else if (name === 'NotReadableError' || name === 'TrackStartError') {
        setError('The camera is already in use by another app or browser tab. Close it and try again.');
      } else if (name === 'OverconstrainedError' || name === 'ConstraintNotSatisfiedError') {
        // Some devices/browsers reject a specific facingMode even as a hint — retry without it.
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          streamRef.current = stream;
          setActive(true);
          return;
        } catch (err2) {
          console.error('getUserMedia fallback failed:', err2);
          setError('Could not access the camera — check your browser/device permissions and try again.');
        }
      } else if (name === 'SecurityError') {
        setError('Camera access was blocked for security reasons — this site may not be allowed to use the camera in this context.');
      } else {
        setError('Could not access the camera — check your browser/device permissions and try again.');
      }
    }
  };

  const stopStream = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setActive(false);
  };

  const capture = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        setPreviewUrl(URL.createObjectURL(blob));
        setPreviewFile(new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' }));
        stopStream();
      },
      'image/jpeg',
      0.9
    );
  };

  const retake = () => {
    setPreviewUrl(null);
    setPreviewFile(null);
    start();
  };

  const confirm = () => {
    if (!previewFile) return;
    onSubmit(previewFile);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mb-5">
        <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-mu">{label}</label>
        <div className="flex items-center justify-between rounded-md border border-suBorder bg-suLight px-4 py-3">
          <span className="font-sans text-sm text-su">✓ Photo submitted</span>
          <button type="button" onClick={retake} className="font-sans text-xs font-semibold text-pu">Retake</button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-5">
      <label className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-mu">{label}</label>

      {previewUrl ? (
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="Captured preview" className="mb-2 aspect-video w-full rounded-md border border-ln object-cover" />
          <div className="flex gap-2">
            <GoldButton onClick={confirm}>Use this photo</GoldButton>
            <GhostButton onClick={retake}>Retake</GhostButton>
          </div>
        </div>
      ) : active ? (
        <div>
          <p className="mb-2 font-sans text-xs font-light text-mu">
            💡 Stand in a well-lit place, facing the camera directly, before capturing.
          </p>
          <video ref={videoRef} className="mb-2 aspect-video w-full rounded-md border border-ln bg-deeper object-cover" muted playsInline autoPlay />
          <div className="flex gap-2">
            <GoldButton onClick={capture}>Capture</GoldButton>
            <GhostButton onClick={stopStream}>Cancel</GhostButton>
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
