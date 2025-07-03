import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  id: string;
  title: string;
}

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const skillCategories: SkillCategory[] = [
    {
      id: 'backend',
      title: "BACK-END"
    },
    {
      id: 'frontend',
      title: "FRONT-END"
    },
    {
      id: 'devops',
      title: "DEVOPS"
    },
    {
      id: 'otros',
      title: "OTROS"
    }
  ];

  const handleTabClick = (tabId: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (selectedTab === null) {
      // Expandir
      setSelectedTab(tabId);
      animateToExpanded(tabId);
    } else if (selectedTab === tabId) {
      // Contraer
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

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    // Animar tarjeta seleccionada
    tl.to(selectedCard, {
      width: 700,
      height: 450,
      x: 0,
      y: 0,
      duration: 0.4,
      ease: 'power2.out'
    });

    // Animar otras tarjetas
    otherCards.forEach((card, index) => {
      tl.to(card, {
        width: 200,
        height: 140,
        x: 730,
        y: index * 150,
        duration: 0.4,
        ease: 'power2.out'
      }, 0);
    });
  };

  const animateToGrid = () => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.skill-card');

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    cards.forEach((card, index) => {
      const row = Math.floor(index / 2);
      const col = index % 2;
      
      tl.to(card, {
        width: 450,
        height: 280,
        x: col * 480,
        y: row * 310,
        duration: 0.4,
        ease: 'power2.out'
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
        width: 450,
        height: 280,
        x: col * 480,
        y: row * 310,
        transformOrigin: 'center center'
      });
    });

    // Animación de entrada
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

        {/* Container */}
        <div className="max-w-7xl mx-auto flex justify-center">
          <div 
            ref={containerRef}
            className="relative"
            style={{ width: '960px', height: '620px' }}
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
                {/* Background unificado */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 via-accent/60 to-primary/60 backdrop-blur-sm"></div>
                
                {/* Pattern sutil */}
                <div className="absolute inset-0 opacity-10">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px)`,
                      backgroundSize: '40px 40px'
                    }}
                  ></div>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-background/10 backdrop-blur-[1px]"></div>

                {/* Content - SOLO título e imagen */}
                <div className="relative z-10 p-10 h-full flex flex-col text-white">
                  {/* Header con título */}
                  <div className="flex items-center justify-center mb-8">
                    <h3 className="text-3xl font-bold tracking-wider text-white drop-shadow-sm text-center">
                      {category.title}
                    </h3>
                  </div>

                  {/* Área central para imagen */}
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <span className="text-white/80 text-lg font-medium">IMG</span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                
                {/* Glow effect */}
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
      </div>
    </section>
  );
};

export default Skills;