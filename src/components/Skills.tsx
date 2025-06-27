import React, { useEffect } from 'react';
import { Code, Palette, Database, Globe, Users, MessageCircle, Lightbulb, Target } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TechnicalSkill {
  name: string;
  level: number;
  category: string;
}

interface SoftSkill {
  name: string;
  icon: React.ReactNode;
  description: string;
}

const Skills: React.FC = () => {
  const technicalSkills: TechnicalSkill[] = [
    { name: "React & Next.js", level: 95, category: "Frontend" },
    { name: "TypeScript", level: 90, category: "Frontend" },
    { name: "Tailwind CSS", level: 85, category: "Frontend" },
    { name: "JavaScript ES6+", level: 92, category: "Frontend" },
    { name: "Node.js", level: 80, category: "Backend" },
    { name: "Express.js", level: 75, category: "Backend" },
    { name: "PostgreSQL", level: 70, category: "Backend" },
    { name: "MongoDB", level: 65, category: "Backend" },
    { name: "Git & GitHub", level: 88, category: "Tools" },
    { name: "Docker", level: 60, category: "Tools" },
    { name: "Jest & Testing", level: 78, category: "Tools" },
    { name: "Figma", level: 72, category: "Tools" }
  ];

  const softSkills: SoftSkill[] = [
    {
      name: "Trabajo en Equipo",
      icon: <Users className="w-5 sm:w-6 h-5 sm:h-6" />,
      description: "Colaboración efectiva y comunicación clara con equipos multidisciplinarios"
    },
    {
      name: "Comunicación",
      icon: <MessageCircle className="w-5 sm:w-6 h-5 sm:h-6" />,
      description: "Habilidad para explicar conceptos técnicos de manera comprensible"
    },
    {
      name: "Resolución de Problemas",
      icon: <Lightbulb className="w-5 sm:w-6 h-5 sm:h-6" />,
      description: "Enfoque analítico y creativo para encontrar soluciones eficientes"
    },
    {
      name: "Orientación a Objetivos",
      icon: <Target className="w-5 sm:w-6 h-5 sm:h-6" />,
      description: "Foco en resultados y cumplimiento de deadlines de forma consistente"
    }
  ];

  const skillCategories = [
    { name: "Frontend", icon: <Code className="w-5 sm:w-6 h-5 sm:h-6" />, color: "text-blue-500" },
    { name: "Backend", icon: <Database className="w-5 sm:w-6 h-5 sm:h-6" />, color: "text-green-500" },
    { name: "Tools", icon: <Globe className="w-5 sm:w-6 h-5 sm:h-6" />, color: "text-purple-500" }
  ];

  useEffect(() => {
    // Animate progress bars
    gsap.fromTo('.skill-bar',
      { width: 0 },
      {
        width: (i, target) => target.getAttribute('data-width') + '%',
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: '.technical-skills',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate soft skills
    gsap.fromTo('.soft-skill-card',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.soft-skills',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const getSkillsByCategory = (category: string) => {
    return technicalSkills.filter(skill => skill.category === category);
  };

  return (
    <section id="habilidades" className="skills-section py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Habilidades</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">Competencias técnicas y blandas que aporto a cada proyecto</p>
        </div>

        {/* Technical Skills */}
        <div className="technical-skills mb-16 sm:mb-20">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 text-center">Habilidades Técnicas</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {skillCategories.map((category) => (
              <div key={category.name} className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className={`${category.color} mr-2 sm:mr-3`}>
                    {category.icon}
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-foreground">{category.name}</h4>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  {getSkillsByCategory(category.name).map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="skill-bar h-full rounded-full transition-all duration-300"
                          data-width={skill.level}
                          style={{ width: 0 }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="soft-skills">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 text-center">Habilidades Blandas</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {softSkills.map((skill, index) => (
              <div
                key={index}
                className="soft-skill-card bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:bg-accent/5 group"
              >
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  {skill.icon}
                </div>
                <h4 className="text-base sm:text-lg font-bold text-foreground mb-2 sm:mb-3">{skill.name}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-2xl p-6 sm:p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Enfoque de Desarrollo</h3>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Mi enfoque se centra en crear código limpio, mantenible y escalable. Aplico principios SOLID, 
            patrones de diseño y mejores prácticas de la industria para entregar soluciones robustas que 
            impulsen el crecimiento del negocio.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;