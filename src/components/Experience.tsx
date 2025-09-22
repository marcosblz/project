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
      description: "Desarrollé procesos internos sobre un CRM corporativo utilizando Groovy y JavaScript, adaptando las soluciones exactamente a las necesidades del cliente y mejorando así la productividad de los distintos departamentos. Trabajé tanto en el front-end como en el back-end, y además incorporé funcionalidades de inteligencia artificial. ¿El resultado? Conseguí automatizar procesos que antes se gestionaban en Excel, logrando al menos un 50% de ahorro de tiempo y esfuerzo para los equipos involucrados.",
      technologies: ["Groovy", "Web stack", "Python", "REST APIs", "IA"]
    },
    {
      id: 2,
      date: "Abril 2023 - Junio 2023",
      position: "Desarrollador Backend Python Django",
      company: "Zener",
      location: "Madrid, España",
      description: "Prácticas de GFGS - DAM: Tras una formación intensiva en Django y Android, colaboré en el desarrollo y mejora de la web interna de la empresa.",
      technologies: ["Python", "Django", "Web stack", "REST APIs", "Docker", "MySQL", "Android Studio"]
    },
    {
      id: 3,
      date: "Abril 2021 - Junio 2021",
      position: "Gestor de contenido WEB",
      company: "SuperParts",
      location: "Madrid, España",
      description: "Prácticas de GFGM - SMR: Inicié mi carrera profesional desmontando portátiles y equipos informáticos para su reutilización, catalogación y gestión en el almacén. Además, me encargué de la subida y gestión de productos en la web de ventas, incluyendo la edición de imágenes y contenido.",
      technologies: ["Hardware", "PhotoShop"]
    }
  ];

  useEffect(() => {
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">Experiencia Profesional</h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground">Mi trayectoria en el desarrollo de software</p>
        </div>

        <div className="experience-grid relative">
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="experience-item">
                {/* Content Card */}
                <div className="experience-card bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex flex-col space-y-3 sm:space-y-4 lg:space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3">{exp.position}</h3>
                        <p className="text-accent font-semibold text-lg sm:text-xl">{exp.company}</p>
                      </div>
                      <div className="flex flex-col sm:text-right text-base sm:text-lg text-muted-foreground mt-3 sm:mt-0 space-y-2">
                        <div className="flex items-center sm:justify-end">
                          <Calendar className="w-5 sm:w-6 h-5 sm:h-6 mr-3" />
                          {exp.date}
                        </div>
                        <div className="flex items-center sm:justify-end">
                          <MapPin className="w-5 sm:w-6 h-5 sm:h-6 mr-3" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-base sm:text-lg lg:text-xl leading-relaxed">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-4 sm:px-5 py-2 sm:py-2.5 bg-accent/10 text-accent rounded-full text-base sm:text-lg font-medium hover:bg-accent hover:text-white transition-colors duration-300"
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