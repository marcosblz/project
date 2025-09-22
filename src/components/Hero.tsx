import React, { useEffect, useRef } from 'react';
import { Download, ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

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

    // Auto-tilt animation every 4 seconds
    const autoTilt = () => {
      const tl = gsap.timeline();
      
      // Random tilt direction
      const randomX = (Math.random() - 0.5) * 20;
      const randomY = (Math.random() - 0.5) * 20;
      
      tl.to(cardRef.current, {
        rotationX: randomY,
        rotationY: randomX,
        duration: 2,
        ease: "power2.inOut"
      })
      .to(backgroundRef.current, {
        x: randomX * 0.5,
        y: randomY * 0.5,
        scale: 1.1,
        duration: 2,
        ease: "power2.inOut"
      }, 0)
      .to(foregroundRef.current, {
        x: randomX * -0.3,
        y: randomY * -0.3,
        duration: 2,
        ease: "power2.inOut"
      }, 0)
      .to(overlayRef.current, {
        background: `linear-gradient(${randomX + 135}deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)`,
        duration: 2,
        ease: "power2.inOut"
      }, 0)
      .to(cardRef.current, {
        rotationX: 0,
        rotationY: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 1
      })
      .to([backgroundRef.current, foregroundRef.current], {
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power2.out"
      }, "-=1.5")
      .to(overlayRef.current, {
        background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)",
        duration: 1.5,
        ease: "power2.out"
      }, "-=1.5");
    };

    // Start auto-tilt after initial animation
    const autoTiltInterval = setInterval(autoTilt, 4000);

    // Mouse move tilt effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateX = (mouseY / rect.height) * -30;
      const rotateY = (mouseX / rect.width) * 30;
      
      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(backgroundRef.current, {
        x: mouseX * 0.02,
        y: mouseY * 0.02,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(foregroundRef.current, {
        x: mouseX * -0.01,
        y: mouseY * -0.01,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(overlayRef.current, {
        background: `linear-gradient(${rotateY + 135}deg, rgba(255,255,255,${Math.abs(rotateY) * 0.01}) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,${Math.abs(rotateX) * 0.01}) 100%)`,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(glowRef.current, {
        x: mouseX * 0.05,
        y: mouseY * 0.05,
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cardRef.current, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out"
      });
      
      gsap.to([backgroundRef.current, foregroundRef.current, glowRef.current], {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
      
      gsap.to(overlayRef.current, {
        background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)",
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      clearInterval(autoTiltInterval);
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('proyectos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadCV = () => {
    // Método 1: Fetch y crear blob
    fetch('/CV_Marcos_Baeza.jpg')
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'CV_Marcos_Baeza.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error descargando CV:', error);
        // Fallback: abrir en nueva ventana
        window.open('/CV_Marcos_Baeza.jpg', '_blank');
      });
  };

  return (
    <section id="inicio" className="hero-section min-h-screen flex items-center justify-center pt-16 px-4 relative">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
          {/* Profile Image with 3D Tilt Effect */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-1">
            <div className="hero-image-container relative" style={{ perspective: '1000px' }}>
              {/* Glow Effect */}
              <div
                ref={glowRef}
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/20 to-secondary/20 blur-xl opacity-40 -z-10 scale-110"
              ></div>
              
              {/* Main Card Container */}
              <div
                ref={cardRef}
                className="relative w-64 sm:w-72 md:w-80 lg:w-88 xl:w-96 h-80 sm:h-88 md:h-96 lg:h-[28rem] xl:h-[32rem] rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.1s ease-out'
                }}
              >
                {/* Background Layer - Subtle geometric pattern */}
                <div
                  ref={backgroundRef}
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)',
                    transform: 'translateZ(-30px) scale(1.1)',
                    filter: 'blur(1px)'
                  }}
                >
                  {/* Geometric pattern overlay */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
                        linear-gradient(45deg, transparent 40%, rgba(236, 72, 153, 0.1) 50%, transparent 60%)
                      `
                    }}
                  ></div>
                </div>

                {/* Foreground Layer - Main Photo */}
                <div
                  ref={foregroundRef}
                  className="relative z-10 w-full h-full rounded-2xl border-2 border-accent/20 shadow-2xl overflow-hidden"
                  style={{
                    transform: 'translateZ(0px)'
                  }}
                >
                  <img
                    src="/marcos2.jpg"
                    alt="Marcos - Desarrollador Back-End"
                    className="w-full h-full object-cover object-center rounded-2xl"
                    style={{
                      filter: 'contrast(1.05) saturate(1.05) brightness(1.02)',
                      imageRendering: 'crisp-edges',
                      WebkitImageRendering: 'crisp-edges'
                    }}
                    loading="eager"
                    decoding="sync"
                  />
                </div>

                {/* Light Overlay */}
                <div
                  ref={overlayRef}
                  className="absolute inset-0 rounded-2xl pointer-events-none z-20"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.05) 100%)',
                    mixBlendMode: 'overlay'
                  }}
                ></div>

                {/* Floating particles */}
                <div className="absolute -inset-4 pointer-events-none z-30">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-accent/40 rounded-full"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animation: `pulse ${2 + Math.random() * 3}s infinite`,
                        animationDelay: `${i * 0.5}s`,
                        transform: `translateZ(${Math.random() * 15 + 5}px)`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center lg:text-left hero-content order-2 lg:order-2 flex flex-col justify-center h-full">
            <div className="space-y-3 sm:space-y-4 lg:space-y-5">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-tight">
              Hola, soy
              <span className="block text-accent font-bold mt-2">
                Marcos
              </span>
            </h1>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-muted-foreground font-medium">
              Desarrollador Back-End
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground/80 mt-4 px-2 sm:px-0">
              Con base sólida en DevOps y experiencia práctica en entornos fullstack.
            </p>
            <div className="inline-block bg-card/80 backdrop-blur-sm border border-border rounded-xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 max-w-md sm:max-w-lg lg:max-w-2xl mx-auto lg:mx-0 mt-4">
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground italic leading-relaxed">
                "Escribo código que no solo funciona hoy, sino que otros puedan entender, mantener y mejorar mañana."
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start pt-4 sm:pt-5 px-4 sm:px-0">
              <button
                onClick={downloadCV}
                className="inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-4 sm:py-5 lg:py-6 bg-accent hover:bg-accent/90 text-white text-base sm:text-lg lg:text-xl 
                   font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl group min-h-[64px]"
              >
                <Download className="w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7 mr-3 group-hover:animate-bounce" />
                Descargar CV
              </button>

              <button
                onClick={scrollToProjects}
                className="inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-4 sm:py-5 lg:py-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base sm:text-lg lg:text-xl 
                   font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl group border-2 border-accent/20 min-h-[64px]"
              >
                Ver Proyectos
                <ArrowDown className="w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7 ml-3 group-hover:animate-bounce" />
              </button>
            </div>
          </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;