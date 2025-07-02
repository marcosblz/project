import React, { useEffect, useRef } from 'react';
import { Server, Database, Code, Cloud, Shield, Zap, GitBranch, Terminal, Cpu, Network } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TechStack {
  category: string;
  icon: React.ReactNode;
  color: string;
  technologies: string[];
  description: string;
}

interface SoftSkill {
  name: string;
  icon: React.ReactNode;
  description: string;
}

const Skills: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Backend-focused tech stack based on experience and studies
  const techStacks: TechStack[] = [
    {
      category: "Backend Development",
      icon: <Server className="w-6 h-6" />,
      color: "#10B981",
      technologies: ["Groovy", "Python", "Django", "Node.js", "Express.js", "REST APIs"],
      description: "Desarrollo de APIs robustas y servicios backend escalables"
    },
    {
      category: "Databases",
      icon: <Database className="w-6 h-6" />,
      color: "#3B82F6",
      technologies: ["PostgreSQL", "MySQL", "MongoDB", "Database Design", "Query Optimization"],
      description: "Diseño y optimización de bases de datos relacionales y NoSQL"
    },
    {
      category: "DevOps & Infrastructure",
      icon: <Cloud className="w-6 h-6" />,
      color: "#8B5CF6",
      technologies: ["Docker", "Kubernetes", "Jenkins", "CI/CD", "Linux", "Bash"],
      description: "Automatización de despliegues y gestión de infraestructura"
    },
    {
      category: "Programming Languages",
      icon: <Code className="w-6 h-6" />,
      color: "#F59E0B",
      technologies: ["Java", "Python", "JavaScript", "TypeScript", "Groovy", "SQL"],
      description: "Dominio de múltiples lenguajes para diferentes contextos"
    },
    {
      category: "Development Tools",
      icon: <Terminal className="w-6 h-6" />,
      color: "#EF4444",
      technologies: ["Git", "GitHub", "IntelliJ IDEA", "VS Code", "Postman", "Maven"],
      description: "Herramientas esenciales para desarrollo y colaboración"
    },
    {
      category: "Architecture & Design",
      icon: <Network className="w-6 h-6" />,
      color: "#06B6D4",
      technologies: ["Microservices", "Design Patterns", "SOLID Principles", "Clean Architecture"],
      description: "Diseño de sistemas escalables y mantenibles"
    }
  ];

  const softSkills: SoftSkill[] = [
    {
      name: "Resolución de Problemas",
      icon: <Zap className="w-5 h-5" />,
      description: "Análisis lógico y soluciones eficientes para desafíos técnicos complejos"
    },
    {
      name: "Adaptabilidad",
      icon: <GitBranch className="w-5 h-5" />,
      description: "Rápida adaptación a nuevas tecnologías y metodologías de trabajo"
    },
    {
      name: "Trabajo en Equipo",
      icon: <Shield className="w-5 h-5" />,
      description: "Colaboración efectiva en equipos multidisciplinarios y ágiles"
    },
    {
      name: "Mejora Continua",
      icon: <Cpu className="w-5 h-5" />,
      description: "Enfoque constante en optimización y aprendizaje de nuevas tecnologías"
    }
  ];

  useEffect(() => {
    // Animate tech stack cards
    gsap.fromTo('.tech-card',
      { y: 30, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.tech-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate SVG paths
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll('path');
      paths.forEach((path, index) => {
        const length = (path as SVGPathElement).getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length
        });
        
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          delay: index * 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.skills-visualization',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }

    // Animate soft skills
    gsap.fromTo('.soft-skill-item',
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.soft-skills-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section id="habilidades" className="skills-section py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Stack Tecnológico</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Herramientas y tecnologías que domino como desarrollador backend</p>
        </div>

        {/* Tech Stack Grid */}
        <div className="tech-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 lg:mb-20">
          {techStacks.map((stack, index) => (
            <div
              key={index}
              className="tech-card group bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-accent/30"
            >
              <div className="flex items-center mb-4">
                <div 
                  className="p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${stack.color}20`, color: stack.color }}
                >
                  {stack.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                  {stack.category}
                </h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {stack.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {stack.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium hover:bg-accent hover:text-white transition-all duration-300 cursor-default"
                    style={{ 
                      borderLeft: `3px solid ${stack.color}`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skills Visualization */}
        <div className="skills-visualization mb-12 lg:mb-20">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-8 text-center">
            Arquitectura de Desarrollo
          </h3>
          
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 sm:p-8 lg:p-12 overflow-hidden">
            <svg
              ref={svgRef}
              viewBox="0 0 800 400"
              className="w-full h-auto max-h-96"
              style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
            >
              {/* Backend Core */}
              <circle cx="400" cy="200" r="60" fill="none" stroke="#10B981" strokeWidth="3" opacity="0.8" />
              <text x="400" y="205" textAnchor="middle" className="fill-foreground text-sm font-bold">Backend Core</text>
              
              {/* Database Layer */}
              <circle cx="200" cy="150" r="40" fill="none" stroke="#3B82F6" strokeWidth="2" opacity="0.7" />
              <text x="200" y="155" textAnchor="middle" className="fill-foreground text-xs">Database</text>
              
              {/* API Layer */}
              <circle cx="600" cy="150" r="40" fill="none" stroke="#F59E0B" strokeWidth="2" opacity="0.7" />
              <text x="600" y="155" textAnchor="middle" className="fill-foreground text-xs">APIs</text>
              
              {/* DevOps */}
              <circle cx="300" cy="300" r="35" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.7" />
              <text x="300" y="305" textAnchor="middle" className="fill-foreground text-xs">DevOps</text>
              
              {/* Architecture */}
              <circle cx="500" cy="300" r="35" fill="none" stroke="#06B6D4" strokeWidth="2" opacity="0.7" />
              <text x="500" y="305" textAnchor="middle" className="fill-foreground text-xs">Architecture</text>
              
              {/* Connections */}
              <path d="M 240 150 L 360 180" stroke="#10B981" strokeWidth="2" fill="none" opacity="0.6" />
              <path d="M 560 150 L 440 180" stroke="#10B981" strokeWidth="2" fill="none" opacity="0.6" />
              <path d="M 335 285 L 375 230" stroke="#10B981" strokeWidth="2" fill="none" opacity="0.6" />
              <path d="M 465 285 L 425 230" stroke="#10B981" strokeWidth="2" fill="none" opacity="0.6" />
              
              {/* Data Flow Arrows */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" opacity="0.8" />
                </marker>
              </defs>
              
              <path d="M 240 170 Q 320 220 360 200" stroke="#10B981" strokeWidth="1.5" fill="none" opacity="0.5" markerEnd="url(#arrowhead)" />
              <path d="M 440 200 Q 520 220 560 170" stroke="#10B981" strokeWidth="1.5" fill="none" opacity="0.5" markerEnd="url(#arrowhead)" />
            </svg>
          </div>
        </div>

        {/* Soft Skills */}
        <div className="soft-skills-section">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-8 text-center">
            Competencias Profesionales
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {softSkills.map((skill, index) => (
              <div
                key={index}
                className="soft-skill-item bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  {skill.icon}
                </div>
                <h4 className="text-base sm:text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {skill.name}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Focus */}
        <div className="mt-12 lg:mt-20 bg-gradient-to-r from-accent/10 via-secondary/10 to-accent/10 rounded-2xl p-6 sm:p-8 lg:p-12 text-center">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Enfoque Backend Especializado
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Mi experiencia se centra en el desarrollo backend robusto, desde la creación de APIs escalables 
            hasta la implementación de arquitecturas de microservicios. Combino conocimientos sólidos en 
            bases de datos, DevOps y patrones de diseño para crear soluciones que impulsen el crecimiento empresarial.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <span className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium">
              3+ años de experiencia
            </span>
            <span className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium">
              Formación DevOps
            </span>
            <span className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium">
              Desarrollo Multiplataforma
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;