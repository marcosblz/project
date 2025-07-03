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
      icon: <Server className="w-8 h-8" />
    },
    {
      id: 'frontend',
      title: "FRONT-END",
      gradient: "from-purple-600 via-blue-500 to-indigo-400",
      icon: <Monitor className="w-8 h-8" />
    },
    {
      id: 'devops',
      title: "DEVOPS",
      gradient: "from-orange-500 via-pink-500 to-purple-600",
      icon: <GitBranch className="w-8 h-8" />
    },
    {
      id: 'otros',
      title: "OTROS",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      icon: <Database className="w-8 h-8" />
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

    // Animar tarjeta seleccionada a la izquierda (75% ancho)
    tl.to(selectedCard, {
      width: 'calc(75% - 8px)', // Restar el gap
      height: '400px',
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'power3.inOut'
    });

    // Animar otras tarjetas a la derecha (25% ancho, apiladas)
    otherCards.forEach((card, index) => {
      tl.to(card, {
        width: 'calc(25% - 8px)', // Restar el gap
        height: 'calc(33.333% - 8px)', // Dividir altura en 3 partes con gaps
        x: 'calc(300% + 16px)', // Mover a la derecha considerando gaps
        y: `calc(${index * 133.333}% + ${index * 16}px)`, // Apilar verticalmente con gaps
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
        width: 'calc(50% - 8px)', // Restar la mitad del gap
        height: 'calc(50% - 8px)', // Restar la mitad del gap
        x: `calc(${col * 100}% + ${col * 16}px)`, // Posición con gap
        y: `calc(${row * 100}% + ${row * 16}px)`, // Posición con gap
        duration: 0.8,
        ease: 'power3.inOut'
      }, 0);
    });
  };

  useEffect(() => {
    // Configurar posiciones iniciales del grid 2x2
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.skill-card');
    cards.forEach((card, index) => {
      const row = Math.floor(index / 2);
      const col = index % 2;
      
      gsap.set(card, {
        position: 'absolute',
        width: 'calc(50% - 8px)', // Restar la mitad del gap (16px total / 2)
        height: 'calc(50% - 8px)', // Restar la mitad del gap
        x: `calc(${col * 100}% + ${col * 16}px)`, // Posición con gap
        y: `calc(${row * 100}% + ${row * 16}px)`, // Posición con gap
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

        {/* Container con aspect ratio cuadrado y padding para gaps */}
        <div className="max-w-4xl mx-auto">
          <div 
            ref={containerRef}
            className="relative w-full p-2" // Padding para los gaps externos
            style={{ height: '400px' }}
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
                      backgroundSize: '40px 40px'
                    }}
                  ></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-center items-center text-white text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold tracking-wider">
                    {category.title}
                  </h3>
                </div>

                {/* Photo Placeholder */}
                <div className="absolute top-6 right-6 w-16 h-16 bg-white/20 rounded-xl border border-white/30 flex items-center justify-center">
                  <span className="text-white/60 text-sm font-medium">IMG</span>
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
      </div>
    </section>
  );
};

export default Skills;