import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Star, Eye, Calendar, Code, Database, Server } from 'lucide-react';
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
  featured: boolean;
  stats?: {
    stars?: number;
    views?: string;
  };
  year: string;
}

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const modalRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "SaaS Internal Process Automation",
      description: "Sistema de automatización de procesos internos desarrollado en Groovy y JavaScript con funcionalidades de IA integradas.",
      longDescription: "Desarrollé un sistema completo de automatización de procesos internos para Servinform, utilizando Groovy y JavaScript. El sistema incluye tanto frontend como backend, con funcionalidades de IA que mejoraron la productividad entre un 30% y 50%. Implementé APIs REST, integración con bases de datos y una interfaz intuitiva para la gestión de procesos departamentales.",
      image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["Groovy", "JavaScript", "Python", "REST APIs", "IA", "HTML", "CSS"],
      category: "backend",
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
      stats: { stars: 45, views: "2.1k" },
      year: "2024"
    },
    {
      id: 2,
      title: "Django Web Platform Enhancement",
      description: "Mejoras y nuevas funcionalidades para plataforma web interna utilizando Django y tecnologías web modernas.",
      longDescription: "Durante mis prácticas en Zener, trabajé en la mejora de una plataforma web interna desarrollada en Django. Implementé nuevas funcionalidades, optimicé consultas a la base de datos MySQL, y mejoré la arquitectura del sistema. También trabajé con Docker para containerización y desarrollé APIs REST para integración con aplicaciones Android.",
      image: "https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["Python", "Django", "MySQL", "Docker", "REST APIs", "Webpack"],
      category: "backend",
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
      stats: { stars: 32, views: "1.8k" },
      year: "2023"
    },
    {
      id: 3,
      title: "E-commerce Inventory Management",
      description: "Sistema de gestión de inventario para e-commerce con procesamiento de imágenes y gestión de almacén.",
      longDescription: "Desarrollé un sistema completo de gestión de inventario para SuperParts, incluyendo procesamiento de imágenes con PhotoShop, catalogación de productos y gestión de almacén. El sistema permitía el desmontaje de equipos informáticos, catalogación de componentes y su posterior venta online con ubicación automática en almacén.",
      image: "https://images.pexels.com/photos/6205509/pexels-photo-6205509.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["PhotoShop", "Gestión de Inventario", "Hardware", "Catalogación"],
      category: "fullstack",
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
      stats: { stars: 28, views: "1.2k" },
      year: "2021"
    },
    {
      id: 4,
      title: "Microservices Architecture Demo",
      description: "Demostración de arquitectura de microservicios con Docker y Kubernetes para aplicaciones escalables.",
      longDescription: "Proyecto personal para demostrar conocimientos en arquitectura de microservicios. Incluye múltiples servicios containerizados con Docker, orquestación con Kubernetes, y pipelines CI/CD con Jenkins. Implementa patrones como API Gateway, Service Discovery y Circuit Breaker.",
      image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400",
      technologies: ["Docker", "Kubernetes", "Jenkins", "Java", "Spring Boot", "PostgreSQL"],
      category: "devops",
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
      year: "2024"
    },
    {
      id: 5,
      title: "REST API with Authentication",
      description: "API REST completa con autenticación JWT, documentación Swagger y testing automatizado.",
      longDescription: "API REST desarrollada con Node.js y Express, implementando autenticación JWT, validación de datos, documentación automática con Swagger, y testing completo con Jest. Incluye rate limiting, logging estructurado y manejo de errores centralizado.",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400",
      technologies: ["Node.js", "Express", "JWT", "Swagger", "Jest", "MongoDB"],
      category: "backend",
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
      year: "2023"
    },
    {
      id: 6,
      title: "Database Optimization Project",
      description: "Optimización de consultas y diseño de base de datos para mejorar rendimiento en aplicaciones de alto tráfico.",
      longDescription: "Proyecto de optimización de base de datos PostgreSQL para una aplicación de alto tráfico. Incluye reestructuración de esquemas, creación de índices optimizados, implementación de particionado de tablas y optimización de consultas complejas que resultó en una mejora del 60% en tiempo de respuesta.",
      image: "https://images.pexels.com/photos/7688347/pexels-photo-7688347.jpeg?auto=compress&cs=tinysrgb&w=400",
      technologies: ["PostgreSQL", "Query Optimization", "Indexing", "Performance Tuning"],
      category: "database",
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
      year: "2023"
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos', icon: <Code className="w-4 h-4" /> },
    { id: 'backend', name: 'Backend', icon: <Server className="w-4 h-4" /> },
    { id: 'database', name: 'Database', icon: <Database className="w-4 h-4" /> },
    { id: 'devops', name: 'DevOps', icon: <Server className="w-4 h-4" /> },
    { id: 'fullstack', name: 'Full Stack', icon: <Code className="w-4 h-4" /> }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const featuredProjects = filteredProjects.filter(project => project.featured);
  const otherProjects = filteredProjects.filter(project => !project.featured);

  useEffect(() => {
    // Animate project cards with stagger
    gsap.fromTo('.project-card',
      { y: 30, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate filter buttons
    gsap.fromTo('.filter-btn',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.filter-container',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, [filteredProjects]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
    
    // Animate modal entrance
    if (modalRef.current) {
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
      );
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setSelectedProject(null);
          document.body.style.overflow = 'unset';
        }
      });
    }
  };

  const ProjectCard = ({ project, isLarge = false }: { project: Project; isLarge?: boolean }) => (
    <div
      className={`project-card group cursor-pointer bg-background/80 backdrop-blur-sm border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
        isLarge ? 'md:col-span-2 lg:col-span-1' : ''
      }`}
      onClick={() => openModal(project)}
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            isLarge ? 'h-48 sm:h-56 lg:h-64' : 'h-32 sm:h-40 lg:h-48'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-white">
            <div className="flex items-center space-x-4 mb-2">
              {project.stats && (
                <>
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 mr-1" />
                    {project.stats.stars}
                  </div>
                  <div className="flex items-center text-sm">
                    <Eye className="w-4 h-4 mr-1" />
                    {project.stats.views}
                  </div>
                </>
              )}
              <div className="flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {project.year}
              </div>
            </div>
            <div className="flex space-x-2">
              {project.demoUrl && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.demoUrl, '_blank');
                  }}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-accent hover:text-white transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
              {project.githubUrl && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.githubUrl, '_blank');
                  }}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-accent hover:text-white transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-accent/90 text-white rounded-full text-xs font-medium backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <h4 className={`font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300 ${
          isLarge ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
        }`}>
          {project.title}
        </h4>
        <p className="text-muted-foreground mb-4 leading-relaxed text-sm sm:text-base">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, isLarge ? 6 : 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium hover:bg-accent hover:text-white transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > (isLarge ? 6 : 4) && (
            <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
              +{project.technologies.length - (isLarge ? 6 : 4)}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section id="proyectos" className="projects-section py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Proyectos</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Experiencia práctica en desarrollo backend y soluciones empresariales</p>
        </div>

        {/* Filter Buttons */}
        <div className="filter-container flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`filter-btn flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                filter === category.id
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-card/80 text-muted-foreground hover:bg-accent/10 hover:text-accent border border-border'
              }`}
            >
              {category.icon}
              <span className="ml-2 text-sm sm:text-base">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-12 lg:mb-16">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-6 sm:mb-8">Proyectos Destacados</h3>
            <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  isLarge={index === 0 && featuredProjects.length > 1}
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-6 sm:mb-8">Otros Proyectos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {otherProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

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
                  ✕
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-4 text-white mb-4">
                    {selectedProject.stats && (
                      <>
                        <div className="flex items-center">
                          <Star className="w-5 h-5 mr-2" />
                          {selectedProject.stats.stars}
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-5 h-5 mr-2" />
                          {selectedProject.stats.views}
                        </div>
                      </>
                    )}
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      {selectedProject.year}
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors duration-300"
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
                        className="flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors duration-300"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Código
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground">{selectedProject.title}</h3>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                    {selectedProject.category}
                  </span>
                </div>
                
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