import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Calendar, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: string;
  demoUrl?: string;
  githubUrl?: string;
  year: string;
}

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Tamagotchi",
      description: "Proyecto final de DAM: Tamagotchi completo hecho en Java con base jugable",
      longDescription: "Proyecto final de DAM: Tamagotchi es una aplicación hecha en Java. Los valores de la mascota se manejan con una base de datos local hecha con SQLite3 y con una API de tiempo para manejar la temperatura y lluvias del lugar del ordenador donde se ejecute. Tiene base jugable. Cada apartado tiene profundidad pero para no perderse hay un tutorial... ¡Descárgalo y juega!",
      image: "/tamagotchi.png",
      technologies: ["Java", "SQLite3", "API"],
      category: "Backend",
      githubUrl: "https://github.com/marcosblz/Tamagotchi",
      year: "2023"
    }
  ];

  useEffect(() => {
    // Animate project cards with stagger
    gsap.fromTo('.project-card',
      { y: 50, opacity: 0, rotationY: 15 },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
    
    // Animate modal entrance
    if (modalRef.current) {
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      );
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 50,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setSelectedProject(null);
          document.body.style.overflow = 'unset';
        }
      });
    }
  };

  return (
    <section id="proyectos" className="projects-section py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">Proyectos</h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground">Experiencia práctica en desarrollo backend y soluciones empresariales</p>
        </div>

        {/* Projects Grid */}
        <div className="projects-container flex justify-center max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card group cursor-pointer perspective-1000 max-w-md w-full"
              onClick={() => openModal(project)}
            >
              <div className="relative bg-background/80 backdrop-blur-sm border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform-gpu hover:-translate-y-6 hover:rotate-1 h-full flex flex-col">
                {/* Image Container */}
                <div className="relative overflow-hidden h-64 sm:h-72 lg:h-80">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-5 left-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                      project.id === 1 
                        ? 'bg-orange-500/90 text-white' 
                        : 'bg-accent/90 text-white'
                    }`}>
                      {project.id === 1 ? 'En Desarrollo' : project.category}
                    </span>
                  </div>

                  {/* Year Badge */}
                  <div className="absolute top-5 right-5">
                    <div className="flex items-center px-3 py-1.5 bg-black/50 text-white rounded-full text-sm backdrop-blur-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {project.year}
                    </div>
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute bottom-5 left-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex space-x-4">
                      {project.demoUrl && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.demoUrl, '_blank');
                          }}
                          className="flex items-center px-5 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all duration-300 hover:scale-105 text-sm font-medium"
                        >
                          <ExternalLink className="w-4 h-4 mr-2.5" />
                          Demo
                        </button>
                      )}
                      {project.githubUrl && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.githubUrl, '_blank');
                          }}
                          className="flex items-center px-5 py-2.5 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm text-sm font-medium"
                        >
                          <Github className="w-4 h-4 mr-2.5" />
                          Código
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 sm:p-10 flex-1 flex flex-col">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-5 leading-relaxed text-base sm:text-lg flex-1">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-3 mt-auto">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium hover:bg-accent hover:text-white transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1.5 bg-muted text-muted-foreground rounded-full text-sm">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Border Glow Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/20 via-transparent to-accent/20 blur-sm"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div
              ref={modalRef}
              className="bg-background border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 sm:h-80 object-cover rounded-t-2xl"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-4 text-white mb-4">
                    <div className="flex items-center px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-white/20">
                      <Calendar className="w-5 h-5 mr-2" />
                      {selectedProject.year}
                    </div>
                    <span className="px-3 py-1 bg-accent/90 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/20">
                      {selectedProject.category}
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-accent backdrop-blur-sm text-white rounded-lg hover:bg-accent/90 transition-colors duration-300 border border-white/20"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ver Demo
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-black/60 backdrop-blur-sm text-white rounded-lg hover:bg-black/70 transition-colors duration-300 border border-white/20"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Ver Código
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{selectedProject.title}</h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6 text-base sm:text-lg">
                  {selectedProject.longDescription}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-foreground mb-3">Tecnologías Utilizadas</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-accent/10 text-accent rounded-lg text-sm font-medium hover:bg-accent hover:text-white transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;