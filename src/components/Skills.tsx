import React, { useEffect, useRef } from 'react';
import { Server, Database, Monitor, GitBranch } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animación de entrada
    gsap.fromTo('.skill-card',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section id="habilidades" ref={sectionRef} className="py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Stack Tecnológico</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Especialización técnica por áreas</p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Layout principal: 1 grande + 3 pequeñas */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Tarjeta principal BACK-END (75% del ancho en desktop) */}
            <div className="lg:col-span-3">
              <div className="skill-card rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group relative h-80 lg:h-96">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400"></div>
                
                {/* Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
                      backgroundSize: '40px 40px'
                    }}
                  ></div>
                </div>

                {/* Contenido expandido */}
                <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col text-white">
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 lg:w-16 h-12 lg:h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                        <Server className="w-6 lg:w-8 h-6 lg:h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-bold tracking-wider">
                          BACK-END
                        </h3>
                        <p className="text-white/80 text-sm lg:text-base">
                          Desarrollo de APIs robustas y arquitecturas escalables
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-lg lg:text-xl font-semibold mb-4">Tecnologías y Herramientas</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {["Groovy", "Python", "Django", "Java", "Node.js", "REST APIs", "PostgreSQL", "MySQL"].map((skill, index) => (
                        <div
                          key={index}
                          className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-center hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/10"
                        >
                          <span className="text-xs lg:text-sm font-medium">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/20">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-xl lg:text-2xl font-bold">3+</div>
                        <div className="text-xs lg:text-sm text-white/80">Años</div>
                      </div>
                      <div>
                        <div className="text-xl lg:text-2xl font-bold">8</div>
                        <div className="text-xs lg:text-sm text-white/80">Tecnologías</div>
                      </div>
                      <div>
                        <div className="text-xl lg:text-2xl font-bold">10+</div>
                        <div className="text-xs lg:text-sm text-white/80">Proyectos</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Tarjetas pequeñas (25% del ancho en desktop) */}
            <div className="lg:col-span-1 grid grid-cols-1 gap-4">
              {/* FRONT-END */}
              <div className="skill-card rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group relative h-24 lg:h-28">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-400"></div>
                <div className="absolute inset-0 opacity-20">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
                      backgroundSize: '20px 20px'
                    }}
                  ></div>
                </div>
                <div className="relative z-10 p-4 h-full flex flex-col justify-center items-center text-white text-center">
                  <h3 className="text-sm lg:text-base font-bold tracking-wider">
                    FRONT-END
                  </h3>
                  <p className="text-xs text-white/80 mt-1">
                    8 tecnologías
                  </p>
                </div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* DEVOPS */}
              <div className="skill-card rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group relative h-24 lg:h-28">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600"></div>
                <div className="absolute inset-0 opacity-20">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
                      backgroundSize: '20px 20px'
                    }}
                  ></div>
                </div>
                <div className="relative z-10 p-4 h-full flex flex-col justify-center items-center text-white text-center">
                  <h3 className="text-sm lg:text-base font-bold tracking-wider">
                    DEVOPS
                  </h3>
                  <p className="text-xs text-white/80 mt-1">
                    8 tecnologías
                  </p>
                </div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* OTROS */}
              <div className="skill-card rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group relative h-24 lg:h-28">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500"></div>
                <div className="absolute inset-0 opacity-20">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
                      backgroundSize: '20px 20px'
                    }}
                  ></div>
                </div>
                <div className="relative z-10 p-4 h-full flex flex-col justify-center items-center text-white text-center">
                  <h3 className="text-sm lg:text-base font-bold tracking-wider">
                    OTROS
                  </h3>
                  <p className="text-xs text-white/80 mt-1">
                    8 tecnologías
                  </p>
                </div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Info adicional */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-accent/10 text-accent rounded-full text-sm sm:text-base lg:text-lg font-medium">
            Especialización técnica por áreas de desarrollo
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;