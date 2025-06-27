import React, { useEffect } from 'react';
import { ExternalLink, Github, Star, Eye } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  stats?: {
    stars?: number;
    views?: string;
  };
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "E-Learning Platform",
      description: "Plataforma educativa completa con sistema de gestión de cursos, evaluaciones en tiempo real y dashboard para instructores. Incluye chat en vivo y sistema de pagos integrado.",
      image: "https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe"],
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
      stats: { stars: 234, views: "12.5k" }
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Aplicación de gestión de tareas colaborativa con funcionalidades de drag & drop, notificaciones en tiempo real y integración con calendario.",
      image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["Next.js", "Tailwind CSS", "Prisma", "WebSockets"],
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
      stats: { stars: 156, views: "8.2k" }
    },
    {
      id: 3,
      title: "Restaurant Dashboard",
      description: "Dashboard administrativo para restaurantes con gestión de menú, pedidos en tiempo real, analytics de ventas y sistema de reservas.",
      image: "https://images.pexels.com/photos/6205509/pexels-photo-6205509.jpeg?auto=compress&cs=tinysrgb&w=600",
      technologies: ["Vue.js", "Chart.js", "Express", "MongoDB"],
      demoUrl: "#",
      githubUrl: "#",
      featured: true,
      stats: { stars: 89, views: "5.1k" }
    },
    {
      id: 4,
      title: "Weather App",
      description: "Aplicación del clima con pronósticos detallados, mapas interactivos y notificaciones de alertas meteorológicas.",
      image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400",
      technologies: ["React", "OpenWeather API", "Leaflet"],
      demoUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 5,
      title: "Portfolio Website",
      description: "Sitio web portfolio personal con animaciones avanzadas, modo oscuro/claro y optimización SEO.",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400",
      technologies: ["Next.js", "Framer Motion", "MDX"],
      demoUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 6,
      title: "Chat Application",
      description: "Aplicación de chat en tiempo real con salas privadas, compartir archivos y videollamadas.",
      image: "https://images.pexels.com/photos/7688347/pexels-photo-7688347.jpeg?auto=compress&cs=tinysrgb&w=400",
      technologies: ["Socket.io", "React", "WebRTC"],
      demoUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  useEffect(() => {
    gsap.fromTo('.project-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section id="proyectos" className="projects-section py-12 sm:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Proyectos</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">Una selección de mis trabajos más destacados</p>
        </div>

        {/* Featured Projects */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8">Proyectos Destacados</h3>
          <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="project-card group bg-background/80 backdrop-blur-sm border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Project Links */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.demoUrl}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-accent hover:text-white transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-accent hover:text-white transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Project Stats */}
                  {project.stats && (
                    <div className="absolute bottom-4 left-4 flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center text-white text-sm">
                        <Star className="w-4 h-4 mr-1" />
                        {project.stats.stars}
                      </div>
                      <div className="flex items-center text-white text-sm">
                        <Eye className="w-4 h-4 mr-1" />
                        {project.stats.views}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-6">
                  <h4 className="text-lg sm:text-xl font-bold text-foreground mb-3">{project.title}</h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm sm:text-base">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 sm:px-3 py-1 bg-accent/10 text-accent rounded-full text-xs sm:text-sm font-medium hover:bg-accent hover:text-white transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Projects */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8">Otros Proyectos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {otherProjects.map((project) => (
              <div
                key={project.id}
                className="project-card bg-background/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-base sm:text-lg font-bold text-foreground pr-2">{project.title}</h4>
                  <div className="flex space-x-2 flex-shrink-0">
                    <a
                      href={project.demoUrl}
                      className="p-1 text-muted-foreground hover:text-accent transition-colors duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="p-1 text-muted-foreground hover:text-accent transition-colors duration-300"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;