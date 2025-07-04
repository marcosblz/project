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
    {
      id: 'skill-1',
      title: 'BACK-END',
      subtitle: 'Desarrollo del lado del servidor',
      icon: <Server className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      workExperience: '3 años trabajando',
      studyExperience: '4 años estudiando',
      highlights: [
        'APIs REST robustas y escalables',
        'Arquitectura de microservicios',
        'Optimización de bases de datos',
        'Integración con servicios externos'
      ],
      skills: [
        { name: 'Groovy', workTime: '1 año', studyTime: '6 meses', description: 'Desarrollo de SaaS y automatización' },
        { name: 'Python', workTime: '8 meses', studyTime: '2 años', description: 'Django, FastAPI, scripts de automatización' },
        { name: 'Java', workTime: '3 meses', studyTime: '2 años', description: 'Spring Boot, aplicaciones empresariales' },
        { name: 'Node.js', workTime: '2 meses', studyTime: '1 año', description: 'Express, APIs REST, microservicios' },
        { name: 'PostgreSQL', workTime: '1 año', studyTime: '2 años', description: 'Diseño de esquemas, optimización' },
        { name: 'MySQL', workTime: '8 meses', studyTime: '1.5 años', description: 'Bases de datos relacionales' }
      ]
    },
    {
      id: 'skill-2',
      title: 'FRONT-END',
      subtitle: 'Interfaces de usuario modernas',
      icon: <Monitor className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      workExperience: '2 años trabajando',
      studyExperience: '3 años estudiando',
      highlights: [
        'Interfaces responsivas y accesibles',
        'Componentes reutilizables',
        'Optimización de rendimiento',
        'Experiencia de usuario fluida'
      ],
      skills: [
        { name: 'JavaScript', workTime: '2 años', studyTime: '3 años', description: 'ES6+, DOM manipulation, async/await' },
        { name: 'HTML5/CSS3', workTime: '2 años', studyTime: '3 años', description: 'Semantic HTML, Flexbox, Grid' },
        { name: 'React', workTime: '6 meses', studyTime: '1 año', description: 'Hooks, Context API, componentes' },
        { name: 'TypeScript', workTime: '3 meses', studyTime: '8 meses', description: 'Tipado estático, interfaces' },
        { name: 'Tailwind CSS', workTime: '4 meses', studyTime: '6 meses', description: 'Utility-first, responsive design' },
        { name: 'GSAP', workTime: '2 meses', studyTime: '4 meses', description: 'Animaciones complejas, ScrollTrigger' }
      ]
    },
    {
      id: 'skill-3',
      title: 'DEVOPS',
      subtitle: 'Automatización y despliegue',
      icon: <GitBranch className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      workExperience: '1 año trabajando',
      studyExperience: '2 años estudiando',
      highlights: [
        'Pipelines CI/CD automatizados',
        'Containerización con Docker',
        'Monitoreo y logging',
        'Infraestructura como código'
      ],
      skills: [
        { name: 'Git', workTime: '3 años', studyTime: '3 años', description: 'Control de versiones, branching strategies' },
        { name: 'Docker', workTime: '8 meses', studyTime: '1 año', description: 'Containerización, Docker Compose' },
        { name: 'Jenkins', workTime: '6 meses', studyTime: '8 meses', description: 'Pipelines CI/CD, automatización' },
        { name: 'Linux', workTime: '1 año', studyTime: '2 años', description: 'Administración de servidores, bash' },
        { name: 'AWS', workTime: '3 meses', studyTime: '6 meses', description: 'EC2, S3, RDS, Lambda básico' },
        { name: 'Nginx', workTime: '4 meses', studyTime: '8 meses', description: 'Reverse proxy, load balancing' }
      ]
    },
    {
      id: 'skill-4',
      title: 'OTROS',
      subtitle: 'Herramientas y metodologías',
      icon: <Settings className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      workExperience: '2 años trabajando',
      studyExperience: '3 años estudiando',
      highlights: [
        'Metodologías ágiles (Scrum/Kanban)',
        'Testing y calidad de código',
        'Herramientas de diseño',
        'Análisis y documentación'
      ],
      skills: [
        { name: 'Scrum/Kanban', workTime: '2 años', studyTime: '1 año', description: 'Metodologías ágiles, gestión' },
        { name: 'REST APIs', workTime: '2 años', studyTime: '2 años', description: 'Diseño, documentación, integración' },
        { name: 'Photoshop', workTime: '6 meses', studyTime: '2 años', description: 'Edición de imágenes, optimización' },
        { name: 'Figma', workTime: '3 meses', studyTime: '8 meses', description: 'Prototipado, diseño de interfaces' },
        { name: 'Jest/Testing', workTime: '2 meses', studyTime: '6 meses', description: 'Unit testing, integration testing' },
        { name: 'Webpack', workTime: '1 mes', studyTime: '4 meses', description: 'Bundling, optimización de assets' }
      ]
    }
  ];

  const changeGrid = (viewId: string) => {
    const container = containerRef.current;
    if (!container || container.dataset.view === viewId) return;
    const products = gsap.utils.toArray<HTMLElement>('.product');
    const state = Flip.getState(products);
    container.dataset.view = viewId;
    Flip.from(state, { duration: 0.3, absolute: true, ease: 'power1.inOut' });
  };

  useEffect(() => {
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
        <div className="flex items-center mb-6">
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center mr-4 shadow-lg`}>
            {React.cloneElement(skill.icon as React.ReactElement, { className: 'w-8 h-8 text-white' })}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-2xl font-bold text-foreground tracking-wide mb-1">{skill.title}</h3>
            <p className="text-muted-foreground">{skill.subtitle}</p>
            <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-accent font-medium mt-2">
              <span>💼 {skill.workExperience}</span>
              <span>📚 {skill.studyExperience}</span>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-foreground mb-3">Especialidades:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {skill.highlights.map((highlight, i) => (
              <div key={i} className="flex items-center text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0"></div>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-foreground mb-3">Tecnologías:</h4>
          <div className="flex flex-wrap gap-2">
            {skill.skills.map((tech, i) => (
              <div key={i} className="bg-muted/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50 hover:bg-accent/10 hover:border-accent/30 transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">{tech.name}</span>
                  <div className="flex items-center space-x-1 text-xs text-accent">
                    <span>💼 {tech.workTime}</span>
                    <span className="text-muted-foreground">•</span>
                    <span>📚 {tech.studyTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="habilidades" className="py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Stack Tecnológico</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Especialización técnica por áreas de desarrollo</p>
        </div>
        <div className="skill-content max-w-6xl mx-auto">
          <div ref={containerRef} className="skills" data-view="skill-1">
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
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
                  transition: 'box-shadow 0.3s ease',
                  zIndex: index === 0 ? 1 : 'auto'
                }}
                onClick={() => changeGrid(category.id)}
                onMouseEnter={e => {
                  if (category.id !== containerRef.current?.dataset.view) {
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)';
                  }
                }}
                onMouseLeave={e => {
                  if (category.id !== containerRef.current?.dataset.view) {
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)';
                  }
                }}
              >
                {category.id === containerRef.current?.dataset.view ? (
                  getSkillContent(category.id)
                ) : (
                  <div className="p-4 h-full flex flex-col justify-center items-center text-center">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-3 shadow-lg`}>
                      {React.cloneElement(category.icon as React.ReactElement, { className: 'w-6 h-6 text-white' })}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1 tracking-wide">{category.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{category.subtitle}</p>
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
