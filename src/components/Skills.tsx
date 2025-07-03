import React, { useEffect, useRef, useState } from 'react';
import { Server, Database, Code, Cloud, Terminal, Zap, Target, Cpu } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Technology {
  name: string;
  category: string;
  experience: string;
  description: string;
  icon: React.ReactNode;
}

interface SoftSkill {
  name: string;
  icon: React.ReactNode;
  description: string;
}

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDrawingComplete, setIsDrawingComplete] = useState(false);
  const [drawingProgress, setDrawingProgress] = useState(0);
  const [isInDrawingZone, setIsInDrawingZone] = useState(false);

  const technologies: Technology[] = [
    {
      name: 'Groovy',
      category: 'Backend Development',
      experience: '2+ años',
      description: 'Desarrollo de SaaS y automatización de procesos',
      icon: <Server className="w-5 h-5" />
    },
    {
      name: 'Python',
      category: 'Backend Development',
      experience: '3+ años',
      description: 'Django, APIs REST, automatización con IA',
      icon: <Code className="w-5 h-5" />
    },
    {
      name: 'Java',
      category: 'Backend Development',
      experience: '2+ años',
      description: 'Aplicaciones multiplataforma, arquitectura robusta',
      icon: <Cpu className="w-5 h-5" />
    },
    {
      name: 'JavaScript',
      category: 'Frontend Development',
      experience: '2+ años',
      description: 'Interfaces dinámicas, integración frontend-backend',
      icon: <Code className="w-5 h-5" />
    },
    {
      name: 'MySQL',
      category: 'Database Management',
      experience: '3+ años',
      description: 'Diseño de esquemas, optimización de consultas',
      icon: <Database className="w-5 h-5" />
    },
    {
      name: 'PostgreSQL',
      category: 'Database Management',
      experience: '2+ años',
      description: 'Bases de datos avanzadas, procedimientos almacenados',
      icon: <Database className="w-5 h-5" />
    },
    {
      name: 'Docker',
      category: 'DevOps & Infrastructure',
      experience: '1+ año',
      description: 'Containerización, despliegues automatizados',
      icon: <Cloud className="w-5 h-5" />
    },
    {
      name: 'Kubernetes',
      category: 'DevOps & Infrastructure',
      experience: '1+ año',
      description: 'Orquestación de contenedores, escalabilidad',
      icon: <Cloud className="w-5 h-5" />
    },
    {
      name: 'Jenkins',
      category: 'DevOps & Infrastructure',
      experience: '1+ año',
      description: 'CI/CD, pipelines automatizados',
      icon: <Terminal className="w-5 h-5" />
    },
    {
      name: 'Git',
      category: 'Development Tools',
      experience: '3+ años',
      description: 'Control de versiones, colaboración en equipo',
      icon: <Terminal className="w-5 h-5" />
    }
  ];

  const softSkills: SoftSkill[] = [
    {
      name: "Resolución de Problemas",
      icon: <Zap className="w-5 h-5" />,
      description: "Análisis lógico y soluciones eficientes para desafíos técnicos complejos"
    },
    {
      name: "Adaptabilidad Técnica",
      icon: <Code className="w-5 h-5" />,
      description: "Rápida adaptación a nuevas tecnologías y metodologías de trabajo"
    },
    {
      name: "Enfoque en Calidad",
      icon: <Target className="w-5 h-5" />,
      description: "Desarrollo con estándares altos y mejora continua del código"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const table = tableRef.current;
    const svg = svgRef.current;
    
    if (!section || !table || !svg) return;

    // Configurar dimensiones del SVG
    const updateSVGDimensions = () => {
      const rect = table.getBoundingClientRect();
      svg.style.width = `${rect.width}px`;
      svg.style.height = `${rect.height}px`;
      svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
    };

    updateSVGDimensions();

    // Crear paths para la tabla
    const createTablePaths = () => {
      const rect = table.getBoundingClientRect();
      const paths: string[] = [];
      const padding = 0;
      const headerHeight = 60;
      const rowHeight = 80;
      const cols = 4;
      const colWidth = rect.width / cols;

      // Líneas horizontales (header + filas)
      for (let i = 0; i <= technologies.length + 1; i++) {
        let y;
        if (i === 0) {
          y = padding;
        } else if (i === 1) {
          y = padding + headerHeight;
        } else {
          y = padding + headerHeight + (i - 1) * rowHeight;
        }
        paths.push(`M ${padding} ${y} L ${rect.width - padding} ${y}`);
      }

      // Líneas verticales
      for (let i = 0; i <= cols; i++) {
        const x = padding + i * colWidth;
        const endY = padding + headerHeight + technologies.length * rowHeight;
        paths.push(`M ${x} ${padding} L ${x} ${endY}`);
      }

      return paths;
    };

    const paths = createTablePaths();
    
    // Limpiar SVG
    svg.innerHTML = '';

    // Crear elementos path
    const pathElements = paths.map((pathData) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('stroke', 'hsl(var(--accent))');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('fill', 'none');
      
      // Calcular longitud del path
      const length = path.getTotalLength();
      path.setAttribute('stroke-dasharray', `${length}`);
      path.setAttribute('stroke-dashoffset', `${length}`);
      path.style.opacity = '0.8';
      
      svg.appendChild(path);
      return { element: path, length };
    });

    // Ocultar contenido inicialmente
    gsap.set('.table-content', { opacity: 0 });

    // ScrollTrigger para detectar cuando estamos en la zona de dibujo
    ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => setIsInDrawingZone(true),
      onLeave: () => setIsInDrawingZone(false),
      onEnterBack: () => setIsInDrawingZone(true),
      onLeaveBack: () => setIsInDrawingZone(false),
    });

    // ScrollTrigger principal para el dibujo
    const drawingTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      end: 'bottom 40%',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        setDrawingProgress(progress);

        // Dibujar paths progresivamente
        pathElements.forEach((pathObj, index) => {
          const pathProgress = Math.max(0, Math.min(1, (progress * pathElements.length - index) / 1));
          const offset = pathObj.length * (1 - pathProgress);
          pathObj.element.setAttribute('stroke-dashoffset', `${offset}`);
        });

        // Mostrar contenido cuando el dibujo esté casi completo
        if (progress > 0.8) {
          gsap.to('.table-content', {
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
          });
        }

        // Marcar como completo
        if (progress >= 0.95) {
          setIsDrawingComplete(true);
        } else {
          setIsDrawingComplete(false);
        }
      }
    });

    // Manejar resize
    const handleResize = () => {
      updateSVGDimensions();
      drawingTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Bloquear scroll cuando estamos dibujando
  useEffect(() => {
    if (isInDrawingZone && !isDrawingComplete && drawingProgress > 0.1) {
      // Prevenir scroll con wheel
      const preventScroll = (e: WheelEvent) => {
        e.preventDefault();
      };

      // Prevenir scroll con teclado
      const preventKeyScroll = (e: KeyboardEvent) => {
        const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
        if (keys.includes(e.key)) {
          e.preventDefault();
        }
      };

      document.addEventListener('wheel', preventScroll, { passive: false });
      document.addEventListener('keydown', preventKeyScroll);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('wheel', preventScroll);
        document.removeEventListener('keydown', preventKeyScroll);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isInDrawingZone, isDrawingComplete, drawingProgress]);

  return (
    <section id="habilidades" ref={sectionRef} className="skills-section py-8 sm:py-12 lg:py-20 relative min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">
            Stack Tecnológico
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
            Experiencia técnica y competencias profesionales
          </p>
        </div>

        {/* Indicador de progreso */}
        {isInDrawingZone && drawingProgress > 0.1 && drawingProgress < 0.95 && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-background/95 backdrop-blur-sm border border-accent/30 rounded-xl p-8 text-center shadow-2xl">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="hsl(var(--muted))"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  stroke="hsl(var(--accent))"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="219.91"
                  strokeDashoffset={219.91 * (1 - drawingProgress)}
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-accent">
                  {Math.round(drawingProgress * 100)}%
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Dibujando Tabla</h3>
            <p className="text-sm text-muted-foreground">Sigue haciendo scroll para completar el dibujo</p>
          </div>
        )}

        {/* Tabla de tecnologías */}
        <div className="relative mb-12">
          <div
            ref={tableRef}
            className="relative bg-background/80 backdrop-blur-sm border-2 border-border rounded-xl overflow-hidden shadow-xl"
          >
            {/* SVG para dibujar la tabla */}
            <svg
              ref={svgRef}
              className="absolute inset-0 pointer-events-none z-10"
            />

            {/* Contenido de la tabla */}
            <div className="relative z-20">
              {/* Header */}
              <div className="table-content grid grid-cols-4 gap-4 p-5 bg-accent/5">
                <div className="font-bold text-foreground text-sm lg:text-base">Tecnología</div>
                <div className="font-bold text-foreground text-sm lg:text-base">Categoría</div>
                <div className="font-bold text-foreground text-sm lg:text-base">Experiencia</div>
                <div className="font-bold text-foreground text-sm lg:text-base">Descripción</div>
              </div>

              {/* Filas de tecnologías */}
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="table-content grid grid-cols-4 gap-4 p-5 hover:bg-accent/5 transition-colors duration-300 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                      {tech.icon}
                    </div>
                    <span className="font-semibold text-foreground text-sm lg:text-base">{tech.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-muted-foreground text-sm lg:text-base">{tech.category}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs lg:text-sm font-medium">
                      {tech.experience}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                      {tech.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Competencias Profesionales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {softSkills.map((skill, index) => (
            <div
              key={index}
              className="table-content bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:text-white transition-all duration-300 group-hover:scale-110">
                {skill.icon}
              </div>
              <h4 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                {skill.name}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>

        {/* Enfoque Profesional */}
        <div className="table-content bg-gradient-to-br from-accent/10 via-secondary/10 to-accent/10 rounded-2xl p-6 sm:p-8 lg:p-12 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mr-4">
              <Cpu className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
              Enfoque Backend Especializado
            </h3>
          </div>
          
          <p className="text-base sm:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            Mi experiencia se centra en el desarrollo backend robusto, desde la creación de APIs escalables 
            hasta la implementación de sistemas de automatización que mejoran la productividad empresarial 
            entre un 30% y 50%. Combino análisis técnico profundo con implementación eficiente.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-6 py-3 bg-accent/20 text-accent rounded-full text-sm font-medium border border-accent/30">
              Automatización de Procesos
            </span>
            <span className="px-6 py-3 bg-accent/20 text-accent rounded-full text-sm font-medium border border-accent/30">
              APIs Escalables
            </span>
            <span className="px-6 py-3 bg-accent/20 text-accent rounded-full text-sm font-medium border border-accent/30">
              Soluciones Empresariales
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;