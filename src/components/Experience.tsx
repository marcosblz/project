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
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.3,
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
    <section id="experiencia" className="experience-section py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Experiencia Profesional</h2>
          <p className="text-xl text-muted-foreground">Mi trayectoria en el desarrollo front-end</p>
        </div>

        <div className="experience-grid relative">
          {/* Timeline Line */}
          <div className="absolute left-4 top-0 w-0.5 bg-accent/30 timeline-line" style={{ height: 0 }}></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="experience-item relative flex items-start space-x-8">
                {/* Timeline Dot */}
                <div className="experience-dot relative z-10 flex-shrink-0">
                  <div className="w-4 h-4 bg-accent rounded-full border-4 border-background shadow-lg transition-all duration-300 hover:scale-125"></div>
                </div>

                {/* Content Card */}
                <div className="experience-card flex-1 bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{exp.position}</h3>
                      <p className="text-accent font-semibold">{exp.company}</p>
                    </div>
                    <div className="flex flex-col sm:text-right text-sm text-muted-foreground mt-2 sm:mt-0">
                      <div className="flex items-center sm:justify-end mb-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {exp.date}
                      </div>
                      <div className="flex items-center sm:justify-end">
                        <MapPin className="w-4 h-4 mr-1" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium hover:bg-accent hover:text-white transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
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