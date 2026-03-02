import { useState } from 'react';
import { Menu, X, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navLinks = [
  { label: 'Home', page: 'home' },
  { label: 'Tool', page: 'tool' },
  { label: 'Pricing', page: 'pricing' },
  { label: 'FAQ', page: 'faq' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  const handleGetStarted = () => {
    onNavigate('tool');
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 group"
        >
          <div className="relative w-9 h-9 flex items-center justify-center">
            <img
              src="/assets/generated/logo-mark.dim_256x256.png"
              alt="SnapCut AI Logo"
              className="w-9 h-9 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden w-9 h-9 rounded-lg bg-neon/10 border border-neon/30 items-center justify-center">
              <Scissors className="w-5 h-5 text-neon" />
            </div>
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            <span className="text-foreground">SnapCut</span>
            <span className="text-neon"> AI</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => handleNav(link.page)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === link.page
                  ? 'text-neon bg-neon/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-surface-raised'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            onClick={handleGetStarted}
            className="neon-btn rounded-lg px-5 h-9 text-sm font-bold"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-raised transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-surface border-border/40 p-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border/40">
                <span className="font-display font-bold text-lg">
                  <span className="text-foreground">SnapCut</span>
                  <span className="text-neon"> AI</span>
                </span>
                <SheetClose asChild>
                  <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-raised transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </SheetClose>
              </div>
              <nav className="flex flex-col gap-1 p-4 flex-1">
                {navLinks.map((link) => (
                  <button
                    key={link.page}
                    onClick={() => handleNav(link.page)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === link.page
                        ? 'text-neon bg-neon/10 border border-neon/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-surface-raised'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
              <div className="p-4 border-t border-border/40">
                <Button
                  onClick={handleGetStarted}
                  className="neon-btn w-full rounded-lg font-bold"
                >
                  Get Started Free
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
