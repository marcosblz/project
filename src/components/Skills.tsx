import React, { useEffect, useRef, useState } from 'react';
import { Server, Database, Monitor, GitBranch, Code, Zap, Globe, Settings } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  workTime: string;
  studyTime: string;
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
          workTime: "1 año",
          studyTime: "6 meses",
          description: "Desarrollo de SaaS y automatización de procesos empresariales"
        },
        {
          name: "Python",
          workTime: "8 meses",
          studyTime: "2 años",
          description: "Django, FastAPI, scripts de automatización e IA"
        },
        {
          name: "Java",
          workTime: "3 meses",
          studyTime: "2 años",
          description: "Spring Boot, aplicaciones empresariales y multihilo"
        },
        {
          name: "Node.js",
          workTime: "2 meses",
          studyTime: "1 año",
          description: "Express, APIs REST, microservicios"
        },
        {
          name: "PostgreSQL",
          workTime: "1 año",
          studyTime: "2 años",
          description: "Diseño de esquemas, optimización de consultas"
        },
        {
          name: "MySQL",
          workTime: "8 meses",
          studyTime: "1.5 años",
          description: "Bases de datos relacionales, stored procedures"
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
          name: "JavaScript",
          workTime: "2 años",
          studyTime: "3 años",
          description: "ES6+, DOM manipulation, async/await, programación funcional"
        },
        {
          name: "HTML5/CSS3",
          workTime: "2 años",
          studyTime: "3 años",
          description: "Semantic HTML, Flexbox, Grid, animations, responsive design"
        },
        {
          name: "React",
          workTime: "6 meses",
          studyTime: "1 año",
          description: "Hooks, Context API, componentes funcionales"
        },
        {
          name: "TypeScript",
          workTime: "3 meses",
          studyTime: "8 meses",
          description: "Tipado estático, interfaces, generics"
        },
        {
          name: "Tailwind CSS",
          workTime: "4 meses",
          studyTime: "6 meses",
          description: "Utility-first, responsive design, componentes"
        },
        {
          name: "GSAP",
          workTime: "2 meses",
          studyTime: "4 meses",
          description: "Animaciones complejas, ScrollTrigger, timeline"
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
          name: "Git",
          workTime: "3 años",
          studyTime: "3 años",
          description: "Control de versiones, branching strategies, workflows"
        },
        {
          name: "Docker",
          workTime: "8 meses",
          studyTime: "1 año",
          description: "Containerización, Docker Compose, multi-stage builds"
        },
        {
          name: "Jenkins",
          workTime: "6 meses",
          studyTime: "8 meses",
          description: "Pipelines CI/CD, automatización de despliegues"
        },
        {
          name: "Linux",
          workTime: "1 año",
          studyTime: "2 años",
          description: "Administración de servidores, bash scripting, Ubuntu/CentOS"
        },
        {
          name: "AWS",
          workTime: "3 meses",
          studyTime: "6 meses",
          description: "EC2, S3, RDS, Lambda básico, certificación en progreso"
        },
        {
          name: "Nginx",
          workTime: "4 meses",
          studyTime: "8 meses",
          description: "Reverse proxy, load balancing, SSL, configuración"
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
          workTime: "2 años",
          studyTime: "1 año",
          description: "Metodologías ágiles, gestión de proyectos, Jira, Trello"
        },
        {
          name: "REST APIs",
          workTime: "2 años",
          studyTime: "2 años",
          description: "Diseño, documentación, integración, Postman, Swagger"
        },
        {
          name: "Photoshop",
          workTime: "6 meses",
          studyTime: "2 años",
          description: "Edición de imágenes, optimización web, diseño básico"
        },
        {
          name: "Figma",
          workTime: "3 meses",
          studyTime: "8 meses",
          description: "Prototipado, diseño de interfaces, colaboración"
        },
        {
          name: "Jest/Testing",
          workTime: "2 meses",
          studyTime: "6 meses",
          description: "Unit testing, integration testing, TDD básico"
        },
        {
          name: "Webpack",
          workTime: "1 mes",
          studyTime: "4 meses",
          description: "Bundling, optimización de assets, configuración"
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

    // Get current positions and sizes
    const currentRect = currentMainCard.getBoundingClientRect();
    const clickedRect = clickedCard.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Calculate relative positions within the container
    const currentX = currentRect.left - containerRect.left;
    const currentY = currentRect.top - containerRect.top;
    const clickedX = clickedRect.left - containerRect.left;
    const clickedY = clickedRect.top - containerRect.top;

    // Calculate the distance to move
    const deltaX = clickedX - currentX;
    const deltaY = clickedY - currentY;

    // Create timeline for the swap
    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedTab(tabId);
        setIsAnimating(false);
      }
    });

    // Animate both cards simultaneously with position and size swap
    tl.to(currentMainCard, {
      x: `+=${deltaX}`,
      y: `+=${deltaY}`,
      width: clickedRect.width,
      height: clickedRect.height,
      duration: 0.8,
      ease: "power2.inOut"
    })
    .to(clickedCard, {
      x: `+=${-deltaX}`,
      y: `+=${-deltaY}`,
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

  return (
    <section id="habilidades" ref={sectionRef} className="py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Stack Tecnológico</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Especialización técnica por áreas de desarrollo</p>
        </div>

        {/* Container with fixed height for layout */}
        <div className="max-w-6xl mx-auto">
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

                      {/* Technologies Summary - Clean Pills with Time */}
                      <div className="flex-1">
                        <h4 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 text-foreground">Tecnologías:</h4>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill, index) => (
                            <div 
                              key={index} 
                              className="bg-muted/50 backdrop-blur-sm rounded-full px-3 py-1.5 border border-border/50 hover:bg-accent/10 hover:border-accent/30 transition-all duration-300"
                            >
                              <div className="flex items-center space-x-2">
                                <span className="text-xs sm:text-sm font-medium text-foreground">{skill.name}</span>
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
      </div>
    </section>
  );
};

export default Skills;