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
    response: "Lo primero es asegurarme de entender el problema al 100 %: formulo hipótesis, reviso la documentación y dibujo diagramas de flujo o se lo explico en voz alta a un compañero para verlo con perspectiva. Luego descompongo el problema en subproblemas más pequeños, creo tests para cada uno y avanzo por etapas, validando en cada paso que la solución funcione antes de reunirlo todo."
  },
  {
    id: 2,
    text: "Cuéntame de un bug especialmente difícil que resolviste. ¿Cómo lo solucionaste y cómo te sentiste?",
    response: "En mi proyecto final de DAM, estaba creando una aplicación de Tamagotchi en JavaNo comprendía bien la concurrencia en Java, por lo que mi app se bloqueaba al abrir varias ventanas. Decidí detenerme, aprender cómo Java gestiona procesos simultáneos y, gracias a esa comprensión, abrí cada ventana de forma independiente. En cuestión de minutos el bloqueo que tanto me había frustrado se desvaneció. Esta experiencia me enseñó la importancia de detenerme a comprender bien cómo funciona la tecnología antes de lanzarme a programar, lo que me ahorra tiempo y evita bloqueos en el futuro."
  },
  {
    id: 3,
    text: "Describe una ocasión en la que cometiste un error de programación importante. ¿Cómo lo detectaste y qué aprendiste?",
    response: "Al ejecutar un script masivo en producción colapsé la web de la empresa y tuve que esperar a que terminara la cola de ejecución porque no habia manera de pararla. Tras esa experiencia, pedí un servidor de desarrollo independiente, acordé plazos realistas y aprendí a cuestionar instrucciones."
  },
  {
    id: 4,
    text: "¿Cómo manejas la presión de plazos ajustados o cambios inesperados en los requisitos del proyecto?",
    response: "Reviso las tareas críticas, establezco prioridades y aviso al equipo sobre el impacto. Propongo soluciones realistas, mantengo la calma y ajusto el plan para cumplir con la calidad esperada."
  },
  {
    id: 5,
    text: "¿Qué haces cuando alguien critica duramente tu código en una revisión?",
    response: "Escucho con atención, agradezco el feedback y analizo las sugerencias. Si tiene sentido, lo aplico de inmediato; si no, lo discuto para encontrar juntos la mejor solución."
  },
  {
    id: 6,
    text: "¿Cómo decides cuándo tu código está listo para producción en lugar de seguir mejorándolo?",
    response: "Verifico que pase los tests que he definido, evalúo posibles riesgos o conflictos y, si es estabile, lo publico."
  },
  {
    id: 7,
    text: "¿Cómo explicas conceptos técnicos complejos a alguien sin conocimientos técnicos?",
    response: "Uso ejemplos del día a día y analogías sencillas. Si la persona lo requiere, dibujo esquemas básicos, evito jerga y confirmo que lo han entendido."
  },
  {
    id: 8,
    text: "¿Qué haces para mantener tus conocimientos y habilidades de programación actualizadas?",
    response: "Estudio con cursos online regularmente, realizo mis propios proyectos y practico resolviendo problemas de lógica."
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
                    src="./marcos2.jpg"
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