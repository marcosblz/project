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
    
    // Define positions for 2x2 grid (initial state)
    const gridPositions = [
      { x: 0, y: 0, width: '48%', height: '48%' },      // top-left
      { x: '52%', y: 0, width: '48%', height: '48%' },  // top-right
      { x: 0, y: '52%', width: '48%', height: '48%' },  // bottom-left
      { x: '52%', y: '52%', width: '48%', height: '48%' } // bottom-right
    ];

    // Find selected card index
    const selectedIndex = skillCategories.findIndex(cat => cat.id === selectedTab);
    
    cards.forEach((card, index) => {
      const isSelected = index === selectedIndex;
      
      if (isSelected) {
        // Selected card: large on the left (70% width, full height)
        gsap.to(card, {
          x: 0,
          y: 0,
          width: '70%',
          height: '100%',
          duration: 0.8,
          ease: 'power3.out',
          zIndex: 10
        });
      } else {
        // Other cards: stack vertically on the right
        let stackIndex = index > selectedIndex ? index - 1 : index;
        if (index > selectedIndex) stackIndex = index - 1;
        else stackIndex = index;
        
        // Adjust stack index for proper vertical positioning
        const verticalIndex = stackIndex >= selectedIndex ? stackIndex : stackIndex;
        const adjustedIndex = index < selectedIndex ? index : index - 1;
        
        gsap.to(card, {
          x: '75%',
          y: `${adjustedIndex * 33.33}%`,
          width: '25%',
          height: '30%',
          duration: 0.8,
          ease: 'power3.out',
          delay: adjustedIndex * 0.1,
          zIndex: 5
        });
      }
    });

  }, [selectedTab, skillCategories]);

  useEffect(() => {
    // Initial setup - 2x2 grid
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.skill-card');
    
    // Set initial 2x2 positions
    cards.forEach((card, index) => {
      const positions = [
        { x: 0, y: 0 },           // top-left
        { x: '52%', y: 0 },       // top-right  
        { x: 0, y: '52%' },       // bottom-left
        { x: '52%', y: '52%' }    // bottom-right
      ];
      
      gsap.set(card, {
        x: positions[index].x,
        y: positions[index].y,
        width: '48%',
        height: '48%',
        zIndex: 1
      });
    });

    // Initial animation on scroll
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
          className="relative w-full mx-auto"
          style={{ 
            maxWidth: '800px',
            height: '500px'
          }}
        >
          {skillCategories.map((category, index) => (
            <div
              key={category.id}
              data-tab={category.id}
              className="skill-card absolute cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group"
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