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
  {
    id: 1,
    text: "¿Cómo abordas un problema de programación complejo que no entiendes de inmediato?",
    response: "Primero busco entender 100% el problema, y una vez entendido tirar de algún hilo que me permita encontrar la solución descomponiendo el problema."
  },
  {
    id: 2,
    text: "Cuéntame de un bug especialmente difícil que resolviste. ¿Cómo lo solucionaste y cómo te sentiste?",
    response: "En mi proyecto final de DAM, el Tamagotchi que puedes encontrar en el apartado Proyectos, enfrenté un bug que tenía que ver con concurrencia de ventanas, tenía mucha prisa por implementar un juego para que tuviese una base jugable el proyecto, pero las prisas combinadas con una falta de entendimiento general de lo que es un hilo me hicieron perder la cabeza. Paré, estudié y lo resolví, así de simple, me sentí súper tonto, una sola línea de código me habia estado frenando un mes de desarrollo. Ahí comprendí que no es buena idea el hacer algo sin entender que estás haciendo, esto con la IA se vuelve mucho más peligroso, por eso trato de primero entender que va a hacer o como resolver el problema antes de plantearme resolverlo."
  },
  {
    id: 3,
    text: "Describe una ocasión en la que cometiste un error de programación importante. ¿Cómo lo detectaste y qué aprendiste?",
    response: "Hubo una vez que bloqueé la página web de la empresa en la que estoy trabajando, hice una edición masiva y nadie pudo hacer nada cerca de una hora, el impacto fue grande y la cara que se me ponía cada vez que alguien me preguntaba era un poema... aprendí que hay cosas que no hay que hacer cuando la situación no es realmente crítica, tenía prisa por entregar todo y no paré a valorar consecuencias."
  },
  {
    id: 4,
    text: "¿Cómo manejas la presión de plazos ajustados o cambios inesperados en los requisitos del proyecto?",
    response: "El reclutador quiere evaluar tu capacidad para priorizar tareas, comunicarte proactivamente y adaptarte con calma y eficacia ante imprevistos."
  },
  {
    id: 5,
    text: "¿Qué haces cuando alguien critica duramente tu código en una revisión?",
    response: "El reclutador desea ver tu apertura al feedback, humildad al debatir mejoras y tu disposición a colaborar para elevar la calidad del código."
  },
  {
    id: 6,
    text: "¿Cómo decides cuándo tu código está listo para producción en lugar de seguir mejorándolo?",
    response: "El reclutador busca entender tu equilibrio entre calidad y pragmatismo: uso de pruebas, criterios de riesgo y respeto a los plazos."
  },
  {
    id: 7,
    text: "¿Cómo explicas conceptos técnicos complejos a alguien sin conocimientos técnicos?",
    response: "El reclutador quiere ver tu habilidad para simplificar ideas, usar analogías claras y adaptar el lenguaje al interlocutor."
  },
  {
    id: 8,
    text: "¿Qué haces para mantener tus conocimientos y habilidades de programación actualizadas?",
    response: "El reclutador espera conocer tu iniciativa de aprendizaje continuo: cursos, proyectos personales, participación en comunidades y lectura de documentación."
  }
]);


  const [usedOptions, setUsedOptions] = useState<number[]>([]);

  useEffect(() => {
    // Chat container height animation
    gsap.fromTo('.chat-container',
      { height: 0, opacity: 0 },
      { 
        height: 'auto', 
        opacity: 1, 
        duration: 0.8, 
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
    <section id="sobre-mi" className="about-section min-h-screen flex items-center py-8 sm:py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Sobre Mí</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Conoce más sobre mi experiencia y pasión por el desarrollo</p>
        </div>

        <div className="chat-container bg-background/80 backdrop-blur-md rounded-2xl border border-border shadow-2xl overflow-hidden" 
             style={{ height: 'min(calc(100vh - 6rem), 500px)' }}>
          {/* Chat Header */}
          <div className="bg-accent/10 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Marcos"
                    className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 rounded-full border-2 border-accent/20"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base lg:text-lg">Marcos</h3>
                  <p className="text-xs sm:text-sm text-green-500 flex items-center font-medium">
                    <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full mr-1 sm:mr-2 animate-pulse"></span>
                    Disponible
                  </p>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-xs text-muted-foreground">Desarrollador Front-End</p>
                <p className="text-xs text-muted-foreground">Madrid, España</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div id="chat-messages" className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4" 
               style={{ height: 'calc(100% - 7rem)' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[90%] sm:max-w-[85%] lg:max-w-xs xl:max-w-md px-2 sm:px-3 lg:px-4 py-2 sm:py-3 rounded-2xl shadow-sm ${
                    message.isBot
                      ? 'bg-card text-foreground border border-border'
                      : 'bg-accent text-white'
                  }`}
                >
                  <p className="text-xs sm:text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 sm:mt-2 ${message.isBot ? 'text-muted-foreground' : 'text-white/70'}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Options */}
          {currentOptions.length > 0 && (
            <div className="p-3 sm:p-4 lg:p-6 border-t border-border bg-muted/20">
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">Pregúntame sobre:</p>
              <div className="flex flex-wrap gap-2">
                {currentOptions.slice(0, 3).map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionClick(option)}
                    className="chat-option inline-flex items-center px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-accent/10 hover:bg-accent hover:text-white text-accent rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 border border-accent/20"
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