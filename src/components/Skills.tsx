import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
  description: string;
}

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const skillCategories: SkillCategory[] = [
    {
      id: 'backend',
      title: "BACK-END",
      skills: ["Groovy", "Python", "Django", "Java", "Node.js", "REST APIs", "PostgreSQL", "MySQL"],
      description: "Desarrollo de APIs robustas y arquitecturas escalables"
    },
    {
      id: 'frontend',
      title: "FRONT-END", 
      skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "GSAP", "Responsive Design"],
      description: "Interfaces modernas y experiencias de usuario excepcionales"
    },
    {
      id: 'devops',
      title: "DEVOPS",
      skills: ["Docker", "Git", "Jenkins", "CI/CD", "Linux", "Bash", "Webpack", "Vite"],
      description: "Automatización y optimización de procesos de desarrollo"
    },
    {
      id: 'otros',
      title: "OTROS",
      skills: ["IA/ML", "PhotoShop", "Figma", "Scrum", "Kanban", "Testing", "Debugging", "Problem Solving"],
      description: "Herramientas complementarias y metodologías ágiles"
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (selectedCategory === null) {
      // Expandir desde grid 2x2 a layout expandido
      setSelectedCategory(categoryId);
      animateToExpanded(categoryId);
    } else if (selectedCategory === categoryId) {
      // Volver al grid 2x2
      animateToGrid();
    } else {
      // Cambiar selección
      setSelectedCategory(categoryId);
      animateToExpanded(categoryId);
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

    // Animar tarjeta seleccionada (70% ancho, altura completa, con margen)
    tl.to(selectedCard, {
      width: 'calc(70% - 8px)',
      height: 'calc(100% - 16px)',
      x: '8px',
      y: '8px',
      duration: 0.8,
      ease: 'power3.inOut'
    });

    // Animar otras tarjetas (30% ancho, apiladas verticalmente con espaciado)
    otherCards.forEach((card, index) => {
      const yPosition = 8 + (index * (100 / 3)); // Espaciado uniforme
      tl.to(card, {
        width: 'calc(30% - 16px)',
        height: 'calc(33.333% - 16px)',
        x: 'calc(70% + 8px)', // Posición a la derecha con margen
        y: `${yPosition}px`,
        duration: 0.8,
        ease: 'power3.inOut'
      }, 0); // Empezar al mismo tiempo
    });
  };

  const animateToGrid = () => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.skill-card');

    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedCategory(null);
        setIsAnimating(false);
      }
    });

    // Resetear todas las tarjetas al grid 2x2 con márgenes
    cards.forEach((card, index) => {
      const row = Math.floor(index / 2);
      const col = index % 2;
      
      tl.to(card, {
        width: 'calc(50% - 16px)',
        height: 'calc(50% - 16px)',
        x: `${col * 50 + 1}%`,
        y: `${row * 50 + 1}%`,
        duration: 0.8,
        ease: 'power3.inOut'
      }, 0);
    });
  };

  useEffect(() => {
    // Configurar posiciones iniciales del grid 2x2 con márgenes
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.skill-card');
    cards.forEach((card, index) => {
      const row = Math.floor(index / 2);
      const col = index % 2;
      
      gsap.set(card, {
        position: 'absolute',
        width: 'calc(50% - 16px)',
        height: 'calc(50% - 16px)',
        x: `${col * 50 + 1}%`,
        y: `${row * 50 + 1}%`,
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

  const getCardContent = (category: SkillCategory, isSelected: boolean) => {
    if (isSelected && selectedCategory) {
      // Contenido expandido
      return (
        <div className="relative z-10 p-6 sm:p-8 lg:p-12 h-full flex flex-col text-white">
          <div className="mb-6">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider mb-4">
              {category.title}
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed">
              {category.description}
            </p>
          </div>

          <div className="flex-1">
            <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Tecnologías y Herramientas</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              {category.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-center hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/10"
                >
                  <span className="text-xs sm:text-sm lg:text-base font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/20">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">3+</div>
                <div className="text-xs sm:text-sm text-white/80">Años</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{category.skills.length}</div>
                <div className="text-xs sm:text-sm text-white/80">Tecnologías</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">10+</div>
                <div className="text-xs sm:text-sm text-white/80">Proyectos</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // Contenido compacto
      return (
        <div className="relative z-10 p-4 sm:p-6 lg:p-8 h-full flex flex-col justify-center items-center text-white text-center">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wider mb-2">
            {category.title}
          </h3>
          <div className="text-xs sm:text-sm text-white/80">
            {category.skills.length} tecnologías
          </div>
        </div>
      );
    }
  };

  return (
    <section id="habilidades" ref={sectionRef} className="py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Stack Tecnológico</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Especialización técnica por áreas</p>
        </div>

        {/* Container con aspect ratio fijo y padding interno */}
        <div className="max-w-6xl mx-auto">
          <div 
            ref={containerRef}
            className="relative w-full p-4"
            style={{ height: '520px' }}
          >
            {skillCategories.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <div
                  key={category.id}
                  data-id={category.id}
                  className={`skill-card cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group relative ${
                    isSelected ? 'ring-4 ring-white/50 z-10' : 'z-0'
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400"></div>
                  
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
                  {getCardContent(category, isSelected)}

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Category Info */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-accent/10 text-accent rounded-full text-sm sm:text-base lg:text-lg font-medium">
            {selectedCategory 
              ? `Categoría seleccionada: ${skillCategories.find(cat => cat.id === selectedCategory)?.title}`
              : 'Haz click en una categoría para expandir'
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;