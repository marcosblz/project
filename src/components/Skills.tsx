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
  description: string;
}

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const skillCategories: SkillCategory[] = [
    {
      id: 'backend',
      title: "BACK-END",
      gradient: "from-blue-600 via-cyan-500 to-teal-400",
      icon: <Server className="w-8 h-8" />,
      skills: ["Groovy", "Python", "Django", "Java", "Node.js", "REST APIs", "PostgreSQL", "MySQL"],
      description: "Desarrollo de APIs robustas y arquitecturas escalables"
    },
    {
      id: 'frontend',
      title: "FRONT-END",
      gradient: "from-purple-600 via-blue-500 to-indigo-400",
      icon: <Monitor className="w-8 h-8" />,
      skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "GSAP", "Responsive Design"],
      description: "Interfaces modernas y experiencias de usuario excepcionales"
    },
    {
      id: 'devops',
      title: "DEVOPS",
      gradient: "from-orange-500 via-pink-500 to-purple-600",
      icon: <GitBranch className="w-8 h-8" />,
      skills: ["Docker", "Git", "Jenkins", "CI/CD", "Linux", "Bash", "Webpack", "Vite"],
      description: "Automatización y optimización de procesos de desarrollo"
    },
    {
      id: 'otros',
      title: "OTROS",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      icon: <Database className="w-8 h-8" />,
      skills: ["IA/ML", "PhotoShop", "Figma", "Scrum", "Kanban", "Testing", "Debugging", "Problem Solving"],
      description: "Herramientas complementarias y metodologías ágiles"
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      // Si ya está seleccionada, deseleccionar
      setSelectedCategory(null);
    } else {
      // Seleccionar nueva categoría
      setSelectedCategory(categoryId);
    }
  };

  useEffect(() => {
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
    <section id="habilidades" ref={sectionRef} className="py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Stack Tecnológico</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Especialización técnica por áreas</p>
        </div>

        <div className="max-w-6xl mx-auto">
          {selectedCategory === null ? (
            /* Layout inicial: 1 tarjeta sola */
            <div className="flex justify-center">
              <div
                className="skill-card cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group relative w-80 h-60"
                onClick={() => handleCategoryClick('backend')}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skillCategories[0].gradient}`}></div>
                
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
                    {skillCategories[0].icon}
                  </div>
                  <h3 className="text-2xl font-bold tracking-wider">
                    {skillCategories[0].title}
                  </h3>
                  <p className="text-sm text-white/80 mt-2">
                    {skillCategories[0].skills.length} tecnologías
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ) : (
            /* Layout expandido: 1 grande + 3 pequeñas */
            <div className="grid grid-cols-4 gap-6 h-96">
              {/* Tarjeta principal (75% del ancho) */}
              <div className="col-span-3">
                {skillCategories
                  .filter(cat => cat.id === selectedCategory)
                  .map(category => (
                    <div
                      key={category.id}
                      className="skill-card cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group relative h-full"
                      onClick={() => handleCategoryClick(category.id)}
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

                      {/* Contenido expandido */}
                      <div className="relative z-10 p-8 h-full flex flex-col text-white">
                        <div className="mb-6">
                          <div className="flex items-center mb-4">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                              {category.icon}
                            </div>
                            <div>
                              <h3 className="text-3xl font-bold tracking-wider">
                                {category.title}
                              </h3>
                              <p className="text-white/80">
                                {category.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1">
                          <h4 className="text-xl font-semibold mb-4">Tecnologías y Herramientas</h4>
                          <div className="grid grid-cols-4 gap-3">
                            {category.skills.map((skill, index) => (
                              <div
                                key={index}
                                className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-center hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/10"
                              >
                                <span className="text-sm font-medium">{skill}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/20">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-2xl font-bold">3+</div>
                              <div className="text-sm text-white/80">Años</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold">{category.skills.length}</div>
                              <div className="text-sm text-white/80">Tecnologías</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold">10+</div>
                              <div className="text-sm text-white/80">Proyectos</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
              </div>

              {/* Tarjetas pequeñas (25% del ancho) */}
              <div className="col-span-1 space-y-4">
                {skillCategories
                  .filter(cat => cat.id !== selectedCategory)
                  .map(category => (
                    <div
                      key={category.id}
                      className="skill-card cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group relative h-28"
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {/* Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`}></div>
                      
                      {/* Pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <div 
                          className="w-full h-full"
                          style={{
                            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
                            backgroundSize: '20px 20px'
                          }}
                        ></div>
                      </div>

                      {/* Content compacto */}
                      <div className="relative z-10 p-4 h-full flex flex-col justify-center items-center text-white text-center">
                        <h3 className="text-sm font-bold tracking-wider">
                          {category.title}
                        </h3>
                        <p className="text-xs text-white/80 mt-1">
                          {category.skills.length} tecnologías
                        </p>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Selected Category Info */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-accent/10 text-accent rounded-full text-sm sm:text-base lg:text-lg font-medium">
            {selectedCategory 
              ? `Categoría seleccionada: ${skillCategories.find(cat => cat.id === selectedCategory)?.title}`
              : 'Haz click en la tarjeta para expandir y ver todas las categorías'
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;