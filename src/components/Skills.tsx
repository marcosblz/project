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
  const [selectedTab, setSelectedTab] = useState<string>('backend'); // Default selected

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
    if (selectedTab === tabId) return;
    
    const container = containerRef.current;
    if (!container) return;

    const currentMainCard = container.querySelector(`[data-id="${selectedTab}"]`);
    const clickedCard = container.querySelector(`[data-id="${tabId}"]`);
    
    if (!currentMainCard || !clickedCard) return;

    // Get current transforms
    const currentTransform = gsap.getProperty(currentMainCard, "transform");
    const clickedTransform = gsap.getProperty(clickedCard, "transform");

    // Create timeline for swap animation
    const tl = gsap.timeline();

    // Animate the swap
    tl.to(currentMainCard, {
      x: gsap.getProperty(clickedCard, "x"),
      y: gsap.getProperty(clickedCard, "y"),
      width: "25%",
      height: "130px",
      duration: 0.8,
      ease: "power2.inOut"
    })
    .to(clickedCard, {
      x: 0,
      y: 0,
      width: "75%",
      height: "400px",
      duration: 0.8,
      ease: "power2.inOut"
    }, 0); // Start at same time

    // Update state after animation
    setSelectedTab(tabId);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.skill-card');
    
    // Set up 1x1 1x3 layout
    cards.forEach((card, index) => {
      const cardId = card.getAttribute('data-id');
      
      if (cardId === selectedTab) {
        // Main card (left side, 75% width)
        gsap.set(card, {
          position: 'absolute',
          width: '75%',
          height: '400px',
          x: 0,
          y: 0,
          transformOrigin: 'top left'
        });
      } else {
        // Sidebar cards (right side, stacked, 25% width)
        const otherCards = skillCategories.filter(cat => cat.id !== selectedTab);
        const stackIndex = otherCards.findIndex(cat => cat.id === cardId);
        
        gsap.set(card, {
          position: 'absolute',
          width: '25%',
          height: '130px',
          x: '300%', // Move to right side
          y: stackIndex * 135, // Stack vertically with gap
          transformOrigin: 'top left'
        });
      }
    });

    // Initial entrance animation only on first load
    if (sectionRef.current) {
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
    }
  }, [selectedTab]);

  return (
    <section id="habilidades" ref={sectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Stack Tecnológico</h2>
          <p className="text-xl text-muted-foreground">Especialización técnica por áreas</p>
        </div>

        {/* Container with fixed height for 1x1 1x3 layout */}
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
                className={`skill-card cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group relative ${
                  selectedTab === category.id ? 'ring-4 ring-white/50 z-10' : 'z-0'
                }`}
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
                <div className="relative z-10 p-8 h-full flex flex-col justify-center items-center text-white text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
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
            Categoría seleccionada: {skillCategories.find(cat => cat.id === selectedTab)?.title}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;