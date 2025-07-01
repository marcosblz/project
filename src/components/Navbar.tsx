import React, { useEffect, useState } from 'react';
import { Menu, X, Code, Sun, Moon } from 'lucide-react';
import { gsap } from 'gsap';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    // Apply theme on mount
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    // Slide-down animation on load
    gsap.fromTo('.navbar', 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    // Logo wave animation every 3 seconds
    const logoWave = () => {
      gsap.to('.logo-icon', {
        rotation: 360,
        duration: 1,
        ease: 'power2.inOut'
      });
    };

    const waveInterval = setInterval(logoWave, 3000);

    // Animate name letters on load
    gsap.fromTo('.name-letter',
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6,
        stagger: 0.1,
        delay: 0.5,
        ease: 'bounce.out'
      }
    );

    // Wave animation for name letters every 3 seconds
    const nameWave = () => {
      gsap.to('.name-letter', {
        y: -10,
        duration: 0.3,
        stagger: 0.1,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
      });
    };

    const nameWaveInterval = setInterval(nameWave, 3000);

    // Individual letter bounce on hover
    const letters = document.querySelectorAll('.name-letter');
    letters.forEach(letter => {
      const letterElement = letter as HTMLElement;
      
      letterElement.addEventListener('mouseenter', () => {
        gsap.to(letterElement, {
          y: -15,
          duration: 0.3,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1
        });
      });
    });

    return () => {
      clearInterval(waveInterval);
      clearInterval(nameWaveInterval);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: 'inicio', label: 'Inicio' },
    { href: 'sobre-mi', label: 'Sobre Mí' },
    { href: 'experiencia', label: 'Experiencia' },
    { href: 'estudios', label: 'Estudios' },
    { href: 'habilidades', label: 'Habilidades' },
    { href: 'proyectos', label: 'Proyectos' },
    { href: 'contacto', label: 'Contacto' }
  ];

  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Name */}
          <div className="flex items-center space-x-3">
            <div className="logo-icon-wrapper group cursor-pointer">
              <Code 
                className="logo-icon w-8 h-8 text-accent transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" 
              />
            </div>
            <div className="flex items-center">
              {['M', 'a', 'r', 'c', 'o', 's'].map((letter, index) => (
                <span
                  key={index}
                  className="name-letter text-xl font-bold text-foreground transition-colors duration-300 cursor-pointer select-none"
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-muted-foreground hover:text-accent transition-colors duration-300 font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-accent/10 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-foreground" />
              ) : (
                <Moon className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-accent/10 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-foreground" />
              ) : (
                <Moon className="w-5 h-5 text-foreground" />
              )}
            </button>
            <button
              className="p-2 rounded-lg hover:bg-accent/10 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors duration-300 rounded-lg"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;