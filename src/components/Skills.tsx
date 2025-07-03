import React, { useEffect, useRef, useState } from 'react';
import { Code, Zap, Target, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TechNode {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  color: string;
  size: number;
  connections: string[];
}

interface SoftSkill {
  name: string;
  icon: React.ReactNode;
  description: string;
}

const Skills: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Definir el stack tecnológico como nodos conectados
  const techNodes: TechNode[] = [
    // Backend Core
    { id: 'groovy', name: 'Groovy', category: 'backend', x: 200, y: 150, color: '#4A90E2', size: 45, connections: ['java', 'rest', 'docker'] },
    { id: 'python', name: 'Python', category: 'backend', x: 350, y: 120, color: '#3776AB', size: 50, connections: ['django', 'rest', 'mysql'] },
    { id: 'java', name: 'Java', category: 'backend', x: 150, y: 250, color: '#ED8B00', size: 48, connections: ['groovy', 'mysql', 'maven'] },
    { id: 'django', name: 'Django', category: 'backend', x: 450, y: 180, color: '#092E20', size: 42, connections: ['python', 'mysql', 'rest'] },
    
    // Frontend Support
    { id: 'javascript', name: 'JavaScript', category: 'frontend', x: 300, y: 300, color: '#F7DF1E', size: 40, connections: ['html', 'css', 'rest'] },
    { id: 'html', name: 'HTML', category: 'frontend', x: 250, y: 380, color: '#E34F26', size: 35, connections: ['css', 'javascript'] },
    { id: 'css', name: 'CSS', category: 'frontend', x: 350, y: 380, color: '#1572B6', size: 35, connections: ['html', 'javascript'] },
    
    // Databases
    { id: 'mysql', name: 'MySQL', category: 'database', x: 500, y: 280, color: '#4479A1', size: 44, connections: ['python', 'java', 'django'] },
    { id: 'postgresql', name: 'PostgreSQL', category: 'database', x: 550, y: 350, color: '#336791', size: 40, connections: ['mysql'] },
    
    // DevOps
    { id: 'docker', name: 'Docker', category: 'devops', x: 100, y: 180, color: '#2496ED', size: 42, connections: ['kubernetes', 'jenkins', 'groovy'] },
    { id: 'kubernetes', name: 'Kubernetes', category: 'devops', x: 50, y: 280, color: '#326CE5', size: 38, connections: ['docker', 'jenkins'] },
    { id: 'jenkins', name: 'Jenkins', category: 'devops', x: 120, y: 350, color: '#D33833', size: 36, connections: ['docker', 'kubernetes', 'git'] },
    
    // Tools
    { id: 'git', name: 'Git', category: 'tools', x: 200, y: 420, color: '#F05032', size: 38, connections: ['jenkins', 'maven'] },
    { id: 'maven', name: 'Maven', category: 'tools', x: 100, y: 450, color: '#C71A36', size: 34, connections: ['java', 'git'] },
    { id: 'rest', name: 'REST APIs', category: 'backend', x: 400, y: 250, color: '#61DAFB', size: 40, connections: ['groovy', 'python', 'django', 'javascript'] },
  ];

  const categories = {
    backend: { name: 'Backend', color: '#10B981' },
    frontend: { name: 'Frontend', color: '#F59E0B' },
    database: { name: 'Databases', color: '#3B82F6' },
    devops: { name: 'DevOps', color: '#8B5CF6' },
    tools: { name: 'Tools', color: '#EF4444' }
  };

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
    // Animar la entrada del SVG
    gsap.fromTo('.tech-svg',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.skills-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animar nodos uno por uno
    gsap.fromTo('.tech-node',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        delay: 0.5,
        scrollTrigger: {
          trigger: '.tech-svg',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animar conexiones
    gsap.fromTo('.connection-line',
      { strokeDasharray: '5,5', strokeDashoffset: 10 },
      {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.out',
        delay: 1,
        scrollTrigger: {
          trigger: '.tech-svg',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const handleNodeHover = (nodeId: string | null) => {
    setHoveredNode(nodeId);
    
    if (nodeId) {
      const node = techNodes.find(n => n.id === nodeId);
      if (node) {
        // Highlight connected nodes
        gsap.to(`.node-${nodeId}`, { scale: 1.2, duration: 0.3 });
        
        node.connections.forEach(connId => {
          gsap.to(`.node-${connId}`, { scale: 1.1, opacity: 1, duration: 0.3 });
          gsap.to(`.connection-${nodeId}-${connId}, .connection-${connId}-${nodeId}`, { 
            stroke: node.color, 
            strokeWidth: 3, 
            opacity: 0.8,
            duration: 0.3 
          });
        });

        // Dim other nodes
        techNodes.forEach(n => {
          if (n.id !== nodeId && !node.connections.includes(n.id)) {
            gsap.to(`.node-${n.id}`, { opacity: 0.3, duration: 0.3 });
          }
        });
      }
    } else {
      // Reset all nodes
      gsap.to('.tech-node', { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to('.connection-line', { stroke: '#64748b', strokeWidth: 1, opacity: 0.3, duration: 0.3 });
    }
  };

  const filterByCategory = (category: string | null) => {
    setSelectedCategory(category);
    
    if (category) {
      techNodes.forEach(node => {
        if (node.category === category) {
          gsap.to(`.node-${node.id}`, { opacity: 1, scale: 1.1, duration: 0.3 });
        } else {
          gsap.to(`.node-${node.id}`, { opacity: 0.2, scale: 0.9, duration: 0.3 });
        }
      });
    } else {
      gsap.to('.tech-node', { opacity: 1, scale: 1, duration: 0.3 });
    }
  };

  return (
    <section id="habilidades" className="skills-section py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Stack Tecnológico</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Tecnologías interconectadas en mi ecosistema de desarrollo</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => filterByCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === null 
                ? 'bg-accent text-white shadow-lg' 
                : 'bg-muted text-muted-foreground hover:bg-accent/10'
            }`}
          >
            Todas
          </button>
          {Object.entries(categories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => filterByCategory(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === key 
                  ? 'text-white shadow-lg' 
                  : 'bg-muted text-muted-foreground hover:bg-accent/10'
              }`}
              style={{ 
                backgroundColor: selectedCategory === key ? cat.color : undefined 
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Interactive Tech Stack SVG */}
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 sm:p-8 lg:p-12 shadow-lg mb-12">
          <svg
            ref={svgRef}
            className="tech-svg w-full h-96 sm:h-[500px] lg:h-[600px]"
            viewBox="0 0 600 500"
            style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
          >
            {/* Definir gradientes */}
            <defs>
              {techNodes.map(node => (
                <radialGradient key={`gradient-${node.id}`} id={`gradient-${node.id}`}>
                  <stop offset="0%" stopColor={node.color} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={node.color} stopOpacity="0.4" />
                </radialGradient>
              ))}
            </defs>

            {/* Conexiones */}
            {techNodes.map(node => 
              node.connections.map(connId => {
                const connectedNode = techNodes.find(n => n.id === connId);
                if (!connectedNode) return null;
                
                return (
                  <line
                    key={`${node.id}-${connId}`}
                    className={`connection-line connection-${node.id}-${connId}`}
                    x1={node.x}
                    y1={node.y}
                    x2={connectedNode.x}
                    y2={connectedNode.y}
                    stroke="#64748b"
                    strokeWidth="1"
                    opacity="0.3"
                    strokeDasharray="2,2"
                  />
                );
              })
            )}

            {/* Nodos tecnológicos */}
            {techNodes.map(node => (
              <g key={node.id} className={`tech-node node-${node.id}`}>
                {/* Círculo de fondo con gradiente */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size}
                  fill={`url(#gradient-${node.id})`}
                  stroke={node.color}
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => handleNodeHover(node.id)}
                  onMouseLeave={() => handleNodeHover(null)}
                />
                
                {/* Texto de la tecnología */}
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-white text-xs sm:text-sm font-bold pointer-events-none select-none"
                  style={{ 
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))',
                    fontSize: node.size > 40 ? '12px' : '10px'
                  }}
                >
                  {node.name}
                </text>

                {/* Efecto de brillo en hover */}
                {hoveredNode === node.id && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.size + 10}
                    fill="none"
                    stroke={node.color}
                    strokeWidth="2"
                    opacity="0.6"
                    className="animate-pulse"
                  />
                )}
              </g>
            ))}

            {/* Información del nodo hovereado */}
            {hoveredNode && (
              <g className="node-info">
                <rect
                  x="20"
                  y="20"
                  width="200"
                  height="60"
                  rx="8"
                  fill="rgba(0,0,0,0.8)"
                  stroke="rgba(255,255,255,0.2)"
                />
                <text x="30" y="40" className="fill-white text-sm font-bold">
                  {techNodes.find(n => n.id === hoveredNode)?.name}
                </text>
                <text x="30" y="60" className="fill-gray-300 text-xs">
                  Categoría: {categories[techNodes.find(n => n.id === hoveredNode)?.category as keyof typeof categories]?.name}
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Competencias Profesionales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {softSkills.map((skill, index) => (
            <div
              key={index}
              className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:text-white transition-all duration-300">
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

        {/* Enfoque de Desarrollo */}
        <div className="bg-gradient-to-r from-accent/10 via-secondary/10 to-accent/10 rounded-2xl p-6 sm:p-8 lg:p-12 text-center">
          <div className="flex items-center justify-center mb-6">
            <Code className="w-8 h-8 text-accent mr-3" />
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
              Mi Enfoque de Desarrollo
            </h3>
          </div>
          
          <p className="text-base sm:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            Desarrollo backend robusto con enfoque en <strong>automatización de procesos</strong>, 
            <strong> APIs escalables</strong> y <strong>soluciones empresariales</strong>. 
            Mi metodología combina análisis profundo del problema, implementación eficiente 
            y optimización continua para maximizar el impacto en productividad.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="flex items-center justify-center bg-white/10 rounded-lg p-4">
              <ArrowRight className="w-5 h-5 text-accent mr-2" />
              <span className="text-sm font-medium">Análisis → Código</span>
            </div>
            <div className="flex items-center justify-center bg-white/10 rounded-lg p-4">
              <ArrowRight className="w-5 h-5 text-accent mr-2" />
              <span className="text-sm font-medium">Eficiencia → Escalabilidad</span>
            </div>
            <div className="flex items-center justify-center bg-white/10 rounded-lg p-4">
              <ArrowRight className="w-5 h-5 text-accent mr-2" />
              <span className="text-sm font-medium">Calidad → Impacto</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <span className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium">
              30-50% mejora en productividad
            </span>
            <span className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium">
              Automatización de procesos
            </span>
            <span className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium">
              Soluciones empresariales
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;