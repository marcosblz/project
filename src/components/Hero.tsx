import React, { useEffect, useRef } from 'react';
import { Download, ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo('.hero-image-container',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }
    ).fromTo('.hero-content',
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.5'
    );

    // Parallax effect on scroll
    gsap.to(backgroundRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(foregroundRef.current, {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom", 
        end: "bottom top",
        scrub: true
      }
    });

    // Continuous floating animation
    const floatingTl = gsap.timeline({ repeat: -1, yoyo: true });
    floatingTl.to(foregroundRef.current, {
      y: -15,
      rotation: 2,
      duration: 3,
      ease: "power2.inOut"
    });

    // Subtle background movement
    const backgroundTl = gsap.timeline({ repeat: -1, yoyo: true });
    backgroundTl.to(backgroundRef.current, {
      x: 10,
      rotation: -1,
      duration: 4,
      ease: "power2.inOut"
    });

    // Mouse movement parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;
      
      gsap.to(backgroundRef.current, {
        x: deltaX * 20,
        y: deltaY * 15,
        rotation: deltaX * 2,
        duration: 0.5,
        ease: "power2.out"
      });
      
      gsap.to(foregroundRef.current, {
        x: deltaX * 10,
        y: deltaY * 8,
        rotation: deltaX * -1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('proyectos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadCV = () => {
    // Simulate CV download
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Marcos_CV.pdf';
    link.click();
  };

  return (
    <section id="inicio" className="hero-section min-h-screen flex items-center justify-center pt-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
          {/* Profile Image with Parallax Effect */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-1">
            <div 
              ref={containerRef}
              className="relative hero-image-container w-48 sm:w-64 md:w-72 lg:w-80 xl:w-96 h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96"
              style={{ perspective: '1000px' }}
            >
              {/* Background Layer */}
              <div
                ref={backgroundRef}
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  filter: 'blur(1px)',
                  transform: 'translateZ(-50px) scale(1.1)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-secondary/30"></div>
                <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800')] bg-cover bg-center opacity-20"></div>
              </div>

              {/* Foreground Layer - Main Photo */}
              <div
                ref={foregroundRef}
                className="relative z-10 w-full h-full rounded-2xl border-4 border-accent/30 shadow-2xl overflow-hidden bg-gradient-to-br from-accent/20 to-secondary/20 p-2 sm:p-3 lg:p-4"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%)',
                  transform: 'translateZ(0px)'
                }}
              >
                <img
                  src="/marcos.jpg"
                  alt="Marcos - Desarrollador Back-End"
                  className="w-full h-full object-cover object-center rounded-2xl"
                  style={{
                    filter: 'contrast(1.1) saturate(1.1)',
                    maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 100%)'
                  }}
                />
                
                {/* Overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent rounded-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5 rounded-2xl"></div>
              </div>

              {/* Floating particles around the image */}
              <div className="absolute -inset-4 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-accent/40 rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${2 + Math.random() * 2}s`
                    }}
                  ></div>
                ))}
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/20 to-secondary/20 blur-xl opacity-50 -z-10 scale-110"></div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center lg:text-left space-y-3 sm:space-y-4 lg:space-y-6 hero-content order-2 lg:order-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-foreground leading-tight">
              Hola, soy
              <span className="block text-accent font-bold mt-1">
                Marcos
              </span>
            </h1>

            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground">
              Desarrollador Back-End
            </h2>

            <div className="inline-block bg-card/80 backdrop-blur-sm border border-border rounded-lg px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 max-w-xs sm:max-w-sm lg:max-w-md mx-auto lg:mx-0">
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground italic leading-relaxed">
                Me gusta pensar y pasarlo a código. Siempre enfocado en hacerlo mejor y aprender algo nuevo cada día.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start pt-2 sm:pt-4">
              <button
                onClick={downloadCV}
                className="inline-flex items-center justify-center px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-accent hover:bg-accent/90 text-white text-sm sm:text-base lg:text-lg 
                   font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                <Download className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 mr-2 group-hover:animate-bounce" />
                Descargar CV
              </button>

              <button
                onClick={scrollToProjects}
                className="inline-flex items-center justify-center px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-accent hover:bg-accent/90 text-white text-sm sm:text-base lg:text-lg 
                   font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                Ver Proyectos
                <ArrowDown className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 ml-2 group-hover:animate-bounce" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Only in Hero section and hidden on mobile */}
        <div className="scroll-indicator absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block">
          <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-accent rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-accent rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;