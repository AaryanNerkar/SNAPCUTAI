import { Scissors, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const footerLinks = [
  { label: 'Home', page: 'home' },
  { label: 'Tool', page: 'tool' },
  { label: 'Pricing', page: 'pricing' },
  { label: 'FAQ', page: 'faq' },
];

export default function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'snapcut-ai');

  return (
    <footer className="border-t border-border/40 bg-surface/50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-neon/10 border border-neon/30 flex items-center justify-center">
                <Scissors className="w-4 h-4 text-neon" />
              </div>
              <span className="font-display font-bold text-lg">
                <span className="text-foreground">SnapCut</span>
                <span className="text-neon"> AI</span>
              </span>
            </div>
            <p className="text-muted-foreground text-xs max-w-xs text-center md:text-left">
              Professional background removal powered by AI. Fast, free, and private.
            </p>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className="text-muted-foreground hover:text-neon text-sm transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-border/30 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs">
            © {year} SnapCut AI. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs flex items-center gap-1.5">
            Built with{' '}
            <Heart className="w-3.5 h-3.5 text-neon fill-neon" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
