import { useState, useRef, useCallback } from 'react';
import { Upload, Download, RefreshCw, ImageIcon, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useBackgroundRemoval } from '@/hooks/useBackgroundRemoval';
import { useRecordProcessed } from '@/hooks/useQueries';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export default function BackgroundRemovalTool() {
  const [dragOver, setDragOver] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'original' | 'processed'>('processed');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { state, result, error, progress, removeBackground, reset } = useBackgroundRemoval();
  const recordProcessed = useRecordProcessed();

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return 'Unsupported format. Please upload JPG, PNG, or WEBP.';
    }
    if (file.size > MAX_SIZE_BYTES) {
      return `File too large. Maximum size is ${MAX_SIZE_MB}MB.`;
    }
    return null;
  };

  const handleFile = useCallback(async (file: File) => {
    setFileError(null);
    const err = validateFile(file);
    if (err) {
      setFileError(err);
      return;
    }
    const res = await removeBackground(file);
    if (res) {
      recordProcessed.mutate();
    }
  }, [removeBackground, recordProcessed]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.processedUrl;
    a.download = 'snapcut-ai-result.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const isProcessing = state === 'loading' || state === 'processing';

  return (
    <section id="upload-tool" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
            AI Tool
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Remove Background <span className="text-neon">Instantly</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Upload your image and our AI will remove the background in seconds. No sign-up required.
          </p>
        </div>

        {/* Tool Area */}
        {state === 'idle' || state === 'error' ? (
          <div className="space-y-4">
            {/* Drop Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 p-16 flex flex-col items-center justify-center gap-5 group
                ${dragOver
                  ? 'border-neon bg-neon/5 scale-[1.01]'
                  : 'border-border/60 hover:border-neon/50 hover:bg-neon/3 bg-surface'
                }`}
            >
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-200
                ${dragOver ? 'bg-neon/20 scale-110' : 'bg-surface-raised group-hover:bg-neon/10'}`}>
                <Upload className={`w-9 h-9 transition-colors ${dragOver ? 'text-neon' : 'text-muted-foreground group-hover:text-neon'}`} />
              </div>
              <div className="text-center">
                <p className="font-display font-semibold text-lg text-foreground mb-1">
                  {dragOver ? 'Drop your image here' : 'Drag & drop your image'}
                </p>
                <p className="text-muted-foreground text-sm">
                  or <span className="text-neon font-medium">click to browse</span>
                </p>
                <p className="text-muted-foreground/60 text-xs mt-2">
                  Supports JPG, PNG, WEBP · Max {MAX_SIZE_MB}MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_TYPES.join(',')}
                onChange={handleInputChange}
                className="hidden"
              />
            </div>

            {/* File Error */}
            {(fileError || error) && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">{fileError || error}</p>
              </div>
            )}
          </div>
        ) : isProcessing ? (
          /* Processing State */
          <div className="glass-card-neon rounded-2xl p-12 flex flex-col items-center gap-6">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-4 border-neon/20" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-neon animate-spin" />
              <div className="absolute inset-3 rounded-full bg-neon/10 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-neon animate-pulse" />
              </div>
            </div>
            <div className="text-center">
              <p className="font-display font-semibold text-xl text-foreground mb-1">
                {state === 'loading' ? 'Loading image...' : 'Removing background...'}
              </p>
              <p className="text-muted-foreground text-sm">AI is analyzing your image</p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <Progress value={progress} className="h-2 bg-surface-raised" />
              <p className="text-center text-xs text-muted-foreground">{progress}% complete</p>
            </div>
          </div>
        ) : result ? (
          /* Result State */
          <div className="space-y-6">
            {/* Success Banner */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-neon/10 border border-neon/30">
              <CheckCircle className="w-5 h-5 text-neon flex-shrink-0" />
              <p className="text-sm font-medium text-neon">Background removed successfully!</p>
            </div>

            {/* Preview Toggle */}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setPreviewMode('original')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  previewMode === 'original'
                    ? 'bg-neon/10 text-neon border border-neon/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-surface-raised'
                }`}
              >
                Original
              </button>
              <button
                onClick={() => setPreviewMode('processed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  previewMode === 'processed'
                    ? 'bg-neon/10 text-neon border border-neon/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-surface-raised'
                }`}
              >
                Result
              </button>
            </div>

            {/* Image Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-center">Original</p>
                <div className="rounded-xl overflow-hidden border border-border/40 bg-surface aspect-square flex items-center justify-center">
                  <img
                    src={result.originalUrl}
                    alt="Original"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-center">Result (Transparent)</p>
                <div className="rounded-xl overflow-hidden border border-neon/20 checkerboard aspect-square flex items-center justify-center">
                  <img
                    src={result.processedUrl}
                    alt="Background Removed"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={handleDownload}
                className="neon-btn rounded-xl px-8 h-12 text-base font-bold gap-2"
              >
                <Download className="w-5 h-5" />
                Download PNG
              </Button>
              <Button
                onClick={reset}
                variant="outline"
                className="rounded-xl px-8 h-12 text-base font-medium gap-2 border-border/60 hover:border-neon/40 hover:text-neon"
              >
                <RefreshCw className="w-5 h-5" />
                Remove Another
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
