import React, { useEffect, useRef, useState } from 'react';
import { Code, Zap, Target, ArrowRight, Server, Database, Cloud, Terminal, Cpu, Monitor } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Technology {
  name: string;
  category: string;
  color: string;
  icon: string;
  description: string;
  level: number;
}

interface SoftSkill {
  name: string;
  icon: React.ReactNode;
  description: string;
}

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // Stack tecnológico organizado por categorías
  const technologies: Technology[] = [
    // Backend
    { name: 'Groovy', category: 'backend', color: '#4A90E2', level: 90, description: 'Lenguaje dinámico para JVM', icon: '🚀' },
    { name: 'Python', category: 'backend', color: '#3776AB', level: 85, description: 'Desarrollo backend versátil', icon: '🐍' },
    { name: 'Java', category: 'backend', color: '#ED8B00', level: 80, description: 'Plataforma empresarial', icon: '☕' },
    { name: 'Django', category: 'backend', color: '#092E20', level: 75, description: 'Framework web Python', icon: '🎯' },
    { name: 'REST APIs', category: 'backend', color: '#61DAFB', level: 88, description: 'Servicios web RESTful', icon: '🔗' },
    
    // Frontend
    { name: 'JavaScript', category: 'frontend', color: '#F7DF1E', level: 70, description: 'Lenguaje web dinámico', icon: '⚡' },
    { name: 'HTML', category: 'frontend', color: '#E34F26', level: 85, description: 'Estructura web', icon: '🏗️' },
    { name: 'CSS', category: 'frontend', color: '#1572B6', level: 80, description: 'Estilos y diseño', icon: '🎨' },
    
    // Databases
    { name: 'MySQL', category: 'database', color: '#4479A1', level: 82, description: 'Base de datos relacional', icon: '🗄️' },
    { name: 'PostgreSQL', category: 'database', color: '#336791', level: 78, description: 'BD avanzada', icon: '🐘' },
    
    // DevOps
    { name: 'Docker', category: 'devops', color: '#2496ED', level: 75, description: 'Containerización', icon: '🐳' },
    { name: 'Kubernetes', category: 'devops', color: '#326CE5', level: 65, description: 'Orquestación', icon: '⚙️' },
    { name: 'Jenkins', category: 'devops', color: '#D33833', level: 70, description: 'CI/CD', icon: '🔄' },
    
    // Tools
    { name: 'Git', category: 'tools', color: '#F05032', level: 90, description: 'Control de versiones', icon: '📝' },
    { name: 'Maven', category: 'tools', color: '#C71A36', level: 75, description: 'Gestión dependencias', icon: '📦' }
  ];

  const categories = {
    all: { name: 'Todas', color: '#6366F1', icon: <Code className="w-4 h-4" /> },
    backend: { name: 'Backend', color: '#10B981', icon: <Server className="w-4 h-4" /> },
    frontend: { name: 'Frontend', color: '#F59E0B', icon: <Monitor className="w-4 h-4" /> },
    database: { name: 'Databases', color: '#3B82F6', icon: <Database className="w-4 h-4" /> },
    devops: { name: 'DevOps', color: '#8B5CF6', icon: <Cloud className="w-4 h-4" /> },
    tools: { name: 'Tools', color: '#EF4444', icon: <Terminal className="w-4 h-4" /> }
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

  // Filtrar tecnologías por categoría
  const filteredTechnologies = selectedCategory === 'all' 
    ? technologies 
    : technologies.filter(tech => tech.category === selectedCategory);

  useEffect(() => {
    // Animación de entrada del contenedor
    gsap.fromTo('.skills-container',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animación de las barras de tecnología
    gsap.fromTo('.tech-bar',
      { width: 0, opacity: 0 },
      {
        width: '100%',
        opacity: 1,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.tech-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animación de las tarjetas de tecnología
    gsap.fromTo('.tech-card',
      { y: 30, opacity: 0, rotationY: 15 },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.tech-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Canvas para efectos de partículas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d')!;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        color: string;
        opacity: number;
      }> = [];

      // Crear partículas
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
          opacity: Math.random() * 0.5 + 0.2
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
          // Actualizar posición
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Rebotar en los bordes
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          // Dibujar partícula
          ctx.save();
          ctx.globalAlpha = particle.opacity;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        requestAnimationFrame(animate);
      };

      animate();
    }
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    
    // Animación de transición
    gsap.to('.tech-card', {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      stagger: 0.02,
      ease: 'power2.in',
      onComplete: () => {
        gsap.fromTo('.tech-card',
          { scale: 0.8, opacity: 0, y: 20 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.03,
            ease: 'back.out(1.7)'
          }
        );
      }
    });
  };

  return (
    <section id="habilidades" className="skills-section py-8 sm:py-12 lg:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 skills-container">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">
            Stack Tecnológico
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
            Experiencia visual interactiva de mis habilidades técnicas
          </p>
        </div>

        {/* Canvas de fondo para partículas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{ zIndex: 0 }}
        />

        {/* Filtros de categoría */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 relative z-10">
          {Object.entries(categories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-500 hover:scale-110 transform-gpu ${
                selectedCategory === key 
                  ? 'text-white shadow-2xl scale-110' 
                  : 'bg-card/80 backdrop-blur-sm text-muted-foreground hover:bg-accent/10 border border-border/50'
              }`}
              style={{ 
                backgroundColor: selectedCategory === key ? cat.color : undefined,
                boxShadow: selectedCategory === key ? `0 10px 40px ${cat.color}40, 0 0 20px ${cat.color}30` : undefined
              }}
            >
              {cat.icon}
              <span className="ml-2">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Grid de tecnologías con diseño revolucionario */}
        <div className="tech-grid relative z-10 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTechnologies.map((tech, index) => (
              <div
                key={tech.name}
                className="tech-card group relative bg-gradient-to-br from-card/90 via-card/80 to-card/70 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:rotate-1 transform-gpu overflow-hidden"
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
                style={{
                  boxShadow: hoveredTech === tech.name 
                    ? `0 20px 60px ${tech.color}30, 0 0 30px ${tech.color}20` 
                    : undefined
                }}
              >
                {/* Efecto de brillo de fondo */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${tech.color}10 0%, transparent 50%, ${tech.color}05 100%)`
                  }}
                />

                {/* Contenido de la tarjeta */}
                <div className="relative z-10">
                  {/* Header con icono y nombre */}
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform duration-500"
                      style={{ 
                        backgroundColor: `${tech.color}20`,
                        boxShadow: `0 4px 20px ${tech.color}30`
                      }}
                    >
                      {tech.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                        {tech.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {categories[tech.category as keyof typeof categories]?.name}
                      </p>
                    </div>
                  </div>

                  {/* Descripción */}
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {tech.description}
                  </p>

                  {/* Barra de progreso animada */}
                  <div className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-foreground">Experiencia</span>
                      <span className="text-xs font-bold" style={{ color: tech.color }}>
                        {tech.level}%
                      </span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                      <div
                        className="tech-bar h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                        style={{ 
                          width: `${tech.level}%`,
                          background: `linear-gradient(90deg, ${tech.color} 0%, ${tech.color}CC 100%)`,
                          boxShadow: `0 0 10px ${tech.color}50`
                        }}
                      >
                        {/* Efecto de brillo en la barra */}
                        <div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 group-hover:animate-pulse"
                          style={{ 
                            animation: hoveredTech === tech.name ? 'shimmer 2s infinite' : 'none'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Indicador de categoría */}
                  <div className="absolute top-4 right-4">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ 
                        backgroundColor: tech.color,
                        boxShadow: `0 0 10px ${tech.color}60`
                      }}
                    />
                  </div>
                </div>

                {/* Efecto de borde brillante en hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `linear-gradient(45deg, ${tech.color}30, transparent, ${tech.color}30)`,
                    padding: '2px'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Competencias Profesionales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
          {softSkills.map((skill, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl border border-border/50 rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 group relative overflow-hidden transform-gpu"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-accent/80 group-hover:text-white transition-all duration-700 group-hover:scale-110 group-hover:rotate-6">
                  {skill.icon}
                </div>
                <h4 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {skill.name}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Enfoque de Desarrollo */}
        <div className="relative bg-gradient-to-br from-accent/10 via-secondary/10 to-accent/10 rounded-3xl p-6 sm:p-8 lg:p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-secondary/5"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mr-4 hover:scale-110 transition-transform duration-500">
                <Cpu className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                Mi Enfoque de Desarrollo
              </h3>
            </div>
            
            <p className="text-base sm:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
              Desarrollo backend robusto con enfoque en <strong className="text-accent">automatización de procesos</strong>, 
              <strong className="text-accent"> APIs escalables</strong> y <strong className="text-accent">soluciones empresariales</strong>. 
              Mi metodología combina análisis profundo del problema, implementación eficiente 
              y optimización continua para maximizar el impacto en productividad.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
              <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-500 hover:scale-105 group">
                <ArrowRight className="w-5 h-5 text-accent mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                <span className="text-sm font-medium">Análisis → Código</span>
              </div>
              <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-500 hover:scale-105 group">
                <ArrowRight className="w-5 h-5 text-accent mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                <span className="text-sm font-medium">Eficiencia → Escalabilidad</span>
              </div>
              <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-500 hover:scale-105 group">
                <ArrowRight className="w-5 h-5 text-accent mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                <span className="text-sm font-medium">Calidad → Impacto</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-6 py-3 bg-accent/20 text-accent rounded-full text-sm font-medium backdrop-blur-sm border border-accent/30 hover:bg-accent/30 hover:scale-105 transition-all duration-500 cursor-default">
                30-50% mejora en productividad
              </span>
              <span className="px-6 py-3 bg-accent/20 text-accent rounded-full text-sm font-medium backdrop-blur-sm border border-accent/30 hover:bg-accent/30 hover:scale-105 transition-all duration-500 cursor-default">
                Automatización de procesos
              </span>
              <span className="px-6 py-3 bg-accent/20 text-accent rounded-full text-sm font-medium backdrop-blur-sm border border-accent/30 hover:bg-accent/30 hover:scale-105 transition-all duration-500 cursor-default">
                Soluciones empresariales
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </section>
  );
};

export default Skills;