import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

export default function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate({ to: path });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Student Form', path: '/student-form' },
    { label: 'Teacher Form', path: '/teacher-form' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <button
          onClick={() => handleNavigation('/')}
          className="flex items-center space-x-2 focus-ring rounded-md"
          aria-label="Go to home"
        >
          <img
            src="/assets/generated/growwithtutor-logo.dim_512x192.png"
            alt="GrowWithTutor"
            className="h-8 w-auto"
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNavigation(link.path)}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors focus-ring rounded-md px-2 py-1"
            >
              {link.label}
            </button>
          ))}
          <Button
            onClick={() => handleNavigation('/student-form')}
            className="ml-4"
          >
            Get Started
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 focus-ring rounded-md"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavigation(link.path)}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-md transition-colors focus-ring"
              >
                {link.label}
              </button>
            ))}
            <div className="px-4 pt-2">
              <Button
                onClick={() => handleNavigation('/student-form')}
                className="w-full"
              >
                Get Started
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
