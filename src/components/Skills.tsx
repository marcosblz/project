import React, { useEffect, useRef } from 'react';
import { Server, Database, Code, Cloud, Terminal, Smartphone, Monitor, Cpu, GitBranch, Pocket as Docker } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Technology {
  name: string;
  level: number;
  icon: React.ReactNode;
}

interface SkillCategory {
  title: string;
  description: string;
  technologies: Technology[];
  gradient: string;
  icon: React.ReactNode;
  bgPattern: string;
}

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const skillCategories: SkillCategory[] = [
    {
      title: "BACK-END",
      description: "Desarrollo de servidores robustos y APIs escalables",
      gradient: "from-blue-600 via-cyan-500 to-teal-400",
      icon: <Server className="w-16 h-16" />,
      bgPattern: "bg-gradient-to-br from-blue-900/20 to-cyan-900/20",
      technologies: [
        { name: "Groovy", level: 90, icon: <Code className="w-5 h-5" /> },
        { name: "Python", level: 85, icon: <Code className="w-5 h-5" /> },
        { name: "Java", level: 80, icon: <Cpu className="w-5 h-5" /> },
        { name: "Django", level: 85, icon: <Server className="w-5 h-5" /> },
        { name: "REST APIs", level: 90, icon: <Terminal className="w-5 h-5" /> }
      ]
    },
    {
      title: "FRONT-END",
      description: "Interfaces modernas y experiencias de usuario intuitivas",
      gradient: "from-purple-600 via-blue-500 to-indigo-400",
      icon: <Monitor className="w-16 h-16" />,
      bgPattern: "bg-gradient-to-br from-purple-900/20 to-blue-900/20",
      technologies: [
        { name: "JavaScript", level: 80, icon: <Code className="w-5 h-5" /> },
        { name: "React", level: 75, icon: <Code className="w-5 h-5" /> },
        { name: "TypeScript", level: 70, icon: <Code className="w-5 h-5" /> },
        { name: "HTML/CSS", level: 85, icon: <Monitor className="w-5 h-5" /> },
        { name: "Tailwind", level: 80, icon: <Monitor className="w-5 h-5" /> }
      ]
    },
    {
      title: "DEVOPS",
      description: "Automatización, CI/CD y gestión de infraestructura",
      gradient: "from-orange-500 via-pink-500 to-purple-600",
      icon: <GitBranch className="w-16 h-16" />,
      bgPattern: "bg-gradient-to-br from-orange-900/20 to-purple-900/20",
      technologies: [
        { name: "Docker", level: 75, icon: <Docker className="w-5 h-5" /> },
        { name: "Kubernetes", level: 70, icon: <Cloud className="w-5 h-5" /> },
        { name: "Jenkins", level: 75, icon: <Terminal className="w-5 h-5" /> },
        { name: "Git", level: 90, icon: <GitBranch className="w-5 h-5" /> },
        { name: "CI/CD", level: 80, icon: <Terminal className="w-5 h-5" /> }
      ]
    },
    {
      title: "DATABASE",
      description: "Gestión y optimización de bases de datos",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      icon: <Database className="w-16 h-16" />,
      bgPattern: "bg-gradient-to-br from-green-900/20 to-teal-900/20",
      technologies: [
        { name: "MySQL", level: 85, icon: <Database className="w-5 h-5" /> },
        { name: "PostgreSQL", level: 80, icon: <Database className="w-5 h-5" /> },
        { name: "MongoDB", level: 70, icon: <Database className="w-5 h-5" /> },
        { name: "Redis", level: 65, icon: <Database className="w-5 h-5" /> },
        { name: "SQL", level: 90, icon: <Database className="w-5 h-5" /> }
      ]
    }
  ];

  useEffect(() => {
    // Parallax effect for cards
    gsap.utils.toArray('.skill-card').forEach((card: any, index) => {
      gsap.fromTo(card,
        { 
          y: 100,
          opacity: 0,
          rotationY: 15,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          scale: 1,
          duration: 1,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Parallax movement during scroll
      gsap.to(card, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });

    // Animate technology bars
    gsap.utils.toArray('.tech-bar').forEach((bar: any) => {
      const width = bar.dataset.level;
      gsap.fromTo(bar,
        { width: '0%' },
        {
          width: `${width}%`,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Floating animation for icons
    gsap.utils.toArray('.floating-icon').forEach((icon: any) => {
      gsap.to(icon, {
        y: -10,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
      });
    });

  }, []);

  return (
    <section id="habilidades" ref={sectionRef} className="skills-section py-8 sm:py-12 lg:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">
            Stack Tecnológico
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Experiencia especializada en desarrollo backend con conocimientos complementarios en frontend y DevOps
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-12">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-card group relative"
              style={{ perspective: '1000px' }}
            >
              <div className={`relative h-96 sm:h-[420px] lg:h-[450px] rounded-2xl overflow-hidden border border-border/50 shadow-2xl transition-all duration-700 hover:shadow-3xl hover:-translate-y-2 ${category.bgPattern}`}>
                
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                {/* Geometric Pattern Overlay */}
                <div className="absolute inset-0 opacity-5">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 25% 25%, currentColor 2px, transparent 2px),
                        radial-gradient(circle at 75% 75%, currentColor 1px, transparent 1px)
                      `,
                      backgroundSize: '60px 60px, 30px 30px'
                    }}
                  ></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col">
                  
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="floating-icon inline-flex items-center justify-center w-20 h-20 mb-4 rounded-2xl bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg">
                      <div className={`text-transparent bg-gradient-to-r ${category.gradient} bg-clip-text`}>
                        {category.icon}
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 tracking-wider">
                      {category.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex-1 space-y-4">
                    {category.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="group/tech">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover/tech:bg-accent group-hover/tech:text-white transition-all duration-300">
                              {tech.icon}
                            </div>
                            <span className="font-medium text-foreground text-sm sm:text-base">
                              {tech.name}
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                            {tech.level}%
                          </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`tech-bar absolute left-0 top-0 h-full bg-gradient-to-r ${category.gradient} rounded-full shadow-sm`}
                            data-level={tech.level}
                            style={{ width: '0%' }}
                          ></div>
                          
                          {/* Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Card Glow Effect */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${category.gradient} blur-xl -z-10 scale-110`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-6 sm:p-8 lg:p-12 text-center shadow-xl">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mr-4">
              <Cpu className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
              Especialización Backend
            </h3>
          </div>
          
          <p className="text-base sm:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            Mi experiencia se centra en el desarrollo backend robusto, desde la creación de APIs escalables 
            hasta la implementación de sistemas de automatización que mejoran la productividad empresarial 
            entre un 30% y 50%. Combino análisis técnico profundo con implementación eficiente.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-6 py-3 bg-accent/20 text-accent rounded-full text-sm font-medium border border-accent/30 hover:bg-accent hover:text-white transition-all duration-300">
              Automatización de Procesos
            </span>
            <span className="px-6 py-3 bg-accent/20 text-accent rounded-full text-sm font-medium border border-accent/30 hover:bg-accent hover:text-white transition-all duration-300">
              APIs Escalables
            </span>
            <span className="px-6 py-3 bg-accent/20 text-accent rounded-full text-sm font-medium border border-accent/30 hover:bg-accent hover:text-white transition-all duration-300">
              Soluciones Empresariales
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;