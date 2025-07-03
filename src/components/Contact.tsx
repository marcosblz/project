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

    // Floating animation for contact cards
    gsap.to('.floating-card', {
      y: -10,
      duration: 3,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.5
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
    const subject = encodeURIComponent('🚀 Oportunidad de Colaboración - Portfolio');
    const body = encodeURIComponent(`Hola Marcos,

He visto tu portfolio y me ha impresionado tu experiencia en desarrollo backend y tu enfoque en la calidad del código.

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
    const subject = encodeURIComponent('🚀 Oportunidad de Colaboración - Portfolio');
    const body = encodeURIComponent(`Hola Marcos,

He visto tu portfolio y me ha impresionado tu experiencia en desarrollo backend y tu enfoque en la calidad del código.

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
      icon: <Github className="w-5 sm:w-6 h-5 sm:h-6" />,
      label: "GitHub",
      href: "https://github.com",
      color: "from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800",
      description: "Código y proyectos"
    },
    {
      icon: <Linkedin className="w-5 sm:w-6 h-5 sm:h-6" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/marcosbaeza",
      color: "from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700",
      description: "Perfil profesional"
    }
  ];

  return (
    <section id="contacto" className="contact-section py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-2xl mb-6 shadow-lg">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Hablemos
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            ¿Tienes un proyecto en mente? Me encantaría conocer más sobre tu idea y cómo puedo ayudarte a hacerla realidad.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Main Contact Card */}
            <div className="lg:col-span-2">
              <div className="contact-card floating-card bg-background/90 backdrop-blur-xl border border-border/50 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5 rounded-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-xl flex items-center justify-center mr-4 shadow-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Contacto Directo</h3>
                      <p className="text-muted-foreground">La forma más rápida de conectar</p>
                    </div>
                  </div>

                  {/* Email Section */}
                  <div className="bg-muted/30 rounded-2xl p-6 mb-6 border border-border/30">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Email</p>
                        <p className="text-lg font-semibold text-foreground">marcosbaezalopez@gmail.com</p>
                      </div>
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-accent" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        onClick={openGmail}
                        className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium group"
                      >
                        <ExternalLink className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                        Gmail
                      </button>
                      
                      <button
                        onClick={openOutlook}
                        className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium group"
                      >
                        <ExternalLink className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                        Outlook
                      </button>
                      
                      <button
                        onClick={copyEmailToClipboard}
                        className={`flex items-center justify-center px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 font-medium ${
                          copiedEmail 
                            ? 'bg-green-500 text-white' 
                            : 'bg-muted hover:bg-muted/80 text-foreground hover:shadow-lg'
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

                  {/* Phone Section */}
                  <div className="bg-muted/30 rounded-2xl p-6 border border-border/30">
                    <button
                      onClick={() => window.open('tel:+34717705991', '_self')}
                      className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-accent/10 transition-all duration-300 group"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                          <Phone className="w-5 h-5 text-green-500 group-hover:text-white" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Teléfono</p>
                          <p className="text-lg font-semibold text-foreground">+34 717 705 991</p>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Location */}
              <div className="contact-card floating-card bg-background/90 backdrop-blur-xl border border-border/50 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mr-3">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Ubicación</p>
                      <p className="text-lg font-semibold text-foreground">Madrid, España</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Disponible para trabajo remoto y presencial en la Comunidad de Madrid.
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="contact-card floating-card bg-background/90 backdrop-blur-xl border border-border/50 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5 rounded-3xl"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-foreground mb-6 flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    Redes Sociales
                  </h3>
                  <div className="space-y-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center p-4 bg-gradient-to-r ${social.color} text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group`}
                      >
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-white/30 transition-colors">
                          {social.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{social.label}</p>
                          <p className="text-sm text-white/80">{social.description}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="contact-card floating-card bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                    <h3 className="text-lg font-bold text-foreground">Disponible</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Actualmente estoy disponible para nuevos proyectos y oportunidades que me permitan crecer profesionalmente.
                  </p>
                  <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                    <p className="text-xs text-green-700 dark:text-green-400 font-medium">
                      💼 Respuesta en menos de 24 horas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;