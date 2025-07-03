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
  const [selectedTab, setSelectedTab] = useState<string>('backend');

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
    if (tabId === selectedTab) return;
    setSelectedTab(tabId);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.skill-card');
    const selectedCard = container.querySelector(`[data-tab="${selectedTab}"]`);
    const otherCards = Array.from(cards).filter(card => card.getAttribute('data-tab') !== selectedTab);

    gsap.killTweensOf(cards);

    if (selectedCard && otherCards.length > 0) {
      // Selected card: 75% width, full height, left side
      gsap.to(selectedCard, {
        width: '75%',
        height: '400px',
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        zIndex: 10
      });

      // Other cards: 22% width, stacked vertically on the right
      const cardHeight = 400 / 3; // Divide the height equally among 3 cards
      otherCards.forEach((card, index) => {
        gsap.to(card, {
          width: '22%',
          height: `${cardHeight - 5}px`, // Small gap between cards
          x: '78%', // Position to the right of the selected card
          y: index * cardHeight,
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.1,
          zIndex: 5
        });
      });
    }
  }, [selectedTab]);

  useEffect(() => {
    // Initial animation on load
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

        {/* Grid Container */}
        <div 
          ref={containerRef}
          className="relative w-full h-[450px] mx-auto"
          style={{ maxWidth: '1000px' }}
        >
          {skillCategories.map((category, index) => (
            <div
              key={category.id}
              data-tab={category.id}
              className="skill-card absolute cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
              style={{
                width: '48%',
                height: '200px',
                left: index % 2 === 0 ? '0%' : '52%',
                top: index < 2 ? '0%' : '220px'
              }}
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
              <div className="relative z-10 p-6 h-full flex flex-col justify-center items-center text-white text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold tracking-wider">
                  {category.title}
                </h3>
              </div>

              {/* Photo Placeholder */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-lg border border-white/30 flex items-center justify-center">
                <span className="text-white/60 text-xs">IMG</span>
              </div>

              {/* Selection Indicator */}
              {selectedTab === category.id && (
                <div className="absolute inset-0 border-4 border-white/50 rounded-2xl pointer-events-none"></div>
              )}

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Selected Category Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-accent/10 text-accent rounded-full text-lg font-medium">
            Categoría seleccionada: {skillCategories.find(cat => cat.id === selectedTab)?.title}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;