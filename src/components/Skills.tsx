import React, { useEffect, useRef, useState } from 'react';
import { Server, Database, Monitor, GitBranch } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  id: string;
  title: string;
  gradient: string;
  icon: React.ReactNode;
  skills: string[];
}

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const skillCategories: SkillCategory[] = [
    {
      id: 'backend',
      title: "BACK-END",
      gradient: "from-blue-600 via-cyan-500 to-teal-400",
      icon: <Server className="w-8 h-8" />,
      skills: ["Java", "Python", "Groovy", "Node.js", "Spring Boot", "Django", "REST APIs", "GraphQL"]
    },
    {
      id: 'frontend',
      title: "FRONT-END",
      gradient: "from-purple-600 via-blue-500 to-indigo-400",
      icon: <Monitor className="w-8 h-8" />,
      skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "GSAP", "Responsive Design"]
    },
    {
      id: 'devops',
      title: "DEVOPS",
      gradient: "from-orange-500 via-pink-500 to-purple-600",
      icon: <GitBranch className="w-8 h-8" />,
      skills: ["Docker", "Kubernetes", "Jenkins", "Git", "CI/CD", "AWS", "Linux", "Monitoring"]
    },
    {
      id: 'otros',
      title: "OTROS",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      icon: <Database className="w-8 h-8" />,
      skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Webpack", "Vite", "Testing", "Agile/Scrum"]
    }
  ];

  const handleTabClick = (tabId: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (selectedTab === null) {
      // Transformar de 2x2 a layout expandido
      setSelectedTab(tabId);
      animateToExpanded(tabId);
    } else if (selectedTab === tabId) {
      // Volver al 2x2
      setSelectedTab(null);
      animateToGrid();
    } else {
      // Cambiar selección
      setSelectedTab(tabId);
      animateToExpanded(tabId);
    }
  };

  const animateToExpanded = (selectedId: string) => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.skill-card');
    const selectedCard = container.querySelector(`[data-id="${selectedId}"]`);
    const otherCards = Array.from(cards).filter(card => card.getAttribute('data-id') !== selectedId);

    // Timeline para la animación
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    // Animar tarjeta seleccionada a la izquierda (más ancha)
    tl.to(selectedCard, {
      width: 400,
      height: 300,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'power3.inOut'
    });

    // Animar otras tarjetas a la derecha (más pequeñas, apiladas)
    otherCards.forEach((card, index) => {
      tl.to(card, {
        width: 120,
        height: 90,
        x: 420, // 400px + 20px gap
        y: index * 100, // Apilar verticalmente
        duration: 0.8,
        ease: 'power3.inOut'
      }, 0); // Empezar al mismo tiempo
    });
  };

  const animateToGrid = () => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.skill-card');

    // Timeline para volver al grid
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    // Resetear todas las tarjetas al grid 2x2
    cards.forEach((card, index) => {
      const row = Math.floor(index / 2);
      const col = index % 2;
      
      tl.to(card, {
        width: 250, // Más ancho para formato rectangular
        height: 140, // Más bajo para formato rectangular
        x: col * 270, // 250px + 20px gap
        y: row * 160, // 140px + 20px gap
        duration: 0.8,
        ease: 'power3.inOut'
      }, 0);
    });
  };

  useEffect(() => {
    // Configurar posiciones iniciales del grid 2x2 rectangular
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.skill-card');
    cards.forEach((card, index) => {
      const row = Math.floor(index / 2);
      const col = index % 2;
      
      gsap.set(card, {
        position: 'absolute',
        width: 250, // Ancho rectangular
        height: 140, // Alto rectangular
        x: col * 270, // 250px + 20px gap
        y: row * 160, // 140px + 20px gap
        transformOrigin: 'center center'
      });
    });

    // Animación de entrada
    gsap.fromTo('.skill-card',
      { opacity: 0, scale: 0.8 },
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
  }, []);

  return (
    <section id="habilidades" ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Stack Tecnológico</h2>
          <p className="text-xl text-muted-foreground">Especialización técnica por áreas</p>
        </div>

        {/* Container con dimensiones fijas para grid rectangular */}
        <div className="max-w-4xl mx-auto flex justify-center">
          <div 
            ref={containerRef}
            className="relative"
            style={{ width: '540px', height: '320px' }} // Ajustado para formato rectangular
          >
            {skillCategories.map((category) => (
              <div
                key={category.id}
                data-id={category.id}
                className={`skill-card cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group relative ${
                  selectedTab === category.id ? 'ring-4 ring-white/50 z-10' : 'z-0'
                }`}
                onClick={() => handleTabClick(category.id)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`}></div>
                
                {/* Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
                      backgroundSize: '30px 30px'
                    }}
                  ></div>
                </div>

                {/* Content - Diseño rectangular */}
                <div className="relative z-10 p-4 h-full flex flex-col text-white">
                  {/* Header con título e icono */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold tracking-wider">
                      {category.title}
                    </h3>
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                  </div>

                  {/* Imagen/Placeholder en el centro */}
                  <div className="flex-1 flex items-center justify-center mb-3">
                    <div className="w-16 h-16 bg-white/20 rounded-xl border border-white/30 flex items-center justify-center">
                      <span className="text-white/60 text-sm font-medium">IMG</span>
                    </div>
                  </div>

                  {/* Skills preview - Solo en modo expandido */}
                  {selectedTab === category.id && (
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1">
                        {category.skills.slice(0, 6).map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-white/20 text-white rounded text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                        {category.skills.length > 6 && (
                          <span className="px-2 py-1 bg-white/30 text-white rounded text-xs">
                            +{category.skills.length - 6}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Category Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-accent/10 text-accent rounded-full text-lg font-medium">
            {selectedTab 
              ? `Categoría seleccionada: ${skillCategories.find(cat => cat.id === selectedTab)?.title}`
              : 'Haz click en una categoría para expandir'
            }
          </div>
        </div>

        {/* Skills Detail - Solo cuando hay selección */}
        {selectedTab && (
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {skillCategories.find(cat => cat.id === selectedTab)?.title} - Tecnologías
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {skillCategories.find(cat => cat.id === selectedTab)?.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-accent/10 text-accent rounded-lg hover:bg-accent hover:text-white transition-colors duration-300"
                  >
                    <span className="font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;