import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Copy, ExternalLink, CheckCircle, MessageCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

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

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      href: "https://github.com",
      color: "hover:bg-gray-700",
      description: "Código y proyectos"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn", 
      href: "https://www.linkedin.com/in/marcosbaeza",
      color: "hover:bg-blue-600",
      description: "Perfil profesional"
    }
  ];

  return (
    <section id="contacto" className="contact-section py-12 sm:py-16 lg:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Contacto
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? Me encantaría conocer más sobre tu idea.
          </p>
        </div>

        {/* Main Contact Block */}
        <div className="contact-card bg-background/90 backdrop-blur-sm border border-border rounded-3xl p-8 sm:p-10 lg:p-12 shadow-xl">
          
          {/* Primary Contact Methods - Email & Phone */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-10">
            
            {/* Email Section - Priority 1 */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-accent to-secondary rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Email</h3>
                  <p className="text-muted-foreground">marcosbaezalopez@gmail.com</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={openGmail}
                  className="flex items-center justify-center px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors duration-300 font-medium shadow-md"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Gmail
                </button>
                
                <button
                  onClick={openOutlook}
                  className="flex items-center justify-center px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-300 font-medium shadow-md"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Outlook
                </button>
                
                <button
                  onClick={copyEmailToClipboard}
                  className={`flex items-center justify-center px-4 py-3 rounded-xl transition-colors duration-300 font-medium shadow-md ${
                    copiedEmail 
                      ? 'bg-green-500 text-white' 
                      : 'bg-muted hover:bg-muted/80 text-foreground'
                  }`}
                >
                  {copiedEmail ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      ¡Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Phone Section - Priority 2 */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Teléfono</h3>
                  <p className="text-muted-foreground">+34 717 705 991</p>
                </div>
              </div>
              
              <button
                onClick={() => window.open('tel:+34717705991', '_self')}
                className="inline-flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors duration-300 font-medium shadow-md"
              >
                <Phone className="w-4 h-4 mr-2" />
                Llamar Ahora
              </button>
            </div>
          </div>

          {/* Secondary Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border">
            
            {/* Location */}
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Ubicación</h4>
              <p className="text-sm text-muted-foreground">Madrid, España</p>
              <p className="text-xs text-muted-foreground mt-1">Remoto y presencial</p>
            </div>

            {/* Availability */}
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Estado</h4>
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">Disponible</p>
              <p className="text-xs text-muted-foreground mt-1">Respuesta en 24h</p>
            </div>

            {/* Social Networks - Bigger Icons */}
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="font-semibold text-foreground mb-4">Redes Sociales</h4>
              <div className="flex justify-center space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-muted-foreground transition-all duration-300 shadow-md ${social.color} hover:text-white hover:scale-105`}
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;