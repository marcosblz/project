import React, { useEffect } from 'react';
import { Download, ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo('.hero-image',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }
    ).fromTo('.hero-content',
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.5'
    );
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
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-1">
            <div className="relative hero-image">
              <div className="w-48 sm:w-64 md:w-72 lg:w-80 xl:w-96 h-auto rounded-2xl border-4 border-accent/30 shadow-2xl overflow-hidden 
                      bg-gradient-to-br from-accent/20 to-secondary/20 p-2 sm:p-3 lg:p-4">
                <img
                  src="/marcos.jpg"
                  alt="Marcos - Desarrollador Front-End"
                  className="w-full h-full object-cover object-center rounded-2xl"
                />
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
              Desarrollador Front-End
            </h2>

            <div className="inline-block bg-card/80 backdrop-blur-sm border border-border rounded-lg px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 max-w-xs sm:max-w-sm lg:max-w-md mx-auto lg:mx-0">
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground italic leading-relaxed">
                La programación no es solo escribir código, es crear soluciones que mejoren la vida de las personas.
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