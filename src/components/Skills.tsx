import React, { useEffect, useRef, useState } from 'react';
import { Server, Database, Monitor, GitBranch } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  gradient: string;
  icon: React.ReactNode;
  technologies: string[];
  stats: { value: string; label: string }[];
}

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('backend');
  const [isAnimating, setIsAnimating] = useState(false);

  const skillCategories: SkillCategory[] = [
    {
      id: 'backend',
      title: "BACK-END",
      subtitle: "Desarrollo de APIs robustas y arquitecturas escalables",
      gradient: "from-blue-600 via-cyan-500 to-teal-400",
      icon: <Server className="w-6 lg:w-8 h-6 lg:h-8" />,
      technologies: ["Groovy", "Python", "Django", "Java", "Node.js", "REST APIs", "PostgreSQL", "MySQL"],
      stats: [
        { value: "3+", label: "Años" },
        { value: "8", label: "Tecnologías" },
        { value: "10+", label: "Proyectos" }
      ]
    },
    {
      id: 'frontend',
      title: "FRONT-END",
      subtitle: "Interfaces modernas y experiencias de usuario excepcionales",
      gradient: "from-purple-600 via-blue-500 to-indigo-400",
      icon: <Monitor className="w-6 lg:w-8 h-6 lg:h-8" />,
      technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js", "HTML5", "CSS3", "JavaScript", "Figma"],
      stats: [
        { value: "2+", label: "Años" },
        { value: "8", label: "Tecnologías" },
        { value: "15+", label: "Proyectos" }
      ]
    },
    {
      id: 'devops',
      title: "DEVOPS",
      subtitle: "Automatización y optimización de procesos de desarrollo",
      gradient: "from-orange-500 via-pink-500 to-purple-600",
      icon: <GitBranch className="w-6 lg:w-8 h-6 lg:h-8" />,
      technologies: ["Docker", "Git", "Jenkins", "CI/CD", "Linux", "Bash", "Webpack", "Vite"],
      stats: [
        { value: "1+", label: "Años" },
        { value: "8", label: "Tecnologías" },
        { value: "5+", label: "Proyectos" }
      ]
    },
    {
      id: 'otros',
      title: "OTROS",
      subtitle: "Herramientas complementarias y metodologías ágiles",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      icon: <Database className="w-6 lg:w-8 h-6 lg:h-8" />,
      technologies: ["IA/ML", "PhotoShop", "Figma", "Scrum", "Kanban", "Testing", "Debugging", "Problem Solving"],
      stats: [
        { value: "2+", label: "Años" },
        { value: "8", label: "Tecnologías" },
        { value: "12+", label: "Proyectos" }
      ]
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    if (isAnimating || categoryId === selectedCategory) return;
    
    setIsAnimating(true);
    
    const container = containerRef.current;
    if (!container) {
      setIsAnimating(false);
      return;
    }

    // Get the cards
    const currentMainCard = container.querySelector(`[data-category="${selectedCategory}"]`);
    const newMainCard = container.querySelector(`[data-category="${categoryId}"]`);
    
    if (!currentMainCard || !newMainCard) {
      setIsAnimating(false);
      return;
    }

    // Get their current positions and sizes
    const currentMainRect = currentMainCard.getBoundingClientRect();
    const newMainRect = newMainCard.getBoundingClientRect();
    
    // Calculate the difference in positions
    const deltaX = newMainRect.left - currentMainRect.left;
    const deltaY = newMainRect.top - currentMainRect.top;
    
    // Timeline for the swap animation
    const tl = gsap.timeline();

    // Animate both cards simultaneously
    tl.to(currentMainCard, {
      x: deltaX,
      y: deltaY,
      scale: 0.3, // Scale down to small size
      duration: 0.8,
      ease: "power2.inOut"
    })
    .to(newMainCard, {
      x: -deltaX,
      y: -deltaY,
      scale: 3.33, // Scale up to large size (1/0.3)
      duration: 0.8,
      ease: "power2.inOut"
    }, 0) // Start at the same time
    
    // Wait a bit, then change state and reset positions
    .call(() => {
      setSelectedCategory(categoryId);
    }, [], "+=0.1")
    
    // Reset positions after state change
    .set([currentMainCard, newMainCard], {
      x: 0,
      y: 0,
      scale: 1,
      delay: 0.1
    })
    
    // Complete animation
    .call(() => {
      setIsAnimating(false);
    });
  };

  useEffect(() => {
    // Initial entrance animation
    gsap.fromTo('.skill-card',
      { opacity: 0, scale: 0.8, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
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

  const selectedCategoryData = skillCategories.find(cat => cat.id === selectedCategory) || skillCategories[0];
  const otherCategories = skillCategories.filter(cat => cat.id !== selectedCategory);

  return (
    <section id="habilidades" ref={sectionRef} className="py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Stack Tecnológico</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Especialización técnica por áreas</p>
        </div>

        <div className="max-w-6xl mx-auto" ref={containerRef}>
          {/* Layout principal: 1 grande + 3 pequeñas */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Tarjeta principal (75% del ancho en desktop) */}
            <div className="lg:col-span-3">
              <div 
                data-category={selectedCategory}
                className="skill-card rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group relative h-80 lg:h-96 cursor-pointer"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedCategoryData.gradient}`}></div>
                
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

                {/* Contenido expandido */}
                <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col text-white">
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 lg:w-16 h-12 lg:h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                        {selectedCategoryData.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-bold tracking-wider">
                          {selectedCategoryData.title}
                        </h3>
                        <p className="text-white/80 text-sm lg:text-base">
                          {selectedCategoryData.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-lg lg:text-xl font-semibold mb-4">Tecnologías y Herramientas</h4>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {selectedCategoryData.technologies.map((skill, index) => (
                        <div
                          key={index}
                          className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-center hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/10"
                        >
                          <span className="text-xs lg:text-sm font-medium">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/20">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {selectedCategoryData.stats.map((stat, index) => (
                        <div key={index}>
                          <div className="text-xl lg:text-2xl font-bold">{stat.value}</div>
                          <div className="text-xs lg:text-sm text-white/80">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Tarjetas pequeñas (25% del ancho en desktop) */}
            <div className="lg:col-span-1 grid grid-cols-1 gap-4">
              {otherCategories.map((category) => (
                <div 
                  key={category.id}
                  data-category={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="skill-card rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group relative h-24 lg:h-28 cursor-pointer hover:scale-105"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`}></div>
                  <div className="absolute inset-0 opacity-20">
                    <div 
                      className="w-full h-full"
                      style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
                        backgroundSize: '20px 20px'
                      }}
                    ></div>
                  </div>
                  <div className="relative z-10 p-4 h-full flex flex-col justify-center items-center text-white text-center">
                    <h3 className="text-sm lg:text-base font-bold tracking-wider">
                      {category.title}
                    </h3>
                    <p className="text-xs text-white/80 mt-1">
                      {category.technologies.length} tecnologías
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info adicional */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-accent/10 text-accent rounded-full text-sm sm:text-base lg:text-lg font-medium">
            Haz clic en cualquier categoría para explorar • {selectedCategoryData.title} seleccionado
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;