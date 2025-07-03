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

    // Animar tarjeta seleccionada a la izquierda (CON MARGEN DERECHO)
    tl.to(selectedCard, {
      width: 'calc(75% - 15px)', // MARGEN DERECHO AGREGADO
      height: '400px',
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'power3.inOut'
    });

    // Animar otras tarjetas a la derecha (25% ancho, apiladas)
    otherCards.forEach((card, index) => {
      tl.to(card, {
        width: '25%',
        height: '125px', // Altura ajustada para que quepan 3
        x: '300%', // Mover a la derecha
        y: index * 130, // Apilar verticalmente con espacio
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

    // Resetear todas las tarjetas al grid 2x2 CON MÁRGENES REALES
    cards.forEach((card, index) => {
      const row = Math.floor(index / 2);
      const col = index % 2;
      
      tl.to(card, {
        width: 'calc(50% - 15px)', // MARGEN HORIZONTAL
        height: 'calc(50% - 15px)', // MARGEN VERTICAL
        x: col === 0 ? '0%' : 'calc(50% + 15px)', // POSICIÓN CON MARGEN
        y: row === 0 ? '0%' : 'calc(50% + 15px)', // POSICIÓN CON MARGEN
        duration: 0.8,
        ease: 'power3.inOut'
      }, 0);
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ESPERAR A QUE EL DOM ESTÉ COMPLETAMENTE LISTO
    const setupCards = () => {
      const cards = container.querySelectorAll('.skill-card');
      
      if (cards.length === 0) {
        // Si no hay tarjetas aún, esperar un poco más
        setTimeout(setupCards, 10);
        return;
      }

      // CONFIGURACIÓN INICIAL CON MÁRGENES REALES
      cards.forEach((card, index) => {
        const row = Math.floor(index / 2);
        const col = index % 2;
        
        // FORZAR POSICIONAMIENTO CON ESPACIADO REAL
        gsap.set(card, {
          position: 'absolute',
          width: 'calc(50% - 15px)', // ANCHO CON MARGEN
          height: 'calc(50% - 15px)', // ALTO CON MARGEN
          x: col === 0 ? '0%' : 'calc(50% + 15px)', // POSICIÓN CON ESPACIO
          y: row === 0 ? '0%' : 'calc(50% + 15px)', // POSICIÓN CON ESPACIO
          transformOrigin: 'center center',
          opacity: 0, // EMPEZAR INVISIBLE PARA ANIMACIÓN
          scale: 0.8,
          clearProps: false // NO LIMPIAR PARA MANTENER POSICIÓN
        });
      });

      // ANIMACIÓN DE ENTRADA DESPUÉS DE POSICIONAR
      gsap.to('.skill-card', {
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
      });
    };

    // EJECUTAR INMEDIATAMENTE
    setupCards();
  }, []);

  return (
    <section id="habilidades" ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Stack Tecnológico</h2>
          <p className="text-xl text-muted-foreground">Especialización técnica por áreas</p>
        </div>

        {/* Container con aspect ratio fijo Y PADDING INTERNO */}
        <div className="max-w-6xl mx-auto">
          <div 
            ref={containerRef}
            className="relative w-full p-4" // PADDING AGREGADO
            style={{ height: '420px' }} // ALTURA AUMENTADA PARA COMPENSAR PADDING
          >
            {skillCategories.map((category) => (
              <div
                key={category.id}
                data-id={category.id}
                className="skill-card cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group relative"
                onClick={() => handleTabClick(category.id)}
                style={{
                  background: 'linear-gradient(135deg, hsl(221, 83%, 53%) 0%, hsl(217, 91%, 60%) 50%, hsl(221, 83%, 45%) 100%)',
                  backgroundAttachment: 'fixed'
                }}
              >
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

                {/* Content - SOLO TEXTO */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-center items-center text-white text-center">
                  <h3 className="text-2xl font-bold tracking-wider">
                    {category.title}
                  </h3>
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