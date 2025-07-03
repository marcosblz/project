import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Copy, CheckCircle } from 'lucide-react';
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

He visto tu portfolio y me gustaría hablar contigo sobre una oportunidad.

¿Tienes disponibilidad para una llamada?

Saludos,
[Tu nombre]`);
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=marcosbaezalopez@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  const openOutlook = () => {
    const subject = encodeURIComponent('Oportunidad de Colaboración');
    const body = encodeURIComponent(`Hola Marcos,

He visto tu portfolio y me gustaría hablar contigo sobre una oportunidad.

¿Tienes disponibilidad para una llamada?

Saludos,
[Tu nombre]`);
    
    const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=marcosbaezalopez@gmail.com&subject=${subject}&body=${body}`;
    window.open(outlookUrl, '_blank');
  };

  return (
    <section id="contacto" className="contact-section py-8 sm:py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Contacto</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">¿Listo para trabajar juntos? ¡Hablemos!</p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          
          {/* Email Card */}
          <div className="contact-card bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mr-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Email</h3>
                <p className="text-muted-foreground">marcosbaezalopez@gmail.com</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={openGmail}
                className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300 font-medium"
              >
                Gmail
              </button>
              <button
                onClick={openOutlook}
                className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 font-medium"
              >
                Outlook
              </button>
              <button
                onClick={copyEmailToClipboard}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-300 font-medium ${
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

          {/* Phone Card */}
          <div className="contact-card bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Teléfono</h3>
                <p className="text-muted-foreground">+34 717 705 991</p>
              </div>
            </div>
            
            <button
              onClick={() => window.open('tel:+34717705991', '_self')}
              className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-300 font-medium"
            >
              <Phone className="w-4 h-4 mr-2" />
              Llamar Ahora
            </button>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Location */}
            <div className="contact-card bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2">Ubicación</h4>
              <p className="text-muted-foreground">Madrid, España</p>
            </div>

            {/* Availability */}
            <div className="contact-card bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2">Estado</h4>
              <p className="text-green-600 dark:text-green-400 font-medium">Disponible</p>
            </div>

            {/* Social */}
            <div className="contact-card bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
              <h4 className="text-lg font-bold text-foreground mb-4">Redes Sociales</h4>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  title="GitHub"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/marcosbaeza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  title="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;