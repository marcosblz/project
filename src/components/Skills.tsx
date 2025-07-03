import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  id: string;
  title: string;
  gradient: string;
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
      gradient: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #14b8a6 100%)" // AZUL → CYAN → TEAL
    },
    {
      id: 'frontend', 
      title: "FRONT-END",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%)" // PÚRPURA → VIOLETA → LAVANDA
    },
    {
      id: 'devops',
      title: "DEVOPS", 
      gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ea580c 100%)" // AMARILLO → NARANJA → ROJO
    },
    {
      id: 'otros',
      title: "OTROS",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)" // VERDE → ESMERALDA → VERDE OSCURO
    }
  ];

  const handleTabClick = (tabId: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
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

    tl.to(selectedCard, {
      width: 'calc(75% - 8px)',
      height: 'calc(100% - 8px)',
      left: '4px',
      top: '4px',
      duration: 0.8,
      ease: 'power3.inOut'
    });

    otherCards.forEach((card, index) => {
      tl.to(card, {
        width: 'calc(25% - 8px)',
        height: 'calc(33.33% - 8px)',
        left: 'calc(75% + 4px)',
        top: `calc(${index * 33.33}% + 4px)`,
        duration: 0.8,
        ease: 'power3.inOut'
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
        width: 'calc(50% - 8px)',
        height: 'calc(50% - 8px)',
        left: `calc(${col * 50}% + 4px)`,
        top: `calc(${row * 50}% + 4px)`,
        duration: 0.8,
        ease: 'power3.inOut'
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
        width: 'calc(50% - 8px)',
        height: 'calc(50% - 8px)',
        left: `calc(${col * 50}% + 4px)`,
        top: `calc(${row * 50}% + 4px)`,
        transformOrigin: 'center center'
      });
    });

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

        <div className="max-w-6xl mx-auto">
          <div 
            ref={containerRef}
            className="relative w-full"
            style={{ height: '400px' }}
          >
            {skillCategories.map((category) => (
              <div
                key={category.id}
                data-id={category.id}
                className={`skill-card cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group relative ${
                  selectedTab === category.id ? 'ring-4 ring-white/50 z-10' : 'z-0'
                }`}
                onClick={() => handleTabClick(category.id)}
                style={{
                  background: `${category.gradient} !important`,
                  backgroundSize: 'cover !important',
                  backgroundRepeat: 'no-repeat !important',
                  backgroundAttachment: 'local !important'
                }}
              >
                {/* PATRÓN MUY SUTIL - SIN TAPAR EL GRADIENTE */}
                <div 
                  className="absolute inset-0 opacity-5 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                  }}
                ></div>

                {/* CONTENIDO */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-center items-center text-white text-center">
                  <h3 
                    className="text-2xl font-bold tracking-wider"
                    style={{
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      color: 'white !important'
                    }}
                  >
                    {category.title}
                  </h3>
                </div>

                {/* HOVER EFFECT MUY SUTIL */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                  style={{
                    background: 'rgba(255,255,255,0.05)'
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-accent/10 text-accent rounded-full text-lg font-medium">
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