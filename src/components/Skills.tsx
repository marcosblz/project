import React, { useEffect, useRef, useState } from 'react';
import { Server, Database, Code, Cloud, Monitor, Cpu, GitBranch, Smartphone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  id: string;
  title: string;
  description: string;
  gradient: string;
  icon: React.ReactNode;
  technologies: string[];
}

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<string>('backend');

  const skillCategories: SkillCategory[] = [
    {
      id: 'backend',
      title: "BACK-END",
      description: "Desarrollo de servidores robustos, APIs escalables y sistemas de automatización empresarial",
      gradient: "from-blue-600 via-cyan-500 to-teal-400",
      icon: <Server className="w-12 h-12" />,
      technologies: ["Groovy", "Python", "Java", "Django", "REST APIs", "Microservicios"]
    },
    {
      id: 'frontend',
      title: "FRONT-END",
      description: "Interfaces modernas, experiencias de usuario intuitivas y desarrollo web responsive",
      gradient: "from-purple-600 via-blue-500 to-indigo-400",
      icon: <Monitor className="w-12 h-12" />,
      technologies: ["JavaScript", "React", "TypeScript", "HTML/CSS", "Tailwind CSS", "GSAP"]
    },
    {
      id: 'devops',
      title: "DEVOPS",
      description: "Automatización CI/CD, gestión de infraestructura y optimización de procesos",
      gradient: "from-orange-500 via-pink-500 to-purple-600",
      icon: <GitBranch className="w-12 h-12" />,
      technologies: ["Docker", "Kubernetes", "Jenkins", "Git", "CI/CD", "Automatización"]
    },
    {
      id: 'database',
      title: "DATABASE",
      description: "Gestión, optimización y diseño de bases de datos relacionales y no relacionales",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      icon: <Database className="w-12 h-12" />,
      technologies: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "SQL", "Optimización"]
    }
  ];

  const handleTabClick = (tabId: string) => {
    if (tabId === selectedTab) return;

    const container = containerRef.current;
    if (!container) return;

    // Animate to new layout
    setSelectedTab(tabId);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.skill-tab');
    const selectedCard = container.querySelector(`[data-tab="${selectedTab}"]`);
    const otherCards = Array.from(cards).filter(card => card.getAttribute('data-tab') !== selectedTab);

    // Clear any existing animations
    gsap.killTweensOf(cards);

    if (selectedCard && otherCards.length > 0) {
      // Animate selected card to large size
      gsap.to(selectedCard, {
        width: '70%',
        height: '400px',
        duration: 0.8,
        ease: 'power3.out',
        zIndex: 10
      });

      // Animate other cards to sidebar
      gsap.to(otherCards, {
        width: '25%',
        height: '120px',
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        zIndex: 5
      });

      // Position cards
      gsap.set(selectedCard, { x: 0, y: 0 });
      
      otherCards.forEach((card, index) => {
        gsap.to(card, {
          x: '280%', // Move to right side
          y: index * 130, // Stack vertically
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.1
        });
      });
    }
  }, [selectedTab]);

  useEffect(() => {
    // Initial animation
    gsap.fromTo('.skills-container',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section id="habilidades" ref={sectionRef} className="skills-section py-8 sm:py-12 lg:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">
            Stack Tecnológico
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Especialización en desarrollo backend con experiencia complementaria en frontend y DevOps
          </p>
        </div>

        {/* Skills Container */}
        <div className="skills-container relative">
          <div 
            ref={containerRef}
            className="relative w-full h-[500px] mx-auto"
            style={{ maxWidth: '1000px' }}
          >
            {skillCategories.map((category, index) => {
              const isSelected = category.id === selectedTab;
              
              return (
                <div
                  key={category.id}
                  data-tab={category.id}
                  className={`skill-tab absolute cursor-pointer transition-all duration-300 rounded-2xl overflow-hidden border border-border/50 shadow-xl hover:shadow-2xl ${
                    isSelected ? 'z-10' : 'z-5'
                  }`}
                  style={{
                    width: isSelected ? '70%' : '48%',
                    height: isSelected ? '400px' : '240px',
                    left: isSelected ? '0%' : index % 2 === 0 ? '0%' : '52%',
                    top: isSelected ? '0%' : index < 2 ? '0%' : '260px',
                    transform: isSelected ? 'none' : 'none'
                  }}
                  onClick={() => handleTabClick(category.id)}
                >
                  {/* Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90`}></div>
                  
                  {/* Pattern Overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div 
                      className="w-full h-full"
                      style={{
                        backgroundImage: `
                          radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                          radial-gradient(circle at 75% 75%, white 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px, 30px 30px'
                      }}
                    ></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col text-white">
                    {/* Header */}
                    <div className={`${isSelected ? 'text-center mb-8' : 'text-center mb-4'}`}>
                      <div className={`inline-flex items-center justify-center ${isSelected ? 'w-20 h-20 mb-6' : 'w-12 h-12 mb-3'} rounded-2xl bg-white/20 backdrop-blur-sm transition-all duration-300`}>
                        {category.icon}
                      </div>
                      <h3 className={`font-bold tracking-wider ${isSelected ? 'text-3xl mb-4' : 'text-xl mb-2'} transition-all duration-300`}>
                        {category.title}
                      </h3>
                      {isSelected && (
                        <p className="text-white/90 leading-relaxed text-lg max-w-2xl mx-auto">
                          {category.description}
                        </p>
                      )}
                    </div>

                    {/* Technologies - Only show when selected */}
                    {isSelected && (
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                          {category.technologies.map((tech, techIndex) => (
                            <div
                              key={techIndex}
                              className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/30 transition-all duration-300 hover:scale-105"
                            >
                              <span className="font-semibold text-white">
                                {tech}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Click indicator for non-selected */}
                    {!isSelected && (
                      <div className="mt-auto text-center">
                        <div className="inline-flex items-center text-white/80 text-sm">
                          <span>Click para expandir</span>
                        </div>
                      </div>
                    )}

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 bg-white/10 pointer-events-none"></div>
                  </div>

                  {/* Photo placeholder */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-xl border-2 border-white/30 flex items-center justify-center">
                    <span className="text-white/60 text-xs font-medium">IMG</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-16 bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-6 sm:p-8 text-center shadow-xl">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mr-4">
              <Cpu className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
              Enfoque Backend Especializado
            </h3>
          </div>
          
          <p className="text-base sm:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Mi experiencia se centra en el desarrollo backend robusto, desde la creación de APIs escalables 
            hasta la implementación de sistemas de automatización que mejoran la productividad empresarial 
            entre un 30% y 50%.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;