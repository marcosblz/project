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
  const [selectedCategory, setSelectedCategory] = useState<string>('backend');
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
    if (isAnimating || selectedCategory === categoryId) return;
    
    setIsAnimating(true);
    
    // Animación de transición suave
    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedCategory(categoryId);
        setIsAnimating(false);
      }
    });

    // Fade out del contenido actual
    tl.to('.main-card-content', {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: 'power2.out'
    })
    // Fade in del nuevo contenido
    .to('.main-card-content', {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const selectedCategoryData = skillCategories.find(cat => cat.id === selectedCategory) || skillCategories[0];
  const otherCategories = skillCategories.filter(cat => cat.id !== selectedCategory);

  useEffect(() => {
    // Animación de entrada
    gsap.fromTo('.skills-container',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animación escalonada de las tarjetas
    gsap.fromTo('.skill-card',
      { opacity: 0, scale: 0.9, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
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

        <div className="skills-container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 h-auto lg:h-[500px]">
            
            {/* Tarjeta Principal (1x1 expandida) */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <div className="skill-card h-full bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400 rounded-2xl overflow-hidden shadow-xl relative group">
                {/* Pattern Background */}
                <div className="absolute inset-0 opacity-10">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, white 3px, transparent 3px)`,
                      backgroundSize: '50px 50px'
                    }}
                  ></div>
                </div>

                {/* Content */}
                <div className="main-card-content relative z-10 p-6 sm:p-8 lg:p-12 h-full flex flex-col text-white">
                  {/* Header */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider mb-4">
                      {selectedCategoryData.title}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed">
                      {selectedCategoryData.description}
                    </p>
                  </div>

                  {/* Skills Grid */}
                  <div className="flex-1">
                    <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Tecnologías y Herramientas</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                      {selectedCategoryData.skills.map((skill, index) => (
                        <div
                          key={index}
                          className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-center hover:bg-white/30 transition-all duration-300 hover:scale-105 border border-white/10"
                        >
                          <span className="text-xs sm:text-sm lg:text-base font-medium">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/20">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold">3+</div>
                        <div className="text-xs sm:text-sm text-white/80">Años</div>
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{selectedCategoryData.skills.length}</div>
                        <div className="text-xs sm:text-sm text-white/80">Tecnologías</div>
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold">10+</div>
                        <div className="text-xs sm:text-sm text-white/80">Proyectos</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Tarjetas Laterales (1x3) */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="flex flex-row lg:flex-col gap-2 sm:gap-3 lg:gap-4 h-full">
                {otherCategories.map((category, index) => (
                  <div
                    key={category.id}
                    className="skill-card flex-1 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 group relative"
                    onClick={() => handleCategoryClick(category.id)}
                  >
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

                    {/* Content */}
                    <div className="relative z-10 p-3 sm:p-4 lg:p-6 h-full flex flex-col justify-center items-center text-white text-center">
                      <h4 className="text-xs sm:text-sm lg:text-base font-bold tracking-wide">
                        {category.title}
                      </h4>
                      <div className="mt-2 text-xs text-white/80">
                        {category.skills.length} tecnologías
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category Indicator */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-accent/10 text-accent rounded-full text-sm sm:text-base lg:text-lg font-medium">
            Categoría activa: {selectedCategoryData.title}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;