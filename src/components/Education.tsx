import React, { useEffect, useState } from 'react';
import { Calendar, Award, BookOpen, Target, GraduationCap, FileText, ChevronRight, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CertificateViewer from './CertificateViewer';

gsap.registerPlugin(ScrollTrigger);

interface EducationItem {
  id: number;
  title: string;
  institution: string;
  date: string;
  description: string;
  grade?: string;
  type: 'education' | 'certification';
}

const Education: React.FC = () => {
  const [showAllEducation, setShowAllEducation] = useState(false);
  const [showAllCertifications, setShowAllCertifications] = useState(false);
  const [showCertificateViewer, setShowCertificateViewer] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<{
    url: string;
    title: string;
    name: string;
  } | null>(null);

  const educationItems: EducationItem[] = [
    {
      id: 1,
      title: "BootCamp DevOps",
      institution: "Qualentum",
      date: "Septiembre 2023 - Abril 2024",
      description: "Programa intensivo con enfoque 100% práctico en entornos DevOps. Aprendí a diseñar, automatizar y optimizar pipelines de integración y entrega continua (CI/CD), gestionar infraestructuras con herramientas como Docker, Kubernetes, Jenkins y Ansible, y aplicar metodologías ágiles como Scrum y Kanban. Además, desarrollé habilidades clave en monitorización con Prometheus y Grafana, gestión de versiones con Git y despliegue en la nube con AWS, orientando todo el trabajo a la eficiencia, escalabilidad y estabilidad del software.",
      grade: "Sobresaliente",
      type: "education"
    },
    {
      id: 2,
      title: "Desarrollo de Aplicaciones Multiplataforma",
      institution: "IES Enrique Tierno Galván",
      date: "Septiembre 2021 - Marzo 2023",
      description: "Formación especializada en desarrollo de software multiplataforma con énfasis en programación backend con Java y Python. Adquirí competencias sólidas en el diseño y manipulación de bases de datos SQL y NoSQL, construcción de interfaces, arquitectura de aplicaciones, y desarrollo de soluciones móviles y de escritorio. Realicé un proyecto final completo que integró todo el ciclo de vida del desarrollo: análisis, diseño, codificación, pruebas y documentación técnica.",
      grade: "Notable Alto",
      type: "education"
    },
    {
      id: 3,
      title: "Sistemas Microinformáticos y Redes",
      institution: "Hease",
      date: "Septiembre 2019 - Marzo 2021",
      description: "Ciclo formativo centrado en la instalación, mantenimiento y soporte de sistemas informáticos y redes locales. Aprendí a montar y configurar hardware, administrar sistemas operativos Windows y Linux, virtualizar entornos mediante herramientas como VirtualBox y VMWare, y aplicar protocolos de red (TCP/IP, DHCP, DNS). Desarrollé habilidades para diagnosticar y resolver incidencias técnicas, así como para optimizar el rendimiento de infraestructuras TI en entornos reales.",
      grade: "Notable Alto",
      type: "education"
    }
  ];

  const certificationItems: EducationItem[] = [
    {
      id: 4,
      title: "Figma para Devs",
      institution: "midu.dev",
      date: "2025",
      description: "Aprendí a crear y organizar proyectos, manejar herramientas de diseño vectorial y texto, trabajar con componentes y prototipos interactivos, e integrar Figma en flujos de trabajo de desarrollo mediante Plugins y DevMode. Ahora domino Figma para colaborar eficazmente con equipos de diseño y mejorar la calidad de los proyectos como programador.",
      grade: "Certificado",
      type: "certification"
    },
    {
      id: 5,
      title: "Curso de Inteligencia Artificial",
      institution: "Udemy",
      date: "2024",
      description: "Aprendí desde cero a usar y crear modelos como ChatGPT, Midjourney y DALL-E, incluyendo fine-tuning, prompt engineering y automatización con Python. Incluye prácticas, integración en apps, generación y manipulación de imágenes, vídeo y audio.",
      grade: "Certificado",
      type: "certification"
    }
  ];

  const skills = [
    "Excel",
    "Comunicación",
    "Resolución de incidencias",
    "Figma",
    "Adaptabilidad",
    "Pensamiento crítico",
    "Creatividad"
  ];

  const latestEducation = educationItems[0]; // Más reciente
  const latestCertification = certificationItems[0]; // Certificación más reciente

  useEffect(() => {
    gsap.fromTo('.education-card',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.education-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.sidebar-content',
      { x: 20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.education-section',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const EducationCard = ({ item, isPreview = false }: { item: EducationItem; isPreview?: boolean }) => (
    <div className={`education-card bg-background/80 backdrop-blur-sm border border-border rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${isPreview ? 'border-accent/20' : ''}`}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4">
        <div className="flex-1">
          <h4 className={`${isPreview ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'} font-bold text-foreground mb-1 sm:mb-2`}>{item.title}</h4>
          <p className="text-accent font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{item.institution}</p>
          <div className="flex items-center text-muted-foreground mb-2 sm:mb-3">
            <Calendar className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
            <span className="text-xs sm:text-sm">{item.date}</span>
          </div>
        </div>
        {item.grade && (
          <div className="flex items-center bg-accent/10 text-accent px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mt-2 sm:mt-0 w-fit">
            <Award className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
            {item.grade}
          </div>
        )}
      </div>
      <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">{item.description}</p>
      
      {/* Ver Certificado button for certifications */}
      {item.type === 'certification' && (
        <div className="mt-4">
          <button
            onClick={() => {
              setSelectedCertificate({
                url: item.id === 4 ? '/certificado_figma.png' : '/certificado-udemy-cursoIA.jpg',
                title: item.title,
                name: item.id === 4 ? 'Certificado_Figma.png' : 'Certificado_IA_Udemy.jpg'
              });
              setShowCertificateViewer(true);
            }}
            className="inline-flex items-center px-3 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 shadow-sm"
          >
            <FileText className="w-3 sm:w-4 h-3 sm:h-4 mr-2" />
            Ver Certificado
          </button>
        </div>
      )}
    </div>
  );

  return (
    <section id="estudios" className="education-section py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Formación Académica</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Mi trayectoria educativa y crecimiento profesional</p>
        </div>

        {/* Certificate Viewer Modal */}
        {selectedCertificate && (
          <CertificateViewer 
            isOpen={showCertificateViewer} 
            onClose={() => {
              setShowCertificateViewer(false);
              setSelectedCertificate(null);
            }}
            certificateUrl={selectedCertificate.url}
            certificateTitle={selectedCertificate.title}
            certificateName={selectedCertificate.name}
          />
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Education and Certifications */}
          <div className="lg:col-span-2">
            <div className="education-grid space-y-4 sm:space-y-6 lg:space-y-8">
              {/* Education Section */}
              <div>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center">
                    <GraduationCap className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-accent mr-2" />
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Estudios</h3>
                  </div>
                </div>
                
                {/* Latest Education Preview */}
                <div className="mb-3 sm:mb-4">
                  <EducationCard item={latestEducation} isPreview={true} />
                </div>

                {/* Show All Education */}
                {showAllEducation && (
                  <div className="space-y-3 sm:space-y-4 mb-3 sm:mb-4">
                    {educationItems.filter(item => item.id !== latestEducation.id).map((item) => (
                      <EducationCard key={item.id} item={item} />
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setShowAllEducation(!showAllEducation)}
                  className="flex items-center text-accent hover:text-accent/80 font-medium transition-colors duration-300 text-xs sm:text-sm lg:text-base"
                >
                  {showAllEducation ? 'Ver menos' : `Ver todos los estudios (${educationItems.length})`}
                  <ChevronRight className={`w-3 sm:w-4 h-3 sm:h-4 ml-1 transition-transform duration-300 ${showAllEducation ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* Certifications Section */}
              <div>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center">
                    <FileText className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-accent mr-2" />
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Certificaciones</h3>
                  </div>
                </div>
                
                {/* Latest Certification Preview */}
                <div className="mb-3 sm:mb-4">
                  <EducationCard item={latestCertification} isPreview={true} />
                </div>

                {/* Show All Certifications */}
                {showAllCertifications && (
                  <div className="space-y-3 sm:space-y-4 mb-3 sm:mb-4">
                    {certificationItems.filter(item => item.id !== latestCertification.id).map((item) => (
                      <EducationCard key={item.id} item={item} />
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setShowAllCertifications(!showAllCertifications)}
                  className="flex items-center text-accent hover:text-accent/80 font-medium transition-colors duration-300 text-xs sm:text-sm lg:text-base"
                >
                  {showAllCertifications ? 'Ver menos' : `Ver todas las certificaciones (${certificationItems.length})`}
                  <ChevronRight className={`w-3 sm:w-4 h-3 sm:h-4 ml-1 transition-transform duration-300 ${showAllCertifications ? 'rotate-90' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sidebar-content lg:sticky lg:top-24 space-y-4 sm:space-y-6">
              {/* Key Competencies */}
              <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg">
                <div className="flex items-center mb-3 sm:mb-4">
                  <Target className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-accent mr-2" />
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-foreground">Competencias Clave</h3>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center p-1.5 sm:p-2 rounded-lg hover:bg-accent/10 transition-colors duration-300"
                    >
                      <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-accent rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground text-xs sm:text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Continuous Learning */}
              <div className="bg-gradient-to-br from-accent/10 to-secondary/10 border border-accent/20 rounded-xl p-3 sm:p-4 lg:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <BookOpen className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-accent mr-2" />
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-foreground">Aprendizaje Continuo</h3>
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  Me mantengo actualizado con las últimas tendencias y tecnologías de desarrollo. 
                </p>
                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-accent/20 rounded-lg">
                  <p className="text-accent text-xs sm:text-sm font-medium">
                    🎯 Próximo objetivo: Curso Intensivo de Model Context Protocol
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;