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
      title: "SaaS Process Automation",
      description: "Sistema de automatización de procesos internos con IA que mejoró la productividad entre 30-50%",
      longDescription: "Desarrollé un sistema completo de automatización de procesos internos para Servinform, utilizando Groovy y JavaScript. El sistema incluye tanto frontend como backend, con funcionalidades de IA que mejoraron la productividad entre un 30% y 50%. Implementé APIs REST, integración con bases de datos y una interfaz intuitiva para la gestión de procesos departamentales.",
      image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["Groovy", "JavaScript", "Python", "REST APIs", "IA", "HTML", "CSS"],
      category: "Backend",
      demoUrl: "#",
      githubUrl: "#",
      year: "2024"
    },
    {
      id: 2,
      title: "Django Web Platform",
      description: "Mejoras y optimización de plataforma web interna con Django y tecnologías modernas",
      longDescription: "Durante mis prácticas en Zener, trabajé en la mejora de una plataforma web interna desarrollada en Django. Implementé nuevas funcionalidades, optimicé consultas a la base de datos MySQL, y mejoré la arquitectura del sistema. También trabajé con Docker para containerización y desarrollé APIs REST para integración con aplicaciones Android.",
      image: "https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["Python", "Django", "MySQL", "Docker", "REST APIs", "Webpack"],
      category: "Backend",
      demoUrl: "#",
      githubUrl: "#",
      year: "2023"
    },
    {
      id: 3,
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Proyectos</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Experiencia práctica en desarrollo backend y soluciones empresariales</p>
        </div>

        {/* Projects Grid */}
        <div className="projects-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card group cursor-pointer perspective-1000"
              onClick={() => openModal(project)}
            >
              <div className="relative bg-background/80 backdrop-blur-sm border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 transform-gpu hover:-translate-y-4 hover:rotate-1 h-full flex flex-col">
                {/* Image Container */}
                <div className="relative overflow-hidden h-48 sm:h-56 lg:h-64">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-accent/90 text-white rounded-full text-xs font-medium backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Year Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center px-3 py-1 bg-black/50 text-white rounded-full text-xs backdrop-blur-sm">
                      <Calendar className="w-3 h-3 mr-1" />
                      {project.year}
                    </div>
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex space-x-3">
                      {project.demoUrl && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.demoUrl, '_blank');
                          }}
                          className="flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all duration-300 hover:scale-105"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </button>
                      )}
                      {project.githubUrl && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.githubUrl, '_blank');
                          }}
                          className="flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Código
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm sm:text-base flex-1">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium hover:bg-accent hover:text-white transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
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
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      {selectedProject.year}
                    </div>
                    <span className="px-3 py-1 bg-accent/90 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/20">
                      {selectedProject.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-white mb-4">
                    <div className="flex items-center px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                      <Calendar className="w-4 h-4 mr-2" />
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