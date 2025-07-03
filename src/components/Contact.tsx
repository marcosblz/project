import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Copy, ExternalLink } from 'lucide-react';
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
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = 'marcosbaezalopez@gmail.com';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const openGmail = () => {
    const subject = encodeURIComponent('Contacto desde Portfolio');
    const body = encodeURIComponent('Hola Marcos,\n\nMe gustaría contactar contigo para...\n\nSaludos,');
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=marcosbaezalopez@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  const openOutlook = () => {
    const subject = encodeURIComponent('Contacto desde Portfolio');
    const body = encodeURIComponent('Hola Marcos,\n\nMe gustaría contactar contigo para...\n\nSaludos,');
    const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=marcosbaezalopez@gmail.com&subject=${subject}&body=${body}`;
    window.open(outlookUrl, '_blank');
  };

  const contactInfo = [
    {
      icon: <Mail className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6" />,
      label: "Email",
      value: "marcosbaezalopez@gmail.com",
      action: "email"
    },
    {
      icon: <Phone className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6" />,
      label: "Teléfono",
      value: "+34 717705991",
      action: "phone"
    },
    {
      icon: <MapPin className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6" />,
      label: "Ubicación",
      value: "Madrid, España",
      action: "location"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6" />,
      label: "GitHub",
      href: "https://github.com",
      color: "hover:bg-gray-700"
    },
    {
      icon: <Linkedin className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/marcosbaeza",
      color: "hover:bg-blue-600"
    }
  ];

  const handleContactClick = (action: string, value: string) => {
    switch (action) {
      case 'phone':
        window.open(`tel:${value.replace(/\s/g, '')}`, '_self');
        break;
      case 'location':
        // No action for location
        break;
    }
  };

  return (
    <section id="contacto" className="contact-section py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Contacto</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">¿Listo para trabajar juntos? ¡Hablemos!</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Contact Information */}
            <div className="contact-card bg-background/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-4 sm:mb-6">Información de Contacto</h3>
              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="group">
                    {item.action === 'email' ? (
                      <div className="space-y-3">
                        <div className="flex items-center p-3 rounded-lg hover:bg-accent/10 transition-colors duration-300">
                          <div className="w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 bg-accent/10 rounded-lg flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">{item.label}</p>
                            <p className="font-medium text-foreground text-sm sm:text-base">{item.value}</p>
                          </div>
                        </div>
                        
                        {/* Email Action Buttons */}
                        <div className="ml-16 sm:ml-20 space-y-2">
                          <button
                            onClick={openGmail}
                            className="w-full flex items-center justify-center px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 text-sm font-medium"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Abrir Gmail
                          </button>
                          
                          <button
                            onClick={openOutlook}
                            className="w-full flex items-center justify-center px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 text-sm font-medium"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Abrir Outlook
                          </button>
                          
                          <button
                            onClick={copyEmailToClipboard}
                            className="w-full flex items-center justify-center px-4 py-2.5 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-all duration-300 text-sm font-medium"
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            {copiedEmail ? '¡Copiado!' : 'Copiar Email'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleContactClick(item.action, item.value)}
                        disabled={item.action === 'location'}
                        className={`w-full flex items-center p-3 rounded-lg transition-colors duration-300 group text-left ${
                          item.action === 'location' 
                            ? 'cursor-default' 
                            : 'hover:bg-accent/10 cursor-pointer'
                        }`}
                      >
                        <div className={`w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 bg-accent/10 rounded-lg flex items-center justify-center mr-3 sm:mr-4 transition-all duration-300 ${
                          item.action === 'location' 
                            ? '' 
                            : 'group-hover:bg-accent group-hover:text-white'
                        }`}>
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <p className="font-medium text-foreground text-sm sm:text-base">{item.value}</p>
                        </div>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media & Availability */}
            <div className="space-y-6">
              {/* Social Media */}
              <div className="contact-card bg-background/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-4 sm:mb-6">Redes Sociales</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110 ${social.color}`}
                      title={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Sígueme para ver mis últimos proyectos y actualizaciones sobre tecnología.
                </p>
              </div>

              {/* Availability */}
              <div className="contact-card bg-gradient-to-br from-accent/10 to-secondary/10 border border-accent/20 rounded-xl p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-4 flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                  Disponible para proyectos
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Actualmente estoy disponible para nuevos desafíos que me reten a ser mejor profesional. 
                  ¡No dudes en contactarme!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;