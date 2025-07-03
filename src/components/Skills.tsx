import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  id: string;
  title: string;
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
      skills: ["Java", "Python", "Groovy", "Node.js", "Spring Boot", "Django", "REST APIs", "GraphQL"]
    },
    {
      id: 'frontend',
      title: "FRONT-END",
      skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "GSAP", "Responsive Design"]
    },
    {
      id: 'devops',
      title: "DEVOPS",
      skills: ["Docker", "Kubernetes", "Jenkins", "Git", "CI/CD", "AWS", "Linux", "Monitoring"]
    },
    {
      id: 'otros',
      title: "OTROS",
      skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Webpack", "Vite", "Testing", "Agile/Scrum"]
    }
  ];

  const handleTabClick = (tabId: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Usar un timeout más corto para reducir el lag
    setTimeout(() => {
      if (selectedTab === null) {
        setSelectedTab(tabId);
        animateToExpanded(tabId);
      } else if (selectedTab === tabId) {
        setSelectedTab(null);
        animateToGrid();
      } else {
        setSelectedTab(tabId);
        animateToExpanded(tabId);
      }
    }, 50);
  };

  const animateToExpanded = (selectedId: string) => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.skill-card');
    const selectedCard = container.querySelector(`[data-id="${selectedId}"]`);
    const otherCards = Array.from(cards).filter(card => card.getAttribute('data-id') !== selectedId);

    // Animación más rápida y suave
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    // Animar tarjeta seleccionada (más grande)
    tl.to(selectedCard, {
      width: 600,
      height: 400,
      x: 0,
      y: 0,
      duration: 0.5, // Más rápido
      ease: 'power2.inOut'
    });

    // Animar otras tarjetas a la derecha
    otherCards.forEach((card, index) => {
      tl.to(card, {
        width: 180,
        height: 125,
        x: 630, // 600px + 30px gap
        y: index * 135,
        duration: 0.5, // Más rápido
        ease: 'power2.inOut'
      }, 0);
    });
  };

  const animateToGrid = () => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.skill-card');

    // Animación más rápida
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    cards.forEach((card, index) => {
      const row = Math.floor(index / 2);
      const col = index % 2;
      
      tl.to(card, {
        width: 380, // Más grande
        height: 220, // Más grande
        x: col * 410, // 380px + 30px gap
        y: row * 250, // 220px + 30px gap
        duration: 0.5, // Más rápido
        ease: 'power2.inOut'
      }, 0);
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.skill-card');
    cards.forEach((card, index) => {
      const row = Math.floor(index / 2);
      const col = index % 2;
      
      gsap.set(card, {
        position: 'absolute',
        width: 380, // Más grande
        height: 220, // Más grande
        x: col * 410, // 380px + 30px gap
        y: row * 250, // 220px + 30px gap
        transformOrigin: 'center center'
      });
    });

    // Animación de entrada más suave
    gsap.fromTo('.skill-card',
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section id="habilidades" ref={sectionRef} className="py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Stack Tecnológico</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Especialización técnica por áreas</p>
        </div>

        {/* Container más grande */}
        <div className="max-w-6xl mx-auto flex justify-center">
          <div 
            ref={containerRef}
            className="relative"
            style={{ width: '820px', height: '500px' }} // Mucho más grande
          >
            {skillCategories.map((category) => (
              <div
                key={category.id}
                data-id={category.id}
                className={`skill-card cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-200 group relative border border-border/20 ${
                  selectedTab === category.id ? 'ring-4 ring-accent/30 z-10' : 'z-0'
                }`}
                onClick={() => handleTabClick(category.id)}
              >
                {/* Background unificado - Diseño DevOps/Otros */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 via-accent/60 to-primary/60 backdrop-blur-sm"></div>
                
                {/* Pattern sutil unificado */}
                <div className="absolute inset-0 opacity-10">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px)`,
                      backgroundSize: '40px 40px'
                    }}
                  ></div>
                </div>

                {/* Overlay para mejor legibilidad */}
                <div className="absolute inset-0 bg-background/10 backdrop-blur-[1px]"></div>

                {/* Content unificado */}
                <div className="relative z-10 p-8 h-full flex flex-col text-white">
                  {/* Header con título */}
                  <div className="flex items-center justify-center mb-6">
                    <h3 className="text-2xl font-bold tracking-wider text-white drop-shadow-sm text-center">
                      {category.title}
                    </h3>
                  </div>

                  {/* Área central para imagen */}
                  <div className="flex-1 flex items-center justify-center mb-6">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <span className="text-white/80 text-base font-medium">IMG</span>
                    </div>
                  </div>

                  {/* Skills preview - Solo en modo expandido */}
                  {selectedTab === category.id && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {category.skills.slice(0, 8).map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-white/25 backdrop-blur-sm text-white rounded-lg text-sm font-medium border border-white/20 shadow-sm"
                          >
                            {skill}
                          </span>
                        ))}
                        {category.skills.length > 8 && (
                          <span className="px-3 py-1.5 bg-white/35 backdrop-blur-sm text-white rounded-lg text-sm border border-white/20 shadow-sm">
                            +{category.skills.length - 8}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Hover Effect sutil */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                
                {/* Glow effect en hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/20 via-transparent to-accent/20 blur-sm"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Category Info */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-accent/10 text-accent rounded-full text-sm sm:text-base lg:text-lg font-medium border border-accent/20">
            {selectedTab 
              ? `Categoría seleccionada: ${skillCategories.find(cat => cat.id === selectedTab)?.title}`
              : 'Haz click en una categoría para expandir'
            }
          </div>
        </div>

        {/* Skills Detail - Solo cuando hay selección */}
        {selectedTab && (
          <div className="mt-6 sm:mt-8 max-w-5xl mx-auto">
            <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                {skillCategories.find(cat => cat.id === selectedTab)?.title} - Tecnologías
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {skillCategories.find(cat => cat.id === selectedTab)?.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center p-2 sm:p-3 bg-accent/10 text-accent rounded-lg hover:bg-accent hover:text-white transition-colors duration-300 text-sm sm:text-base"
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