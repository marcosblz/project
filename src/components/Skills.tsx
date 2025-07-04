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
  BookOpen
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Technology {
  name: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Experto';
  context: 'Trabajo' | 'Estudios' | 'Ambos';
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
          context: 'Trabajo',
          description: 'Desarrollo de SaaS empresarial y automatización de procesos',
          icon: <Code className="w-4 h-4" />
        },
        {
          name: 'Python',
          level: 'Avanzado',
          context: 'Ambos',
          description: 'Django, FastAPI, scripts de automatización e integración con IA',
          icon: <Code className="w-4 h-4" />
        },
        {
          name: 'Java',
          level: 'Intermedio',
          context: 'Estudios',
          description: 'Spring Boot, aplicaciones empresariales y programación multihilo',
          icon: <Code className="w-4 h-4" />
        },
        {
          name: 'Node.js',
          level: 'Intermedio',
          context: 'Estudios',
          description: 'Express.js, APIs REST y desarrollo de microservicios',
          icon: <Code className="w-4 h-4" />
        },
        {
          name: 'PostgreSQL',
          level: 'Avanzado',
          context: 'Trabajo',
          description: 'Diseño de esquemas, optimización de consultas y administración',
          icon: <Database className="w-4 h-4" />
        },
        {
          name: 'MySQL',
          level: 'Intermedio',
          context: 'Ambos',
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
          level: 'Avanzado',
          context: 'Ambos',
          description: 'ES6+, DOM manipulation, async/await y programación funcional',
          icon: <Code className="w-4 h-4" />
        },
        {
          name: 'HTML5 & CSS3',
          level: 'Avanzado',
          context: 'Ambos',
          description: 'Semantic HTML, Flexbox, Grid, animations y responsive design',
          icon: <Globe className="w-4 h-4" />
        },
        {
          name: 'React',
          level: 'Intermedio',
          context: 'Estudios',
          description: 'Hooks, Context API, componentes funcionales y estado global',
          icon: <Code className="w-4 h-4" />
        },
        {
          name: 'TypeScript',
          level: 'Intermedio',
          context: 'Estudios',
          description: 'Tipado estático, interfaces, generics y desarrollo escalable',
          icon: <Code className="w-4 h-4" />
        },
        {
          name: 'Tailwind CSS',
          level: 'Intermedio',
          context: 'Estudios',
          description: 'Utility-first CSS, responsive design y componentes personalizados',
          icon: <Globe className="w-4 h-4" />
        },
        {
          name: 'GSAP',
          level: 'Intermedio',
          context: 'Estudios',
          description: 'Animaciones complejas, ScrollTrigger y timeline avanzado',
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
          context: 'Ambos',
          description: 'Control de versiones, branching strategies y workflows colaborativos',
          icon: <GitBranch className="w-4 h-4" />
        },
        {
          name: 'Docker',
          level: 'Intermedio',
          context: 'Ambos',
          description: 'Containerización, Docker Compose y multi-stage builds',
          icon: <Settings className="w-4 h-4" />
        },
        {
          name: 'Jenkins',
          level: 'Intermedio',
          context: 'Estudios',
          description: 'Pipelines CI/CD, automatización de despliegues y testing',
          icon: <Settings className="w-4 h-4" />
        },
        {
          name: 'Linux',
          level: 'Intermedio',
          context: 'Ambos',
          description: 'Administración de servidores, bash scripting y Ubuntu/CentOS',
          icon: <Settings className="w-4 h-4" />
        },
        {
          name: 'AWS',
          level: 'Principiante',
          context: 'Estudios',
          description: 'EC2, S3, RDS, Lambda básico - Certificación en progreso',
          icon: <Globe className="w-4 h-4" />
        },
        {
          name: 'Nginx',
          level: 'Intermedio',
          context: 'Estudios',
          description: 'Reverse proxy, load balancing, SSL y configuración avanzada',
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
          context: 'Trabajo',
          description: 'Metodologías ágiles, gestión de proyectos con Jira y Trello',
          icon: <Wrench className="w-4 h-4" />
        },
        {
          name: 'REST APIs',
          level: 'Avanzado',
          context: 'Ambos',
          description: 'Diseño, documentación, integración con Postman y Swagger',
          icon: <Globe className="w-4 h-4" />
        },
        {
          name: 'Photoshop',
          level: 'Intermedio',
          context: 'Trabajo',
          description: 'Edición de imágenes, optimización web y diseño básico',
          icon: <Monitor className="w-4 h-4" />
        },
        {
          name: 'Figma',
          level: 'Principiante',
          context: 'Estudios',
          description: 'Prototipado, diseño de interfaces y colaboración en equipo',
          icon: <Monitor className="w-4 h-4" />
        },
        {
          name: 'Jest/Testing',
          level: 'Principiante',
          context: 'Estudios',
          description: 'Unit testing, integration testing y TDD básico',
          icon: <Code className="w-4 h-4" />
        },
        {
          name: 'Webpack',
          level: 'Principiante',
          context: 'Estudios',
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
      case 'Ambos': return 'bg-green-500/10 text-green-600 border-green-500/20';
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
              <div className="relative -mb-4 z-20">
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
                  {skillCategories.map((category, index) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`notebook-tab relative group transition-all duration-300 ${
                        selectedCategory === category.id
                          ? 'transform -translate-y-1 z-30'
                          : 'hover:-translate-y-0.5 z-20'
                      }`}
                    >
                      {/* Tab Background */}
                      <div className={`
                        relative px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-t-lg border-t-2 border-l-2 border-r-2 transition-all duration-300
                        ${selectedCategory === category.id 
                          ? `${category.tabColor} text-white shadow-lg border-transparent` 
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

                        {/* Tab Number */}
                        <div className={`
                          absolute -top-1 -right-1 w-4 sm:w-5 h-4 sm:h-5 rounded-full text-xs flex items-center justify-center font-bold
                          ${selectedCategory === category.id 
                            ? 'bg-white text-gray-800' 
                            : 'bg-accent text-white'
                          }
                        `}>
                          {index + 1}
                        </div>

                        {/* Active Tab Connector */}
                        {selectedCategory === category.id && (
                          <div className="absolute -bottom-0.5 left-0 right-0 h-1 bg-background rounded-b-sm"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl relative z-10">
              
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
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(tech.level)}`}>
                                {tech.level}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getContextColor(tech.context)}`}>
                                {tech.context}
                              </span>
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

                {/* Legend */}
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Leyenda:</h4>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-muted-foreground">Experto</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-muted-foreground">Avanzado</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-muted-foreground">Intermedio</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-muted-foreground">Principiante</span>
                    </div>
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