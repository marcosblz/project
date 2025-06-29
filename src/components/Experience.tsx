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
      date: "2022 - Presente",
      position: "Senior Front-End Developer",
      company: "TechInnovate Solutions",
      location: "Madrid, España",
      description: "Lidero el desarrollo de aplicaciones web complejas usando React y TypeScript. Mentorizo a desarrolladores junior y colaboro estrechamente con el equipo de UX/UI para crear experiencias de usuario excepcionales.",
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"]
    },
    {
      id: 2,
      date: "2021 - 2022",
      position: "Front-End Developer",
      company: "Digital Agency Pro",
      location: "Barcelona, España",
      description: "Desarrollé sitios web responsivos y aplicaciones web para clientes de diversos sectores. Implementé mejoras de rendimiento que resultaron en un aumento del 40% en la velocidad de carga.",
      technologies: ["React", "JavaScript", "Sass", "Webpack", "REST APIs"]
    },
    {
      id: 3,
      date: "2020 - 2021",
      position: "Junior Front-End Developer",
      company: "StartupTech",
      location: "Valencia, España",
      description: "Comencé mi carrera profesional desarrollando componentes reutilizables y colaborando en la creación de la plataforma principal de la empresa. Aprendí las mejores prácticas de desarrollo ágil.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Vue.js", "Bootstrap"]
    }
  ];

  useEffect(() => {
    // Animate timeline line
    gsap.fromTo('.timeline-line',
      { height: 0 },
      {
        height: '100%',
        duration: 1.5,
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
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.15,
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
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Experiencia Profesional</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground px-4 sm:px-0">Mi trayectoria en el desarrollo front-end</p>
        </div>

        <div className="experience-grid relative max-w-4xl mx-auto">
          {/* Timeline Line - Responsive positioning */}
          <div className="absolute left-3 sm:left-4 lg:left-6 top-0 w-0.5 bg-accent/30 timeline-line" style={{ height: 0 }}></div>

          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="experience-item relative flex items-start space-x-3 sm:space-x-4 lg:space-x-6">
                {/* Timeline Dot - Responsive positioning */}
                <div className="experience-dot relative z-10 flex-shrink-0 ml-1.5 sm:ml-2 lg:ml-4">
                  <div className="w-3 sm:w-4 h-3 sm:h-4 bg-accent rounded-full border-2 sm:border-4 border-background shadow-lg transition-all duration-300 hover:scale-125"></div>
                </div>

                {/* Content Card */}
                <div className="experience-card flex-1 bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-5 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 mr-2 sm:mr-0">
                  <div className="flex flex-col space-y-3 sm:space-y-4">
                    <div className="flex flex-col space-y-2 sm:space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:space-y-0 space-y-2">
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-1">{exp.position}</h3>
                          <p className="text-accent font-semibold text-base sm:text-lg">{exp.company}</p>
                        </div>
                        <div className="flex flex-col text-xs sm:text-sm text-muted-foreground space-y-1 sm:text-right">
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
                    </div>
                    
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
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