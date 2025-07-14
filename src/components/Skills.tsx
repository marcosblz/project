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
      subtitle: 'Desarrollo del lado del servidor',
      icon: <Server className="w-4 h-4" />,
      color: 'from-blue-500 to-cyan-500',
      tabColor: 'bg-blue-500',
      highlights: [
        'APIs REST y GraphQL',
        'Bases de datos relacionales y NoSQL',
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
          description: 'Spring Boot, aplicaciones empresariales y programación multihilo',
          icon: <Code className="w-4 h-4" />
        },
        {
          name: 'Node.js',
          level: 'Intermedio',
          contexts: ['Estudios'],
          description: 'Express.js, APIs REST y desarrollo de microservicios',
          icon: <Code className="w-4 h-4" />
        },
        {
          name: 'PostgreSQL',
          level: 'Avanzado',
          contexts: ['Trabajo'],
          description: 'Diseño de esquemas, optimización de consultas y administración',
          icon: <Database className="w-4 h-4" />
        },
        {
          name: 'MySQL',
          level: 'Intermedio',
          contexts: ['Trabajo', 'Estudios'],
          description: 'Bases de datos relacionales y stored procedures',
          icon: <Database className="w-4 h-4" />
        }
      ]
    },
    {
      id: 'frontend',
      title: 'Frontend',
      subtitle: 'Interfaces de usuario modernas',
      icon: <Monitor className="w-4 h-4" />,
      color: 'from-purple-500 to-pink-500',
      tabColor: 'bg-purple-500',
      highlights: [
        'Interfaces responsivas y accesibles',
        'Componentes reutilizables',
        'Animaciones y micro-interacciones',
        'Optimización de rendimiento'
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
      subtitle: 'Automatización y despliegue',
      icon: <GitBranch className="w-4 h-4" />,
      color: 'from-orange-500 to-red-500',
      tabColor: 'bg-orange-500',
      highlights: [
        'Pipelines CI/CD automatizados',
        'Containerización y orquestación',
        'Monitoreo y logging',
        'Infraestructura como código'
      ],
      technologies: [
        {
          name: 'Git',
          level: 'Avanzado',
          contexts: ['Trabajo', 'Estudios', 'Proyectos'],
          description: 'Control de versiones, branching strategies y workflows colaborativos',
          icon: <GitBranch className="w-4 h-4" />
        },
        {
          name: 'Docker',
          level: 'Intermedio',
          contexts: ['Trabajo', 'Estudios'],
          description: 'Containerización, Docker Compose y multi-stage builds',
          icon: <Settings className="w-4 h-4" />
        },
        {
          name: 'Jenkins',
          level: 'Intermedio',
          contexts: ['Estudios'],
          description: 'Pipelines CI/CD, automatización de despliegues y testing',
          icon: <Settings className="w-4 h-4" />
        },
        {
          name: 'Linux',
          level: 'Intermedio',
          contexts: ['Trabajo', 'Estudios'],
          description: 'Administración de servidores, bash scripting y Ubuntu/CentOS',
          icon: <Settings className="w-4 h-4" />
        },
        {
          name: 'AWS',
          level: 'Principiante',
          contexts: ['Estudios'],
          description: 'EC2, S3, RDS, Lambda básico - Certificación en progreso',
          icon: <Globe className="w-4 h-4" />
        },
        {
          name: 'Nginx',
          level: 'Intermedio',
          contexts: ['Estudios'],
          description: 'Reverse proxy, load balancing, SSL y configuración avanzada',
          icon: <Settings className="w-4 h-4" />
        },
        {
          name: 'GitHub',
          level: 'Avanzado',
          contexts: ['Trabajo', 'Estudios', 'Proyectos'],
          description: 'Repositorios remotos, pull requests y acciones CI/CD',
          icon: <Github className="w-4 h-4" />
        },
        {
          name: 'Maven',
          level: 'Intermedio',
          contexts: ['Trabajo'],
          description: 'Gestión de dependencias y lifecycle de proyectos Java',
          icon: <Settings className="w-4 h-4" />
        },
        {
          name: 'Gradle',
          level: 'Intermedio',
          contexts: ['Trabajo'],
          description: 'Automatización de builds y pipelines de Java/Groovy',
          icon: <Settings className="w-4 h-4" />
        },
        {
          name: 'Vagrant',
          level: 'Intermedio',
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
      title: 'Tools',
      subtitle: 'Herramientas y metodologías',
      icon: <Settings className="w-4 h-4" />,
      color: 'from-green-500 to-emerald-500',
      tabColor: 'bg-green-500',
      highlights: [
        'Metodologías ágiles',
        'Testing y calidad de código',
        'Herramientas de diseño',
        'Análisis y documentación'
      ],
      technologies: [
        {
          name: 'Scrum/Kanban',
          level: 'Avanzado',
          contexts: ['Trabajo'],
          description: 'Metodologías ágiles, gestión de proyectos con Jira y Trello',
          icon: <Wrench className="w-4 h-4" />
        },
        {
          name: 'REST APIs',
          level: 'Avanzado',
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
          name: 'Jest/Testing',
          level: 'Principiante',
          contexts: ['Estudios'],
          description: 'Unit testing, integration testing y TDD básico',
          icon: <Code className="w-4 h-4" />
        },
        {
          name: 'Webpack',
          level: 'Principiante',
          contexts: ['Estudios'],
          description: 'Bundling, optimización de assets y configuración avanzada',
          icon: <Settings className="w-4 h-4" />
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Stack Tecnológico</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Mis habilidades técnicas organizadas por especialización</p>
        </div>

        <div className="skills-container">
          {/* Selected Category Details */}
          {selectedCategoryData && (
            <div className="relative">
              {/* Tabs positioned above content */}
              <div className="relative -mb-px z-20">
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
                  {skillCategories.map((category, index) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`notebook-tab relative group transition-all duration-300 ${
                        selectedCategory === category.id
                          ? 'z-30'
                          : 'hover:-translate-y-0.5 z-20'
                      }`}
                    >
                      {/* Tab Background */}
                      <div className={`
                        relative px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-t-lg border-t border-l border-r transition-all duration-300
                        ${selectedCategory === category.id 
                          ? `${category.tabColor} text-white shadow-lg border-transparent border-b-0` 
                          : 'bg-muted/80 text-muted-foreground border-border hover:bg-muted hover:text-foreground'
                        }
                      `}>
                        {/* Tab Content */}
                        <div className="flex items-center space-x-2">
                          {React.cloneElement(category.icon as React.ReactElement, {
                            className: "w-3 sm:w-4 h-3 sm:h-4"
                          })}
                          <span className="text-xs sm:text-sm lg:text-base font-medium">{category.title}</span>
                        </div>

                        {/* Active Tab Connector */}
                        {selectedCategory === category.id && (
                          <div className="absolute -bottom-px left-0 right-0 h-px bg-background"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="bg-background/80 backdrop-blur-sm border border-border rounded-2xl rounded-tl-none p-6 sm:p-8 lg:p-10 shadow-xl relative z-10">
              
                {/* Category Header */}
                <div className="flex items-center mb-6 sm:mb-8">
                  <div className={`w-16 sm:w-20 h-16 sm:h-20 rounded-xl bg-gradient-to-br ${selectedCategoryData.color} flex items-center justify-center mr-4 sm:mr-6 shadow-lg`}>
                    {React.cloneElement(selectedCategoryData.icon as React.ReactElement, {
                      className: "w-8 sm:w-10 h-8 sm:h-10 text-white"
                    })}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">{selectedCategoryData.title} Development</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-3">{selectedCategoryData.subtitle}</p>
                    
                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {selectedCategoryData.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 sm:px-3 py-1 bg-accent/10 text-accent rounded-full text-xs sm:text-sm font-medium"
                        >
                          <Star className="w-3 h-3 mr-1" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Technologies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {selectedCategoryData.technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="bg-card/50 border border-border rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            {tech.icon}
                          </div>
                          <div>
                            <h4 className="text-base sm:text-lg font-bold text-foreground">{tech.name}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              {/* Level Badge with Tooltip */}
                              <div className="relative">
                                <span 
                                  className={`px-2 py-1 rounded-full text-xs font-medium cursor-help ${getLevelColor(tech.level)}`}
                                  onMouseEnter={() => setHoveredLevel(`${tech.name}-level`)}
                                  onMouseLeave={() => setHoveredLevel(null)}
                                >
                                  {tech.level}
                                </span>
                                
                                {/* Tooltip */}
                                {hoveredLevel === `${tech.name}-level` && (
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-50">
                                    {levelTooltips[tech.level]}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                  </div>
                                )}
                              </div>
                              
                              {/* Context Badges */}
                              <div className="flex flex-wrap gap-1">
                                {tech.contexts.map((context, contextIndex) => (
                                  <span 
                                    key={contextIndex}
                                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getContextColor(context)}`}
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
                          className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
                        >
                          <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                            showDetails[tech.name] ? 'rotate-90' : ''
                          }`} />
                        </button>
                      </div>
                      
                      {showDetails[tech.name] && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <p className="text-sm text-muted-foreground leading-relaxed">
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