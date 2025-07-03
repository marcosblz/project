import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  id: string;
  title: string;
  gradient: string;
  technologies: string[];
  description: string;
  image: string;
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
      gradient: "from-slate-900 via-purple-900 to-slate-900",
      technologies: ["Java", "Python", "Groovy", "Node.js", "Spring Boot", "Django", "REST APIs", "GraphQL"],
      description: "Desarrollo de APIs robustas, arquitecturas escalables y sistemas backend eficientes",
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 'frontend',
      title: "FRONT-END",
      gradient: "from-blue-900 via-blue-600 to-blue-900",
      technologies: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "GSAP", "Responsive Design"],
      description: "Interfaces modernas, experiencias de usuario intuitivas y animaciones fluidas",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 'devops',
      title: "DEVOPS",
      gradient: "from-orange-900 via-red-600 to-orange-900",
      technologies: ["Docker", "Kubernetes", "Jenkins", "Git", "CI/CD", "AWS", "Linux", "Automation"],
      description: "Automatización de procesos, despliegue continuo y gestión de infraestructura",
      image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      id: 'otros',
      title: "OTROS",
      gradient: "from-green-900 via-emerald-600 to-green-900",
      technologies: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Webpack", "Vite", "Testing", "Agile/Scrum"],
      description: "Bases de datos, herramientas de desarrollo y metodologías ágiles",
      image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=600"
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
      width: '75%',
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
        height: '130px',
        x: '300%', // Mover a la derecha
        y: index * 135, // Apilar verticalmente
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
        width: '50%',
        height: '50%',
        x: col * 100 + '%',
        y: row * 100 + '%',
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
        width: '50%',
        height: '50%',
        x: col * 100 + '%',
        y: row * 100 + '%',
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

  const selectedCategory = skillCategories.find(cat => cat.id === selectedTab);

  return (
    <section id="habilidades" ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Stack Tecnológico</h2>
          <p className="text-xl text-muted-foreground">Especialización técnica por áreas</p>
        </div>

        {/* Container con aspect ratio fijo */}
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
                  selectedTab === category.id ? 'ring-4 ring-accent/50 z-10' : 'z-0'
                }`}
                onClick={() => handleTabClick(category.id)}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/60"></div>
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-80`}></div>
                </div>

                {/* Geometric Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: `
                        linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%),
                        radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 2px, transparent 2px),
                        radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 2px, transparent 2px)
                      `,
                      backgroundSize: '60px 60px, 40px 40px, 40px 40px'
                    }}
                  ></div>
                </div>

                {/* Content - Grid view */}
                {selectedTab !== category.id && (
                  <div className="relative z-10 p-8 h-full flex flex-col justify-center items-center text-white text-center">
                    <div className="mb-6">
                      <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                          <span className="text-2xl font-bold">
                            {category.title.charAt(0)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold tracking-wider drop-shadow-lg">
                      {category.title}
                    </h3>
                    <div className="mt-4 w-16 h-0.5 bg-white/50 group-hover:bg-white transition-colors duration-300"></div>
                  </div>
                )}

                {/* Content - Expanded view */}
                {selectedTab === category.id && (
                  <div className="relative z-10 p-8 h-full text-white overflow-y-auto">
                    <div className="flex items-start mb-6">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-xl font-bold">
                          {category.title.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-3xl font-bold tracking-wider mb-2 drop-shadow-lg">
                          {category.title}
                        </h3>
                        <p className="text-white/90 text-sm leading-relaxed drop-shadow">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white/95 drop-shadow">Tecnologías:</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {category.technologies.map((tech, index) => (
                          <div
                            key={index}
                            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-sm font-medium hover:bg-white/20 hover:border-white/30 transition-all duration-300 drop-shadow"
                          >
                            {tech}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                
                {/* Border Glow Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/20 transition-colors duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Category Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-accent/10 backdrop-blur-sm border border-accent/20 text-accent rounded-full text-lg font-medium">
            {selectedTab 
              ? `Categoría seleccionada: ${selectedCategory?.title}`
              : 'Haz click en una categoría para expandir'
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;