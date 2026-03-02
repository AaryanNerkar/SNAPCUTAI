import { useState, useCallback } from 'react';

export type ProcessingState = 'idle' | 'loading' | 'processing' | 'done' | 'error';

export interface BackgroundRemovalResult {
  originalUrl: string;
  processedUrl: string;
}

export function useBackgroundRemoval() {
  const [state, setState] = useState<ProcessingState>('idle');
  const [result, setResult] = useState<BackgroundRemovalResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const removeBackground = useCallback(async (file: File): Promise<BackgroundRemovalResult | null> => {
    setState('loading');
    setError(null);
    setProgress(0);

    const originalUrl = URL.createObjectURL(file);

    try {
      setState('processing');

      const processedUrl = await processImageOnCanvas(file, (p) => setProgress(p));

      const res: BackgroundRemovalResult = { originalUrl, processedUrl };
      setResult(res);
      setState('done');
      return res;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Processing failed';
      setError(msg);
      setState('error');
      URL.revokeObjectURL(originalUrl);
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    if (result) {
      URL.revokeObjectURL(result.originalUrl);
      URL.revokeObjectURL(result.processedUrl);
    }
    setResult(null);
    setState('idle');
    setError(null);
    setProgress(0);
  }, [result]);

  return { state, result, error, progress, removeBackground, reset };
}

async function processImageOnCanvas(
  file: File,
  onProgress: (p: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context unavailable'));
        return;
      }

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const total = data.length / 4;

      // Sample corners to detect background color
      const cornerSamples = sampleCorners(data, canvas.width, canvas.height);
      const bgColor = averageColor(cornerSamples);

      // Process pixels in chunks to allow progress updates
      const chunkSize = Math.max(1, Math.floor(total / 20));

      let i = 0;

      // Capture ctx in a local const so TypeScript knows it's non-null inside the closure
      const context = ctx;

      function processChunk() {
        const end = Math.min(i + chunkSize, total);
        for (; i < end; i++) {
          const idx = i * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          if (isBackground(r, g, b, bgColor)) {
            data[idx + 3] = 0;
          } else {
            // Soft edge: partial transparency for near-background pixels
            const dist = colorDistance(r, g, b, bgColor.r, bgColor.g, bgColor.b);
            if (dist < 60) {
              data[idx + 3] = Math.round((dist / 60) * 255);
            }
          }
        }

        onProgress(Math.round((i / total) * 100));

        if (i < total) {
          setTimeout(processChunk, 0);
        } else {
          context.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        }
      }

      processChunk();
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image'));
    };

    img.src = objectUrl;
  });
}

interface RGB { r: number; g: number; b: number }

function sampleCorners(data: Uint8ClampedArray, width: number, height: number): RGB[] {
  const samples: RGB[] = [];
  const positions = [
    0,
    (width - 1),
    (height - 1) * width,
    (height - 1) * width + (width - 1),
    Math.floor(height / 2) * width,
    Math.floor(height / 2) * width + (width - 1),
    Math.floor(width / 2),
    (height - 1) * width + Math.floor(width / 2),
  ];

  for (const pos of positions) {
    const idx = pos * 4;
    if (idx + 2 < data.length) {
      samples.push({ r: data[idx], g: data[idx + 1], b: data[idx + 2] });
    }
  }
  return samples;
}

function averageColor(samples: RGB[]): RGB {
  if (samples.length === 0) return { r: 255, g: 255, b: 255 };
  const sum = samples.reduce(
    (acc, c) => ({ r: acc.r + c.r, g: acc.g + c.g, b: acc.b + c.b }),
    { r: 0, g: 0, b: 0 }
  );
  return {
    r: Math.round(sum.r / samples.length),
    g: Math.round(sum.g / samples.length),
    b: Math.round(sum.b / samples.length),
  };
}

function colorDistance(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number {
  return Math.sqrt(
    Math.pow(r1 - r2, 2) +
    Math.pow(g1 - g2, 2) +
    Math.pow(b1 - b2, 2)
  );
}

function isBackground(r: number, g: number, b: number, bg: RGB): boolean {
  // Check if pixel matches background color
  const dist = colorDistance(r, g, b, bg.r, bg.g, bg.b);
  if (dist < 40) return true;

  // Also remove near-white pixels (common backgrounds)
  if (r > 230 && g > 230 && b > 230) return true;

  // Remove near-black if background is dark
  if (bg.r < 30 && bg.g < 30 && bg.b < 30) {
    if (r < 30 && g < 30 && b < 30) return true;
  }

  return false;
}
