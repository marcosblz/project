import React, { useEffect, useState } from 'react';
import { Calendar, Award, BookOpen, Target, GraduationCap, FileText, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  const educationItems: EducationItem[] = [
    {
      id: 1,
      title: "BootCamp DevOps",
      institution: "Qualentum",
      date: "Septiembre 2023 - Abril 2024",
      description: "Formación intensiva en DevOps con enfoque práctico en automatización, implementación de metodologías ágiles (Scrum/Kanban), pipelines CI/CD y manejo de herramientas colaborativas (Git, Jenkins, Docker, Kubernetes), orientada a optimizar flujos de trabajo, mejorar la eficiencia del desarrollo y acelerar el despliegue continuo de software.",
      grade: "Sobresaliente",
      type: "education"
    },
    {
      id: 2,
      title: "Desarrollo de Aplicaciones Multiplataforma",
      institution: "IES Enrique Tierno Galván",
      date: "Septiembre 2021 - Marzo 2023",
      description: "Formación técnica en Java, especializada en programación Backend, Bases de Datos relacionales y no relacionales, diseño y arquitectura de software, así como implementación eficiente de procesos multihilo. Capacidad demostrada para adaptarme a diversos lenguajes y tecnologías, gestionar proyectos de forma integral y desarrollar soluciones escalables, robustas y optimizadas.",
      grade: "Notable Alto",
      type: "education"
    },
    {
      id: 3,
      title: "Sistemas Microinformáticos y Redes",
      institution: "Hease",
      date: "Septiembre 2019 - Marzo 2021",
      description: "Formación enfocada en la instalación, configuración y mantenimiento de sistemas operativos, virtualización. redes y equipos informáticos. Capacidad para adaptarme a entornos tecnológicos diversos y resolver eficazmente problemas técnicos en infraestructuras tanto físicas como virtuales.",
      grade: "Notable Alto",
      type: "education"
    }
  ];

  const certificationItems: EducationItem[] = [
    {
      id: 4,
      title: "Certificación React Advanced",
      institution: "Meta (Facebook)",
      date: "2022",
      description: "Certificación oficial en desarrollo avanzado con React, incluyendo hooks avanzados, performance optimization y testing.",
      grade: "Certificado",
      type: "certification"
    },
    {
      id: 5,
      title: "AWS Cloud Practitioner",
      institution: "Amazon Web Services",
      date: "2023",
      description: "Certificación fundamental de AWS que valida el conocimiento general de la nube de AWS.",
      grade: "Certificado",
      type: "certification"
    },
    {
      id: 6,
      title: "Google Analytics Certified",
      institution: "Google",
      date: "2021",
      description: "Certificación en Google Analytics para análisis web y medición de rendimiento digital.",
      grade: "Certificado",
      type: "certification"
    }
  ];

  const skills = [
  "Razonamiento lógico",
  "Comprensión profunda",
  "Rápida adaptación",
  "Flexibilidad técnica",
  "Comunicación clara",
  "Trabajo en equipo",
  "Aprendizaje autodidacta",
  "Exigencia y calidad",
  "Mentalidad de mejora continua",
];


  const latestEducation = educationItems[1]; // Máster más reciente
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
    </div>
  );

  return (
    <section id="estudios" className="education-section py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">Formación Académica</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">Mi trayectoria educativa y crecimiento profesional</p>
        </div>

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
                  Me mantengo actualizado con las últimas tendencias y tecnologías del desarrollo web. 
                  Actualmente estudiando Web3 y arquitecturas de microservicios.
                </p>
                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-accent/20 rounded-lg">
                  <p className="text-accent text-xs sm:text-sm font-medium">
                    🎯 Próximo objetivo: Certificación AWS Solutions Architect
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