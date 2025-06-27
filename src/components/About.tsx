import React, { useEffect, useState } from 'react';
import { User, Clock } from 'lucide-react';
import { gsap } from 'gsap';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: string;
}

interface ChatOption {
  id: number;
  text: string;
  response: string;
}

const About: React.FC = () => {
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! 👋 Soy Marcos, desarrollador front-end con pasión por crear experiencias digitales increíbles.",
      isBot: true,
      timestamp: getCurrentTime()
    }
  ]);
  
  const [availableOptions, setAvailableOptions] = useState<ChatOption[]>([
    { id: 1, text: "¿Cuál es tu experiencia?", response: "Tengo más de 3 años desarrollando aplicaciones web modernas con React, TypeScript y tecnologías de vanguardia. He trabajado en proyectos desde startups hasta empresas Fortune 500." },
    { id: 2, text: "¿Qué tecnologías dominas?", response: "Me especializo en React, TypeScript, Next.js, Tailwind CSS, Node.js y bases de datos como PostgreSQL. También trabajo con herramientas de diseño como Figma y tengo experiencia en DevOps básico." },
    { id: 3, text: "¿Cuáles son tus proyectos favoritos?", response: "He desarrollado desde e-commerce completos hasta dashboards empresariales. Mi proyecto más reciente es una plataforma de gestión educativa que sirve a más de 1000 usuarios activos diariamente." }
  ]);

  const [usedOptions, setUsedOptions] = useState<number[]>([]);

  useEffect(() => {
    // Chat container height animation
    gsap.fromTo('.chat-container',
      { height: 0, opacity: 0 },
      { 
        height: 'auto', 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const typewriterEffect = (text: string, callback: (text: string) => void) => {
    let currentText = '';
    let index = 0;
    
    const timer = setInterval(() => {
      if (index < text.length) {
        currentText += text[index];
        callback(currentText);
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);
  };

  const handleOptionClick = (option: ChatOption) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: option.text,
      isBot: false,
      timestamp: getCurrentTime()
    };

    setMessages(prev => [...prev, userMessage]);
    setUsedOptions(prev => [...prev, option.id]);

    // Add bot response with typewriter effect
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: '',
        isBot: true,
        timestamp: getCurrentTime()
      };

      setMessages(prev => [...prev, botMessage]);

      typewriterEffect(option.response, (currentText) => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === botMessage.id ? { ...msg, text: currentText } : msg
          )
        );
      });

      // Auto scroll to bottom
      setTimeout(() => {
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      }, 100);
    }, 1000);
  };

  const currentOptions = availableOptions.filter(option => !usedOptions.includes(option.id));

  return (
    <section id="sobre-mi" className="about-section min-h-screen flex items-center py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Sobre Mí</h2>
          <p className="text-xl text-muted-foreground">Conoce más sobre mi experiencia y pasión por el desarrollo</p>
        </div>

        <div className="chat-container bg-background/80 backdrop-blur-md rounded-2xl border border-border shadow-2xl overflow-hidden" style={{ height: 'calc(100vh - 12rem)' }}>
          {/* Chat Header */}
          <div className="bg-accent/10 px-6 py-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Marcos"
                    className="w-12 h-12 rounded-full border-2 border-accent/20"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">Marcos</h3>
                  <p className="text-sm text-green-500 flex items-center font-medium">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    Disponible
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Desarrollador Front-End</p>
                <p className="text-xs text-muted-foreground">Madrid, España</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div id="chat-messages" className="flex-1 overflow-y-auto p-6 space-y-4" style={{ height: 'calc(100% - 8rem)' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                    message.isBot
                      ? 'bg-card text-foreground border border-border'
                      : 'bg-accent text-white'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 ${message.isBot ? 'text-muted-foreground' : 'text-white/70'}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Options */}
          {currentOptions.length > 0 && (
            <div className="p-6 border-t border-border bg-muted/20">
              <p className="text-sm text-muted-foreground mb-3">Pregúntame sobre:</p>
              <div className="flex flex-wrap gap-2">
                {currentOptions.slice(0, 3).map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionClick(option)}
                    className="chat-option px-4 py-2 bg-accent/10 hover:bg-accent hover:text-white text-accent rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 border border-accent/20"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;