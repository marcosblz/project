import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Clock } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  useEffect(() => {
    gsap.fromTo('.contact-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const handleEmailClick = async () => {
    const subject = encodeURIComponent('Oportunidad de Colaboración');
    const body = encodeURIComponent(`Hola Marcos,

He visto tu portfolio y me gustaría hablar contigo sobre una oportunidad.

¿Tienes disponibilidad para una llamada?

Saludos,
[Tu nombre]`);
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=marcosbaezalopez@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  const handlePhoneClick = () => {
    window.open('tel:+34717705991', '_self');
  };

  return (
    <section id="contacto" className="contact-section py-8 sm:py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Contacto</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">¿Listo para trabajar juntos? ¡Hablemos!</p>
        </div>

        {/* Main Contact Grid - 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          
          {/* Email Card */}
          <div 
            onClick={handleEmailClick}
            className="contact-card bg-background/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Mail className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300 mb-1">Email</h3>
                <p className="text-sm sm:text-base text-muted-foreground truncate">marcosbaezalopez@gmail.com</p>
                <p className="text-xs sm:text-sm text-accent font-medium mt-1">Click para enviar mensaje</p>
              </div>
            </div>
          </div>

          {/* Phone Card */}
          <div 
            onClick={handlePhoneClick}
            className="contact-card bg-background/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Phone className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-green-500 transition-colors duration-300 mb-1">Teléfono</h3>
                <p className="text-sm sm:text-base text-muted-foreground">+34 717 705 991</p>
                <p className="text-xs sm:text-sm text-green-500 font-medium mt-1">Click para llamar</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="contact-card bg-background/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <MapPin className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg sm:text-xl font-bold text-foreground mb-1">Ubicación</h4>
                <p className="text-sm sm:text-base text-muted-foreground">Madrid, España</p>
                <p className="text-xs sm:text-sm text-purple-500 font-medium mt-1">Disponible para remoto</p>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="contact-card bg-background/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full animate-pulse"></div>
              </div>
              <div className="flex-1">
                <h4 className="text-lg sm:text-xl font-bold text-foreground mb-1">Estado</h4>
                <p className="text-sm sm:text-base text-green-600 dark:text-green-400 font-medium">Disponible</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Respuesta en 24h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Row */}
        <div className="mb-8 sm:mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            
            {/* GitHub Card */}
            <a
              href="https://github.com/marcosblz?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card bg-background/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-600 dark:to-gray-700 group-hover:from-gray-600 group-hover:to-gray-700 dark:group-hover:from-gray-500 dark:group-hover:to-gray-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Github className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 mb-1">GitHub</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">Código fuente y proyectos</p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">Ver repositorios y contribuciones</p>
                </div>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href="https://www.linkedin.com/in/marcosbaeza"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card bg-background/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-blue-600 to-blue-700 group-hover:from-blue-500 group-hover:to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Linkedin className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-blue-600 transition-colors duration-300 mb-1">LinkedIn</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">Experiencia profesional</p>
                  <p className="text-xs sm:text-sm text-blue-600 font-medium mt-1">Conectar y ver trayectoria</p>
                </div>
              </div>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;