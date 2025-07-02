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
    // Simulate CV download
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Marcos_CV.pdf';
    link.click();
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
                className="relative w-64 sm:w-72 md:w-80 lg:w-88 xl:w-96 h-80 sm:h-88 md:h-96 lg:h-[22rem] xl:h-[24rem] rounded-2xl overflow-hidden cursor-pointer"
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
                    src="/marcos.jpg"
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