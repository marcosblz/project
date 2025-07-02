import React, { useEffect } from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: number;
  date: string;
  position: string;
  company: string;
  location: string;
  description: string;
  technologies: string[];
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      date: "Junio 2024 - Presente",
      position: "Programador Groovy",
      company: "Servinform",
      location: "Madrid, España",
      description: "Desarrollé en un SaaS procesos internos, hechos con Groovy y JavaScript justo como el cliente necesitaba para mejorar la productividad de sus departamentos. Me encargué tanto del front-end como del back-end e incluso añadí funcionalidades de IA. ¿El resultado? Entre un 30% y un 50% de ahorro en tiempo de trabajo.",
      technologies: ["Groovy", "JavaScript", "HTML", "CSS", "Python", "REST APIs", "IA"]
    },
    {
      id: 2,
      date: "Abril 2023 - Junio 2023",
      position: "Desarrollador Backend Python Django",
      company: "Zener",
      location: "Madrid, España",
      description: "Tras una formación en Django y Android, me encomendaban tareas para mejorar la página web interna",
      technologies: ["Python", "Django", "Webpack", "REST APIs", "Docker", "MySQL", "Android Studio"]
    },
    {
      id: 3,
      date: "Abril 2021 - Junio 2021",
      position: "Gestor de contenido WEB",
      company: "SuperParts",
      location: "Madrid, España",
      description: "Comencé mi carrera profesional despienzando portátiles y equipos informáticos varios para posteriormente añadirlas a la web de venta y ubicarlas en el almacén.",
      technologies: ["Hardware", "PhotoShop"]
    }
  ];

  useEffect(() => {
    // Animate timeline line
    gsap.fromTo('.timeline-line',
      { height: 0 },
      {
        height: '100%',
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.experience-section',
          start: 'top 60%',
          end: 'bottom 40%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate experience cards
    gsap.fromTo('.experience-card',
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.experience-grid',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section id="experiencia" className="experience-section py-8 sm:py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Experiencia Profesional</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Mi trayectoria en el desarrollo de software</p>
        </div>

        <div className="experience-grid relative">
          {/* Timeline Line - Responsive positioning */}
          <div className="absolute left-4 sm:left-6 lg:left-8 top-0 w-0.5 bg-accent/30 timeline-line" style={{ height: 0 }}></div>

          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="experience-item relative flex items-start space-x-4 sm:space-x-6 lg:space-x-8">
                {/* Timeline Dot - Responsive positioning */}
                <div className="experience-dot relative z-10 flex-shrink-0 ml-2 sm:ml-4 lg:ml-6">
                  <div className="w-3 sm:w-4 h-3 sm:h-4 bg-accent rounded-full border-2 sm:border-4 border-background shadow-lg transition-all duration-300 hover:scale-125"></div>
                </div>

                {/* Content Card */}
                <div className="experience-card flex-1 bg-card/80 backdrop-blur-sm border border-border rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex flex-col space-y-2 sm:space-y-3 lg:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground mb-1">{exp.position}</h3>
                        <p className="text-accent font-semibold text-sm sm:text-base">{exp.company}</p>
                      </div>
                      <div className="flex flex-col sm:text-right text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-0 space-y-1">
                        <div className="flex items-center sm:justify-end">
                          <Calendar className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
                          {exp.date}
                        </div>
                        <div className="flex items-center sm:justify-end">
                          <MapPin className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-xs sm:text-sm lg:text-base leading-relaxed">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 sm:px-3 py-1 bg-accent/10 text-accent rounded-full text-xs sm:text-sm font-medium hover:bg-accent hover:text-white transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;