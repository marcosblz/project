import React, { useEffect, useState } from 'react';
import { 
  Server, 
  Monitor, 
  GitBranch, 
  Settings, 
  ChevronRight, 
  Code, 
  Database, 
  Globe, 
  Wrench,
  Zap,
  Star,
  BookOpen,
  Github
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Technology {
  name: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Experto';
  contexts: ('Trabajo' | 'Estudios' | 'Proyectos')[];
  description: string;
  icon?: React.ReactNode;
}

interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  technologies: Technology[];
  highlights: string[];
  tabColor: string;
}

const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('backend');
  const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>({});
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);

  // Tooltips para cada nivel
  const levelTooltips = {
    'Principiante': 'Nociones básicas de la herramienta',
    'Intermedio': 'Usado en proyectos personales o para aportar valor en empresa',
    'Avanzado': 'Dominio sólido con experiencia práctica en entornos profesionales',
    'Experto': 'Conocimiento profundo y capacidad de liderar proyectos complejos'
  };
  const skillCategories: SkillCategory[] = [
    {
      id: 'backend',
      title: 'Backend',
      icon: <Server className="w-4 h-4" />,
      color: 'from-blue-500 to-cyan-500',
      tabColor: 'bg-blue-500',
      highlights: [
        'Consumo e integración de APIs REST',
        'Automatización de procesos',
        'Arquitectura de microservicios',
        'Optimización de rendimiento'
      ],
      technologies: [
        {
          name: 'Groovy',
          level: 'Avanzado',
          contexts: ['Trabajo'],
          description: 'Desarrollo de SaaS empresarial y automatización de procesos',
          icon: <Code className="w-4 h-4" />
        },
        {
          name: 'Python',
          level: 'Avanzado',
          contexts: ['Trabajo', 'Estudios', 'Proyectos'],
          description: 'Django, FastAPI, scripts de automatización e integración con IA',
          icon: <Code className="w-4 h-4" />
        },
        {
          name: 'Java',
          level: 'Intermedio',
          contexts: ['Estudios', 'Proyectos'],
          description: 'Aplicaciones de escritorio y programación multihilo',
          icon: <Code className="w-4 h-4" />
        },
        {
          name: 'MySQL',
          level: 'Intermedio',
          contexts: ['Trabajo', 'Estudios'],
          description: 'Bases de datos relacionales y no relacionales',
          icon: <Database className="w-4 h-4" />
        }
      ]
    },
    {
      id: 'frontend',
      title: 'Frontend',
      icon: <Monitor className="w-4 h-4" />,
      color: 'from-purple-500 to-pink-500',
      tabColor: 'bg-purple-500',
      highlights: [
        'Interfaces responsivas',
        'Capacidad de adaptación',
        'Diseño creativo',
        'Cimientos sólidos'
      ],
      technologies: [
        {
          name: 'JavaScript',
          level: 'Intermedio',
          contexts: ['Trabajo', 'Proyectos'],
          description: 'Desarrollo de scripts',
          icon: <Code className="w-4 h-4" />
        },
        {
          name: 'HTML5 & CSS3',
          level: 'Intermedio',
          contexts: ['Trabajo', 'Proyectos'],
          description: 'Nociones de lo que es HTML y CSS pero falta desarrollo',
          icon: <Globe className="w-4 h-4" />
        },
        {
          name: 'React',
          level: 'Principiante',
          contexts: ['Proyectos'],
          description: 'Desarrollo de proyectos',
          icon: <Code className="w-4 h-4" />
        },
        {
          name: 'TypeScript',
          level: 'Principiante',
          contexts: ['Trabajo', 'Proyectos'],
          description: 'Desarrollo de proyectos y trabajo básico.',
          icon: <Code className="w-4 h-4" />
        },
        {
          name: 'Tailwind CSS',
          level: 'Principiante',
          contexts: ['Trabajo', 'Proyectos'],
          description: 'He usado tailwind para trabajar en componentes web y hacer páginas como este portfolio.',
          icon: <Globe className="w-4 h-4" />
        },
        {
          name: 'GSAP',
          level: 'Principiante',
          contexts: ['Proyectos'],
          description: 'Soy capaz de hacer animaciones básicas.',
          icon: <Zap className="w-4 h-4" />
        }
      ]
    },
    {
      id: 'devops',
      title: 'DevOps',
      icon: <GitBranch className="w-4 h-4" />,
      color: 'from-orange-500 to-red-500',
      tabColor: 'bg-orange-500',
      highlights: [
        'Repositorios',
        'Enfoque ágil',
        'Monitoreo y logging',
        'Cimientos sólidos'
      ],
      technologies: [
        {
          name: 'Git',
          level: 'Avanzado',
          contexts: ['Trabajo', 'Estudios', 'Proyectos'],
          description: 'Control de versiones',
          icon: <GitBranch className="w-4 h-4" />
        },
        {
          name: 'Docker',
          level: 'Intermedio',
          contexts: ['Trabajo', 'Estudios'],
          description: 'Containerización, Docker Compose',
          icon: <Settings className="w-4 h-4" />
        },
        {
          name: 'Jenkins',
          level: 'Intermedio',
          contexts: ['Estudios'],
          description: 'Pipelines CI/CD',
          icon: <Settings className="w-4 h-4" />
        },
        {
          name: 'Linux',
          level: 'Avanzado',
          contexts: ['Trabajo', 'Estudios'],
          description: 'Terminal, conocimiento del SO',
          icon: <Settings className="w-4 h-4" />
        },
        {
          name: 'AWS',
          level: 'Principiante',
          contexts: ['Estudios'],
          description: 'EC2, S3, RDS, ...',
          icon: <Globe className="w-4 h-4" />
        },
        {
          name: 'Nginx',
          level: 'Principiante',
          contexts: ['Estudios'],
          description: 'Servidores web básicos y correo',
          icon: <Settings className="w-4 h-4" />
        },
        {
          name: 'Vagrant',
          level: 'Principiante',
          contexts: ['Estudios'],
          description: 'Creación de entornos de desarrollo reproducibles',
          icon: <Settings className="w-4 h-4" />
        },
        {
          name: 'Kubernetes',
          level: 'Principiante',
          contexts: ['Estudios'],
          description: 'Orquestación de contenedores y despliegue de clusters',
          icon: <Settings className="w-4 h-4" />
        },
        {
          name: 'Ansible',
          level: 'Principiante',
          contexts: ['Estudios'],
          description: 'Automatización de configuración e infraestructura como código',
          icon: <Settings className="w-4 h-4" />
        },
        {
          name: 'Prometheus',
          level: 'Principiante',
          contexts: ['Estudios'],
          description: 'Monitoreo y alertas de servicios',
          icon: <Settings className="w-4 h-4" />
        },
        {
          name: 'Grafana',
          level: 'Principiante',
          contexts: ['Estudios'],
          description: 'Dashboards y visualización de métricas',
          icon: <Settings className="w-4 h-4" />
        }
      ]
    },
    {
      id: 'tools',
      title: 'Otros',
      icon: <Settings className="w-4 h-4" />,
      color: 'from-green-500 to-emerald-500',
      tabColor: 'bg-green-500',
      highlights: [
      ],
      technologies: [
        {
          name: 'Scrum/Kanban',
          level: 'Intermedio',
          contexts: ['Trabajo'],
          description: 'Metodologías ágiles, gestión de proyectos con Jira y Trello',
          icon: <Wrench className="w-4 h-4" />
        },
        {
          name: 'REST APIs',
          level: 'Intermedio',
          contexts: ['Trabajo', 'Estudios'],
          description: 'Diseño, documentación, integración con Postman y Swagger',
          icon: <Globe className="w-4 h-4" />
        },
        {
          name: 'Photoshop',
          level: 'Intermedio',
          contexts: ['Trabajo'],
          description: 'Edición de imágenes, optimización web y diseño básico',
          icon: <Monitor className="w-4 h-4" />
        },
        {
          name: 'Figma',
          level: 'Principiante',
          contexts: ['Estudios'],
          description: 'Prototipado, diseño de interfaces y colaboración en equipo',
          icon: <Monitor className="w-4 h-4" />
        },
        {
          name: 'Testing',
          level: 'Principiante',
          contexts: ['Estudios'],
          description: 'Unit testing, integration testing',
          icon: <Code className="w-4 h-4" />
        }
      ]
    }
  ];

  useEffect(() => {
    gsap.fromTo('.skills-container',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.notebook-tab',
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.notebook-container',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Experto': return 'bg-purple-500 text-white';
      case 'Avanzado': return 'bg-green-500 text-white';
      case 'Intermedio': return 'bg-blue-500 text-white';
      case 'Principiante': return 'bg-orange-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getContextColor = (context: string) => {
    switch (context) {
      case 'Trabajo': return 'bg-accent/10 text-accent border-accent/20';
      case 'Estudios': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'Proyectos': return 'bg-green-500/10 text-green-600 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const toggleDetails = (techName: string) => {
    setShowDetails(prev => ({
      ...prev,
      [techName]: !prev[techName]
    }));
  };

  const selectedCategoryData = skillCategories.find(cat => cat.id === selectedCategory);

  return (
    <section id="habilidades" className="skills-section py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">Stack Tecnológico</h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground">Mis habilidades técnicas organizadas por especialización</p>
        </div>

        <div className="skills-container">
          {/* Selected Category Details */}
          {selectedCategoryData && (
            <div className="relative">
              {/* Tabs positioned above content */}
              <div className="relative z-20">
                <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide">
                  {skillCategories.map((category, index) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`notebook-tab relative group transition-all duration-300 w-full sm:w-auto ${
                        selectedCategory === category.id
                          ? 'z-30'
                          : 'hover:-translate-y-0.5 z-20'
                      }`}
                    >
                      {/* Tab Background */}
                      <div className={`
                        relative px-4 py-2 md:px-6 md:py-3 transition-all duration-300 whitespace-nowrap
                        ${selectedCategory === category.id 
                          ? `${category.tabColor} text-white shadow-lg rounded-t-lg border-t border-l border-r border-transparent` 
                          : 'bg-muted/80 text-muted-foreground border-t border-l border-r border-border hover:bg-muted hover:text-foreground rounded-t-lg'
                        }
                      `}>
                        {/* Tab Content */}
                        <div className="flex items-center justify-center space-x-2">
                          {React.cloneElement(category.icon as React.ReactElement, {
                            className: "w-4 h-4"
                          })}
                          <span className="text-sm font-medium">{category.title}</span>
                        </div>

                        {/* Active Tab Connector */}
                        {selectedCategory === category.id && (
                          <div className="absolute -bottom-px left-0 right-0 h-px bg-background z-10"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="bg-background/80 backdrop-blur-sm border border-border rounded-2xl rounded-t-none p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl relative z-10 -mt-px">
              
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8 md:mb-10">
                  <div className={`w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-xl bg-gradient-to-br ${selectedCategoryData.color} flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 md:mr-8 shadow-lg mx-auto sm:mx-0`}>
                    {React.cloneElement(selectedCategoryData.icon as React.ReactElement, {
                      className: "w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-white"
                    })}
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">{selectedCategoryData.title}</h3>
                    <p className="text-base sm:text-lg text-muted-foreground mb-4 px-2 sm:px-0">{selectedCategoryData.subtitle}</p>
                    
                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
                      {selectedCategoryData.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 sm:px-4 py-2 bg-accent/10 text-accent rounded-full text-sm sm:text-base font-medium"
                        >
                          <Star className="w-3 sm:w-4 h-3 sm:h-4 mr-2" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Technologies Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  {selectedCategoryData.technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="bg-card/50 border border-border rounded-xl p-4 sm:p-6 md:p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                          <div className="w-10 sm:w-12 h-10 sm:h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                            {tech.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-base sm:text-lg md:text-xl font-bold text-foreground truncate">{tech.name}</h4>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mt-2 gap-2 sm:gap-0">
                              {/* Level Badge with Tooltip */}
                              <div className="relative">
                                <span 
                                  className={`px-3 py-1 sm:py-1.5 rounded-full text-sm font-medium cursor-help ${getLevelColor(tech.level)}`}
                                  onMouseEnter={() => setHoveredLevel(`${tech.name}-level`)}
                                  onMouseLeave={() => setHoveredLevel(null)}
                                >
                                  {tech.level}
                                </span>
                                
                                {/* Tooltip */}
                                {hoveredLevel === `${tech.name}-level` && (
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 sm:px-3 py-1 sm:py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-50 max-w-xs">
                                    {levelTooltips[tech.level]}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                  </div>
                                )}
                              </div>
                              
                              {/* Context Badges */}
                              <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                                {tech.contexts.map((context, contextIndex) => (
                                  <span 
                                    key={contextIndex}
                                    className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border ${getContextColor(context)}`}
                                  >
                                    {context}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleDetails(tech.name)}
                          className="p-2 sm:p-3 hover:bg-muted rounded-lg transition-colors duration-200 flex-shrink-0"
                        >
                          <ChevronRight className={`w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground transition-transform duration-200 ${
                            showDetails[tech.name] ? 'rotate-90' : ''
                          }`} />
                        </button>
                      </div>
                      
                      {showDetails[tech.name] && (
                        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border">
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {tech.description}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills;