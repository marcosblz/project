import React, { useEffect, useRef, useState } from 'react';
import { Server, Monitor, GitBranch, Settings } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  workExperience: string;
  studyExperience: string;
  highlights: string[];
  skills: Array<{
    name: string;
    workTime: string;
    studyTime: string;
    description: string;
  }>;
}

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<string>('backend');
  const [isAnimating, setIsAnimating] = useState(false);

  const skillCategories: SkillCategory[] = [
    {
      id: 'backend',
      title: "BACK-END",
      subtitle: "Desarrollo del lado del servidor",
      icon: <Server className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      workExperience: "3 años trabajando",
      studyExperience: "4 años estudiando",
      highlights: [
        "APIs REST robustas y escalables",
        "Arquitectura de microservicios",
        "Optimización de bases de datos",
        "Integración con servicios externos"
      ],
      skills: [
        { name: "Groovy", workTime: "1 año", studyTime: "6 meses", description: "Desarrollo de SaaS y automatización" },
        { name: "Python", workTime: "8 meses", studyTime: "2 años", description: "Django, FastAPI, scripts de automatización" },
        { name: "Java", workTime: "3 meses", studyTime: "2 años", description: "Spring Boot, aplicaciones empresariales" },
        { name: "Node.js", workTime: "2 meses", studyTime: "1 año", description: "Express, APIs REST, microservicios" },
        { name: "PostgreSQL", workTime: "1 año", studyTime: "2 años", description: "Diseño de esquemas, optimización" },
        { name: "MySQL", workTime: "8 meses", studyTime: "1.5 años", description: "Bases de datos relacionales" }
      ]
    },
    {
      id: 'frontend',
      title: "FRONT-END",
      subtitle: "Interfaces de usuario modernas",
      icon: <Monitor className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      workExperience: "2 años trabajando",
      studyExperience: "3 años estudiando",
      highlights: [
        "Interfaces responsivas y accesibles",
        "Componentes reutilizables",
        "Optimización de rendimiento",
        "Experiencia de usuario fluida"
      ],
      skills: [
        { name: "JavaScript", workTime: "2 años", studyTime: "3 años", description: "ES6+, DOM manipulation, async/await" },
        { name: "HTML5/CSS3", workTime: "2 años", studyTime: "3 años", description: "Semantic HTML, Flexbox, Grid" },
        { name: "React", workTime: "6 meses", studyTime: "1 año", description: "Hooks, Context API, componentes" },
        { name: "TypeScript", workTime: "3 meses", studyTime: "8 meses", description: "Tipado estático, interfaces" },
        { name: "Tailwind CSS", workTime: "4 meses", studyTime: "6 meses", description: "Utility-first, responsive design" },
        { name: "GSAP", workTime: "2 meses", studyTime: "4 meses", description: "Animaciones complejas, ScrollTrigger" }
      ]
    },
    {
      id: 'devops',
      title: "DEVOPS",
      subtitle: "Automatización y despliegue",
      icon: <GitBranch className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      workExperience: "1 año trabajando",
      studyExperience: "2 años estudiando",
      highlights: [
        "Pipelines CI/CD automatizados",
        "Containerización con Docker",
        "Monitoreo y logging",
        "Infraestructura como código"
      ],
      skills: [
        { name: "Git", workTime: "3 años", studyTime: "3 años", description: "Control de versiones, branching strategies" },
        { name: "Docker", workTime: "8 meses", studyTime: "1 año", description: "Containerización, Docker Compose" },
        { name: "Jenkins", workTime: "6 meses", studyTime: "8 meses", description: "Pipelines CI/CD, automatización" },
        { name: "Linux", workTime: "1 año", studyTime: "2 años", description: "Administración de servidores, bash" },
        { name: "AWS", workTime: "3 meses", studyTime: "6 meses", description: "EC2, S3, RDS, Lambda básico" },
        { name: "Nginx", workTime: "4 meses", studyTime: "8 meses", description: "Reverse proxy, load balancing" }
      ]
    },
    {
      id: 'otros',
      title: "OTROS",
      subtitle: "Herramientas y metodologías",
      icon: <Settings className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      workExperience: "2 años trabajando",
      studyExperience: "3 años estudiando",
      highlights: [
        "Metodologías ágiles (Scrum/Kanban)",
        "Testing y calidad de código",
        "Herramientas de diseño",
        "Análisis y documentación"
      ],
      skills: [
        { name: "Scrum/Kanban", workTime: "2 años", studyTime: "1 año", description: "Metodologías ágiles, gestión" },
        { name: "REST APIs", workTime: "2 años", studyTime: "2 años", description: "Diseño, documentación, integración" },
        { name: "Photoshop", workTime: "6 meses", studyTime: "2 años", description: "Edición de imágenes, optimización" },
        { name: "Figma", workTime: "3 meses", studyTime: "8 meses", description: "Prototipado, diseño de interfaces" },
        { name: "Jest/Testing", workTime: "2 meses", studyTime: "6 meses", description: "Unit testing, integration testing" },
        { name: "Webpack", workTime: "1 mes", studyTime: "4 meses", description: "Bundling, optimización de assets" }
      ]
    }
  ];

  // Función para intercambiar tarjetas (como en el CodePen)
  const handleCardClick = (clickedId: string) => {
    if (selectedTab === clickedId || isAnimating) return;
    
    setIsAnimating(true);
    
    const container = containerRef.current;
    if (!container) return;

    // Obtener todas las tarjetas
    const cards = Array.from(container.querySelectorAll('.card')) as HTMLElement[];
    
    // Guardar el estado actual antes del cambio
    const state = gsap.getProperty(cards, "x,y,width,height,rotation,scale");
    
    // Cambiar el estado (esto reorganiza el DOM)
    setSelectedTab(clickedId);
    
    // Usar requestAnimationFrame para asegurar que el DOM se ha actualizado
    requestAnimationFrame(() => {
      // Aplicar el estado anterior temporalmente
      gsap.set(cards, state);
      
      // Animar hacia las nuevas posiciones
      gsap.to(cards, {
        x: 0,
        y: 0,
        width: "auto",
        height: "auto",
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          setIsAnimating(false);
        }
      });
    });
  };

  // Configuración inicial
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Animación de entrada inicial
    gsap.fromTo('.card',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section id="habilidades" className="py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Stack Tecnológico</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Especialización técnica por áreas de desarrollo</p>
        </div>

        {/* Container principal */}
        <div className="max-w-6xl mx-auto">
          <div 
            ref={containerRef}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6"
          >
            {skillCategories.map((category) => {
              const isSelected = selectedTab === category.id;
              
              return (
                <div
                  key={category.id}
                  className={`card cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? 'lg:col-span-2 lg:row-span-2' 
                      : 'lg:col-span-1 lg:row-span-1'
                  } ${isAnimating ? 'pointer-events-none' : ''}`}
                  onClick={() => handleCardClick(category.id)}
                >
                  <div className={`
                    relative overflow-hidden rounded-2xl border border-border shadow-lg hover:shadow-xl
                    bg-background/80 backdrop-blur-sm
                    ${isSelected ? 'h-96 lg:h-full' : 'h-48 lg:h-40'}
                    transition-all duration-300 hover:-translate-y-1
                    group
                  `}>
                    
                    {/* Fondo con gradiente sutil */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    {/* Contenido */}
                    <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col">
                      
                      {/* Header */}
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {React.cloneElement(category.icon as React.ReactElement, {
                            className: "w-6 h-6 text-white"
                          })}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-wide">
                            {category.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{category.subtitle}</p>
                          {!isSelected && (
                            <div className="text-xs text-accent font-medium mt-1">
                              💼 {category.workExperience} • 📚 {category.studyExperience}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Contenido expandido solo para tarjeta seleccionada */}
                      {isSelected && (
                        <div className="flex-1 space-y-4">
                          
                          {/* Experiencia */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center">
                              <span className="text-accent font-medium">💼 {category.workExperience}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-accent font-medium">📚 {category.studyExperience}</span>
                            </div>
                          </div>

                          {/* Especialidades */}
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2">Especialidades:</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                              {category.highlights.map((highlight, index) => (
                                <div key={index} className="flex items-center text-xs text-muted-foreground">
                                  <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 flex-shrink-0"></div>
                                  <span>{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tecnologías */}
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-foreground mb-2">Tecnologías:</h4>
                            <div className="flex flex-wrap gap-2">
                              {category.skills.map((skill, index) => (
                                <div 
                                  key={index} 
                                  className="bg-muted/50 backdrop-blur-sm rounded-full px-3 py-1 border border-border/50 hover:bg-accent/10 hover:border-accent/30 transition-all duration-300"
                                >
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs font-medium text-foreground">{skill.name}</span>
                                    <div className="flex items-center space-x-1 text-xs text-accent">
                                      <span>💼 {skill.workTime}</span>
                                      <span className="text-muted-foreground">•</span>
                                      <span>📚 {skill.studyTime}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Indicador de click para tarjetas no seleccionadas */}
                      {!isSelected && (
                        <div className="mt-auto pt-2">
                          <div className="text-xs text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Click para ver detalles →
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Efecto hover */}
                    <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;