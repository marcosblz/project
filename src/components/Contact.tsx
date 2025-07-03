import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6" />,
      label: "Email",
      value: "marcosbaezalopez@gmail.com",
      href: "mailto:marcosbaezalopez@gmail.com"
    },
    {
      icon: <Phone className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6" />,
      label: "Teléfono",
      value: "+34 123 456 789",
      href: "tel:+34123456789"
    },
    {
      icon: <MapPin className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6" />,
      label: "Ubicación",
      value: "Madrid, España",
      href: "#"
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
      href: "https://linkedin.com",
      color: "hover:bg-blue-600"
    },
    {
      icon: <Twitter className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6" />,
      label: "Twitter",
      href: "https://twitter.com",
      color: "hover:bg-blue-400"
    }
  ];

  return (
    <section id="contacto" className="contact-section py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Contacto</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">¿Listo para trabajar juntos? ¡Hablemos!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="contact-card bg-background/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg h-full flex flex-col">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-4 sm:mb-6">Envíame un mensaje</h3>
              
              {isSubmitted && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-800">
                  <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  <span className="text-sm sm:text-base">¡Mensaje enviado con éxito! Te responderé pronto.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 lg:space-y-6 flex-1 flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-xs sm:text-sm lg:text-base"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-xs sm:text-sm lg:text-base"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
                    Asunto *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 text-xs sm:text-sm lg:text-base"
                    placeholder="¿De qué quieres hablar?"
                  />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 resize-none flex-1 text-xs sm:text-sm lg:text-base"
                    placeholder="Cuéntame sobre tu proyecto o idea..."
                    style={{ minHeight: '120px' }}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center mt-auto text-xs sm:text-sm lg:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 sm:h-5 w-4 sm:w-5 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Contact Information */}
            <div className="contact-card bg-background/80 backdrop-blur-sm border border-border rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground mb-3 sm:mb-4 lg:mb-6">Información de Contacto</h3>
              <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center p-2 sm:p-3 rounded-lg hover:bg-accent/10 transition-colors duration-300 group"
                  >
                    <div className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-2 sm:mr-3 lg:mr-4 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-foreground text-xs sm:text-sm lg:text-base">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="contact-card bg-background/80 backdrop-blur-sm border border-border rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground mb-3 sm:mb-4 lg:mb-6">Redes Sociales</h3>
              <div className="flex space-x-2 sm:space-x-3 lg:space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110 ${social.color}`}
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4">
                Sígueme para ver mis últimos proyectos y actualizaciones sobre tecnología.
              </p>
            </div>

            {/* Availability */}
            <div className="contact-card bg-gradient-to-br from-accent/10 to-secondary/10 border border-accent/20 rounded-xl p-3 sm:p-4 lg:p-6">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground mb-3 sm:mb-4 flex items-center">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Disponible para proyectos
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Actualmente estoy disponible para nuevos proyectos freelance y oportunidades de colaboración. 
                ¡No dudes en contactarme!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;