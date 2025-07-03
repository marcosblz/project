import React, { useEffect, useRef, useState } from 'react';
import { Code, Zap, Target, ArrowRight, Server, Database, Cloud, Terminal } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TechNode {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  color: string;
  size: number;
  connections: string[];
  icon: string;
  description: string;
}

interface SoftSkill {
  name: string;
  icon: React.ReactNode;
  description: string;
}

const Skills: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Stack tecnológico con iconos SVG embebidos y posiciones optimizadas
  const techNodes: TechNode[] = [
    // Backend Core - Centro superior
    { 
      id: 'groovy', 
      name: 'Groovy', 
      category: 'backend', 
      x: 300, 
      y: 120, 
      color: '#4A90E2', 
      size: 50, 
      connections: ['java', 'rest', 'docker'],
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
      description: 'Lenguaje dinámico para JVM'
    },
    { 
      id: 'python', 
      name: 'Python', 
      category: 'backend', 
      x: 450, 
      y: 150, 
      color: '#3776AB', 
      size: 55, 
      connections: ['django', 'rest', 'mysql'],
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.26-.02.21-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25c-.2 0-.37.09-.5.27-.13.18-.2.39-.2.63 0 .24.07.45.2.63.13.18.3.27.5.27.2 0 .37-.09.5-.27.13-.18.2-.39.2-.63 0-.24-.07-.45-.2-.63-.13-.18-.3-.27-.5-.27z"/></svg>`,
      description: 'Lenguaje versátil y potente'
    },
    { 
      id: 'java', 
      name: 'Java', 
      category: 'backend', 
      x: 150, 
      y: 180, 
      color: '#ED8B00', 
      size: 52, 
      connections: ['groovy', 'mysql', 'maven'],
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"/></svg>`,
      description: 'Plataforma empresarial robusta'
    },
    { 
      id: 'django', 
      name: 'Django', 
      category: 'backend', 
      x: 550, 
      y: 220, 
      color: '#092E20', 
      size: 48, 
      connections: ['python', 'mysql', 'rest'],
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.051 1.707.204V0zm0 9.143a3.894 3.894 0 00-1.325-.204c-1.988 0-3.134 1.223-3.134 3.364 0 2.09 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V9.143zM21.314 6.06v9.098c0 3.134-.229 4.638-.917 5.937-.637 1.249-1.478 2.039-3.211 2.905l-3.644-1.733c1.733-.815 2.574-1.529 3.109-2.625.561-1.121.739-2.421.739-5.835V6.061h3.924zM17.39.021h3.924v4.026H17.39V.021z"/></svg>`,
      description: 'Framework web de alto nivel'
    },
    
    // Frontend Support - Lado izquierdo
    { 
      id: 'javascript', 
      name: 'JavaScript', 
      category: 'frontend', 
      x: 200, 
      y: 320, 
      color: '#F7DF1E', 
      size: 45, 
      connections: ['html', 'css', 'rest'],
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>`,
      description: 'Lenguaje dinámico del web'
    },
    { 
      id: 'html', 
      name: 'HTML', 
      category: 'frontend', 
      x: 100, 
      y: 380, 
      color: '#E34F26', 
      size: 40, 
      connections: ['css', 'javascript'],
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>`,
      description: 'Estructura de contenido web'
    },
    { 
      id: 'css', 
      name: 'CSS', 
      category: 'frontend', 
      x: 150, 
      y: 450, 
      color: '#1572B6', 
      size: 40, 
      connections: ['html', 'javascript'],
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/></svg>`,
      description: 'Estilos y presentación'
    },
    
    // Databases - Lado derecho
    { 
      id: 'mysql', 
      name: 'MySQL', 
      category: 'database', 
      x: 500, 
      y: 350, 
      color: '#4479A1', 
      size: 48, 
      connections: ['python', 'java', 'django'],
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H.002c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.15zm-2.064-1.474c-.4 0-.67-.168-.81-.504-.13-.31-.196-.725-.196-1.25 0-.532.073-.945.22-1.24.18-.355.49-.532.93-.532.424 0 .691.194.8.584.097.33.145.696.145 1.098 0 .425-.05.8-.154 1.125-.125.39-.35.585-.68.585-.04 0-.08-.007-.135-.02-.027-.007-.04-.007-.06-.007-.06 0-.11 0-.06.16z"/></svg>`,
      description: 'Base de datos relacional'
    },
    { 
      id: 'postgresql', 
      name: 'PostgreSQL', 
      category: 'database', 
      x: 600, 
      y: 300, 
      color: '#336791', 
      size: 44, 
      connections: ['mysql'],
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.111 5.441c-.777 1.25-2.069 2.26-3.563 2.78-.777.27-1.625.405-2.473.405-.777 0-1.555-.135-2.263-.405-.777-.27-1.485-.675-2.124-1.215-.639-.54-1.208-1.215-1.693-1.96-.485-.745-.847-1.555-1.069-2.4-.222-.845-.304-1.725-.222-2.605.082-.88.304-1.76.639-2.57.335-.81.777-1.555 1.347-2.19.57-.635 1.277-1.17 2.069-1.555.792-.385 1.693-.615 2.594-.615.901 0 1.802.23 2.594.615.792.385 1.499.92 2.069 1.555.57.635 1.012 1.38 1.347 2.19.335.81.557 1.69.639 2.57.082.88 0 1.76-.222 2.605-.222.845-.584 1.655-1.069 2.4z"/></svg>`,
      description: 'Base de datos avanzada'
    },
    
    // DevOps - Parte inferior izquierda
    { 
      id: 'docker', 
      name: 'Docker', 
      category: 'devops', 
      x: 80, 
      y: 280, 
      color: '#2496ED', 
      size: 46, 
      connections: ['kubernetes', 'jenkins', 'groovy'],
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m0 2.715h2.119a.186.186 0 00.185-.185v-1.888a.185.185 0 00-.184-.185h-2.12a.185.185 0 00-.185.185v1.888c0 .102.084.185.186.185m16.168-8.618c-3.27-2.044-9.049-1.163-12.204 2.716-1.33-1.163-2.775-1.163-4.105 0-.881.881-1.33 2.044-1.33 3.272 0 .881.22 1.762.661 2.643.881 1.762 2.775 3.272 5.105 3.272h8.379c2.33 0 4.224-1.51 5.105-3.272.441-.881.661-1.762.661-2.643 0-1.228-.449-2.391-1.33-3.272z"/></svg>`,
      description: 'Containerización'
    },
    { 
      id: 'kubernetes', 
      name: 'Kubernetes', 
      category: 'devops', 
      x: 50, 
      y: 200, 
      color: '#326CE5', 
      size: 42, 
      connections: ['docker', 'jenkins'],
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="m10.204 14.35.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 1 .173-.756l.002-.011 2.698-.76a5.427 5.427 0 0 1 .024-2.975l-2.698-.76-.002-.011a.44.44 0 0 1-.173-.756l.002-.005-1.669-2.25a5.22 5.22 0 0 1 3.096-1.786l-.004 2.618v.011a.44.44 0 0 1 .881 0v-.011l-.004-2.618a5.22 5.22 0 0 1 3.096 1.786l-1.669 2.25.002.005a.44.44 0 0 1-.173.756l-.002.011-2.698.76a5.427 5.427 0 0 1 .024 2.975l2.698.76.002.011a.44.44 0 0 1 .173.756l-.002.005 1.669 2.25a5.22 5.22 0 0 1-3.096 1.786l.004-2.618v-.011a.44.44 0 0 1-.881 0v.011l.004 2.618a5.22 5.22 0 0 1-3.096-1.786l1.669-2.25-.002-.005zm8.055-5.978-.01-.006-.999-2.413a5.171 5.171 0 0 1 2.075 2.597l-2.578.437-.004-.005a.44.44 0 0 1-.484-.61zm-.833 2.129a.44.44 0 0 1-.173.756l-.002.011-2.698.76a5.427 5.427 0 0 1-.024 2.975l2.698.76.002.011a.44.44 0 0 1 .173.756l-.002.005 1.669 2.25a5.22 5.22 0 0 1-3.096 1.786l.004-2.618v-.011a.44.44 0 0 1-.881 0v.011l.004 2.618a5.22 5.22 0 0 1-3.096-1.786l1.669-2.25-.002-.005a.44.44 0 0 1 .173-.756l.002-.011 2.698-.76a5.427 5.427 0 0 1-.024-2.975l-2.698-.76-.002-.011a.44.44 0 0 1-.173-.756l.002-.005-1.669-2.25a5.22 5.22 0 0 1 3.096-1.786l-.004 2.618v.011a.44.44 0 0 1 .881 0v-.011l-.004-2.618a5.22 5.22 0 0 1 3.096 1.786l-1.669 2.25.002.005z"/></svg>`,
      description: 'Orquestación de contenedores'
    },
    { 
      id: 'jenkins', 
      name: 'Jenkins', 
      category: 'devops', 
      x: 120, 
      y: 350, 
      color: '#D33833', 
      size: 40, 
      connections: ['docker', 'kubernetes', 'git'],
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.998 0C5.366 0 0 5.367 0 12s5.366 12 11.998 12C18.629 24 24 18.633 24 12S18.629 0 11.998 0zM8.73 4.847c.437-.862 1.344-1.446 2.393-1.446 1.048 0 1.955.584 2.392 1.446.437.862.437 1.93 0 2.792-.437.862-1.344 1.446-2.392 1.446-1.049 0-1.956-.584-2.393-1.446-.437-.862-.437-1.93 0-2.792zm6.54 14.306c-.437.862-1.344 1.446-2.392 1.446-1.049 0-1.956-.584-2.393-1.446-.437-.862-.437-1.93 0-2.792.437-.862 1.344-1.446 2.393-1.446 1.048 0 1.955.584 2.392 1.446.437.862.437 1.93 0 2.792z"/></svg>`,
      description: 'Automatización CI/CD'
    },
    
    // Tools - Parte inferior
    { 
      id: 'git', 
      name: 'Git', 
      category: 'tools', 
      x: 250, 
      y: 420, 
      color: '#F05032', 
      size: 42, 
      connections: ['jenkins', 'maven'],
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg>`,
      description: 'Control de versiones'
    },
    { 
      id: 'maven', 
      name: 'Maven', 
      category: 'tools', 
      x: 350, 
      y: 450, 
      color: '#C71A36', 
      size: 38, 
      connections: ['java', 'git'],
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.31 7.125v9.656c0 .133-.11.243-.243.243h-1.077c-.133 0-.243-.11-.243-.243V8.202L18.14 16.78c-.04.133-.162.243-.295.243h-.81c-.133 0-.255-.11-.295-.243L14.133 8.202v8.579c0 .133-.11.243-.243.243h-1.077c-.133 0-.243-.11-.243-.243V7.125c0-.133.11-.243.243-.243h1.32c.133 0 .255.11.295.243L16.79 15.7l2.362-8.575c.04-.133.162-.243.295-.243h1.32c.133 0 .243.11.243.243zM9.76 7.125v9.656c0 .133-.11.243-.243.243H8.44c-.133 0-.243-.11-.243-.243V8.202L5.59 16.78c-.04.133-.162.243-.295.243h-.81c-.133 0-.255-.11-.295-.243L1.583 8.202v8.579c0 .133-.11.243-.243.243H.263c-.133 0-.243-.11-.243-.243V7.125c0-.133.11-.243.243-.243h1.32c.133 0 .255.11.295.243L4.24 15.7l2.362-8.575c.04-.133.162-.243.295-.243h1.32c.133 0 .243.11.243.243z"/></svg>`,
      description: 'Gestión de dependencias'
    },
    { 
      id: 'rest', 
      name: 'REST APIs', 
      category: 'backend', 
      x: 400, 
      y: 280, 
      color: '#61DAFB', 
      size: 46, 
      connections: ['groovy', 'python', 'django', 'javascript'],
      icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>`,
      description: 'Servicios web RESTful'
    },
  ];

  const categories = {
    backend: { name: 'Backend', color: '#10B981', icon: <Server className="w-4 h-4" /> },
    frontend: { name: 'Frontend', color: '#F59E0B', icon: <Code className="w-4 h-4" /> },
    database: { name: 'Databases', color: '#3B82F6', icon: <Database className="w-4 h-4" /> },
    devops: { name: 'DevOps', color: '#8B5CF6', icon: <Cloud className="w-4 h-4" /> },
    tools: { name: 'Tools', color: '#EF4444', icon: <Terminal className="w-4 h-4" /> }
  };

  const softSkills: SoftSkill[] = [
    {
      name: "Resolución de Problemas",
      icon: <Zap className="w-5 h-5" />,
      description: "Análisis lógico y soluciones eficientes para desafíos técnicos complejos"
    },
    {
      name: "Adaptabilidad Técnica",
      icon: <Code className="w-5 h-5" />,
      description: "Rápida adaptación a nuevas tecnologías y metodologías de trabajo"
    },
    {
      name: "Enfoque en Calidad",
      icon: <Target className="w-5 h-5" />,
      description: "Desarrollo con estándares altos y mejora continua del código"
    }
  ];

  useEffect(() => {
    // Animar la entrada del contenedor principal
    gsap.fromTo('.skills-container',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animar el SVG con efecto espectacular
    gsap.fromTo('.tech-svg',
      { opacity: 0, scale: 0.5, rotationY: 45 },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.tech-svg',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animar nodos con efecto de onda
    gsap.fromTo('.tech-node',
      { scale: 0, opacity: 0, rotation: 180 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        stagger: {
          amount: 2,
          from: "center",
          grid: "auto"
        },
        ease: 'elastic.out(1, 0.5)',
        delay: 0.5,
        scrollTrigger: {
          trigger: '.tech-svg',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animar conexiones con efecto de escritura
    gsap.fromTo('.connection-line',
      { strokeDasharray: '1000', strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        duration: 3,
        ease: 'power2.out',
        delay: 1.5,
        scrollTrigger: {
          trigger: '.tech-svg',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Efecto de partículas flotantes
    const createFloatingParticles = () => {
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #3B82F6, #8B5CF6);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.6;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
        `;
        containerRef.current?.appendChild(particle);

        gsap.to(particle, {
          y: -100,
          x: Math.random() * 200 - 100,
          opacity: 0,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          delay: Math.random() * 2,
          ease: 'power1.out'
        });
      }
    };

    createFloatingParticles();

    // Cleanup
    return () => {
      const particles = document.querySelectorAll('.floating-particle');
      particles.forEach(p => p.remove());
    };
  }, []);

  const handleNodeHover = (nodeId: string | null) => {
    setHoveredNode(nodeId);
    
    if (nodeId) {
      const node = techNodes.find(n => n.id === nodeId);
      if (node) {
        // Efecto de pulsación en el nodo principal
        gsap.to(`.node-${nodeId}`, { 
          scale: 1.3, 
          duration: 0.3,
          ease: 'back.out(1.7)'
        });
        
        // Crear ondas expansivas
        gsap.fromTo(`.pulse-${nodeId}`, 
          { scale: 1, opacity: 0.8 },
          { 
            scale: 2, 
            opacity: 0, 
            duration: 1, 
            repeat: -1,
            ease: 'power2.out'
          }
        );

        // Highlight de conexiones con efecto neón
        node.connections.forEach(connId => {
          gsap.to(`.node-${connId}`, { 
            scale: 1.15, 
            opacity: 1, 
            duration: 0.3,
            ease: 'back.out(1.7)'
          });
          
          gsap.to(`.connection-${nodeId}-${connId}, .connection-${connId}-${nodeId}`, { 
            stroke: node.color, 
            strokeWidth: 4, 
            opacity: 1,
            filter: `drop-shadow(0 0 8px ${node.color})`,
            duration: 0.3 
          });
        });

        // Dim otros nodos con efecto suave
        techNodes.forEach(n => {
          if (n.id !== nodeId && !node.connections.includes(n.id)) {
            gsap.to(`.node-${n.id}`, { 
              opacity: 0.2, 
              scale: 0.9,
              duration: 0.3 
            });
          }
        });
      }
    } else {
      // Reset con animación suave
      gsap.to('.tech-node', { 
        scale: 1, 
        opacity: 1, 
        duration: 0.4,
        ease: 'power2.out'
      });
      gsap.to('.connection-line', { 
        stroke: '#64748b', 
        strokeWidth: 2, 
        opacity: 0.4,
        filter: 'none',
        duration: 0.4 
      });
      gsap.killTweensOf('.pulse-ring');
    }
  };

  const filterByCategory = (category: string | null) => {
    setSelectedCategory(category);
    
    if (category) {
      techNodes.forEach(node => {
        if (node.category === category) {
          gsap.to(`.node-${node.id}`, { 
            opacity: 1, 
            scale: 1.1, 
            duration: 0.4,
            ease: 'back.out(1.7)'
          });
        } else {
          gsap.to(`.node-${node.id}`, { 
            opacity: 0.15, 
            scale: 0.8, 
            duration: 0.4 
          });
        }
      });
    } else {
      gsap.to('.tech-node', { 
        opacity: 1, 
        scale: 1, 
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <section id="habilidades" className="skills-section py-8 sm:py-12 lg:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 skills-container">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">
            Stack Tecnológico
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
            Ecosistema interactivo de tecnologías backend
          </p>
        </div>

        {/* Category Filters con iconos */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => filterByCategory(null)}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
              selectedCategory === null 
                ? 'bg-accent text-white shadow-lg shadow-accent/25' 
                : 'bg-muted text-muted-foreground hover:bg-accent/10'
            }`}
          >
            <Code className="w-4 h-4 mr-2" />
            Todas
          </button>
          {Object.entries(categories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => filterByCategory(key)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                selectedCategory === key 
                  ? 'text-white shadow-lg' 
                  : 'bg-muted text-muted-foreground hover:bg-accent/10'
              }`}
              style={{ 
                backgroundColor: selectedCategory === key ? cat.color : undefined,
                boxShadow: selectedCategory === key ? `0 8px 25px ${cat.color}40` : undefined
              }}
            >
              {cat.icon}
              <span className="ml-2">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Interactive Tech Stack SVG */}
        <div 
          ref={containerRef}
          className="relative bg-gradient-to-br from-card/90 via-card/80 to-card/70 backdrop-blur-xl border border-border/50 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl mb-12 overflow-hidden"
          onMouseMove={handleMouseMove}
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
                rgba(59, 130, 246, 0.1) 0%, 
                transparent 50%),
              linear-gradient(135deg, 
                rgba(255, 255, 255, 0.1) 0%, 
                rgba(255, 255, 255, 0.05) 100%)
            `
          }}
        >
          {/* Efecto de brillo de fondo */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-secondary/5 rounded-3xl"></div>
          
          <svg
            ref={svgRef}
            className="tech-svg w-full h-96 sm:h-[500px] lg:h-[600px] relative z-10"
            viewBox="0 0 650 500"
            style={{ 
              filter: 'drop-shadow(0 8px 25px rgba(0,0,0,0.15))',
              background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.03) 0%, transparent 70%)'
            }}
          >
            {/* Definir gradientes y efectos */}
            <defs>
              {techNodes.map(node => (
                <g key={`effects-${node.id}`}>
                  <radialGradient id={`gradient-${node.id}`}>
                    <stop offset="0%" stopColor={node.color} stopOpacity="0.9" />
                    <stop offset="70%" stopColor={node.color} stopOpacity="0.6" />
                    <stop offset="100%" stopColor={node.color} stopOpacity="0.2" />
                  </radialGradient>
                  <filter id={`glow-${node.id}`}>
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </g>
              ))}
            </defs>

            {/* Grid de fondo sutil */}
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(100, 116, 139, 0.1)" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Conexiones con efectos mejorados */}
            {techNodes.map(node => 
              node.connections.map(connId => {
                const connectedNode = techNodes.find(n => n.id === connId);
                if (!connectedNode) return null;
                
                return (
                  <line
                    key={`${node.id}-${connId}`}
                    className={`connection-line connection-${node.id}-${connId}`}
                    x1={node.x}
                    y1={node.y}
                    x2={connectedNode.x}
                    y2={connectedNode.y}
                    stroke="#64748b"
                    strokeWidth="2"
                    opacity="0.4"
                    strokeDasharray="5,5"
                    strokeLinecap="round"
                  />
                );
              })
            )}

            {/* Nodos tecnológicos con efectos avanzados */}
            {techNodes.map(node => (
              <g key={node.id} className={`tech-node node-${node.id}`}>
                {/* Anillo de pulso para hover */}
                <circle
                  className={`pulse-${node.id} pulse-ring`}
                  cx={node.x}
                  cy={node.y}
                  r={node.size + 15}
                  fill="none"
                  stroke={node.color}
                  strokeWidth="2"
                  opacity="0"
                />
                
                {/* Círculo de fondo con gradiente */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size}
                  fill={`url(#gradient-${node.id})`}
                  stroke={node.color}
                  strokeWidth="3"
                  filter={`url(#glow-${node.id})`}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => handleNodeHover(node.id)}
                  onMouseLeave={() => handleNodeHover(null)}
                />
                
                {/* Icono de la tecnología */}
                <foreignObject
                  x={node.x - 12}
                  y={node.y - 12}
                  width="24"
                  height="24"
                  className="pointer-events-none"
                >
                  <div 
                    className="w-6 h-6 text-white"
                    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                    dangerouslySetInnerHTML={{ __html: node.icon }}
                  />
                </foreignObject>
                
                {/* Texto de la tecnología */}
                <text
                  x={node.x}
                  y={node.y + node.size + 20}
                  textAnchor="middle"
                  className="fill-foreground text-xs font-bold pointer-events-none select-none"
                  style={{ 
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
                    fontSize: '11px'
                  }}
                >
                  {node.name}
                </text>

                {/* Información detallada en hover */}
                {hoveredNode === node.id && (
                  <g className="node-info-popup">
                    <rect
                      x={node.x > 400 ? node.x - 220 : node.x + 60}
                      y={node.y - 40}
                      width="200"
                      height="80"
                      rx="12"
                      fill="rgba(0,0,0,0.9)"
                      stroke={node.color}
                      strokeWidth="2"
                      filter="drop-shadow(0 8px 25px rgba(0,0,0,0.3))"
                    />
                    <text 
                      x={node.x > 400 ? node.x - 120 : node.x + 160} 
                      y={node.y - 15} 
                      textAnchor="middle"
                      className="fill-white text-sm font-bold"
                    >
                      {node.name}
                    </text>
                    <text 
                      x={node.x > 400 ? node.x - 120 : node.x + 160} 
                      y={node.y + 5} 
                      textAnchor="middle"
                      className="fill-gray-300 text-xs"
                    >
                      {node.description}
                    </text>
                    <text 
                      x={node.x > 400 ? node.x - 120 : node.x + 160} 
                      y={node.y + 25} 
                      textAnchor="middle"
                      className="fill-gray-400 text-xs"
                    >
                      {categories[node.category as keyof typeof categories]?.name}
                    </text>
                  </g>
                )}
              </g>
            ))}
          </svg>
        </div>

        {/* Competencias Profesionales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {softSkills.map((skill, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-accent/80 group-hover:text-white transition-all duration-500 group-hover:scale-110">
                  {skill.icon}
                </div>
                <h4 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {skill.name}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Enfoque de Desarrollo */}
        <div className="relative bg-gradient-to-br from-accent/10 via-secondary/10 to-accent/10 rounded-3xl p-6 sm:p-8 lg:p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-secondary/5"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mr-4">
                <Code className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                Mi Enfoque de Desarrollo
              </h3>
            </div>
            
            <p className="text-base sm:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
              Desarrollo backend robusto con enfoque en <strong className="text-accent">automatización de procesos</strong>, 
              <strong className="text-accent"> APIs escalables</strong> y <strong className="text-accent">soluciones empresariales</strong>. 
              Mi metodología combina análisis profundo del problema, implementación eficiente 
              y optimización continua para maximizar el impacto en productividad.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
              <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
                <ArrowRight className="w-5 h-5 text-accent mr-2" />
                <span className="text-sm font-medium">Análisis → Código</span>
              </div>
              <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
                <ArrowRight className="w-5 h-5 text-accent mr-2" />
                <span className="text-sm font-medium">Eficiencia → Escalabilidad</span>
              </div>
              <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
                <ArrowRight className="w-5 h-5 text-accent mr-2" />
                <span className="text-sm font-medium">Calidad → Impacto</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-6 py-3 bg-accent/20 text-accent rounded-full text-sm font-medium backdrop-blur-sm border border-accent/30 hover:bg-accent/30 transition-all duration-300">
                30-50% mejora en productividad
              </span>
              <span className="px-6 py-3 bg-accent/20 text-accent rounded-full text-sm font-medium backdrop-blur-sm border border-accent/30 hover:bg-accent/30 transition-all duration-300">
                Automatización de procesos
              </span>
              <span className="px-6 py-3 bg-accent/20 text-accent rounded-full text-sm font-medium backdrop-blur-sm border border-accent/30 hover:bg-accent/30 transition-all duration-300">
                Soluciones empresariales
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;