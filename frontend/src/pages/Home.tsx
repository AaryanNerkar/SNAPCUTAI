import { useRef } from 'react';
import { ArrowRight, Zap, Shield, Download, Layers, MousePointer, Clock, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BackgroundRemovalTool from '@/components/BackgroundRemovalTool';
import { useGetTotalProcessed } from '@/hooks/useQueries';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const features = [
  {
    icon: MousePointer,
    title: 'One-Click Removal',
    desc: 'Upload and remove backgrounds instantly with a single click. No manual selection needed.',
  },
  {
    icon: Layers,
    title: 'Drag & Drop Upload',
    desc: 'Simply drag your image onto the tool or click to browse. Supports JPG, PNG, and WEBP.',
  },
  {
    icon: Download,
    title: 'Transparent PNG Output',
    desc: 'Download your result as a high-quality transparent PNG, ready for any use case.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'AI processes your image in seconds, not minutes. Get results while you wait.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    desc: 'Images are processed locally in your browser. Nothing is uploaded to any server.',
  },
  {
    icon: Clock,
    title: 'Always Available',
    desc: 'No queues, no waiting. The tool is available 24/7 with no rate limits on the free tier.',
  },
];

const steps = [
  {
    number: '01',
    icon: '/assets/generated/step-upload.dim_128x128.png',
    title: 'Upload Your Image',
    desc: 'Drag & drop or click to upload any JPG, PNG, or WEBP image up to 10MB.',
  },
  {
    number: '02',
    icon: '/assets/generated/step-ai.dim_128x128.png',
    title: 'AI Removes Background',
    desc: 'Our AI instantly detects the subject and removes the background with precision.',
  },
  {
    number: '03',
    icon: '/assets/generated/step-download.dim_128x128.png',
    title: 'Download Result',
    desc: 'Preview the result and download your transparent PNG in one click.',
  },
];

const audiences = [
  { icon: '🛒', label: 'E-commerce Sellers' },
  { icon: '🎨', label: 'Graphic Designers' },
  { icon: '📱', label: 'Social Media Creators' },
  { icon: '🎓', label: 'Students' },
  { icon: '📣', label: 'Marketers' },
  { icon: '🏢', label: 'Small Businesses' },
  { icon: '✍️', label: 'Content Creators' },
  { icon: '📸', label: 'Photographers' },
];

function formatCount(n: bigint): string {
  const num = Number(n);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M+`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K+`;
  return num.toString();
}

export default function Home({ onNavigate }: HomeProps) {
  const toolRef = useRef<HTMLDivElement>(null);
  const { data: totalProcessed, isLoading: countLoading } = useGetTotalProcessed();

  const scrollToTool = () => {
    toolRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Hero Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)' }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/70" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

        {/* Decorative orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-neon/8 blur-3xl pointer-events-none" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon/10 border border-neon/25 text-neon text-xs font-semibold uppercase tracking-widest mb-8 animate-fade-in">
            <Zap className="w-3.5 h-3.5" />
            AI-Powered Background Removal
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in">
            <span className="text-foreground">Remove Backgrounds</span>
            <br />
            <span className="gradient-text neon-glow">in One Click</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in">
            Professional-quality background removal powered by AI. No design skills needed.
            Upload your image and get a transparent PNG in seconds — completely free.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14 animate-fade-in">
            <Button
              onClick={scrollToTool}
              className="neon-btn rounded-xl px-8 h-13 text-base font-bold gap-2 shadow-neon"
              size="lg"
            >
              Try It Free — Upload Now
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => onNavigate('pricing')}
              variant="outline"
              size="lg"
              className="rounded-xl px-8 h-13 text-base font-medium border-border/60 hover:border-neon/40 hover:text-neon"
            >
              View Pricing
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 animate-fade-in">
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-neon neon-glow">
                {countLoading ? (
                  <span className="inline-block w-16 h-8 bg-surface-raised rounded animate-pulse" />
                ) : (
                  formatCount(totalProcessed ?? BigInt(0))
                )}
              </div>
              <div className="text-muted-foreground text-sm mt-1">Images Processed</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-neon neon-glow">100%</div>
              <div className="text-muted-foreground text-sm mt-1">Free to Use</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-neon neon-glow">&lt;5s</div>
              <div className="text-muted-foreground text-sm mt-1">Processing Time</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-neon neon-glow">
                <div className="flex items-center gap-1 justify-center">
                  <Star className="w-6 h-6 fill-neon text-neon" />
                  4.9
                </div>
              </div>
              <div className="text-muted-foreground text-sm mt-1">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Tool Section */}
      <div ref={toolRef}>
        <BackgroundRemovalTool />
      </div>

      {/* How It Works */}
      <section className="py-24 px-4 bg-surface/50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-semibold uppercase tracking-widest mb-4">
              Simple Process
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It <span className="text-neon">Works</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Three simple steps to get a professional transparent image
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-px bg-gradient-to-r from-neon/30 via-neon/60 to-neon/30" />

            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                <div className="relative mb-6">
                  <div className="w-32 h-32 rounded-2xl glass-card-neon flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={step.icon}
                      alt={step.title}
                      className="w-16 h-16 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-neon text-background font-display font-bold text-xs flex items-center justify-center shadow-neon">
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-semibold uppercase tracking-widest mb-4">
              Features
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You <span className="text-neon">Need</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Powerful features designed for speed, quality, and simplicity
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-6 group hover:border-neon/30 hover:bg-neon/3 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center mb-4 group-hover:bg-neon/20 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-neon" />
                </div>
                <h3 className="font-display font-semibold text-base text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-24 px-4 bg-surface/50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-semibold uppercase tracking-widest mb-4">
            <Users className="w-3.5 h-3.5" />
            Who It's For
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Built for <span className="text-neon">Everyone</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
            Whether you're a professional designer or a first-time user, SnapCut AI works for you
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {audiences.map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-5 py-3 rounded-full glass-card hover:border-neon/30 hover:bg-neon/5 transition-all duration-200 cursor-default"
              >
                <span className="text-xl">{a.icon}</span>
                <span className="text-sm font-medium text-foreground">{a.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="glass-card-neon rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neon/5 via-transparent to-neon/3 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Remove Backgrounds?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
                Join thousands of creators using SnapCut AI to create stunning visuals in seconds.
              </p>
              <Button
                onClick={scrollToTool}
                className="neon-btn rounded-xl px-10 h-13 text-base font-bold gap-2 shadow-neon-lg"
                size="lg"
              >
                Start for Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
