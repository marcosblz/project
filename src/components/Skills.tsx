import React, { useEffect, useRef, useState } from 'react';
import { Server, Database, Monitor, GitBranch, Code, Zap, Globe, Settings } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  experience: string;
  description: string;
}

interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  gradient: string;
  icon: React.ReactNode;
  skills: Skill[];
  highlights: string[];
  workExperience: string;
  studyExperience: string;
}

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<string>('backend');
  const [isAnimating, setIsAnimating] = useState(false);

  const skillCategories: SkillCategory[] = [
    {
      id: 'backend',
      title: "BACK-END",
      subtitle: "Desarrollo del lado del servidor",
      gradient: "from-blue-600 via-cyan-500 to-teal-400",
      icon: <Server className="w-8 h-8" />,
      workExperience: "3 años trabajando",
      studyExperience: "4 años estudiando",
      highlights: [
        "APIs REST robustas y escalables",
        "Arquitectura de microservicios",
        "Optimización de bases de datos",
        "Integración con servicios externos"
      ],
      skills: [
        {
          name: "Groovy",
          level: 90,
          experience: "2 años",
          description: "Desarrollo de SaaS y automatización de procesos"
        },
        {
          name: "Python",
          level: 85,
          experience: "3 años",
          description: "Django, FastAPI, scripts de automatización"
        },
        {
          name: "Java",
          level: 80,
          experience: "2 años",
          description: "Spring Boot, aplicaciones empresariales"
        },
        {
          name: "Node.js",
          level: 75,
          experience: "1.5 años",
          description: "Express, APIs REST, microservicios"
        },
        {
          name: "PostgreSQL",
          level: 85,
          experience: "3 años",
          description: "Diseño de esquemas, optimización de consultas"
        },
        {
          name: "MongoDB",
          level: 70,
          experience: "1 año",
          description: "Bases de datos NoSQL, agregaciones"
        }
      ]
    },
    {
      id: 'frontend',
      title: "FRONT-END",
      subtitle: "Interfaces de usuario modernas",
      gradient: "from-purple-600 via-blue-500 to-indigo-400",
      icon: <Monitor className="w-8 h-8" />,
      workExperience: "2 años trabajando",
      studyExperience: "3 años estudiando",
      highlights: [
        "Interfaces responsivas y accesibles",
        "Componentes reutilizables",
        "Optimización de rendimiento",
        "Experiencia de usuario fluida"
      ],
      skills: [
        {
          name: "React",
          level: 85,
          experience: "2 años",
          description: "Hooks, Context API, componentes funcionales"
        },
        {
          name: "TypeScript",
          level: 80,
          experience: "1.5 años",
          description: "Tipado estático, interfaces, generics"
        },
        {
          name: "JavaScript",
          level: 90,
          experience: "3 años",
          description: "ES6+, DOM manipulation, async/await"
        },
        {
          name: "Tailwind CSS",
          level: 85,
          experience: "1 año",
          description: "Utility-first, responsive design"
        },
        {
          name: "HTML5/CSS3",
          level: 90,
          experience: "3 años",
          description: "Semantic HTML, Flexbox, Grid, animations"
        },
        {
          name: "GSAP",
          level: 70,
          experience: "6 meses",
          description: "Animaciones complejas, ScrollTrigger"
        }
      ]
    },
    {
      id: 'devops',
      title: "DEVOPS",
      subtitle: "Automatización y despliegue",
      gradient: "from-orange-500 via-pink-500 to-purple-600",
      icon: <GitBranch className="w-8 h-8" />,
      workExperience: "1 año trabajando",
      studyExperience: "2 años estudiando",
      highlights: [
        "Pipelines CI/CD automatizados",
        "Containerización con Docker",
        "Monitoreo y logging",
        "Infraestructura como código"
      ],
      skills: [
        {
          name: "Docker",
          level: 80,
          experience: "1 año",
          description: "Containerización, Docker Compose, multi-stage builds"
        },
        {
          name: "Git",
          level: 90,
          experience: "3 años",
          description: "Control de versiones, branching strategies"
        },
        {
          name: "Jenkins",
          level: 75,
          experience: "8 meses",
          description: "Pipelines CI/CD, automatización de despliegues"
        },
        {
          name: "AWS",
          level: 65,
          experience: "6 meses",
          description: "EC2, S3, RDS, Lambda básico"
        },
        {
          name: "Linux",
          level: 80,
          experience: "2 años",
          description: "Administración de servidores, bash scripting"
        },
        {
          name: "Nginx",
          level: 70,
          experience: "1 año",
          description: "Reverse proxy, load balancing, SSL"
        }
      ]
    },
    {
      id: 'otros',
      title: "OTROS",
      subtitle: "Herramientas y metodologías",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      icon: <Settings className="w-8 h-8" />,
      workExperience: "2 años trabajando",
      studyExperience: "3 años estudiando",
      highlights: [
        "Metodologías ágiles (Scrum/Kanban)",
        "Testing y calidad de código",
        "Herramientas de diseño",
        "Análisis y documentación"
      ],
      skills: [
        {
          name: "Scrum/Kanban",
          level: 85,
          experience: "2 años",
          description: "Metodologías ágiles, gestión de proyectos"
        },
        {
          name: "Figma",
          level: 70,
          experience: "1 año",
          description: "Prototipado, diseño de interfaces"
        },
        {
          name: "Photoshop",
          level: 75,
          experience: "2 años",
          description: "Edición de imágenes, optimización web"
        },
        {
          name: "Jest/Testing",
          level: 65,
          experience: "8 meses",
          description: "Unit testing, integration testing"
        },
        {
          name: "REST APIs",
          level: 90,
          experience: "3 años",
          description: "Diseño, documentación, integración"
        },
        {
          name: "Webpack",
          level: 60,
          experience: "6 meses",
          description: "Bundling, optimización de assets"
        }
      ]
    }
  ];

  const handleTabClick = (tabId: string) => {
    if (selectedTab === tabId || isAnimating) return;
    
    setIsAnimating(true);
    
    const container = containerRef.current;
    if (!container) return;

    const currentMainCard = container.querySelector(`[data-id="${selectedTab}"]`) as HTMLElement;
    const clickedCard = container.querySelector(`[data-id="${tabId}"]`) as HTMLElement;
    
    if (!currentMainCard || !clickedCard) return;

    // Create timeline for the swap
    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedTab(tabId);
        setIsAnimating(false);
      }
    });

    // Get current positions
    const currentRect = currentMainCard.getBoundingClientRect();
    const clickedRect = clickedCard.getBoundingClientRect();

    // Calculate the distance to move
    const deltaX = clickedRect.left - currentRect.left;
    const deltaY = clickedRect.top - currentRect.top;

    // Animate both cards simultaneously
    tl.to(currentMainCard, {
      x: deltaX,
      y: deltaY,
      width: clickedRect.width,
      height: clickedRect.height,
      duration: 0.8,
      ease: "power2.inOut"
    })
    .to(clickedCard, {
      x: -deltaX,
      y: -deltaY,
      width: currentRect.width,
      height: currentRect.height,
      duration: 0.8,
      ease: "power2.inOut"
    }, 0); // Start at the same time
  };

  // Layout setup effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.skill-card') as NodeListOf<HTMLElement>;
    
    // Clear any existing transforms
    gsap.set(cards, { clearProps: "all" });
    
    // Set up positions based on selected tab
    cards.forEach((card, index) => {
      const cardId = card.getAttribute('data-id');
      
      if (cardId === selectedTab) {
        // Main card (left side, 65% width)
        gsap.set(card, {
          position: 'absolute',
          left: 0,
          top: 0,
          width: '65%',
          height: '500px',
          zIndex: 10
        });
      } else {
        // Sidebar cards (right side, 35% width, stacked)
        const otherCards = skillCategories.filter(cat => cat.id !== selectedTab);
        const stackIndex = otherCards.findIndex(cat => cat.id === cardId);
        
        gsap.set(card, {
          position: 'absolute',
          left: '67%', // Small gap from main card
          top: stackIndex * 165 + 'px', // Stack with gap
          width: '31%',
          height: '155px',
          zIndex: 5
        });
      }
    });

    // Initial entrance animation only on first load
    if (sectionRef.current && !isAnimating) {
      gsap.fromTo('.skill-card',
        { opacity: 0, scale: 0.9 },
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
    }
  }, [selectedTab, skillCategories, isAnimating]);

  const selectedCategory = skillCategories.find(cat => cat.id === selectedTab);

  return (
    <section id="habilidades" ref={sectionRef} className="py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Stack Tecnológico</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Especialización técnica por áreas de desarrollo</p>
        </div>

        {/* Container with fixed height for layout */}
        <div className="max-w-6xl mx-auto mb-8 lg:mb-12">
          <div 
            ref={containerRef}
            className="relative w-full"
            style={{ height: '500px' }}
          >
            {skillCategories.map((category) => (
              <div
                key={category.id}
                data-id={category.id}
                className={`skill-card cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group ${
                  selectedTab === category.id ? 'ring-2 ring-accent/50' : ''
                } ${isAnimating ? 'pointer-events-none' : ''}`}
                onClick={() => handleTabClick(category.id)}
                style={{
                  background: `linear-gradient(135deg, 
                    hsl(var(--background)) 0%, 
                    hsl(var(--card)) 50%, 
                    hsl(var(--muted)) 100%
                  )`,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid hsl(var(--border))'
                }}
              >
                {/* Gradient Accent Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-5">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--accent)) 2px, transparent 2px)`,
                      backgroundSize: '30px 30px'
                    }}
                  ></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-4 sm:p-6 lg:p-8 h-full text-foreground overflow-hidden">
                  {selectedTab === category.id ? (
                    // Main card content (detailed view)
                    <div className="h-full flex flex-col">
                      <div className="flex items-center mb-4 sm:mb-6">
                        <div className={`w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0 shadow-lg`}>
                          {React.cloneElement(category.icon as React.ReactElement, {
                            className: "w-6 sm:w-8 h-6 sm:h-8 text-white"
                          })}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wider mb-1">
                            {category.title}
                          </h3>
                          <p className="text-sm sm:text-base text-muted-foreground">{category.subtitle}</p>
                          <div className="flex flex-col sm:flex-row sm:gap-4 text-xs sm:text-sm text-accent font-medium mt-1">
                            <span>💼 {category.workExperience}</span>
                            <span>📚 {category.studyExperience}</span>
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="mb-4 sm:mb-6">
                        <h4 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 text-foreground">Especialidades:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                          {category.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center text-xs sm:text-sm text-muted-foreground">
                              <Zap className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2 flex-shrink-0 text-accent" />
                              <span className="truncate">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Skills with progress bars */}
                      <div className="flex-1 overflow-y-auto">
                        <h4 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 text-foreground">Tecnologías:</h4>
                        <div className="space-y-2 sm:space-y-3">
                          {category.skills.map((skill, index) => (
                            <div key={index} className="bg-muted/50 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-border/50">
                              <div className="flex justify-between items-center mb-1 sm:mb-2">
                                <span className="text-xs sm:text-sm font-medium text-foreground">{skill.name}</span>
                                <span className="text-xs text-muted-foreground">{skill.experience}</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-1.5 sm:h-2 mb-1">
                                <div 
                                  className="bg-gradient-to-r from-accent to-accent/80 rounded-full h-full transition-all duration-1000 ease-out"
                                  style={{ width: `${skill.level}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2">{skill.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Sidebar card content (compact view)
                    <div className="h-full flex flex-col justify-center items-center text-center">
                      <div className={`w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-br ${category.gradient} rounded-lg flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        {React.cloneElement(category.icon as React.ReactElement, {
                          className: "w-4 sm:w-6 h-4 sm:h-6 text-white"
                        })}
                      </div>
                      <h3 className="text-sm sm:text-lg font-bold tracking-wider mb-1 text-foreground">
                        {category.title}
                      </h3>
                      <p className="text-xs text-muted-foreground hidden sm:block mb-1">{category.subtitle}</p>
                      <div className="text-xs text-accent font-medium">
                        <div>💼 {category.workExperience}</div>
                        <div>📚 {category.studyExperience}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Category Summary */}
        {selectedCategory && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg">
              <div className="text-center">
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div className={`w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r ${selectedCategory.gradient} rounded-lg flex items-center justify-center mr-2 sm:mr-3 shadow-lg`}>
                    {React.cloneElement(selectedCategory.icon as React.ReactElement, {
                      className: "w-4 sm:w-5 h-4 sm:h-5 text-white"
                    })}
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                    Especialización en {selectedCategory.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                  💼 {selectedCategory.workExperience} • 📚 {selectedCategory.studyExperience} • {selectedCategory.skills.length} tecnologías dominadas
                </p>
                
                {/* Quick stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-accent/10 rounded-lg p-2 sm:p-3 border border-accent/20">
                    <div className="text-lg sm:text-xl font-bold text-accent">
                      {Math.round(selectedCategory.skills.reduce((acc, skill) => acc + skill.level, 0) / selectedCategory.skills.length)}%
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Promedio</div>
                  </div>
                  <div className="bg-accent/10 rounded-lg p-2 sm:p-3 border border-accent/20">
                    <div className="text-lg sm:text-xl font-bold text-accent">
                      {selectedCategory.skills.filter(skill => skill.level >= 80).length}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Avanzado</div>
                  </div>
                  <div className="bg-accent/10 rounded-lg p-2 sm:p-3 border border-accent/20">
                    <div className="text-lg sm:text-xl font-bold text-accent">
                      {selectedCategory.highlights.length}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Especialidades</div>
                  </div>
                  <div className="bg-accent/10 rounded-lg p-2 sm:p-3 border border-accent/20">
                    <div className="text-lg sm:text-xl font-bold text-accent">
                      {selectedCategory.skills.length}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Tecnologías</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;