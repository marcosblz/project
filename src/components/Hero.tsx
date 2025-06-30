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
    <section id="inicio" className="hero-section min-h-screen flex items-center justify-center pt-16 px-3 sm:px-4 lg:px-8 relative">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-1">
            <div className="relative hero-image">
              <div className="w-40 sm:w-52 md:w-64 lg:w-80 xl:w-96 h-auto rounded-2xl border-4 border-accent/30 shadow-2xl overflow-hidden 
                      bg-gradient-to-br from-accent/20 to-secondary/20 p-2 sm:p-3 lg:p-4">
                <img
                  src="/marcos.jpg"
                  alt="Marcos - Desarrollador Back-End"
                  className="w-full h-full object-cover object-center rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center lg:text-left space-y-4 sm:space-y-5 lg:space-y-6 hero-content order-2 lg:order-2 px-2 sm:px-0">
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
                Hola, soy
              </h1>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-accent leading-none">
                Marcos
              </h1>
            </div>

            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground">
              Desarrollador Back-End
            </h2>

            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg px-4 sm:px-5 lg:px-6 py-3 sm:py-4 lg:py-5 mx-auto lg:mx-0 max-w-sm sm:max-w-md lg:max-w-lg">
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground italic leading-relaxed">
                Me gusta pensar y pasarlo a código. Siempre enfocado en hacerlo mejor y aprender algo nuevo cada día.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4 max-w-sm sm:max-w-none mx-auto lg:mx-0">
              <button
                onClick={downloadCV}
                className="flex items-center justify-center px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 bg-accent hover:bg-accent/90 text-white text-sm sm:text-base lg:text-lg 
                   font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group min-h-[48px]"
              >
                <Download className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 mr-2 group-hover:animate-bounce" />
                Descargar CV
              </button>

              <button
                onClick={scrollToProjects}
                className="flex items-center justify-center px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm sm:text-base lg:text-lg 
                   font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group border border-border min-h-[48px]"
              >
                Ver Proyectos
                <ArrowDown className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 ml-2 group-hover:animate-bounce" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Only on desktop */}
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