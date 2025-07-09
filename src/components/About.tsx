import React, { useEffect, useState } from 'react';
import { User, Clock, Mail, Phone } from 'lucide-react';
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
      text: "¡Hola! 👋 Soy Marcos, desarrollador back-end con pasión por crear experiencias digitales increíbles.",
      isBot: true,
      timestamp: getCurrentTime()
    }
  ]);
  
  const [availableOptions, setAvailableOptions] = useState<ChatOption[]>([
  {
    id: 1,
    text: "¿Cómo abordas un problema de programación complejo que no entiendes de inmediato?",
    response: "Cuando me enfrento a un problema complejo que no entiendo de inmediato, lo primero que hago es revisar la documentación técnica, ya que suele aportar pistas sobre la mejor forma de resolverlo. A continuación, implemento logs con herramientas como la librería 'logging' de Python para obtener información precisa del flujo de ejecución y localizar el posible origen del problema. Si sigo atascado, descompongo el problema en partes más pequeñas, hago pruebas específicas y, si lo considero útil, consulto con algún compañero para obtener otro punto de vista."
  },
  {
    id: 2,
    text: "Cuéntame de un bug especialmente difícil que resolviste. ¿Cómo lo solucionaste y cómo te sentiste?",
    response: "En mi TFC tuve un bug complicado con la concurrencia en Java: la app se bloqueaba al abrir varias ventanas. Lo solucioné creando un hilo nuevo para cada ventana, tras investigar en StackOverflow y foros técnicos. Nadie llegó a usar la app salvo el jurado, pero al exponerla funcionaba perfectamente. Me sentí orgulloso y satisfecho por haber sido capaz de aprender sobre la marcha y no rendirme hasta resolverlo."
  },
  {
    id: 3,
    text: "Describe una ocasión en la que cometiste un error de programación importante. ¿Cómo lo detectaste y qué aprendiste?",
    response: "Una vez ejecuté un script masivo en producción y colapsé el servidor de la empresa. Me di cuenta porque el sistema se volvió muy lento, y en cuestión de minutos varios compañeros vinieron a mi mesa para ver qué estaba pasando. Desde entonces, siempre pruebo todo en un entorno de desarrollo igual al de producción antes de ejecutar nada en real, y aprendí la importancia de validar cuidadosamente las instrucciones y prever riesgos antes de lanzar cualquier cambio crítico."
  },
  {
    id: 4,
    text: "¿Cómo manejas la presión de plazos ajustados o cambios inesperados en los requisitos del proyecto?",
    response: "Cuando hay plazos ajustados o cambios inesperados en el proyecto, utilizo metodologías ágiles como Scrum o Kanban, según lo que mejor se adapte al equipo. Me centro en priorizar tareas, desglosar el trabajo en entregas pequeñas y mantener una comunicación constante con el equipo para ajustar el plan y los objetivos si es necesario. Así logro mantener la calidad y cumplir con los plazos, incluso cuando hay presión."
  },
  {
    id: 5,
    text: "¿Qué haces cuando alguien critica duramente tu código en una revisión?",
    response: "Cuando recibo críticas duras sobre mi código, escucho atentamente el feedback y agradezco la opinión. Analizo cada sugerencia y, si me convence, la aplico y documentó el cambio en el código y los commits. Si no estoy de acuerdo, lo discuto con argumentos para llegar a la mejor solución posible."
  },
  {
    id: 6,
    text: "¿Cómo decides cuándo tu código está listo para producción en lugar de seguir mejorándolo?",
    response: "Considero que el código está listo para producción cuando cumple con todos los requisitos del proyecto y pasa los tests correspondientes en preproducción. Me centro en asegurar que sea estable y cumpla con lo esperado por el cliente o usuario. En ese punto, priorizo la entrega y la fiabilidad por encima de seguir puliendo detalles menores que no aportan valor inmediato."
  },
  {
    id: 7,
    text: "¿Cómo explicas conceptos técnicos complejos a alguien sin conocimientos técnicos?",
    response: "Cuando tengo que explicar conceptos técnicos complejos a alguien sin experiencia, recurro a analogías sencillas y ejemplos del día a día. Por ejemplo, ayudé a dos compañeros de prácticas a entender cómo funciona la arquitectura backend de nuestro proyecto con esquemas y comparaciones cotidianas. Siempre me aseguro de pedir feedback para confirmar que se ha entendido y adapto la explicación si es necesario. Además, disfruto mucho este tipo de retos porque creo que la comunicación es clave en cualquier equipo."
  },
  {
    id: 8,
    text: "¿Qué haces para mantener tus conocimientos y habilidades de programación actualizadas?",
    response: "Me mantengo actualizado con cursos online en plataformas como Udemy, la lectura de libros técnicos y siguiendo a influencers del mundo de la programación en redes sociales. También me gusta practicar con proyectos personales para poner en práctica lo que aprendo y estar al día con las tendencias del sector."
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

      // Check if all questions have been answered and add final message
      const newUsedOptions = [...usedOptions, option.id];
      if (newUsedOptions.length === availableOptions.length) {
        setTimeout(() => {
          const finalMessage: Message = {
            id: Date.now() + 2,
            text: '',
            isBot: true,
            timestamp: getCurrentTime()
          };

          setMessages(prev => [...prev, finalMessage]);

          const finalText = "¡Genial! 🎉 Has conocido más sobre mi experiencia y forma de trabajar. Si te interesa colaborar conmigo o tienes algún proyecto en mente, ¡me encantaría escucharte!";
          const finalText2 = "😊 Si te has quedado con alguna duda o te gustaría preguntarme algo más, pásate por la pestaña de contacto 📬. ¡Me encantará charlar contigo y responder a cualquier pregunta que tengas!";
          
          typewriterEffect(finalText2, (currentText) => {
            setMessages(prev => 
              prev.map(msg => 
                msg.id === finalMessage.id ? { ...msg, text: currentText } : msg
              )
            );
          });
        }, 2000);
      }

      // Auto scroll to bottom
      setTimeout(() => {
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      }, 100);
    }, 1000);
  };

  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentOptions = availableOptions.filter(option => !usedOptions.includes(option.id));
  const allQuestionsAnswered = usedOptions.length === availableOptions.length;

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
                    src="./marcos.png"
                    alt="Marcos"
                    className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 rounded-full border-2 border-accent/20"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base lg:text-lg">Marcos</h3>
                  <p className="text-xs sm:text-sm text-green-500 flex items-center font-medium">
                    <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full mr-1 sm:mr-2 animate-pulse"></span>
                    Disponible para nuevos proyectos
                  </p>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-xs text-muted-foreground">Desarrollador Back-End</p>
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
          {currentOptions.length > 0 ? (
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
          ) : allQuestionsAnswered && (
            <div className="p-3 sm:p-4 lg:p-6 border-t border-border bg-gradient-to-r from-accent/10 to-green-500/10">
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center px-3 sm:px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 shadow-sm"
                >
                  Ir a Contacto
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;