import React, { useEffect, useRef } from 'react';
import { Server, Monitor, GitBranch, Settings } from 'lucide-react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.css';

gsap.registerPlugin(Flip, ScrollTrigger);

interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  workExperience: string;
  studyExperience: string;
  highlights: string[];
  skills: Array<{
    name: string;
    workTime: string;
    studyTime: string;
    description: string;
  }>;
}

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const skillCategories: SkillCategory[] = [
    /* ... tu array de categorías, igual que antes ... */
  ];

  const changeGrid = (viewId: string) => {
    const container = containerRef.current;
    if (!container) return;
    if (container.dataset.view === viewId) return;

    // capturamos el estado previo
    const products = gsap.utils.toArray<HTMLElement>('.product');
    const state = Flip.getState(products);

    // aplicamos el nuevo layout
    container.dataset.view = viewId;

    // animamos la transición
    Flip.from(state, {
      duration: 0.3,
      absolute: true,
      ease: 'power1.inOut'
    });
  };

  useEffect(() => {
    // animación de entrada
    gsap.fromTo(
      '.skill-content',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const getSkillContent = (skillId: string) => {
    const skill = skillCategories.find(s => s.id === skillId);
    if (!skill) return null;
    return (
      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        {/* ... idéntico a tu versión original ... */}
      </div>
    );
  };

  return (
    <section id="habilidades" className="py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">
            Stack Tecnológico
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
            Especialización técnica por áreas de desarrollo
          </p>
        </div>

        <div className="skill-content max-w-6xl mx-auto">
          <div
            ref={containerRef}
            className="skills"
            data-view="skill-1"           {/* vista inicial */}
          >
            {skillCategories.map((category, index) => (
              <div
                key={category.id}
                className="product"
                style={{
                  gridArea: category.id,
                  cursor: index === 0 ? 'default' : 'pointer',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: 'hsl(var(--background))',
                  backdropFilter: 'blur(10px)',
                  boxShadow:
                    index === 0
                      ? '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
                      : '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
                  transition: 'box-shadow 0.3s ease',
                  zIndex: index === 0 ? 1 : 'auto'
                }}
                onClick={() => changeGrid(category.id)}
                onMouseEnter={e => {
                  const view = containerRef.current?.dataset.view;
                  if (category.id !== view) {
                    e.currentTarget.style.boxShadow =
                      '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)';
                  }
                }}
                onMouseLeave={e => {
                  const view = containerRef.current?.dataset.view;
                  if (category.id !== view) {
                    e.currentTarget.style.boxShadow =
                      '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)';
                  }
                }}
              >
                {category.id === containerRef.current?.dataset.view ? (
                  getSkillContent(category.id)
                ) : (
                  <div className="p-4 h-full flex flex-col justify-center items-center text-center">
                    {/* Mini-tarjeta */}
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-3 shadow-lg`}
                    >
                      {React.cloneElement(
                        category.icon as React.ReactElement,
                        { className: 'w-6 h-6 text-white' }
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1 tracking-wide">
                      {category.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {category.subtitle}
                    </p>
                    <div className="text-xs text-accent font-medium">
                      <div>💼 {category.workExperience}</div>
                      <div>📚 {category.studyExperience}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
