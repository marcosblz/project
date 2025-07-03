import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Copy, ExternalLink, CheckCircle, MessageCircle, Clock, Globe } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    // Main cards animation
    gsap.fromTo('.contact-main-card',
      { y: 50, opacity: 0, rotationY: 15 },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Info cards animation
    gsap.fromTo('.contact-info-card',
      { y: 30, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.contact-info-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Floating animation for availability indicator
    gsap.to('.availability-pulse', {
      scale: 1.2,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });
  }, []);

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('marcosbaezalopez@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = 'marcosbaezalopez@gmail.com';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    }
  };

  const openGmail = () => {
    const subject = encodeURIComponent('Oportunidad de Colaboración');
    const body = encodeURIComponent(`Hola Marcos,

He visto tu portfolio y me ha impresionado tu experiencia en desarrollo backend.

Me gustaría hablar contigo sobre:
• [Describe tu proyecto o oportunidad]
• [Menciona qué te llamó la atención de mi perfil]
• [Indica si es freelance, empleo, colaboración, etc.]

¿Tienes disponibilidad para una llamada esta semana?

Saludos,
[Tu nombre]
[Tu empresa/proyecto]
[Tu contacto]`);
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=marcosbaezalopez@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  const openOutlook = () => {
    const subject = encodeURIComponent('Oportunidad de Colaboración');
    const body = encodeURIComponent(`Hola Marcos,

He visto tu portfolio y me ha impresionado tu experiencia en desarrollo backend.

Me gustaría hablar contigo sobre:
• [Describe tu proyecto o oportunidad]
• [Menciona qué te llamó la atención de mi perfil]
• [Indica si es freelance, empleo, colaboración, etc.]

¿Tienes disponibilidad para una llamada esta semana?

Saludos,
[Tu nombre]
[Tu empresa/proyecto]
[Tu contacto]`);
    
    const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=marcosbaezalopez@gmail.com&subject=${subject}&body=${body}`;
    window.open(outlookUrl, '_blank');
  };

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email",
      subtitle: "Respuesta en 24h",
      value: "marcosbaezalopez@gmail.com",
      gradient: "from-blue-600 via-cyan-500 to-teal-400",
      actions: [
        { label: "Gmail", action: openGmail, color: "bg-red-500 hover:bg-red-600" },
        { label: "Outlook", action: openOutlook, color: "bg-blue-500 hover:bg-blue-600" },
        { 
          label: copiedEmail ? "¡Copiado!" : "Copiar", 
          action: copyEmailToClipboard, 
          color: copiedEmail ? "bg-green-500" : "bg-accent hover:bg-accent/90",
          icon: copiedEmail ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />
        }
      ]
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Teléfono",
      subtitle: "Llamadas directas",
      value: "+34 717 705 991",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      actions: [
        { 
          label: "Llamar Ahora", 
          action: () => window.open('tel:+34717705991', '_self'), 
          color: "bg-green-500 hover:bg-green-600",
          icon: <Phone className="w-4 h-4" />
        }
      ]
    }
  ];

  const infoCards = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Ubicación",
      value: "Madrid, España",
      subtitle: "Remoto y presencial",
      gradient: "from-purple-600 via-blue-500 to-indigo-400"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Disponibilidad",
      value: "Disponible",
      subtitle: "Nuevos proyectos",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      pulse: true
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Redes Sociales",
      value: "Sígueme",
      subtitle: "Últimos proyectos",
      gradient: "from-orange-500 via-pink-500 to-purple-600",
      social: true
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      href: "https://github.com",
      color: "hover:bg-gray-700"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn", 
      href: "https://www.linkedin.com/in/marcosbaeza",
      color: "hover:bg-blue-600"
    }
  ];

  return (
    <section id="contacto" className="contact-section py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Contacto</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">¿Listo para trabajar juntos? ¡Hablemos!</p>
        </div>

        {/* Main Contact Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-8 sm:mb-12 lg:mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="contact-main-card bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Header */}
              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${method.gradient} rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {React.cloneElement(method.icon as React.ReactElement, {
                    className: "w-8 h-8 text-white"
                  })}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">{method.title}</h3>
                  <p className="text-sm text-muted-foreground">{method.subtitle}</p>
                </div>
              </div>

              {/* Contact Value */}
              <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border/50">
                <p className="text-foreground font-medium text-sm sm:text-base break-all">{method.value}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {method.actions.map((action, actionIndex) => (
                  <button
                    key={actionIndex}
                    onClick={action.action}
                    className={`flex items-center justify-center px-4 py-2.5 ${action.color} text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium text-sm`}
                  >
                    {action.icon && <span className="mr-2">{action.icon}</span>}
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Info Cards Grid */}
        <div className="contact-info-grid grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {infoCards.map((card, index) => (
            <div
              key={index}
              className="contact-info-card bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center group"
            >
              {/* Gradient Accent Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className={`w-12 h-12 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {React.cloneElement(card.icon as React.ReactElement, {
                    className: "w-6 h-6 text-white"
                  })}
                </div>
                
                <h4 className="text-lg font-bold text-foreground mb-2">{card.title}</h4>
                
                <div className="flex items-center justify-center mb-2">
                  <p className={`font-medium ${card.pulse ? 'text-green-600 dark:text-green-400' : 'text-foreground'}`}>
                    {card.value}
                  </p>
                  {card.pulse && (
                    <div className="availability-pulse w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{card.subtitle}</p>

                {/* Social Links */}
                {card.social && (
                  <div className="flex justify-center space-x-3">
                    {socialLinks.map((social, socialIndex) => (
                      <a
                        key={socialIndex}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-muted-foreground transition-all duration-300 shadow-md ${social.color} hover:text-white hover:scale-110`}
                        title={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;