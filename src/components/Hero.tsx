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
    <section id="inicio" className="hero-section min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-1">
            <div className="relative hero-image">
              <div className="w-72 sm:w-80 md:w-96 h-auto rounded-2xl border-4 border-accent/30 shadow-2xl overflow-hidden 
                      bg-gradient-to-br from-accent/20 to-secondary/20 p-4">
                <img
                  src="/marcos.jpg"
                  alt="Marcos - Desarrollador Front-End"
                  className="w-full h-full object-cover object-center rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center lg:text-left space-y-6 hero-content order-2 lg:order-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-tight">
              Hola, soy
              <span className="block text-accent font-bold">
                Marcos
              </span>
            </h1>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground">
              Desarrollador Front-End
            </h2>

            <div className="inline-block bg-card/80 backdrop-blur-sm border border-border rounded-lg px-6 py-4 max-w-md">
              <p className="text-lg sm:text-xl text-muted-foreground italic leading-relaxed">
                La programación no es solo escribir código, es crear soluciones que mejoren la vida de las personas.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start pt-4">
              <button
                onClick={downloadCV}
                className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent/90 text-white text-lg 
                   font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                <Download className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                Descargar CV
              </button>

              <button
                onClick={scrollToProjects}
                className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent/90 text-white text-lg 
                   font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                Ver Proyectos
                <ArrowDown className="w-6 h-6 ml-3 group-hover:animate-bounce" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
            <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;